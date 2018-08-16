import React, { Component, Fragment } from 'react'
import { Slider } from './components/Slider';

export class Home extends Component {

    state = {
        sliderItems: [
            { title: 'cleide' },
            { title: 'Second Title' }
        ]
    }

    removeItem = () => {
    }

    render() {
        return (
            <Fragment>
                <Slider>
                    {
                        this.state.sliderItems.map((item, index) =>
                            <div key={index}>
                                Slide { item.title }
                            </div>
                        )
                    }
                </Slider>

            </Fragment>
        )
    }
}

