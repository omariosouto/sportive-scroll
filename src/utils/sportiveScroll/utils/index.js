import throttle from 'lodash/throttle';
// const throttle = (func, limit) => {
//     let inThrottle
//     return function() {
//       const args = arguments
//       const context = this
//       if (!inThrottle) {
//         func.apply(context, args)
//         inThrottle = true
//         setTimeout(() => inThrottle = false, limit)
//       }
//     }
//   }

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

export const prepareEventHandlerForScroll = (element, callback, visibilityPercentageToShow, direction) => {
    return throttle(() => {
        
        const distanceToShow = 500
        const shouldRenderCallback = element.getBoundingClientRect().top >= -distanceToShow && element.getBoundingClientRect().top <= distanceToShow

        
        if(shouldRenderCallback) { // Renderiza somente se estivermos perto do elemento
            // console.log(element.getBoundingClientRect().top, -distanceToShow)
            callback()

        }

    }, 500)
 }