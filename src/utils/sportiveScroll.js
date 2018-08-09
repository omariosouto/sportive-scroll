import EventEmitter from 'event-emitter'
import throttle from 'lodash/throttle';

// Bind scroll Events keeping just one scroll event
export const scrollEvents = (() => {
    const _scrollEvents = new EventEmitter()
    const subscribers = new Map()

    const addEventToScrollDown = (callback) => {
        subscribers.set(callback, throttle(callback, 200))
        _scrollEvents.on('scrollDown', subscribers.get(callback))
    }
    const removeEventFromScrollDown = (callback) => {
        _scrollEvents.off('scrollDown', subscribers.get(callback));
        subscribers.delete(callback)
    }

    const addEventToScrollUp = (callback) => {
        subscribers.set(callback, throttle(callback, 200))
        _scrollEvents.on('scrollUp', subscribers.get(callback))
    }
    const removeEventFromScrollUp = (callback) => {
        _scrollEvents.off('scrollUp', subscribers.get(callback));
        subscribers.delete(callback)
    }

    return {
        addEventToScrollDown,
        addEventToScrollUp,
        removeEventFromScrollDown,
        removeEventFromScrollUp,
        triggerScrollUp: () => _scrollEvents.emit('scrollUp'),
        triggerScrollDown: () => _scrollEvents.emit('scrollDown')
    }
})()

// Scroll Manager (addEventListener)
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


// Utils (ways to check if element should animate or something)
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
    console.log(percent)
    return percent
}

export const animateOnScroll = (element, animateCallback, visibilityPercentageToShow) => {
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