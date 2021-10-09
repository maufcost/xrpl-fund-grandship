import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'
import Loading from '../loading/loading'

import { addNFTToDB } from '../../firebase'
import NFTSample from '../../assets/classic-cars-sample/mv.jpeg'
import GEICO from '../../assets/geico.png'
import StateFarm from '../../assets/statefarm.png'

import './mint.css'

class Mint extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            creator_addr: '0x4f512',
            creator_uid: '',
            nft_name: '',
            nft_description: '',
            nft_price: '',
            nft_period: '',
            nft_quantity: '',
            nft_file: '',
            noun: 'community',
            dollars: 0,
            uploadedFile: '',
            loading: true,
            carChecked: true,
            realChecked: false,
            sharevalue: 0
        }

        this.XRPL_USD_RATE = 1.10;

        this.create = this.create.bind(this)
        this.onChangeNFTName = this.onChangeNFTName.bind(this)
        this.onChangeNFTFile = this.onChangeNFTFile.bind(this)
        this.onChangeNFTPrice = this.onChangeNFTPrice.bind(this)
        this.onChangeNFTPeriod = this.onChangeNFTPeriod.bind(this)
        this.onChangeNFTQuantity = this.onChangeNFTQuantity.bind(this)
        this.onChangeCarCheckbox = this.onChangeCarCheckbox.bind(this)
        this.onChangeRealCheckbox = this.onChangeRealCheckbox.bind(this)
        this.onChangeNFTDescription = this.onChangeNFTDescription.bind(this)
    }

    componentDidMount() {
       // const nouns = ['fans', 'listeners', 'viewers', 'community']
       // let ix = 0
       // setInterval(() => {
       //     this.setState({ noun: nouns[ix] }, () => {
       //         ix = ++ix % nouns.length
       //     })
       // }, 2000)
       setTimeout(() => {
           this.setState({ loading: false })
       }, 2000)
   }

   onChangeNFTName(e) {
       this.setState({ nft_name: e.target.value })
   }

   onChangeNFTDescription(e) {
       this.setState({ nft_description: e.target.value })
   }

   onChangeNFTPrice(e) {
       const val = e.target.value
       this.setState({ nft_price: val, dollars: (val * this.XRPL_USD_RATE).toFixed(2) })
   }

   onChangeNFTPeriod(e) {
       this.setState({ nft_period: e.target.value })
   }

   onChangeNFTQuantity(e) {
       // For testing purposes, let's limit the max num
       // of tokens to be created at once (i.e. in a batch) to be 5.
       let val = e.target.value
       if (val > 20) val = 20
       const sharevalue = (this.state.nft_price / val).toFixed(2)
       this.setState({ nft_quantity: val, sharevalue })
   }

   onChangeNFTFile(e) {
       this.setState({ nft_file: e.target.value })
       const sampleFile = "https://firebasestorage.googleapis.com/v0/b/xrpl-fund-mothership.appspot.com/o/makeup.gif?alt=media&token=ad8b9933-1e42-4d3f-80c9-a343580e8ede"
       setTimeout(() => {
           this.setState({ uploadedFile: sampleFile })
       }, 1500)
   }

   async create() {
       // if (this.state.nft_price <= 0) return;
       // if (this.state.nft_period <= 0) return;
       // if (this.state.nft_quantity <= 0) return;

       const tokenInfo = {
           name: this.state.nft_name,
           description: this.state.nft_description,
           price: this.state.nft_price,
           valid_for_days: this.state.nft_period,
           quantity: this.state.nft_quantity,
           image: this.state.nft_file_link,
       }

       this.setState({ loading: true })

       const apiURL = "http://localhost:5000/mint"

       // Adding to db
       // addNFTToDB
       // .then(url => {
       //     const bodyFormData = new FormData();
       //     bodyFormData.append("file_url_raw", url);
       //
       //     // API call here (to submit file URL)
       //     axios({
       //         method: "post",
       //         url: apiURL,
       //         data: bodyFormData,
       //         headers: { "Content-Type": "multipart/form-data" },
       //     })
       //     .then(response => {
       //         // handle success
       //         console.log(response);
       //         setTimeout(() => {
       //             // To prevent multiple subsequent requests to our API.
       //             this.setState({ loading: false })
       //         }, 2000)
       //     })
       //     .catch(error => {
       //         // handle error
       //         console.log(error);
       //         setTimeout(() => {
       //             // To prevent multiple subsequent requests to our API.
       //             this.setState({ loading: false })
       //         }, 2000)
       //     });
       //
       //     // To prevent multiple requests.
           setTimeout(() => {
               navigate("/")
           }, 2500)
       // })
       // .catch(error => {
       //     console.log("Error uploading file:")
       //     console.log(error)
       // })
   }

   onChangeCarCheckbox(e) {
       this.setState({ carChecked: e.target.value })
   }

   onChangeRealCheckbox(e) {
       this.setState({ realChecked: e.target.value })
   }

    render() {
        return (
            <div className='mint-container'>
                {this.state.loading && <Loading />}

                <div className="showcase-container">
                    <div className="showcase auto">
                        <h2 className='create-title'>Let's <span className='gimme-border'>post</span> your property</h2>
                        <p className='sub-title'>Be sure to get all of its details, including insurance and specifications 😊</p>
                    </div>
                </div>
                <div className='mint auto'>
                    <div className='right'>
                        <p className='preview-title'>Your NFT details are right here:</p>
                        <div className='item'>
                            <div className="img-placeholder">
                                <p>Your image here :)</p>
                            </div>
                            <p className='name'>{this.state.nft_name || 'A 6-bedroom house in California near the beach'}</p>
                            <p className='desc'>{this.state.nft_description || 'Amazing cinema room, 8 bathrooms, game room, and much more'}</p>
                            <p className='price'>{this.state.nft_price ? this.state.nft_price +  ' XRP' : '150K XRP'}</p>
                            <p className='owner'>
                                <img src={NFTSample} alt="Owner" />
                                <span>{this.state.creator_addr}</span>
                            </p>
                            <p className='quantity'>{this.state.nft_quantity || '30'} shares available</p>
                        </div>
                    </div>
                    <div className='left'>
                        <div className="block">
                            <label>Are you selling a classic car or real state?</label>
                            <main>
                                <div className="cbox">
                                    <input type="checkbox" value={this.state.carChecked} onChange={this.onChangeCarCheckbox} />
                                    <p>Classic Car</p>
                                </div>
                                <div className="cbox">
                                    <input type="checkbox" value={this.state.realChecked} onChange={this.onChangeRealCheckbox} />
                                    <p>Real State</p>
                                </div>
                            </main>
                        </div>
                        <div className='block'>
                            <label>Let's give a name to your property:</label>
                            <input
                                value={this.state.nft_name}
                                onChange={this.onChangeNFTName}
                                type='text'
                                placeholder='nft nameee...'
                            />
                        </div>

                        <div className='block'>
                            <label>Could you give your buyers a short description about what's contained in this property?</label>
                            <input
                                value={this.state.nft_description}
                                onChange={this.onChangeNFTDescription}
                                type='text'
                                placeholder='nft description...'
                            />
                        </div>

                        <div className='block'>
                            <label>How much is the full price of your property?</label>
                            <div className='price-info'>
                                <input
                                    value={this.state.nft_price}
                                    onChange={this.onChangeNFTPrice}
                                    type='number'
                                    placeholder='12 XRP'
                                />
                                <span className='eth-symbol'>XRP</span>
                                {this.state.nft_price !== 0 && (
                                    <span className='dollars'>(~ ${this.state.dollars})</span>
                                )}
                            </div>
                        </div>

                        <div className='block hm'>
                            <label>How many shares would you like to create?</label>
                            <div className='price-info'>
                                <input
                                    value={this.state.nft_quantity}
                                    onChange={this.onChangeNFTQuantity}
                                    type='number'
                                    placeholder='5 shares for now'
                                />
                                {this.state.nft_price !== 0 && (
                                    <span className='dollars'>Share value: (~ ${this.state.sharevalue})</span>
                                )}
                            </div>
                        </div>

                        <div className='block'>
                            <label>Upload your property files (include pictures and videos if possible)</label>
                            <div className="file-input-wrapper">
                                Upload file
                                <input
                                    onChange={this.onChangeNFTFile}
                                    type='file'
                                    placeholder='https://somewhere.com/token.jpg'
                                />
                            </div>
                        </div>

                        <div className='block'>
                            <label>Let's pick your insurance</label>
                            <section>
                                <div className="cbox">
                                    <input type="checkbox" value={this.state.carChecked} onChange={this.onChangeCarCheckbox} />
                                    <img src={GEICO} alt="Geico" />
                                </div>
                                <div className="cbox">
                                    <input type="checkbox" value={this.state.realChecked} onChange={this.onChangeRealCheckbox} />
                                    <img src={StateFarm} alt="State Farm" />
                                </div>
                            </section>
                        </div>

                        <button onClick={this.create} className='create-btn'>
                            {this.state.loading ? (
                                <span>Loading...</span>
                            ) : (
                                <span>List property</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mint
