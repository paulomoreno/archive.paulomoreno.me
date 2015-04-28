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

     $('#modal_load').openModal();

     load_bandeco();


});

function load_bandeco(){

    var bandeco_url = 'http://www.pcasc.usp.br/restaurante.xml';
    // Thanks yahoo for converting xml into JSON for me. you're the real mvp.
    var yql_url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + bandeco_url + '"') + '&format=json&callback=?';

    // Get bandeco stuff
    $.getJSON( yql_url, function(data) {
        console.log("deu bom");
        console.log(data);

        write_on_page(data.query.results.restaurante);

        })
        .fail(function() {
            // TODO !
        })
        .always(function() {
        $('#modal_load').delay().closeModal();
    });

}

function write_on_page(dias){
    //TODO!
    var segunda = dias.segunda

    // Get next meal
    var hoje = new Date();
    var diaSemana = hoje.getDay();
    var hora = hoje.getHours();

    var periodo;
    var data;
    var proxDiaSemana;
    var prox_sem = false;

    var weekday = new Array(7);
    weekday[0]=  "Domingo";
    weekday[1] = "Segunda";
    weekday[2] = "Terça";
    weekday[3] = "Quarta";
    weekday[4] = "Quinta";
    weekday[5] = "Sexta";
    weekday[6] = "Sábado";

    // IF today is greater than saturday lunch
    if ( (diaSemana > 5 && hora >= 13 ) || diaSemana === 0){
        //Proxima semana
        periodo = "Almoço";
        data = "";
        proxDiaSemana = 1;
        prox_sem = true;

    }else{

        // Mostra Almoço
        if ( hora <= 13) {
            periodo = "Almoço";
            data = hoje;
            proxDiaSemana = diaSemana;

        // Mostra Janta
        } else if( hora <= 19) {
            periodo = "Jantar";
            proxDiaSemana = diaSemana;
            data = hoje;

        // Mostra Almoço de amanhã
        } else {
            periodo = "Almoço";
            proxDiaSemana = diaSemana+1;
            data = new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate()+1);

        }

    }

    // Write next meal
    $('#pro-p').html(weekday[proxDiaSemana] + " / " + periodo);
    $('#pro-data').html(date_to_str(data));

    // Write each day

}

function date_to_str(date){
    return (date.getDate()).toString() + "/" + (date.getMonth() + 1).toString() + "/" + (date.getFullYear()).toString();

}


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