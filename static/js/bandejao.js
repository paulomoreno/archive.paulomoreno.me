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

        $('#btn').click(function(){
            carregaGoogleImage("carne");
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

    var weekday_pt = new Array(7);
    weekday_pt[0]=  "Domingo";
    weekday_pt[1] = "Segunda";
    weekday_pt[2] = "Terça";
    weekday_pt[3] = "Quarta";
    weekday_pt[4] = "Quinta";
    weekday_pt[5] = "Sexta";
    weekday_pt[6] = "Sábado";

    var weekday_pt_s = new Array(7);
    weekday_pt_s[0]=  "domingo";
    weekday_pt_s[1] = "segunda";
    weekday_pt_s[2] = "terca";
    weekday_pt_s[3] = "quarta";
    weekday_pt_s[4] = "quinta";
    weekday_pt_s[5] = "sexta";
    weekday_pt_s[6] = "sabado";

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
            data = Date.parse('tomorrow')

        }

    }

    //Select tabBar according to today
    $('ul.tabs').tabs('select_tab', weekday_pt_s[proxDiaSemana]);

    // Write next meal
    $('#pro-p').html(weekday_pt[proxDiaSemana] + " / " + periodo);
    $('#pro-data').html(date_to_str(data));


    var prox_index = weekday_pt_s[proxDiaSemana];
    var prox_periodo = periodo.replace("ç", "c").toLowerCase();

    write_meal_to_date(dias[prox_index], 'pro', prox_periodo, '', data);

    // Write each day
    for (var i=1; i<=6; i++){

        var dia;

        //
        if (diaSemana === i){
            dia = hoje;
        }else{
            dia = Date.today().add(i-diaSemana).day()
        }

        $('#'+weekday_pt_s[i].substring(0,3)+'-data').html(date_to_str(dia));

        write_meal_to_date(dias[weekday_pt_s[i]], weekday_pt_s[i].substring(0,3), 'almoco', '-a', dia);

        if (i != 6 && i != 0){
            write_meal_to_date(dias[weekday_pt_s[i]], weekday_pt_s[i].substring(0,3), 'jantar', '-j', dia);
        }
    }

}

function date_to_str(date){
    return (date.getDate()).toString() + "/" + (date.getMonth() + 1).toString() + "/" + (date.getFullYear()).toString();
}

function write_meal_to_date(day_json, short_day, periodo, periodo_short, expected_date){

    var dt = (day_json.data);
    dt = dt.replace(/^\s+|\s+$/g, '').split('/');

    if (date_to_str(new Date(dt[2],dt[1]-1,dt[0])) === date_to_str(expected_date)){
        var meal = day_json[periodo];

        console.log(short_day);

        if (!meal.vazio && meal.salada){

            $('#'+ short_day + periodo_short +'-sal').html( meal.salada.replace(/^\s+|\s+$/g, '') );
            $('#'+ short_day + periodo_short +'-pri').html( meal.principal.replace(/^\s+|\s+$/g, '') );
            $('#'+ short_day + periodo_short +'-com').html( meal.acompanhamento.replace(/^\s+|\s+$/g, '') );
            $('#'+ short_day + periodo_short +'-sob').html( meal.sobremesa.replace(/^\s+|\s+$/g, '') );

            $('.' + short_day +'-icon').removeClass("hide");
            $('.' + short_day +'-no').addClass("hide");

            $('span[id^='+ short_day + periodo_short +']').each(function(){

                if (!($(this).text().toLowerCase().slice(0, 3) === 'não')){
                    $(this).addClass('si');
                    $(this).click(function(){
                        carregaGoogleImage($(this).text());
                    });
                }
            });
        }

    } else {

    }

}

function carregaGoogleImage(query){

    //$('#iframe_google').attr('src','http://www.uol.com.br');
  $('#modal_googleImages').openModal();

  $("#modal_imgs").html("");

    $.getJSON("https://ajax.googleapis.com/ajax/services/search/images?callback=?",{q:query,v:'1.0'},function(data){
        for (var i=0; i<=10; i++){
            $("#modal_imgs").append('<img class="bi" src="'+data.responseData.results[i].url+'">');
        }
      
    });
}
