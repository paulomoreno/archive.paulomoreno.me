$(document).ready(function(){
	$(".button-collapse").sideNav();
    //$('.parallax').parallax();
    $('.scrollspy').scrollSpy();
    $('.pushpin').pushpin({ top: $('header').height() });
    $('.pushpin').bind('cssClassChanged',function(){
    	if($(this).hasClass('pinned')){
    		$('body').css('margin-top',$(this).height());
    	}else{
    		$('body').css('margin-top',0);
    	}
    });
});


if ($('nav.pushpin.pinned').length){console.log('a')}else{console.log('b')}


// Fix from http://stackoverflow.com/questions/1950038/jquery-fire-event-if-css-class-changed
// to add a new "cssClassChanged" trigger

// Create a closure
(function(){
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();