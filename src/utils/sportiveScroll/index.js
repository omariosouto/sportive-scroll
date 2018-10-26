import EventEmitter from 'event-emitter'
import removeAllOf from 'event-emitter/all-off'
import { prepareEventHandlerForScroll } from './utils'
import scrollManager from './scrollManagerHandler'

// Gerenciador de eventos up/down
export const scrollEvents = (() => {
    const _scrollEventsEmitter = new EventEmitter()
    const _eventHandlers = new Map()

    const addEventToScroll = (eventInfo) => {
        const { direction } = eventInfo
        if(isValidDirection(direction)) {
            prepareEventCallback(eventInfo)
            registerEvent(direction, eventInfo)
        } else {
            console.error('Please, insert an valid direction, "up" or "down".')
        }
    }

    const removeEventFromScroll = (eventInfo) => {
        const { direction } = eventInfo
        if(isValidDirection(direction)) {
            unregisterEvent(direction, eventInfo)
        } else {
            console.error('Please, insert an valid direction, "up" or "down".')
        }
    }

    const removeAllEventsFromScroll = () => {
        removeAllOf(_scrollEventsEmitter)
        _eventHandlers.clear()
    }

    // Utils
    const prepareEventCallback = (eventInfo) => {
        const { callback, baseElement, baseElementVisibilityPercentage, direction } = eventInfo
        const eventHandlerPrepared = prepareEventHandlerForScroll(baseElement, callback, baseElementVisibilityPercentage, direction)
        _eventHandlers.set(eventInfo, eventHandlerPrepared)
    }

    const registerEvent = (direction, eventInfo) => {
        _scrollEventsEmitter.on(direction, _eventHandlers.get(eventInfo))
    }
    const unregisterEvent = (direction, eventInfo) => {
        _scrollEventsEmitter.off(direction, _eventHandlers.get(eventInfo));
        _eventHandlers.delete(eventInfo)
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
        triggerScrollDown: () => _scrollEventsEmitter.emit('down'),
        triggerScrollUpAndDown: () => {
            _scrollEventsEmitter.emit('down')
            _scrollEventsEmitter.emit('up')
        }
    }
})()

const scrollManagerHandler = scrollManager(scrollEvents)

export const init = () => {
    window.addEventListener('scroll', scrollManagerHandler)
}


  