import { scrollEvents } from '../../utils/sportiveScroll'
import { TweenMax, TimelineMax } from 'gsap/TweenMax'

 

const init = (domElementRefs) => {
    const { block1, block5, block8, block10 } = domElementRefs

    // block1
    TweenMax.set(block1, { xPercent: -100, rotation: 360 })
    scrollEvents.addEventToScroll({
        direction: 'down',
        baseElement: block1,
        baseElementVisibilityPercentage: 50,
        callback: () => {
           console.log('block1')
           const tl = new TimelineMax()

           tl
           .to(block1, .5, { xPercent: 0 })
           .to(block1, 1, { rotation: 0 })
        }   
    })

    // block5
    scrollEvents.addEventToScroll({
        direction: 'down',
        baseElement: block5,
        baseElementVisibilityPercentage: 50,
        callback: function() {
           console.log('Evento 5')
           
           block5.classList.add('block--visible')
        }   
    })

    // block8
    TweenMax.set(block8, { xPercent: -100, scale: .5 })
    scrollEvents.addEventToScroll({
        direction: 'down',
        baseElement: block8,
        baseElementVisibilityPercentage: 50,
        callback: () => {
           console.log('Evento 8')
           const tl = new TimelineMax()

           tl
           .to(block8, .5,{ xPercent: 0 })
           .to(block8, .5,{ scale: 1 })
        }   
    })

    // block10
    TweenMax.set(block10, { xPercent: 100 })
    TweenMax.set(block10.children, { opacity: 0 })
    scrollEvents.addEventToScroll({
        direction: 'down',
        baseElement: block10,
        baseElementVisibilityPercentage: 50,
        callback: () => {
           console.log('Evento 10')
           const tl = new TimelineMax()

           tl
           .to(block10, .5,{ xPercent: 0 })
           .staggerTo(block10.children, .5, { opacity: 1 }, 0.25)
        }   
    })


    scrollEvents.triggerScrollUpAndDown()
}

const removeAll = () => {
    scrollEvents.removeAllEventsFromScroll()
}

export default {
    init,
    removeAll
}