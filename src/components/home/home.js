import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'
import { getListings } from '../../firebase'

import './home.css'

// General static assets
import ArrowRight from '../../assets/arrow-right.svg'
import Pin from '../../assets/pin.svg'
import CarShowcase from '../../assets/dg.jpeg'
import HouseShowcase from '../../assets/house-showcase.jpeg'

// Sample classic car listings
import CarDodgeCharger1968 from '../../assets/classic-cars-sample/1968-dodge-charger.jpeg'
import Corvette571 from '../../assets/classic-cars-sample/cv57-1.jpeg'
import Corvette572 from '../../assets/classic-cars-sample/cv57-2.jpeg'
import Corvette573 from '../../assets/classic-cars-sample/cv57-3.jpeg'
import Corvette574 from '../../assets/classic-cars-sample/cv57-4.jpeg'
import Corvette575 from '../../assets/classic-cars-sample/cv57-5.jpeg'
import Corvette576 from '../../assets/classic-cars-sample/cv57-6.jpeg'
import Corvette64 from '../../assets/classic-cars-sample/cv64.jpeg'
import MustangShelby from '../../assets/classic-cars-sample/mustang-shelby-gt-350-65.jpeg'
import Maverick75 from '../../assets/classic-cars-sample/mv.jpeg'
import Maverick275 from '../../assets/classic-cars-sample/mv2.jpeg'
import ShelbyCobra from '../../assets/classic-cars-sample/shelby-cobra-1965.jpeg'

// Sample real state listings
import House1 from '../../assets/real-state-sample/house1.jpeg'
import House2 from '../../assets/real-state-sample/house2.png'
import House3 from '../../assets/real-state-sample/house3.jpeg'
import House4 from '../../assets/real-state-sample/house4.jpeg'
import House5 from '../../assets/real-state-sample/house5.jpeg'
import House6 from '../../assets/real-state-sample/house6.jpeg'
import House71 from '../../assets/real-state-sample/house71.jpeg'
import House72 from '../../assets/real-state-sample/house72.jpeg'
import House73 from '../../assets/real-state-sample/house73.jpeg'
import House74 from '../../assets/real-state-sample/house74.jpeg'
import House75 from '../../assets/real-state-sample/house75.jpeg'
import House76 from '../../assets/real-state-sample/house76.jpeg'

// https://youtu.be/1JayNoKqdl4

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // @warning: production only:
            // listings: [].
            // @warning: development only:
            carListings: [
                {
                    img: CarDodgeCharger1968,
                    name: "Dodge Charger 1968",
                    location: "USA",
                    fullPrice: "84,000",
                    sharePrice: "21,000",
                    shareType: "1/4 of total cost",
                    xrp: "19,695.22"
                },
                {
                    img: Corvette571,
                    additionalImgs: [
                        Corvette571, Corvette572,
                        Corvette573, Corvette574,
                        Corvette575, Corvette576
                    ],
                    name: "Chevrolet Corvette 1957",
                    location: "USA",
                    fullPrice: "119,000",
                    sharePrice: "19,830",
                    shareType: "1/6 of total cost",
                    xrp: "18,597.11"
                },
                {
                    img: Maverick275,
                    name: "Ford Maverick 1975",
                    location: "Brazil",
                    fullPrice: "36,500",
                    sharePrice: "9,125",
                    shareType: "1/4 of total cost",
                    xrp: "8,557.02"
                },
                {
                    img: MustangShelby,
                    name: "Mustang Shelby",
                    location: "Berlin",
                    fullPrice: "73,260",
                    sharePrice: "9,157.5",
                    shareType: "1/8 of total cost",
                    xrp: "9,430.12"
                },
                {
                    img: Maverick75,
                    name: "For Maverick 1975",
                    location: "Chile",
                    fullPrice: "42,910",
                    sharePrice: "7,151.67",
                    shareType: "1/6 of total cost",
                    xrp: "8,587.5"
                },
                {
                    img: ShelbyCobra,
                    name: "Shelby Cobra 1960s",
                    location: "Mexico",
                    fullPrice: "1,499,000",
                    sharePrice: "74,950",
                    shareType: "1/20 of total cost",
                    xrp: "70,292.2"
                },
                {
                    img: Corvette64,
                    name: "Chevrolet Corvette 1964",
                    location: "USA",
                    fullPrice: "82,360",
                    sharePrice: "13,726",
                    shareType: "1/6 of total cost",
                    xrp: "12,873"
                },
            ],
            realStateListings: [
                {
                    img: House1,
                    name: "3-bedroom House",
                    location: "Canada",
                    sharePrice: "625,000",
                    shareType: "1/8 of total cost",
                    xrp: "582K"
                },
                {
                    img: House2,
                    name: "4-bedroom House Close to the Beach",
                    location: "USA",
                    sharePrice: "22,500",
                    shareType: "1/4 of total cost",
                    xrp: "20K"
                },
                {
                    img: House3,
                    name: "Downtown House",
                    location: "Brazil",
                    sharePrice: "350,000",
                    shareType: "1/8 of total cost",
                    xrp: "326K"
                },
                {
                    img: House4,
                    name: "Touristic Area - House and Studio",
                    location: "Bali",
                    sharePrice: "268,000",
                    shareType: "1/6 of total cost",
                    xrp: "250K"
                },
                {
                    img: House5,
                    name: "Newly Built House by the Beach",
                    location: "Greece",
                    sharePrice: "800,000",
                    shareType: "1/10 of total cost",
                    xrp: "745K"
                },
                {
                    img: House71,
                    additionalImgs:[
                        House71, House72,
                        House73, House74,
                        House75, House76
                    ],
                    name: "5-bedroom house in Gated Condo",
                    location: "USA",
                    specs: "5 Bedrooms, 7 Bathrooms. You will have full access to this house for 60 days per year.",
                    fullPrice: "3,000,000",
                    sharePrice: "500,000",
                    shareType: "1/6 of total cost",
                    xrp: "466K"
                },
                {
                    img: House6,
                    name: "Recently Renovated 2-bedroom",
                    location: "Greece",
                    sharePrice: "500,000",
                    shareType: "1/4 of total cost",
                    xrp: "468K"
                },
            ],
            hotWalletAddress: ''
        }
    }

    async componentDidMount() {
        // Retrieving listings (testing mode)
        await getListings()
        .then(ls => {
            this.setState({
                carListings: ls.carListings,
                realStateListings: ls.realStateListings
            })
        })
        .catch(error => console.log(error))

        // Retrieving user's hot wallet address
        const apiURL = "http://localhost:5000/get-hot-wallet-addr"
        axios({
            method: "get",
            url: apiURL,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            // handle success
            console.log(response);
            setTimeout(() => {
                // To prevent multiple subsequent requests to our API.
                this.setState({ loading: false, addr: response.data })
            }, 2000)
        })
        .catch(error => {
            // handle error
            console.log(error);
            setTimeout(() => {
                console.log(error)
                // To prevent multiple subsequent requests to our API.
                this.setState({ loading: false })
            }, 2000)
        });
    }

    render() {
        const showCarsHome = this.props.type == 'classic-cars'
        return (
            <div className="home-container">
                {showCarsHome ? (
                    <ClassicCarsHome listings={this.state.carListings} />
                ) : (
                    <RealStateHome listings={this.state.realStateListings} />
                )}
            </div>
        )
    }
}

