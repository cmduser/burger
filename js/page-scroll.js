// one page scroll

const display = $('.maincontent');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


    // Функция отвечает за подсветку активного класса в меню
    
const switchMenuActiveClass = sectionEq => {
    $('.nav__item-block').eq(sectionEq).addClass('active')
        .siblings().removeClass('active');
}


    // Функция которая перемещает секции

const performTransition = sectionEq => {
    if (inScroll) return
    inScroll = true

    const position = (sectionEq * -100) + '%';

    display.css({
						'-webkit-transition-duration' : '1s',
				'transition-duration' : '1s',
        'transform': `translate(0, ${position})`,
        '-webkit-transform': `translate(0, ${position})`
    })

    sections.eq(sectionEq).addClass('active')
        .siblings().removeClass('active');

    setTimeout(() => {
        inScroll = false;
        switchMenuActiveClass(sectionEq);
    }, 1300);
}

const difineSections = section => {
    const activeSection = sections.filter('.active');
    return {
        activeSection: activeSection,
        nextSection: activeSection.next(),
        prevSection: activeSection.prev()
    }
}

const scrollToSection = direction => {
    const section = difineSections(sections)

    if (inScroll) return;

    if (direction == 'up' && section.nextSection.length) { //вниз
        performTransition(section.nextSection.index());
    }
        
    if (direction == 'down' && section.prevSection.length) { //вверх
        performTransition(section.prevSection.index());
    }
}

$('.wrapper').on({
    wheel: e => {
        const deltaY = e.originalEvent.deltaY;
        let direction = (deltaY > 0)
            ? 'up' 
            : 'down'
        
        scrollToSection(direction);
       

    },

    touchmove : e => (e.preventDefault())
});


    // Управление кнопками клавиатуры

$(document).on('keydown', e => {
    const section = difineSections(sections);

    if (inScroll) return
     switch (e.keyCode) {
         case 40: //вверх
            if (!section.nextSection.length) return
            performTransition(section.nextSection.index());
            break;

         case 38: //вниз
             if (!section.prevSection.length) return
             performTransition(section.prevSection.index());
             break;
     }
});


 

if (isMobile) {
    $(window).swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            scrollToSection(direction);
        }
    })
}


$('[data-scroll-to]').on('click touchstart', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const sectionIndex = parseInt($this.attr('data-scroll-to'));

    performTransition(sectionIndex);


})


/*$(function(){

	var sections = $('.section'), 
		display = $('.maincontent');
		inScroll = false;
		

	var scrollToSection = function (sectionEq) {
		var position = 0;

		if (!inScroll) {

			inScroll = true;

			position = (sections.eq(sectionEq).index() * -100) + '%';

			sections.eq(sectionEq).addClass('active')
				.siblings().removeClass('active');
			
			
			display.css({
				'-webkit-transition-duration' : '1s',
				'transition-duration' : '1s',
				'transform' : 'translate3d(0, '+ position +', 0)'
			});

			setTimeout(function () {
				inScroll = false;

				$('.nav__item-block').eq(sectionEq).addClass('active')
					.siblings().removeClass('active');
					

			}, 1000)
		}


	}

	$('.wrapper').on('wheel touchstart', function(e) {
		
		var deltaY = e.originalEvent.deltaY,
			activeSection = sections.filter('.active'),
			nextSection = activeSection.next(),
			prevSection = activeSection.prev();
alert(deltaY);
		if (deltaY > 0) {

			if (nextSection.length) {
				scrollToSection(nextSection.index());
			}
			
		}

		if (deltaY < 0) {

			if (prevSection.length) {
				scrollToSection(prevSection.index());
			}	
		}
	});


	$('.down-arrow').on('click', function (e) {
		e.preventDefault();

		scrollToSection(1);
	});

	$('.nav__link, .nav__item-block, .order-link, .item__link').on('click', function(e){
		e.preventDefault();
//return alert(($(this).attr('data-scroll-to')));
		let href = parseInt($(this).attr('data-scroll-to'));
	//	alert(href);
	//	return;
		scrollToSection(href);

	});

	$(document).on('keydown', function (e) {
		var activeSection = sections.filter('.active'),
			nextSection = activeSection.next(),
			prevSection = activeSection.prev();
		
		switch (e.keyCode) {
			case 40 :
				if (nextSection.length) {
				scrollToSection(nextSection.index());
				}
				break;
		

			case 38 :
				if (prevSection.length) {
				scrollToSection(prevSection.index());
				}
				break;

		}

	});

});
*/