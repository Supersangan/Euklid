// swiper
var mySwiper = new Swiper('.slider__container', {
  // Optional parameters
  direction: 'horizontal',
  a11y: false,

  // If we need pagination
  pagination: {
    el: '.slider__pagination',
    type: 'custom',
    clickable: true,
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'slider__bullet_active',
    renderCustom: function (swiper, current, total) {
      let generatedHtml = '';

      for (let i = 1; i <= total; i++) {
        let ariaHidden = i == current ? 'true' : 'false'
        let tabindex = i == current ? '-1' : '0'
        let className = i == current ? swiper.params.pagination.bulletClass + ' ' + swiper.params.pagination.bulletActiveClass : swiper.params.pagination.bulletClass
        generatedHtml += `<button class="${className}" aria-label="Перейти к слайду ${i}" tabindex="${tabindex}" aria-hidden="${ariaHidden}"></button>`
      }

      return generatedHtml;
    },
  },

  on: {
    slideChangeTransitionEnd: (swiper) => {
      $(swiper.slides).attr('tabindex', '-1')
      $(swiper.slides).attr('aria-hidden', 'true')
      $(swiper.slides).find('.slider__button').attr('tabindex', '-1')
      $(swiper.slides[swiper.activeIndex]).find('.slider__button').attr('tabindex', 0).focus()
      $(swiper.slides[swiper.activeIndex]).attr('aria-hidden', 'false').attr('tabindex', 0).focus()
    }
  },
})

// accordion
$('.spoilers').accordion({
  active: false,
  collapsible: true,
  icons: false,
  header: '.spoilers__clickable',
  heightStyle: 'content'
})


// burger menu
const burger = document.querySelector('.header__burger')
const nav = document.querySelector('.popup-nav')
const page = document.querySelector('.page')
const closer = document.querySelector('.popup-nav__closer')
const firstNavLink = document.querySelector('.popup-nav__link')

burger.addEventListener('click', () => {
  nav.classList.toggle('popup-nav_visible')
  page.classList.toggle('page_overflowed')

  Array.from(page.children).forEach((child) => {
    child.inert = child != nav ? true : false
  })

  firstNavLink.focus()
})

closer.addEventListener('click', () => {
  nav.classList.toggle('popup-nav_visible')
  page.classList.toggle('page_overflowed')

  Array.from(page.children).forEach((child) => {
    child.inert = child != nav ? false : true
  })

  burger.focus();
})

window.addEventListener('resize', () => {
  if (!nav.inert) {
    nav.classList.remove('popup-nav_visible')
    page.classList.remove('page_overflowed')

    Array.from(page.children).forEach((child) => {
      child.inert = child != nav ? false : true
    })

    burger.focus();
  }
})