'use strict'
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY

        document.body.style.cssText = `
            box-sizing: border-box;
            overflow: hidden;
            position: fixed;
            top: -${scrollController.scrollPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `
        document.documentElement.style.scrollBehavior = 'unset'
    },
    enabledScroll() {
        document.body.style.cssText = ''
        window.scroll({top: scrollController.scrollPosition})
        document.documentElement.style.scrollBehavior = ''
    }
}

const modalController = ({ modal, btnOpen, btnClose, animationTime = 300 }) => {
    const buttonElems = document.querySelectorAll(btnOpen)
    const modalElem = document.querySelector(modal)

    modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${animationTime}ms ease-in-out;
    `

    const closeModal = (evt) => {
        const target = evt.target

        if (target === modalElem || 
            (btnClose && target.closest(btnClose)) ||
            evt.code === 'Escape'
            ) {
            modalElem.style.opacity = 0

            setTimeout(() => {
                modalElem.style.visibility = 'hidden'

                scrollController.enabledScroll()
            }, animationTime)

            window.removeEventListener('keydown', closeModal)
        }

    }

    const openModal = () => {
        modalElem.style.visibility = 'visible'
        modalElem.style.opacity = 1

        window.addEventListener('keydown', closeModal)

        scrollController.disabledScroll()
    }

    buttonElems.forEach(btn => {
        btn.addEventListener('click', openModal)
    })

    modalElem.addEventListener('click', closeModal)
}

modalController({
    modal: '.modal1',
    btnOpen: '.section__button1',
    btnClose: '.modal__close',
    animationTime: 500,
})

modalController({
    modal: '.modal2',
    btnOpen: '.section__button2',
    btnClose: '.modal__close',
    animationTime: 500,
})