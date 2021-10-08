import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

import './home.css'

import ArrowRight from '../../assets/arrow-right.svg'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // @warning: production only:
            // listings: [].
            // @warning: development only:
            carListings: [
                {}
            ],
            realStateListings: [

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
                    <ClassicCarsHome />
                ) : (
                    <RealStateHome />
                )}
            </div>
        )
    }
}

class ClassicCarsHome extends React.Component {
    render() {
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
                    <div className="listings">
                    </div>
                </div>
            </div>
        )
    }
}

class RealStateHome extends React.Component {
    render() {
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
                    <div className="listings">
                    </div>
                </div>
            </div>
        )
    }
}

class CarThumbnail extends React.Component {
    render() {
        return (
            <div className="car-thumbnail">
            </div>
        )
    }
}

class RealStateThumbnail extends React.Component {
    render() {
        return (
            <div className="real-state-thumbnail">
            </div>
        )
    }
}

export default Home
