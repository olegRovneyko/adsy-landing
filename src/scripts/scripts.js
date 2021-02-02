window.addEventListener('load', function() {
	function validateEmail(email) {
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		return re.test(email);
	}

	$('.js-show-modal').on('click', function(e) {
		$('.modal-bg').fadeIn(200);
	});
	$(document).on('click', function(e) {
		var bg = document.querySelector('.modal-bg');
		if ($(e.target).closest('#modal_close').length ||
			$(e.target).hasClass('modal-bg')) 
			$('.modal-bg').fadeOut(200);
	});

	$('#banner_signup, #modal_signup').on('click', function(e) {
		e.preventDefault();

		var field = $(this).prev('input');

		if (field.length) {
			var email = $.trim(field.val());

			if (!validateEmail(email)) {
				field.css('border-color', '#d06012');
			} else {
				setTimeout(function() {
					if (field.attr('id') == 'modal_email') {
						$('.modal-bg').fadeOut(200);
					}
					field.val('');
				}, 1000);
			}
		}
	});

	$('#modal_email, #banner_email').on('focus', function() {
		$(this).css('border-color', '');
	});

	$('.slider').slick({
		dots: true
	});

	new WOW().init();
});