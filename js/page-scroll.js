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
