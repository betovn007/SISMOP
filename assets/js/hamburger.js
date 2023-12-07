$(document).ready(function(e){
    const hamburger   = document.querySelector('.header .nav-bar .nav-list .hamburger');
    const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
    const header      = document.querySelector('.header.container');
    const menuLinks   = document.querySelectorAll("#menu-list li");

    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');

        // Animación
        menuLinks.forEach((link, index) => {
            if(link.style.animation){    
                $(link).removeAttr("style");
                $(link).fadeTo("slow", 0.1);
            }else{
                link.style.animation = `menuFade .5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // document.addEventListener('scroll', ()=>{
    $(window).scroll(function (event) {
        
        var scroll_pos = $(window).scrollTop();
        if(scroll_pos > 250){
            header.style.backgroundColor = '#29323c';
        }else{
            header.style.backgroundColor = 'rgba(31, 30, 30, 0.24)';
        }
    });

    const Hero          = document.querySelector('#b_hero');
    const Bienvenida    = document.querySelector('#b_about');
    const Servicios     = document.querySelector('#b_services');
    const Destacados    = document.querySelector('#b_projects');
    const Contacto      = document.querySelector('#b_contact');

    Hero.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        removeStyle();
    });
    Bienvenida.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        removeStyle();
    });
    Servicios.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        removeStyle();
    });
    Destacados.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        removeStyle();
    });
    Contacto.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        removeStyle();
    });

    $(window).click(function() {
        hamburger.classList.remove('active');
        mobile_menu.classList.remove('active');
        removeDefStyle();
    });
    
    $('.nav-list ul').click(function(event){
        event.stopPropagation();
    });

    $('.hamburger').click(function(event){
        event.stopPropagation();
    });

    var media1200px = window.matchMedia("(min-width: 1200px)");

    function removeStyle(){

        if(media1200px.matches == false){

            // Animación
            menuLinks.forEach((link, index) => {
                if(link.style.animation){    
                    $(link).removeAttr("style");
                    $(link).fadeTo("slow", 0.1);
                }else{
                    link.style.animation = `menuFade .5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
        }
    }

    function removeDefStyle(){

        if(media1200px.matches == false){

            // Animación
            menuLinks.forEach((link, index) => {
                if(link.style.animation){    
                    $(link).removeAttr("style");
                    $(link).fadeTo("slow", 0.1);
                }
            });
            
        }
    }

    if(media1200px.matches == true){

        // Animación
        menuLinks.forEach((link, index) => {
            if(!link.style.animation){
                link.style.animation = `menuFade 1s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        $('#marker').css('display', 'none');

    }

});