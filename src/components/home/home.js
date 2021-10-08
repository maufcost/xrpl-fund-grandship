import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

import './home.css'

// General static assets
import ArrowRight from '../../assets/arrow-right.svg'
import Pin from '../../assets/pin.svg'

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
                    xrp: "7,818.22"
                },
                {
                    img: Corvette571,
                    additionalImgs: [
                        Corvette571, Corvette572,
                        Corvette573, Corvette574,
                        Corvette575, Corvette576
                    ],
                    name: "Chevrolet Corvette 1957",
                    location: "Berlin",
                    fullPrice: "119,000",
                    sharePrice: "19,830",
                    shareType: "1/6 of total cost",
                    xrp: "110,758.11"
                },
                {
                    img: Maverick275,
                    name: "Ford Maverick 1975",
                    location: "Brazil",
                    fullPrice: "36,500",
                    sharePrice: "9,125",
                    shareType: "1/4 of total cost",
                    xrp: "33,972.02"
                },
                {
                    img: MustangShelby,
                    name: "Mustang Shelby",
                    location: "USA",
                    fullPrice: "73,260",
                    sharePrice: "9,157.5",
                    shareType: "1/8 of total cost",
                    xrp: "68,186.04"
                },
                {
                    img: Maverick75,
                    name: "For Maverick 1975",
                    location: "Chile",
                    fullPrice: "42,910",
                    sharePrice: "7,151.67",
                    shareType: "1/6 of total cost",
                    xrp: "39,938.07"
                },
                {
                    img: ShelbyCobra,
                    name: "Shelby Cobra 1960s",
                    location: "Mexico",
                    fullPrice: "1,499,000",
                    sharePrice: "74,950",
                    shareType: "1/20 of total cost",
                    xrp: "1,395,179.84"
                },
                {
                    img: Corvette64,
                    name: "Chevrolet Corvette 1964",
                    location: "USA",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
            ],
            realStateListings: [
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
                {
                    img: "",
                    name: "",
                    location: "",
                    specs: "",
                    fullPrice: "82,360",
                    sharePrice: "13,726.67",
                    shareType: "1/6 of total cost",
                    xrp: "76,655.78"
                },
            ],
            hotWalletAddress: ''
        }
    }

    componentDidMount() {
        // Retrieving listings

        // Retrieving user's hot wallet address
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
        const ls = listings.map((l, ix) => <CarThumbnail listing={l} />)

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
        const ls = listings.map((l, ix) => <RealStateThumbnail listing={l} />)

        return (
            <div className="home-real-state-container">
                <div className="showcase-container">
                    <div className="showcase auto">
                        <div className="left">
                            <h1>Own homes for just a fraction of the cost</h1>
                            <p>Shared home ownership is now even easier with the XRP Ledger</p>
                            <button>
                                Understand how
                                <img src={ArrowRight} alt="Understand how" />
                            </button>
                        </div>
                        <div className="right">
                        </div>
                    </div>
                </div>
                <div className="home-real-state auto">
                    <div className="title-container">
                        <h2>Browse vacation homes and apartments</h2>
                        <span className="new">new</span>
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

        // <p className="">{listing.fullPrice}</p>
        return (
            <div className="thumbnail">
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

        // <p className="">{listing.fullPrice}</p>
        return (
            <div className="thumbnail">
                <div className="img-wrapper">
                    <img src={listing.img} alt="Listing" />
                </div>
                <div className="content">
                    <div className="row-1">
                        <p className="name">{listing.name}</p>
                        <p className="location">{listing.location}</p>
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
