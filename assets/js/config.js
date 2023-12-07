$(document).ready(function(e){

    //=============================================================
    // Mostramos pantalla

    $('#main_container').fadeIn(600);

    //=============================================================
    // Enviar a iniciar sesión

    $('#b_iniciar').click(function(){
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = "jc_login.php";
        }, 600);
    });

    //=============================================================
    // Ingresar

    $('#b_ingresar').click(function(){
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = "jc_00.php";
        }, 600);
    });

    //=============================================================
    //Variable para obtener la medida de la pagina

    var media1102px = window.matchMedia("(min-width: 1102px)");

    //=============================================================
    //Botones del Header

    const marker = document.querySelector('#marker');
    const item   = document.querySelectorAll('#header .header ul li a');

    function indicator(e){
        marker.style.left  = e.offsetLeft+15+'px';
        marker.style.width = e.offsetWidth-30+'px';
    }

    item.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            indicator(e.target);
        });
    });

    $("#b_hero_logo").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#hero").offset().top
        }, 800);
    });
    $("#b_hero").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#hero").offset().top
        }, 800);
    });
    $("#b_about").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#about").offset().top
        }, 800);
    });
    $("#b_services").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#services").offset().top
        }, 800);
    });
    $("#b_projects").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#projects").offset().top
        }, 800);
    });

    if(media1102px.matches == false){
        $("#b_contact").click(function() {
            $([document.documentElement, document.body]).animate({
                    scrollTop: $("#contact").offset().top -= 100
            }, 800);
        });
    }else{
        $("#b_contact").click(function() {
            $([document.documentElement, document.body]).animate({
                    scrollTop: $("#contact").offset().top
            }, 800);
        });
    }

    //=============================================================
    // Botón de detalles

    $("#detalles").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#services").offset().top
        }, 1500);
    });

    //=============================================================
    // Botones [Arrow]

    $("#scroll-wellcome").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#about").offset().top
        }, 800);
    });
    $("#scroll-services").click(function() {
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#services").offset().top
        }, 800);
    });
    setTimeout(function(){
        $('.arrow').fadeTo("slow" , 1);
    }, 3800);

    //=============================================================
    // Mostrar Mapa (Primer botón)

    $("#s-map").click(function() {
        $('#map').show();
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#map .map").offset().top
        }, 800);
    });

    //=============================================================
    // Mostrar Mapa (Segundo botón)

    $("#s2-map").click(function() {
        $('#map').show();
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#map .map").offset().top
        }, 800);
    });

    //=============================================================
    // Regresar al Top en cada recarga

    window.onload = function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#hero").offset().top
        }, 10);
    }
});