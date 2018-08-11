
export default function(scrollEvents) {
    let lastScrollTop = 0;
    let ticking = false;
    let scrollTopPosition
    
    const update = function() {
        const isScrolllingDown = scrollTopPosition > lastScrollTop
        if (isScrolllingDown) {
            scrollEvents.triggerScrollDown()
        } else {
            scrollEvents.triggerScrollUp()
        }
        lastScrollTop = scrollTopPosition
        
        ticking = false;
    };
    
    const requestTick = function() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    };
    
    const scrollManagerHandler = function() {
        scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    };

    return scrollManagerHandler
}


// let lastScrollTop = 0;
// function scrollManagerHandler() {
//     // const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
//     // const isScrolllingDown = scrollTopPosition > lastScrollTop

//     // if (isScrolllingDown) {
//     //     scrollEvents.triggerScrollDown()
//     // } else {
//     //     scrollEvents.triggerScrollUp()
//     // }
//     // lastScrollTop = scrollTopPosition
// }