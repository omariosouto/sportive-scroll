import EventEmitter from 'event-emitter'
import removeAllOf from 'event-emitter/all-off'
import throttle from 'lodash/throttle';
import { animateOnScroll } from './utils'
import scrollManager from './scrollManagerHandler'




export const init = () => {
    window.addEventListener('scroll', scrollManagerHandler)
}

// Bind scroll Events keeping just one scroll event
export const scrollEvents = (() => {
    const _scrollEventsEmitter = new EventEmitter()
    const _subscribers = new Map()

    const addEventToScroll = (eventInfo) => {
        const { direction } = eventInfo
        if(isValidDirection(direction)) {
            formatEventCallback(eventInfo)
            registerEvent(direction, eventInfo)
        } else {
            console.error('Please, insert an valid direction.')
        }
    }

    const removeEventFromScroll = (eventInfo) => {
        const { direction } = eventInfo
        if(isValidDirection(direction)) {
            _scrollEventsEmitter.off(direction, _subscribers.get(eventInfo));
            _subscribers.delete(eventInfo)
        } else {
            console.error('Please, insert an valid direction.')
        }
    }

    const removeAllEventsFromScroll = () => {
        removeAllOf(_scrollEventsEmitter)
        _subscribers.clear()
    }

    // Utils
    const formatEventCallback = (eventInfo) => {
        const { callback, baseElement, baseElementVisibilityPercentage, direction } = eventInfo
        const animationFunction = animateOnScroll(baseElement, callback, baseElementVisibilityPercentage, direction)
        _subscribers.set(eventInfo, throttle(animationFunction, 200))
    }
    const registerEvent = (direction, eventInfo) => {
        _scrollEventsEmitter.on(direction, _subscribers.get(eventInfo))
    }
    const isValidDirection = (direction) => {
        const isUp = direction === 'up'
        const isDown = direction === 'down'
        if(isUp || isDown) {
            return true
        }
        return false
    }

    return {
        addEventToScroll,
        removeEventFromScroll,
        removeAllEventsFromScroll,
        triggerScrollUp: () => _scrollEventsEmitter.emit('up'),
        triggerScrollDown: () => _scrollEventsEmitter.emit('down')
    }
})()

const scrollManagerHandler = scrollManager(scrollEvents)




  