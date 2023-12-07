$(document).ready(function(e){

    const hamburger   = document.querySelector('.Menu .nav-list .hamburger');
    const mobile_menu = document.querySelector('.Menu .nav-list ul');
    const header      = document.querySelector('.nav-bar');
    const menuLinks   = document.querySelectorAll("#menu_list .li-dr");
    const menuAdLinks   = document.querySelectorAll("#menu_list .li-dr li");
    const Side_Bar    = document.querySelector('.side-bar');

    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        Side_Bar.classList.toggle('active');

        // Animación
        menuLinks.forEach((link, index) => {
            if(link.style.animation){    
                $(link).removeAttr("style");
                $(link).fadeTo("slow", 0.1);
            }else{
                link.style.animation = `menuFade .5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animación
        menuAdLinks.forEach((link, index) => {
            if(link.style.animation){    
                $(link).removeAttr("style");
                $(link).fadeTo("slow", 0);
            }else{
                link.style.animation = `menuFade 0s ease forwards 0s`;
            }
        });
    });

    $('#close-side').dblclick(function(){
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        Side_Bar.classList.toggle('active');
        
       // Animación
        menuLinks.forEach((link, index) => {
            if(link.style.animation){    
                $(link).removeAttr("style");
                $(link).fadeTo("slow", 0.1);
            }else{
                link.style.animation = `menuFade .5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animación
        menuAdLinks.forEach((link, index) => {
            if(link.style.animation){    
                $(link).removeAttr("style");
                $(link).fadeTo("slow", 0);
            }else{
                link.style.animation = `menuFade 0s ease forwards 0s`;
            }
        });

    });
});