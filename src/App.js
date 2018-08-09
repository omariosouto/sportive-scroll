import React, { Component, Fragment } from 'react';
import { scrollEvents, animateOnScroll } from './utils/sportiveScroll'
import { TweenMax } from 'gsap/TweenMax'

class App extends Component {

	componentDidMount() {
      // Animando 1 elemento
      // TweenMax.set(this.elementoBloco1, { opacity: 0, x: 100 })

      
      scrollEvents.addEventToScrollUp(() => {
         console.log('Scroll up')
         animateOnScroll(
            this.elementoBloco1,
            () => {
               TweenMax.staggerTo(this.elementoBloco1.children, .5, { x: 100 }, 0.25)
            },
            99)
      })
      
      // // Animando 2 elemento
      // scrollEvents.addEventToScrollDown(() => {
      //    const percent = getVisibilityPercentageOf(this.elementoBloco2)
      //    const is50PercentVisibleOrMore = percent > 50

      //    console.log('percentage 2', percent, hasScrolledOver(this.elementoBloco2))
		// 	if (hasScrolledOver(this.elementoBloco3) && is50PercentVisibleOrMore) {
		// 		TweenMax.to(this.elementoBloco3, .3, { x: 100 })
		// 	}
      // })

      // // Animando 3 elemento
      // scrollEvents.addEventToScrollDown(() => {
      //    const percent = getVisibilityPercentageOf(this.elementoBloco3)
      //    const is50PercentVisibleOrMore = percent > 50

      //    console.log('percentage 3', percent, hasScrolledOver(this.elementoBloco3), this.elementoBloco3)
		// 	if (hasScrolledOver(this.elementoBloco2) && is50PercentVisibleOrMore) {
		// 		TweenMax.to(this.elementoBloco2, .5, { x: -100 })
		// 	}
      // })
   }

   state = {
      number: 0
   }

   counter = () => {
      this.setState({
         number: this.state.number + 1
      })
   }
   

	render() {

		return (
			<Fragment>
            {this.state.number}
            <button onClick={this.counter}>INCREMENT</button>
				{/* Fazer um video de fundo com as notificações entrando */}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 28">
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

				{/* Fazer stagger de uma lista de itens com animação doida antes no scroll */}
			</Fragment>
		);
	}
}

export default App;
