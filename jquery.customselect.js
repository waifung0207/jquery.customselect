(function($) {

    $.fn.customselect = function( options ) {

    	var mMain = null;

		// Establish our default settings
        var mSettings = $.extend({
        	animated	: false,
        	url			: null,
            callback	: null
        }, options);

        // transform every customselect
		this.each(function() {

			// create new custom select element
			var cs_container = $('<div>');
			cs_container.addClass('cs_container');

			var cs_toggle = $('<a>');
			cs_toggle.addClass('cs_toggle');
			cs_toggle.attr('href', 'javascript:void(0);');
			cs_toggle.css('display', 'block');

			var selected_text = $(this).find(":selected").text();
			cs_toggle.html('<span>'+selected_text+'</span>');

			var cs_box = $('<div>');
			cs_box.addClass('cs_box');
			cs_box.hide();

			var cs_ul = $('<ul>');

			var selected = $(this).val();
			var options = $(this).children();

			for ( var i=0; i<options.length; i++ ) {
				var cs_li = $('<li>');

				var value = $(options[i]).val();
				var text = $(options[i]).html();

				if (selected==value) {
					cs_li.html('<a class="active" href="javascript:void(0);" data-value="'+value+'">'+text+'</a>');
				} else {
					cs_li.html('<a href="javascript:void(0);" data-value="'+value+'">'+text+'</a>');
				}
				cs_ul.append(cs_li);
			}

			cs_box.html(cs_ul);

			// replace original <select> element with new one
			cs_container.append(cs_toggle);
			cs_container.append(cs_box);
			$(this).replaceWith(cs_container);
			// (optional) or hide original select box
			//cs_container.insertAfter($(this));
			//$(this).hide();

			mMain = cs_container;

			// toggle custom select box
			mMain.find('.cs_toggle').click(onclickToggle);

			// callback when click on inactive options	        
			mMain.find('.cs_box a').click(onclickOption);
		});

		function onclickToggle() {

			var cs_box = mMain.find('.cs_box');

			if (mSettings.animated) {
				if ( cs_box.is(':visible') ) {
					cs_box.slideUp();	
				} else {
					cs_box.slideDown();	
				}
			} else {
				if ( cs_box.is(':visible') ) {
					cs_box.hide();	
				} else {
					cs_box.show();
				}
			}
		}

		function onclickOption() {

			// do nothing if the option is selected already
			if ( $(this).hasClass('active') )	{
				return;
			}

		    if ( $.isFunction( mSettings.callback ) ) {
		    	// custom callback
		    	mSettings.callback.call( this );
		    } else if ( mSettings.url ) {
		    	// redirect location
		    	var target_url = mSettings.url + $(this).data('value');
		    	document.location = target_url;
		    	return;
		    } 

	    	// change the selected value
	    	mMain.find('.active').removeClass('active');
	    	$(this).addClass('active');
	    	mMain.find('.cs_toggle').html( $(this).html() );
	    	
	    	onclickToggle();
		}
    }

}(jQuery));