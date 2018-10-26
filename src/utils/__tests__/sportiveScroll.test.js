import $ from 'jquery'
import * as sportiveScroll from '../sportiveScroll'

document.body.innerHTML = `
<div class="elemento elemento1"></div>

<div class="elemento elemento2"></div>

<div class="elemento elemento3"></div>

<div class="elemento elemento4"></div>
`

const element1EventObj = {
    direction: 'down',
    baseElement: $('.elemento1').get(0),
    baseElementVisibilityPercentage: 2,
    callback: () => {
        console.logging('Elemento 1')
    }
}

const element2EventObj = {
    direction: 'down',
    baseElement: $('.elemento2').get(0),
    baseElementVisibilityPercentage: 2,
    callback: () => {
        console.logging('Elemento 2')
    }
}


describe('# sportiveScroll', () => {
    beforeAll(() => {
        // Inicializando o ScrollEvents
        sportiveScroll.init()
    });

    beforeEach(() => {
        global.console.logging = jest.fn()
        sportiveScroll.scrollEvents.removeAllEventsFromScroll()
    }) 

    describe('## addEventToScroll', () => {
        it('should trigger one registered events', () => {
            sportiveScroll.scrollEvents.addEventToScroll(element1EventObj)

            sportiveScroll.scrollEvents.triggerScrollDown()

            expect(global.console.logging).toHaveBeenCalledWith('Elemento 1')
        })
    
        it('should trigger two registered eventss', () => {
            sportiveScroll.scrollEvents.addEventToScroll(element1EventObj)
            sportiveScroll.scrollEvents.addEventToScroll(element2EventObj)
            
            sportiveScroll.scrollEvents.triggerScrollDown()

            const consoleLoggingValuesPassedInCalls = global.console.logging.mock.calls
            expect(consoleLoggingValuesPassedInCalls).toEqual([[ 'Elemento 1' ], [ 'Elemento 2' ]])
        })
    })
    

    describe('## removeEventFromScroll', () => {
        it('should remove one registered events', () => {
            sportiveScroll.scrollEvents.addEventToScroll(element1EventObj)
            sportiveScroll.scrollEvents.removeEventFromScroll(element1EventObj)
            
            sportiveScroll.scrollEvents.triggerScrollDown()

            expect(global.console.logging).not.toHaveBeenCalled()
        })
    })

    describe('## removeAllEventsFromScroll', () => {
        it('should remove all registered events', () => {
            sportiveScroll.scrollEvents.addEventToScroll(element1EventObj)
            sportiveScroll.scrollEvents.addEventToScroll(element2EventObj)
            sportiveScroll.scrollEvents.removeAllEventsFromScroll(element1EventObj)
            
            sportiveScroll.scrollEvents.triggerScrollDown()

            expect(global.console.logging).not.toHaveBeenCalled()
        })
    })
})











// describe('# sportiveScroll', () => {
//     beforeAll(() => {
//         // Initializing Scroll Events
//         sportiveScroll.init()
//     });
//     beforeEach(() => {
//         global.console.logging = jest.fn()
//         sportiveScroll.scrollEvents.removeAllEventsFromScroll()
//         Element.prototype.getBoundingClientRect = jest.fn(() => {
//             return {
//                 width: 1000,
//                 height: 600,
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//             }
//         });
//     });
    
//     describe('# scrollEvents', () => {
//         test('addEventToScroll', () => {
//             sportiveScroll.scrollEvents.addEventToScroll(element2EventObj)
//             sportiveScroll.scrollEvents.triggerScrollDown()
//             expect(global.console.logging).toHaveBeenCalledWith('Elemento 2')
//         });

//         test('removeEventFromScroll', () => {
//             sportiveScroll.scrollEvents.addEventToScroll(block4EventObj)
//             sportiveScroll.scrollEvents.addEventToScroll(element2EventObj)
//             sportiveScroll.scrollEvents.removeEventFromScroll(element2EventObj)
            
//             sportiveScroll.scrollEvents.triggerScrollDown()

//             expect(global.console.logging).toHaveBeenLastCalledWith('Elemento 4')
//         });

//         test('removeAllEventsFromScroll', () => {
//             sportiveScroll.scrollEvents.addEventToScroll(block4EventObj)
//             sportiveScroll.scrollEvents.addEventToScroll(element2EventObj)
//             sportiveScroll.scrollEvents.removeAllEventsFromScroll()
            
//             sportiveScroll.scrollEvents.triggerScrollDown()

//             expect(global.console.logging).not.toHaveBeenCalled()
//         });

//         test('triggerScrollUp', () => {
//             Element.prototype.getBoundingClientRect = jest.fn(() => {
//                 return {
//                     width: 120,
//                     height: 120,
//                     top: 750,
//                     left: 0,
//                     bottom: 0,
//                     right: 0,
//                 }
//             });

//             sportiveScroll.scrollEvents.addEventToScroll(block3EventObj)
            
//             sportiveScroll.scrollEvents.triggerScrollUp()

//             expect(global.console.logging).toHaveBeenLastCalledWith('Elemento 3')
//         });
//     });
// });