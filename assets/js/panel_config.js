$(document).ready(function(e){
    // =============================================================
    // Mostramos pantalla

    $('#main_container').fadeIn(600);

    // =============================================================
    // To Upper
/*
    $('#nombre_txt').keyup(function(){
        this.value = this.value.toUpperCase();
    });

    $('#apellido_pat_txt').keyup(function(){
        this.value = this.value.toUpperCase();
    });
    
    $('#apellido_mat_txt').keyup(function(){
        this.value = this.value.toUpperCase();
    });*/

    // =============================================================
    // Send next input

    // -------------------------------------------------------------------
    // Block
/*
    $('#nombre_txt').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $('#apellido_pat_txt').focus();
            event.stopPropagation();
        }
    });

    // -------------------------------------------------------------------
    // Block

    $('#apellido_pat_txt').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $('#apellido_mat_txt').focus();
            event.stopPropagation();
        }
    });
    
    $('#apellido_pat_txt').on('keydown' ,function (event){ 
        if($('#apellido_pat_txt').val() == ""){
            if(event.keyCode == '8'){
                $('#nombre_txt').focus();
            }
        }
    });

    // -------------------------------------------------------------------
    // Block

    $('#apellido_mat_txt').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".wrapper").offset().top
            }, 800);
            $('#apellido_mat_txt').trigger("blur");
            event.stopPropagation();
        }
    });

    $('#apellido_mat_txt').on('keydown' ,function (event){ 
        if($('#apellido_mat_txt').val() == ""){
            if(event.keyCode == '8'){
                $('#apellido_pat_txt').focus();
            }
        }
    });
    
    // =============================================================
    // Guardamos datos

    $('#guardar_btn').click(function (){ 
        f_guardar();
    });

    function f_guardar(){
        var info         = "";
        var nombre       = $('#nombre_txt').val();
        var apellido_pat = $('#apellido_pat_txt').val();
        var apellido_mat = $('#apellido_mat_txt').val();

        var g_femenino   = $('#option-1').is(':checked');
        var g_masculino  = $('#option-2').is(':checked');

        var genero       = "";

        if(g_femenino == true){
            genero = "Femenino";
        }

        if(g_masculino == true){
            genero = "Masculino";
        }

        if(nombre == ""){
            info += '<br><p style="font-weight: 600; text-decoration: underline;">Debes escribir tu nombre.</p>';
        }

        if(apellido_pat == ""){
            info += '<br><p style="font-weight: 600; text-decoration: underline;">Debes escribir tu apellido paterno.</p>';
        }

        if(g_femenino == false && g_masculino == false){
            info += '<br><p style="font-weight: 600; text-decoration: underline;">Debes seleccionar tu genero.</p><br>';
        }

        if(info != ""){
            Swal.fire({
                icon: 'warning',
                title: 'Error!',
                confirmButtonColor: '#cd2f8a',
                html: info
            });
        }else{
            var form_data = new FormData();
            form_data.append("nombre", nombre);
            form_data.append("apellido_pat", apellido_pat);
            form_data.append("apellido_mat", apellido_mat);
            form_data.append("genero", genero);
            form_data.append("usuario", $('#s_usuario').val());
            form_data.append("case", 15);
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
                    if(response == "OK"){
                        gl_success("SI", 10000, "Guardado! Cargando menú...");
                        setTimeout(() => {
                            $('#main_container').fadeOut(600);
                            setTimeout(function(){
                                location.href = "jc_00.php";
                            }, 600);
                        }, 2000);
                    }else if(response != "OK"){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Error!',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#cd2f8a',
                            text: 'Hubo un error al momento de guardar tus datos.',
                            footer: '<p style="color: #999; font-weight: 600; color: #cd2f8a; text-decoration: underline;">Reportalo con tu escuela</p>'
                        });
                    }
                }
            });
            
        }
    }
*/


});

// =============================================================
// Funciones generales 

function light_Title(id){
    $(document).ready(function (){
        if($('#'+id).val() != ""){
            $('p[data-name="'+id+'"]').addClass('titles-filled');
        }else{
            $('p[data-name="'+id+'"]').removeClass('titles-filled');
        }
    });
}

// =============================================================

function submitform(){
    document.form1.submit();
}

// =============================================================

window.onload=function(){
    var pos=window.name || 0;
    window.scrollTo(0,pos);
}
window.onunload=function(){
    window.name=self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop);
}

// =============================================================