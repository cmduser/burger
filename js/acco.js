
//section team
$('.navperson__name').on('click touchstart touchend', e => {
  const $this = $(e.currentTarget),
        item = $this.closest('.navperson__item'),
        content = item.find('.navperson__content'),
        list = $this.closest('.navperson__list'),
        items = list.find('.navperson__item'),
        otherContent = list.find('.navperson__content'),
        title = item.find('.navperson__name'),
        titles = list.find('.navperson__name'),
        duration = 700;

if (!item.hasClass('navperson__item_active')) {
  items.removeClass('navperson__item_active');
  items.addClass('navperson__item_hidden');
  item.removeClass('navperson__item_hidden');
  item.addClass('navperson__item_active');
  otherContent.stop(true, true).slideUp(duration);
  content.stop(true, true).slideDown(duration);
  content.css('display', 'flex');
} else {
  content.stop(true, true).slideUp(duration);
  item.toggleClass('navperson__item_active');
  
}
});

// section slide menu

$(function () {
    $('.slidemenu-accor__trigger').on('click', e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const container = $this.closest('.slidemenu-accor');
        const item = $this.closest('.slidemenu-accor__item');
        const items = $('.slidemenu-accor__item', container);
        const content = $('.slidemenu-accor__content', item);
        const otherContent = $('.slidemenu-accor__content', container);
		const screenWidth = $( window ).width();

        if (!item.hasClass('slidemenu-accor__item_active')) {

            items.removeClass('slidemenu-accor__item_active');
            item.addClass('slidemenu-accor__item_active');

            otherContent.css({
                'width': 0
            })

            content.css({
				
                'width': screenWidth - 200,
				'max-width': 540
            })

        } else {
            item.removeClass('slidemenu-accor__item_active');
            content.css({
                'width': 0
            })
        }

    })

})



$(document).ready(function () {
    let slider = $('.burgers__list').bxSlider({
        pager : false,
        controls : false
    });

    $('.slider__arrow--left').on('click', e => {
        e.preventDefault();
        slider.goToPrevSlide();
    })

    $('.slider__arrow--right').on('click', e => {
        e.preventDefault();
        slider.goToNextSlide();
    })


});


  $(function () {

    $("[data-fancybox]").fancybox({
      slideClass : 'popup__layout'
    });

  })

 let burgerButton = document.querySelector('.hamburger-menu-link'); 
let tabletsMenu = document.querySelector('.menu--tablets');
let tabletsMenuClose = document.querySelector('.menu__close');
let menuLink = document.querySelectorAll('.menu__item');
$(burgerButton).on('click touchstart touchend', (e) => {
	 e.preventDefault();
    $(tabletsMenu).toggleClass('visible');
    $(tabletsMenu).css('position', 'fixed');
  });

$(tabletsMenuClose).on('click touchstart touchend', () => {
  $(tabletsMenu).toggleClass('visible');
});

$(menuLink).on('click touchstart', () => {
  $(tabletsMenu).toggleClass('visible');
});
  