import React, { Component, Fragment } from 'react'
import homeAnimations from './homeAnimations'
import './home.css'

export class Home extends Component {
    state = {
        number: 0
    }

    componentDidMount() {
        homeAnimations.init(this.refs)
    }

    componentWillUnmount() {
        homeAnimations().removeAll()
    }

    updateState = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    render() {
        console.log('render')
        return(
            <Fragment>
                {
                    [1,2,3,4,5,6,7,8,9,10].map((itemAtual) => {
                        return (
                            <div ref={`block${itemAtual}`} className={`block block${itemAtual}`} key={itemAtual}>
                                <h2>Bloco: { itemAtual }</h2>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>lorem lorem lorem lorem lorem</p>
                                <p>State value:{ this.state.number }</p>
                            </div>
                        )
                    })
                    
                }
                <button className="btn__changeState" onClick={this.updateState}>Changing State!!!</button>

                <div className="embed-responsive embed-responsive-16by9">
                    <div className="layer" style={ { position: 'relative', zIndex: '10' } }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style={ { width: '20%', margin: '0 auto', display: 'block' } }>
                            <rect style={ { width: '100%' } } fill="gold"></rect>
                            <text x="5" y="15" fill="white">0x0</text>
                        </svg>

                    </div>  
                    <iframe title={'Teste'} className="embed-responsive-item" src="https://www.youtube.com/embed/NVSY1LFhbwM" frameBorder="0" allow="autoplay; encrypted-media" />
                </div>
            </Fragment>
        )
    }
}