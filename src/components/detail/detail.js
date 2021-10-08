import React from 'react'
import Loading from '../loading/loading'

import './detail.css'

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
        return (
            <div className="detail-container">
                {this.state.loading && <Loading />}
                <div className="detail auto"></div>
            </div>
        )
    }
}

export default Detail
