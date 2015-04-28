$(document).ready(function(){
	$(".button-collapse").sideNav();
    //$('.parallax').parallax();
    $('ul.tabs').tabs();
    $('.scrollspy').scrollSpy();
    $('.pushpin').pushpin({ top: $('header').height() });
    $('.pushpin').bind('cssClassChanged',function(){
    	if($(this).hasClass('pinned')){
    		$('body').css('margin-top',$(this).height());
    	}else{
    		$('body').css('margin-top',0);
    	}
    });



    $('.btn_pro').click(function(){
        $('ul.tabs').tabs('select_tab', 'proxima');
    });
    $('.btn_seg').click(function(){
        $('ul.tabs').tabs('select_tab', 'segunda');
    });
    $('.btn_ter').click(function(){
        $('ul.tabs').tabs('select_tab', 'terca');
    });
    $('.btn_qua').click(function(){
        $('ul.tabs').tabs('select_tab', 'quarta');
    });
    $('.btn_qui').click(function(){
        $('ul.tabs').tabs('select_tab', 'quinta');
    });
    $('.btn_sex').click(function(){
        $('ul.tabs').tabs('select_tab', 'sexta');
    });
    $('.btn_sab').click(function(){
        $('ul.tabs').tabs('select_tab', 'sabado');
    });
});


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