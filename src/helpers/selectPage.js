export default (slide, orThisSlide) => {
    const el = document.getElementById('page-container')
    const closeDrawer = document.getElementById('close-drawer')
    if (orThisSlide) {
        if (el.className === orThisSlide) {
            el.className = slide
        } else {
            el.className = orThisSlide
        }
    } else {
        el.className = slide
    }

    if (el.className === 'slidetwo') {
        closeDrawer.className = 'close-drawer'
    } else {
        closeDrawer.className = ''
    }
}

