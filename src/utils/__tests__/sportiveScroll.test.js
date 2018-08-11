import $ from 'jquery'
import * as sportiveScroll from '../sportiveScroll'

document.body.innerHTML = `
<style>
    .elemento {
        width: 1000px;
        height: 250px;
    }
</style>

<div class="elemento elemento1"></div>

<div class="elemento elemento2"></div>

<div class="elemento elemento3"></div>

<div class="elemento elemento4"></div>
`

const block2EventObj = {
    direction: 'down',
    baseElement: $('.elemento2').get(0),
    baseElementVisibilityPercentage: 2,
    callback: () => {
        console.logging('Elemento 2')
    }
}

const block3EventObj = {
    direction: 'up',
    baseElement: $('.elemento3').get(0),
    baseElementVisibilityPercentage: 3,
    callback: () => {
        console.log('Elemento 3')
        console.logging('Elemento 3')
    }
}
const block4EventObj = {
    direction: 'down',
    baseElement: $('.elemento4').get(0),
    baseElementVisibilityPercentage: 4,
    callback: () => {
        console.logging('Elemento 4')
    }
}

describe('# sportiveScroll', () => {
    beforeAll(() => {
        // Initializing Scroll Events
        sportiveScroll.init()
    });
    beforeEach(() => {
        global.console.logging = jest.fn()
        sportiveScroll.scrollEvents.removeAllEventsFromScroll()
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 1000,
                height: 250,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        });
    });
    
    describe('# scrollEvents', () => {
        test('addEventToScroll', () => {
            sportiveScroll.scrollEvents.addEventToScroll(block2EventObj)
            sportiveScroll.scrollEvents.triggerScrollDown()
            expect(global.console.logging).toHaveBeenCalledWith('Elemento 2')
        });

        test('removeEventFromScroll', () => {
            sportiveScroll.scrollEvents.addEventToScroll(block4EventObj)
            sportiveScroll.scrollEvents.addEventToScroll(block2EventObj)
            sportiveScroll.scrollEvents.removeEventFromScroll(block2EventObj)
            
            sportiveScroll.scrollEvents.triggerScrollDown()

            expect(global.console.logging).toHaveBeenLastCalledWith('Elemento 4')
        });

        test('removeAllEventsFromScroll', () => {
            sportiveScroll.scrollEvents.addEventToScroll(block4EventObj)
            sportiveScroll.scrollEvents.addEventToScroll(block2EventObj)
            sportiveScroll.scrollEvents.removeAllEventsFromScroll()
            
            sportiveScroll.scrollEvents.triggerScrollDown()

            expect(global.console.logging).not.toHaveBeenCalled()
        });

        test('triggerScrollUp', () => {
            Element.prototype.getBoundingClientRect = jest.fn(() => {
                return {
                    width: 120,
                    height: 120,
                    top: 750,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }
            });

            sportiveScroll.scrollEvents.addEventToScroll(block3EventObj)
            
            sportiveScroll.scrollEvents.triggerScrollUp()

            expect(global.console.logging).toHaveBeenLastCalledWith('Elemento 3')
        });
    });
});