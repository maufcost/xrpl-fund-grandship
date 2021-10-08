import React from 'react'
import { navigate } from '@reach/router'

import './header.css'

import CheckMark from '../../assets/check-mark.svg'

class Header extends React.Component {
    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <p className="logo" onClick={() => navigate("/")}>
                        <img src={null} alt={"BUSINESS NAME"} />
                    </p>
                    <div className="nav">
                        <a href="/">Explore</a>
                        <a href="/home/real-state">Real State</a>
                        <a href="/home/classic-cars">Classic cars</a>
                        <a href="/mint">Post Listing</a>
                    </div>
                    <a href="/">
                        Wallet Connected
                        <img src={CheckMark} alt="Wallet Connected" />
                    </a>
                </div>
            </div>
        )
    }
}

export default Header
