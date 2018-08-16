import React, { Component, Fragment } from 'react';
import { scrollEvents } from './utils/sportiveScroll'
import { TweenMax } from 'gsap/TweenMax'

class App extends Component {

	componentDidMount() {
      // Animando 1 elemento
      const block1EventObj = {
         direction: 'down',
         baseElement: this.elementoBloco1,
         baseElementVisibilityPercentage: 99,
         callback: () => {
            console.log('Evento 1')
            TweenMax.staggerTo(this.elementoBloco1.children, .5, { x: 100 }, 0.25)
         }
      }
      scrollEvents.addEventToScroll(block1EventObj)

      // Animando 2 elemento
      scrollEvents.addEventToScroll({
         direction: 'down',
         baseElement: this.elementoBloco2,
         baseElementVisibilityPercentage: 70,
         callback: () => {
			console.log('Evento 2')
            TweenMax.staggerTo(this.elementoBloco2.children, .5, { x: 100 }, 0.25)
         }
	  })
	  
	  // Animando 3 elemento
	  TweenMax.to(this.elementoBloco3, 2 , { rotation: -720, scale: 0 })
      scrollEvents.addEventToScroll({
		direction: 'down',
		baseElement: this.elementoBloco3,
		baseElementVisibilityPercentage: 70,
		callback: () => {
		   console.log('Evento 3')
		   TweenMax.to(this.elementoBloco3, 2 , { rotation: 720, scale: 1 })
		   TweenMax.staggerTo(this.elementoBloco3.children, .5, { x: 100 }, 0.25)
		}
	 })

      // Animando 4 elemento
      scrollEvents.addEventToScroll({
		direction: 'down',
		baseElement: this.elementoBloco4,
		baseElementVisibilityPercentage: 70,
		callback: () => {
		   console.log('Evento 4')
		   TweenMax.staggerTo(this.elementoBloco4.children, .5, { x: 100 }, 0.25)
		}
	 })
   }

   componentWillUnmount() {
      // Remove All Events
      scrollEvents.removeAllEventsFromScroll()
   }


   state = {
      number: 100
   }

   counter = () => {
      this.setState({
         number: this.state.number + 30
      })
   }
   

	render() {

		return (
			<Fragment>
            {this.state.number}
            <button onClick={this.counter}>INCREMENT</button>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style={ { width: this.state.number } }>
					<text x="0" y="15" fill="red">Olá</text>
				</svg>

				<div className="block" ref={(elementoBloco1) => this.elementoBloco1 = elementoBloco1}>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
				</div>

				<div className="block" ref={(elementoBloco2) => this.elementoBloco2 = elementoBloco2}>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
				</div>

				<div className="block" ref={(block3) => this.elementoBloco3 = block3}>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
				</div>

				<div className="block" ref={(block4) => this.elementoBloco4 = block4}>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
					<p>lorem osadusah sdhuh uasdsua </p>
				</div>
			</Fragment>
		);
	}
}

export default App;
