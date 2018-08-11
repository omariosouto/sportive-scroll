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

export const animateOnScroll = (element, animateCallback, visibilityPercentageToShow, direction) => {
    return () => {
        const percent = getVisibilityPercentageOf(element)
        const isVisible = percent > 0
        const is50PercentVisibleOrMore = percent > visibilityPercentageToShow
        const isDirectionUp = direction === 'up'
        const isDirectionDown = direction === 'down'
        
        // Scroll Down
        if(isVisible && is50PercentVisibleOrMore) {
            // console.log(`mostra passou de ${visibilityPercentageToShow}%`)
            animateCallback()
        }
        if(!isVisible && hasScrolledOver(element) && isDirectionDown) {
            // console.log(`mostra passou passou [down]`)
            animateCallback()
        }
        
        if(!isVisible && !hasScrolledOver(element) && isDirectionUp) {
            // console.log(`mostra passou passou [up]`)
            animateCallback()
        }
    }
 }