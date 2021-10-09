import React from 'react'

import './loading.css'

class Loading extends React.Component {
    render() {
        return (
            <div className="loading-container">
                <div className="loading">Processing your request :)</div>
            </div>
        )
    }
}

export default Loading
