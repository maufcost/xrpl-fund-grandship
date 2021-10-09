import React from 'react'
import Loading from '../loading/loading'

import './detail.css'

import Pin from '../../assets/pin.svg'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 2800)
    }

    render() {
        const type = this.props.location.state.type
        const listing = this.props.location.state.listing

        let otherImgs = []
        if (listing.additionalImgs) {
            otherImgs = listing.additionalImgs.map((img, ix) => (
                <div className="additional-img-wrapper" key={ix}>
                    <img src={img} alt="Listing image" />
                </div>
            ))
        }

        return (
            <div className="detail-container">
                {this.state.loading && <Loading />}
                <div className="detail auto">
                    <div className="left">
                        <div className="big-img-wrapper">
                            <img src={listing.img} alt="Listing" />
                        </div>
                        <div className="other-imgs">{otherImgs}</div>
                    </div>
                    <div className="right">
                        <div className="row-1">
                            <p className="name">{listing.name}</p>
                            <p className="location">
                                <img src={Pin} alt={listing.location} />
                                {listing.location}
                            </p>
                        </div>
                        <div className="row-2">
                            <div className="price">
                                <p className="xrp">{listing.xrp} XRP</p>
                                <p className="share-price">(~${listing.sharePrice})</p>
                            </div>
                            <span className="full-price">Full Price: ${listing.fullPrice}</span>
                        </div>
                        <span className="share-type">{listing.shareType}</span>
                        <p className="specs">{listing.specs}</p>
                        <div>
                            <hr />
                            <button className="s">Send question to seller</button>
                            <button className="s">See current owners</button>
                            <button className="s">See past owners</button>
                            <button className="s">Insurance inquiries</button>
                        </div>
                        <button className="p x">Purchase</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail
