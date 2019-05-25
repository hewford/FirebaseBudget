export default (slide, orThisSlide) => {
    const el = document.getElementById('page-container')
    
    if (orThisSlide) {
        if (el.className === orThisSlide) {
            el.className = slide
        } else {
            el.className = orThisSlide
        }
    } else {
        el.className = slide
    }
}

