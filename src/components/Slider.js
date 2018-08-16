import React, { PureComponent } from 'react'
import { TweenMax, TimelineMax } from 'gsap'

import './Slider.css'

export class Slider extends PureComponent {

    state = {
        currentItemActive: 0
    }

    slideItems = new Map()

    componentDidMount() {
        this.init()
    }

    init = () => {
        console.log('initialize and setup slider', Array.from(this.slideItems))
        const allElements = Array.from(this.slideItems.values())

        TweenMax.set(allElements, {
            left: '-100vw',
            scale: .8
        })

        this.animateIn(this.state.currentItemActive)
    }

    next = () => {
        const { currentItemActive } = this.state
        const nextItem = currentItemActive !== this.slideItems.size - 1 ? currentItemActive + 1 : 0
        this.animateOut(currentItemActive, nextItem)

        this.setState({
            currentItemActive: nextItem
        })
    }

    prev = () => {
        // this.setState({
        //     currentItemActive: this.state.currentItemActive - 1
        // }, () => {
            
        // })
    }

    animateIn = (itemIndex) => {
        const elementWillAnimatIn = this.slideItems.get(itemIndex)
        const timeline = new TimelineMax()

        TweenMax.set(elementWillAnimatIn, {
            left: '-100vw',
            scale: .8
        })

        timeline
            .to(elementWillAnimatIn, .8, {
                left: '0'
            })
            .to(elementWillAnimatIn, .5, {
                transformOrigin: 'center center',
                scale: 1
            })
    }

    animateOut = (itemIndex, nextIndex) => {
        // console.log('animateOut: itemIndex', itemIndex)
        // console.log('animateOut: nextIndex', nextIndex)

        const elementWillAnimatIn = this.slideItems.get(itemIndex)
        const timeline = new TimelineMax()

        timeline
        .to(elementWillAnimatIn, .5, {
            transformOrigin: 'center center',
            scale: .9
        })
        .to(elementWillAnimatIn, 1, {
            left: '100vw',
            // onComplete: () => this.animateIn(nextIndex)
        })
        .call(this.animateIn, [nextIndex], this, '-=1')
    }


    renderSlideItems = () => {
        const children = this.props.children
        const currentItemActive = this.state.currentItemActive

        return React.Children.map(children, (child, index) => {
            const clonedChild = React.cloneElement(child, {
                className: `slider__item ${currentItemActive}`,
                ref: (elementFromDom) => {
                    this.slideItems.set(index, elementFromDom)
                }
            })
            return clonedChild 
        })
    }
     

    render() {
        return (
            <div className='slider'>
                
                { this.renderSlideItems() }

                <button className="prev" onClick={this.prev}>
                    Prev
                </button>
                <button className="next" onClick={this.next}>
                    Next
                </button>
            </div>
        )
    }
}  
