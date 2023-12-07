$(document).ready(function(e){

	//=============================================================
    // Mostramos pantalla

    $('#main_container').fadeIn(600);

    //=============================================================
    // Enviar a iniciar sesión

    $('#go_back').click(function(){
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = "jc_login.php";
        }, 600);
    });

    if($('#salida').val() != ""){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            confirmButtonColor: 'darkturquoise',
            allowEscapeKey: false,
            allowOutsideClick: false,
            html: $('#salida').val()
        }).then((result) => {
            $('#main_container').fadeOut(600);
            setTimeout(function(){
                location.href = "jc_login.php";
            }, 600);
        });
    }

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

    //==========================================================================================================================
    
    $('#new_password').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $('#password_confirm').focus();
        }
    });

    //==========================================================================================================================
    
    $('#password_confirm').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            register();
        }
    });

    //==========================================================================================================================
    
	$('#b_registrar').click(function(){
        register();
    });

    //==========================================================================================================================

    function register(){
        var info = "";
        var pass   = $('#new_password').val();
        var pass_c = $('#password_confirm').val();
        var usr    = $('#email_show').text();
        var usr_h  = $('#usr_h').val();
        
        if(pass == ""){
            info += '<p style="font-weight: 600; text-decoration: underline;">Debes ingresar tu contraseña.</p>';
        }

        if(pass_c == ""){
            info += '<br><p style="font-weight: 600; text-decoration: underline;">Debes confirmar tu contraseña.</p><br>';
        }

        if(pass != "" && pass_c != ""){
            if(pass !== pass_c){
                info += '<br><p style="font-weight: 600; text-decoration: underline;">Las contraseñas deben de ser iguales.</p><br>';
            }
        }

        if((usr !== usr_h) || (usr == "") || (usr_h == "")){
            info = '<br><p style="font-weight: 600;">La llave de acceso no coicide, intenta dando clic en <span style="text-decoration: underline;">CANCELAR</span> y <span style="text-decoration: underline;">olvide mi contraseña</span>.</p><br>';
        }
        

        if(info != ""){
            Swal.fire({
                icon: 'warning',
                title: 'Error!',
                confirmButtonColor: 'darkturquoise',
                html: info
            });
        }else{

            var form_data = new FormData();
            form_data.append("user", $('#usr_h').val());
            form_data.append("pass", $('#new_password').val());
            form_data.append("pass_c", $('#password_confirm').val());
            form_data.append("case", 11);
            //Realizo el ajax
            $.ajax({
                
                url: "assets/php/script.php",
                type: 'POST',
                //Esta linea 'async' sirve para hacer las variables globales. Siempre y cuando se use AJAX
                async: false,
                data: form_data,
                //Se debe de poner esto para utilizar la función append
                processData: false,
                contentType: false,
                success: function(response){
                    if(response == true){
                        Swal.fire({
                            icon: 'success',
                            title: 'Perfecto!',
                            text: 'Tu contraseña ha sido guardada correctamente!',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            footer: '<p style="color: #999; font-weight: 600; color: darkturquoise; text-decoration: underline;">Ahora puedes iniciar sesión</p>'
                        }).then((result) => {
                            $('#main_container').fadeOut(600);
                            setTimeout(function(){
                                location.href = "jc_login.php";
                            }, 600);
                        });
                        
                    }else if(response == false){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            confirmButtonColor: 'darkturquoise',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            html: 'Tuvimos un problema al momento de restablecer tu contraseña, intenta de nuevo dando clic en olvide mi contraseña. <br>O contacta a tu escuela para más detalles.',
                            footer: '<p style="color: #999; font-weight: 600; color: darkturquoise; text-decoration: underline;">'+$('#email_show').text()+'</p>'
                        }).then((result) => {
                            $('#main_container').fadeOut(600);
                            setTimeout(function(){
                                location.href = "jc_login.php";
                            }, 600);
                        });
                    }
                }
            });
        }
    }

    //=============================================================
    // Indicador de la contraseña

    const indicator = document.querySelector(".indicator");
    const input = document.querySelector("#new_password");
    const weak = document.querySelector(".weak");
    const medium = document.querySelector(".medium");
    const strong = document.querySelector(".strong");
    const text = document.querySelector(".text_password");
    const divcolor = document.querySelector("#div-color");
    const divcoloradr = document.querySelector("#div-color-addr");
    const pass_cont = document.querySelector(".password-container");

    let regExpWeak = /[a-z]/;
    let regExpMedium = /\d+/;
    let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
    $('#new_password').keyup(function(){
        if(input.value != ""){
            $('#message-container').fadeOut(600);
            if(input.value.length <= 1){
                setTimeout(function(){
                    $('.indicator-container').fadeIn(600);
                }, 600);
            }
            if(input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong)))no=1;
            if(input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong))))no=2;
            if(input.value.length >= 6 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong))no=3;
            if(no==1){
                
                weak.classList.add("active");
                text.textContent = "Tu contraseña es muy débil";
                text.classList.add("weak");
                divcolor.classList.add("active-red");
                divcoloradr.classList.add("active-red");
            }
            if(no==2){
                medium.classList.add("active");
                text.textContent = "Tu contraseña puede mejorar";
                text.classList.add("medium");
                divcolor.classList.add("active-orange");
                divcoloradr.classList.add("active-orange");
            }else{
                medium.classList.remove("active");
                text.classList.remove("medium");
                divcolor.classList.remove("active-orange");
                divcoloradr.classList.remove("active-orange");
            }
            if(no==3){
                weak.classList.add("active");
                medium.classList.add("active");
                strong.classList.add("active");
                text.textContent = "Tu contraseña es segura";
                text.classList.add("strong");
                divcolor.classList.add("active-green");
                divcoloradr.classList.add("active-green");
            }else{
                strong.classList.remove("active");
                text.classList.remove("strong");
                divcolor.classList.remove("active-green");
                divcoloradr.classList.remove("active-green");
            }
        }else{
            $('.indicator-container').fadeOut(600);
            setTimeout(function(){
                $('#message-container').fadeIn(600);
            }, 600);
            divcolor.classList.remove("active-red");
            divcolor.classList.remove("active-orange");
            divcolor.classList.remove("active-green");
            divcoloradr.classList.remove("active-red");
            divcoloradr.classList.remove("active-orange");
            divcoloradr.classList.remove("active-green");
        }
    });
});