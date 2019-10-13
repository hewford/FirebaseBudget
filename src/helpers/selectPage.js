export default (slide, orThisSlide) => {
    let attempts = 0;
    const selectPage = (el) => {
        if (attempts > 5) {
            return null;
        }
        if (!el) {
            attempts++;
            setTimeout(() => {
                selectPage(document.getElementById('page-container'))
            }, 100)
        } else {
            const closeDrawer = document.getElementById('close-drawer')
            if (orThisSlide) {
                if (el.className === orThisSlide) {
                    el.className = slide
                } else {
                    el.className = orThisSlide
                }
            } else {
                console.log(slide)
                el.className = slide
            }

            if (el.className === 'slidetwo') {
                closeDrawer.className = 'close-drawer'
            } else {
                closeDrawer.className = ''
            }
        }
    }
    selectPage(document.getElementById('page-container'))
}

