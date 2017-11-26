// one page scroll
$(function(){

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
				'transform' : 'translate3d(0, '+ position +', 0)'
			});

			setTimeout(function () {
				inScroll = false;

				$('.nav__item-block').eq(sectionEq).addClass('active')
					.siblings().removeClass('active');
					

			}, 1300)
		}


	}

	$('.wrapper').on('wheel', function(e) {
		
		var deltaY = e.originalEvent.deltaY,
			activeSection = sections.filter('.active'),
			nextSection = activeSection.next(),
			prevSection = activeSection.prev();

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

	$('.fixed-menu__link, .nav__link, .order-link').on('click', function(e){
		e.preventDefault();

		var href = parseInt($(this).attr('href'));

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