class ClassicCarsHome extends React.Component {
    render() {
        const { listings } = this.props

        // Rendering thumbnails based on listings
        const ls = listings.map((l, ix) => <CarThumbnail listing={l} key={ix} />)

        return (
            <div className="home-classic-cars-container">
                <div className="showcase-container">
                    <div className="showcase auto">
                        <div className="left">
                            <h1>Own and invest in classic cars for a fraction of the cost</h1>
                            <p>With XPRL, you can own, invest, and make money with classic cars around the globe</p>
                            <button>
                                Understand how
                                <img src={ArrowRight} alt="Understand how" />
                            </button>
                        </div>
                        <div className="right">
                            <img src={CarShowcase} alt="Own and invest in classic cars for a fraction of the cost" />
                        </div>
                    </div>
                </div>
                <div className="home-classic-cars auto">
                    <div className="title-container">
                        <h2>Browse classic cars</h2>
                        <span className="new">new</span>
                    </div>
                    <div className="listings">{ls}</div>
                </div>
            </div>
        )
    }
}

class RealStateHome extends React.Component {
    render() {
        const { listings } = this.props

        // Rendering thumbnails based on listings
        const ls = listings.map((l, ix) => <RealStateThumbnail listing={l} key={ix} />)

        return (
            <div className="home-real-state-container">
                <div className="showcase-container">
                    <div className="showcase rs auto">
                        <div className="left">
                            <h1>Shared home ownership made easy with the XRP Ledger</h1>
                            <p>Own real state for just a fraction of the cost</p>
                            <button>
                                Understand how
                                <img src={ArrowRight} alt="Understand how" />
                            </button>
                        </div>
                        <div className="right">
                            <img src={HouseShowcase} alt="Own real state for just a fraction of the cost" />
                        </div>
                    </div>
                </div>
                <div className="home-real-state auto">
                    <div className="title-container">
                        <h2>Browse vacation homes and apartments</h2>
                        <span className="new">New homes were just added</span>
                    </div>
                    <div className="listings">{ls}</div>
                </div>
            </div>
        )
    }
}

class CarThumbnail extends React.Component {
    render() {
        const { listing } = this.props
        const state = {
            state: {
                type: 'classic-car',
                listing
            }
        }

        // <p className="">{listing.fullPrice}</p>
        return (
            <div className="thumbnail" onClick={() => navigate("/detail/classic-cars/token/98163", state)}>
                <div className="img-wrapper">
                    <img src={listing.img} alt="Listing" />
                </div>
                <div className="content">
                    <div className="row-1">
                        <p className="name">{listing.name}</p>
                        <p className="location">
                            <img src={Pin} alt={listing.location} />
                            {listing.location}
                        </p>
                    </div>
                    <div className="row-2">
                        <p className="share-price">~${listing.sharePrice}</p>
                        <p className="share-type">{listing.shareType}</p>
                    </div>
                    <p className="xrp">{listing.xrp} XRP</p>
                </div>
            </div>
        )
    }
}

class RealStateThumbnail extends React.Component {
    render() {
        const { listing } = this.props
        const state = {
            state: {
                type: 'real-state',
                listing
            }
        }

        // <p className="">{listing.fullPrice}</p>
        return (
            <div className="thumbnail" onClick={() => navigate("/detail/real-state/token/738912", state)}>
                <div className="img-wrapper">
                    <img src={listing.img} alt="Listing" />
                </div>
                <div className="content">
                    <div className="row-1">
                        <p className="name">{listing.name}</p>
                        <p className="location">
                            <img src={Pin} alt={listing.location} />
                            {listing.location}
                        </p>
                    </div>
                    <div className="row-2">
                        <p className="share-price">~${listing.sharePrice}</p>
                        <p className="share-type">{listing.shareType}</p>
                    </div>
                    <p className="specs">{listing.specs}</p>
                    <p className="xrp">{listing.xrp} XRP</p>
                </div>
            </div>
        )
    }
}

export default Home
