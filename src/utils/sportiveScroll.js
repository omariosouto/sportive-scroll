import EventEmitter from 'event-emitter'
import allOf from 'event-emitter/all-off'
import throttle from 'lodash/throttle';

export const init = () => {
    window.addEventListener('scroll', scrollManager)
}

// Bind scroll Events keeping just one scroll event
export const scrollEvents = (() => {
    const _scrollEventsEmitter = new EventEmitter()
    const _subscribers = new Map()

    const addEventToScroll = (eventInfo) => {
        const { direction } = eventInfo

        formatEventCallback(eventInfo)
        registerEvent(direction, eventInfo)
    }
    const removeEventFromScroll = (eventInfo) => {
        const { direction } = eventInfo

        _scrollEventsEmitter.off(direction, _subscribers.get(eventInfo));
        _subscribers.delete(eventInfo)
    }

    const removeAllEventsFromScroll = () => {
        console.log('Remove all')
        allOf(_scrollEventsEmitter)
        _subscribers.clear()
        console.log(_scrollEventsEmitter)
        console.log(_subscribers)
    }

    // Utils
    const formatEventCallback = (eventInfo) => {
        const { callback, baseElement, baseElementVisibilityPercentage } = eventInfo
        const animationFunction = animateOnScroll(baseElement, callback, baseElementVisibilityPercentage)
        _subscribers.set(eventInfo, throttle(animationFunction, 200))
    }
    const registerEvent = (direction, eventInfo) => {
        _scrollEventsEmitter.on(direction, _subscribers.get(eventInfo))
    }


    return {
        addEventToScroll,
        removeEventFromScroll,
        removeAllEventsFromScroll,
        triggerScrollUp: () => _scrollEventsEmitter.emit('up'),
        triggerScrollDown: () => _scrollEventsEmitter.emit('down')
    }
})()

// Scroll Manager (this is the unique addEventListener)
let lastScrollTop = 0;
export function scrollManager() {
    const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
    const isScrolllingDown = scrollTopPosition > lastScrollTop

    if (isScrolllingDown) {
        scrollEvents.triggerScrollDown()
    } else {
        scrollEvents.triggerScrollUp()
    }
    lastScrollTop = scrollTopPosition
}


// ==== Utils (ways to check if element should animate or something) ============================ 
export function hasScrolledOver(element, percentage) {
    if(element.getBoundingClientRect().top < window.innerHeight) {
      return true
    } else {
      return false
    }
}

export function getVisibilityPercentageOf(element) {
    let percent = 0;
    const screenTop = document.documentElement.scrollTop;
    const screenBottom = document.documentElement.scrollTop + window.innerHeight;
    const boxTop = element.offsetTop;
    const boxHeight = element.getBoundingClientRect().height;
    const boxBottom = boxTop + boxHeight;

    if (boxTop > screenTop) {
        if (boxBottom < screenBottom) {
            percent  = 100
        } else if (boxTop < screenBottom) {
            //partial (bottom)
            percent = Math.round((screenBottom - boxTop) / boxHeight * 100);
        }
    } else if (boxBottom > screenTop) {
        //partial (top)
        percent = Math.round((boxBottom - screenTop) / boxHeight * 100);
    }
    return percent
}

export const animateOnScroll = (element, animateCallback, visibilityPercentageToShow) => {
    return () => {
        const percent = getVisibilityPercentageOf(element)
        const isVisible = percent > 0
        const is50PercentVisibleOrMore = percent > visibilityPercentageToShow
    
        if(isVisible && is50PercentVisibleOrMore) {
           console.log(`mostra passou de ${visibilityPercentageToShow}%`)
           animateCallback()
        }
        if(!isVisible && hasScrolledOver(element)) {
           console.log(`mostra passou passou`)
           animateCallback()
        }
    }
 }