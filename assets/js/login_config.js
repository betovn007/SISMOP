$(document).ready(function(e){

	//=============================================================
    // Mostramos pantalla

    $('#main_container').fadeIn(600);
    $( "#password_register" ).prop( "disabled", true );

    //=============================================================
    // Enviar a iniciar sesión

    $('#go_back').click(function(){
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = "index.php";
        }, 600);
    });

	//=============================================================
    // Creamos las funciones

	const inputs = document.querySelectorAll(".input");

	function addcl(){
		let parent = this.parentNode.parentNode;
		parent.classList.add("focus");
	}

	function remcl(){
		let parent = this.parentNode.parentNode;
		if(this.value == ""){
			parent.classList.remove("focus");
		}
	}

	//=============================================================
    // Colorea los campos

	inputs.forEach(input => {
		input.addEventListener("focus", addcl);
		input.addEventListener("blur", remcl);
    });

	//=============================================================
    // Mostrar mensaje

    // Media min-width 1000px

    var MediaMin1000px = window.matchMedia("(min-width: 1000px)");
    var MediaMax400px  = window.matchMedia("(max-width: 400px)");

    if(MediaMax400px.matches == true){

        $('#remember').hover(function(){
            $('#remember_ses').css({
                'visibility' : 'visible',
                'opacity' : '1',
                'transform' : 'translateX(-15%) translateY(0px)'
            });
        }, function(){
            $('#remember_ses').css({
                'visibility' : 'hidden',
                'opacity' : '0',
                'transform' : 'translateX(-50%) translateY(-50px)'
            });   
        });

    }else{

        if(MediaMin1000px.matches == false){

            $('#remember').hover(function(){
                $('#remember_ses').css({
                    'visibility' : 'visible',
                    'opacity' : '1',
                    'transform' : 'translateX(-20%) translateY(0px)'
                });
            }, function(){
                $('#remember_ses').css({
                    'visibility' : 'hidden',
                    'opacity' : '0',
                    'transform' : 'translateX(-50%) translateY(-50px)'
                });   
            });
            
            $('#show_footer').hover(function(){
                $('#msg_footer').css({
                    'visibility' : 'visible',
                    'opacity' : '1',
                    'transform' : 'translateX(-20%) translateY(0px)'
                });
            }, function(){
                $('#msg_footer').css({
                    'visibility' : 'hidden',
                    'opacity' : '0',
                    'transform' : 'translateX(-50%) translateY(-50px)'
                });   
            });

        }else if(MediaMin1000px.matches == true){

            $('#remember').hover(function(){
                $('#remember_ses').css({
                    'visibility' : 'visible',
                    'opacity' : '1',
                    'transform' : 'translateX(-3%) translateY(0px)'
                });
            }, function(){
                $('#remember_ses').css({
                    'visibility' : 'hidden',
                    'opacity' : '0',
                    'transform' : 'translateX(-50%) translateY(-50px)'
                });   
            });

            $('#show_footer').hover(function(){
                $('#msg_footer').css({
                    'visibility' : 'visible',
                    'opacity' : '1',
                    'transform' : 'translateX(-3%) translateY(0px)'
                });
            }, function(){
                $('#msg_footer').css({
                    'visibility' : 'hidden',
                    'opacity' : '0',
                    'transform' : 'translateX(-50%) translateY(-50px)'
                });   
            });

        }

    }
    
	//=============================================================
    // Alternar botón de recordar usuario

	$('#toggle_remember').click(function(){
        $('#remember_me').prop("checked", !$('#remember_me').prop("checked"));
    });

    //==========================================================================================================================
    
    $('#user_login').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $('#password_login').focus();
        }
    });

    //==========================================================================================================================
    
    $('#i_user').click(function(event){
        $('#user_login').focus();
    });

    //==========================================================================================================================
    
    $('#i_pass').click(function(event){
        $('#password_login').focus();
    });
    
    //==========================================================================================================================

    $('#b_iniciar').click(function(){
        start();
    });

    //==========================================================================================================================
    
    $('#password_login').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            start();
        }
    });

    //==========================================================================================================================
    
    $(document).keypress(function(event){
        
        if($('#user_login').val() != "" && $('#password_login').val() != ""){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                start();
            }
        }// else if($('#user_login').val() == ""){
        //     $('#user_login').focus();
        // }else if($('#password_login').val() == ""){
        //     $('#password_login').focus();
        // }
        
    });

    //==========================================================================================================================

    function start(){
        var info = "";
        var user = $('#user_login').val();
        var pass = $('#password_login').val();

        if(user == ""){
            info += '<p style="font-weight: 600; text-decoration: underline;">Debes ingresar tu correo.</p>';
        }

        if(pass == ""){
            info += '<br><p style="font-weight: 600; text-decoration: underline;">Debes escribir tu contraseña.</p><br>';
        }

        if(info != ""){
            Swal.fire({
                icon: 'warning',
                title: 'Error!',
                confirmButtonColor: '#cd2f8a',
                html: info
            });
        }else{
            document.form1.Start.value = "SI";
            document.form1.submit();
        }
    }

    //==========================================================================================================================

    $("#scroll-footer").click(function(){
        $("#footer").show();
        $([document.documentElement, document.body]).animate({
                scrollTop: $("#footer").offset().top
        }, 800);
    });

});
