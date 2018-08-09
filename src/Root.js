import React, { Component } from 'react';
import App from './App'
import { scrollManager } from './utils/sportiveScroll'

export default class Root extends Component {
    componentDidMount() {
        // this should never load on SSR
        window.onscroll = scrollManager 
    }

    render() {
        return <App />
    }
}