// Initial server setup
const express = require('express')
const app = express()
const port = 3000

// Initial XRPL setup
const ripple = require("ripple-lib")
const { submit_and_verify } = require("./submit_and_verify")

// The cold address (issuer of tokens) would be the website
const COLD_ADDRESS = "rwPEPmvoppTnnzPcr1sVNu1e2KtJBexqP7"
const COLD_SECRET_KEY = "shnV6mDEXK9mgJ5YWUcCuizARrE7T"

// Mimicking a user
const HOT_ADDRESS = "r4rp4rqnLg6Ehe11aUTLeFSPyUreLETrCQ"
const HOT_SECRET_KEY = "ssUq6FYi1tFSMTaXWBgNGi3XCRkri"

// Routes
app.get('/my-wallet', (req, res) => {
    // Returns the hot wallet address used by a user

    // For simplicity, let's use the one XRPL generated for me:
    res.send({ hotAddress: HOT_ADDRESS, hotSecretKey: HOT_SECRET_KEY })
})

app.post('/mint', async (req, res) => {
    const transactionURL = await mintNFTOnXRPL(req.params.nft)
    res.send(transactionURL)
})

app.post('/simulate-purchase', async (req, res) => {
    await simulatePurchase(req.params.nft)
    res.send()
})

// Utility functions
const connectToXRPLTestnet = async () => {
    // Connects the server to a XRPL Testnet server.
    api = new ripple.RippleAPI({ server: "wss://s.altnet.rippletest.net:51233" })
    await api.connect()
    console.log("Server connected to the XRP Network")

    // Configure issuer (cold address) settings ----------------------------------
    // Apparently we are just sending a transaction to enable the following
    // settings from this cold address.
    const cold_settings_tx = {
        "TransactionType": "AccountSet",
        "Account": COLD_ADDRESS,
        "TransferRate": 0,
        "TickSize": 5,
        "Domain": "6578616D706C652E636F6D", // "example.com"
        "SetFlag": 8 // enable Default Ripple
    }

    // Creating/preparing transaction
    const cst_prepared = await api.prepareTransaction(
        cold_settings_tx,
        { maxLedgerVersionOffset: 10 }
    )

    // Signing transaction with the cold secret key
    const cst_signed = api.sign(cst_prepared.txJSON, COLD_SECRET_KEY)

    // submit_and_verify helper function from:
    // https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/submit-and-verify/

    // An AccountSet transaction modifies the properties of an account in the XRP Ledger.
    console.log("Sending cold address AccountSet transaction...")
    const cst_result = await submit_and_verify(api, cst_signed.signedTransaction)
    if (cst_result == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.id}`)
    } else {
        throw `Error sending transaction: ${cst_result}`
    }

    // Configure hot address settings --------------------------------------------
    // Apparently we are just sending a transaction to enable the following
    // settings from this hot address.
    const hot_settings_tx = {
        "TransactionType": "AccountSet",
        "Account": HOT_ADDRESS,
        "Domain": "6578616D706C652E636F6D", // "example.com"
        "SetFlag": 2
        // enable Require Auth so we can't use trust lines that users
        // make to the hot address, even by accident.
    }

    const hst_prepared = await api.prepareTransaction(
        hot_settings_tx,
        { maxLedgerVersionOffset: 10 }
    )

    const hst_signed = api.sign(hst_prepared.txJSON, HOT_SECRET_KEY)
    console.log("Sending hot address AccountSet transaction...")
    const hst_result = await submit_and_verify(api, hst_signed.signedTransaction)
    if (hst_result == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.id}`)
    } else {
        throw `Error sending transaction: ${hst_result}`
    }

    // Before you can receive tokens, you need to create a trust line to the token
    // issuer.
    // The hot address needs a trust line like this before it can receive tokens
    // from the issuer.
    // Similarly, each user who wants to hold your token must also create a trust
    // line.
    // To create a trust line, send a TrustSet transaction from the hot address
    // with the following fields:

    // The following code sample shows how to send a TrustSet transaction from
    // the hot address, trusting the issuing address for a limit of 1 billion FOO:
    // Create trust line from hot to cold address --------------------------------
    const currency_code = "MCO"
    const trust_set_tx = {
        "TransactionType": "TrustSet",
        "Account": HOT_ADDRESS,
        "LimitAmount": {
            "currency": currency_code,
            "issuer": COLD_ADDRESS,
            "value": "10000000000" // Large limit, arbitrarily chosen (1bi)
        }
    }

    const ts_prepared = await api.prepareTransaction(
        trust_set_tx,
        { maxLedgerVersionOffset: 10 }
    )
    const ts_signed = api.sign(ts_prepared.txJSON, HOT_SECRET_KEY)
    console.log("Creating trust line from hot address to issuer...")
    const ts_result = await submit_and_verify(api, ts_signed.signedTransaction)
    if (ts_result == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.id}`)
    } else {
        throw `Error sending transaction: ${ts_result}`
    }
}

const mintNFTOnXRPL = async (nft) => {
    // Mints an NFT on the XRP Ledger
    const { name, description, price } = nft

    // Now you can create tokens by sending a Payment transaction from the cold
    // address to the hot address.
    // The following code sample shows how to send a Payment transaction to
    // issue 88 FOO from the cold address to the hot address:
    // Send token ----------------------------------------------------------------
    // The NFT's "currency code" emitted by our business will be MCO (but they
    // will STILL BE NFTs)
    const currency_code = "MCO"
    const issue_quantity = convertFromXPRToNFTNotation(price)
    const send_token_tx = {
        "TransactionType": "Payment",
        "Account": COLD_ADDRESS,
        "Amount": {
            "currency": currency_code,
            "value": issue_quantity,
            "issuer": COLD_ADDRESS
        },
        "Destination": HOT_ADDRESS
    }

    const pay_prepared = await api.prepareTransaction(
        send_token_tx,
        { maxLedgerVersionOffset: 10 }
    )

    const pay_signed = api.sign(pay_prepared.txJSON, COLD_SECRET_KEY)
    // submit_and_verify helper from _code-samples/submit-and-verify
    console.log(`Sending ${issue_quantity} ${currency_code} to ${HOT_ADDRESS}...`)
    const pay_result = await submit_and_verify(api, pay_signed.signedTransaction)
    const transactionURL = `https://testnet.xrpl.org/transactions/${pay_signed.id}`
    if (pay_result == "tesSUCCESS") {
        console.log(`Transaction succeeded: ${transactionURL}`)
    } else {
        throw `Error sending transaction: ${pay_result}`
    }

    return transactionURL
}

const simulatePurchase = (nft) => {
    const { name, desc, price } = nft
}

const convertFromXPRToNFTNotation = (xpr) => {
    // Converts XPR value to "NFT notation" so that our tokens can be
    // considered NFTs
    return xpr / 1000000000000000000000000000000000000000000000000000000000000000000000000000000000
}

// Stuff that needs to be run as soon as the server is turned on
connectToXRPLTestnet()

app.listen(port, () => {
  console.log(`Main server listening on http://localhost:${port}`)
})
