import React from 'react'
import { Router } from '@reach/router'

import Home from './components/home/home'
import Mint from './components/mint/mint'
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
                    <Mint path="/mint" />
                    <Detail path="/detail/:type/token/:id" />
                </Router>
            </div>
        )
    }
}

export default App
