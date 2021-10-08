import React from 'react'
import { Router } from '@reach/router'

import Home from './components/home/home'
import Header from './components/header/header'
import Detail from './components/detail/detail'

import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Router>
                    <Home path="/home/:type" />
                    <Detail path="/token/:id" />
                </Router>
            </div>
        )
    }
}

export default App
