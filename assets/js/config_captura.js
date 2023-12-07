var currYear = (new Date()).getFullYear();

function toggleModal( action ) {
    if( action == 'show' ){
        $('#myModal').addClass('modal-active');
    } 
    else if( action == 'hide' ) {
        $('#myModal').removeClass('modal-active');
    }
}

$(document).ready(function (){

    $('#areaDEA').select2();
    $('#tramites_lst').select2();
    $('#unidad_empleado').select2();
    $('#nombre_empleado').select2();

    $(".datepicker").datepicker({
        maxDate: new Date((currYear + 1),12,31),
        yearRange: [currYear, (currYear + 1)],
        format: "dd/mm/yyyy"    
    });
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    setDateCaptura(); // * Función para establecer la fecha de captura

    // ? Evento para cerrar el modal al hacer click fuera de él
    
    $(window).click(function(e) {
        if (e.target.id == "myModal") {
            toggleModal('hide')
        }
    });
    
    var filter_selector = $('.dataTables_length select').select2();
    if(filter_selector.length > 0){
        filter_selector.data('select2').$container.addClass("dataTable_filter");
    }

    // una funcion que se ejecuta cuando se cambia el valor del select y que mande un ajax al servidor script_captura.php como case 1 y que con la respuesta coloques las opciones en el select de nombre_empleado
    $('#unidad_empleado').change(function (e) { 
        e.preventDefault();
        var form_data = new FormData();
        form_data.append("case", 1);
        form_data.append("unidad", $('#unidad_empleado').val());
        $.ajax({
            url: "assets/php/scripts/script_captura.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                if(arreglo.estatus == "Success"){
                    // ? Recargamos la tabla de listados
                    $('#nombre_empleado').html(arreglo.opciones);
                }
            }
        });
    });

    
    //!----------Guardar 
    $('#btn_guardar').click(function (e) { 
        var mensaje = "";
        var form_data = new FormData();
        const nombreUsuario = $('#hidUser').val();
        form_data.append("usrClave", nombreUsuario);
        form_data.append("form", $('#form1').serialize());
        form_data.append("case", 4);

        $.ajax({
            url: "assets/php/scripts/script_captura.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                if(arreglo.estatus == "Success"){
                    // ? Recargamos la tabla de listados
                    $('#form1').fadeOut();
                    datatable.ajax.reload();
                    gl_success("SI", 15000, arreglo.mensaje); // * Enviamos mensaje al usuario
                    limpiarCampos(); // * Limpia los campos del formulario
                    // $('#hidClave').val(arreglo.usuario);
                }
                // if(arreglo.estatus == "Error"){
                //     // Enviamos mensaje al usuario
                //     gl_error("NO", 0, arreglo.mensaje);

                // }
            }
        });
    });

    $('#btn_nuevo').click(function (e) { 
        limpiarCampos();

        $('#form1').fadeOut();
    });

    const limpiarCampos = () => {
        $('#hidClave').val("");
        $('#form1 input').val("");
        $('#form1 textarea').val("");
        $('#form1 select').val("").trigger('change');
        $('#fecha_inicio_actividad, #fecha_fin_actividad').val("").trigger('change');

        // ? Mostramos el nombre de la actividad
        $("#nombreActividad .titles").text("");

        // Verifica si $usrClave está vacía antes de limpiar el campo
        // if (!$.trim($('#hidUser').val())) {
        //     $('#hidUser').val("");
        // }

        $('#btn_guardar').attr("data-guardado", "guardar");
        setDateCaptura();
        scrollToTop();
    };

    function arreglaFecha(fecha){
        let array_fecha = fecha.split('-');
        return array_fecha[2] + "/" + array_fecha[1] + "/" + array_fecha[0];
    }

    function setDateCaptura ()  {
        today = dd + '/' + mm + '/' + yyyy;
        if($('#fecha_captura_txt').val() == ""){
            $('#fecha_captura_txt').val(today);
        }
    };

    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow'); // Puedes ajustar la velocidad de desplazamiento según tus preferencias
    }


});