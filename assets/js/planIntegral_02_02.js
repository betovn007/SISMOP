function toggleModal( action ) {
    if( action == 'show' ){
        $('#myModal').addClass('modal-active');
    } 
    else if( action == 'hide' ) {
        $('#myModal').removeClass('modal-active');
    }
}

function arreglaFecha(fecha){
    let array_fecha = fecha.split('-');
    return array_fecha[2] + "/" + array_fecha[1] + "/" + array_fecha[0];

}

$(document).ready(function(){
    $('#proceso_lst').select2();
    $('#subproceso_lst').select2();
    $('#proceso-form_lst').select2();
    $('#subproceso-form_lst').select2();
    $('#ur_lst').select2();

    params = {
        "columnDefs": [
            {
                "targets": 0,
                "className": "column-pl",
            },
            {
                "targets": 2,
                "className": "column-pl-2",
            }
        ],
        "ajax":{            
            "processing": true,
            "serverSide":true,
            "url": "assets/php/scripts/script_catalogo_02_02.php", 
            "serverMethod": 'POST',
            "data":{case:1, proceso: ""}, 
            "dataSrc":"datos"
        },
        "deferRender": true,
        "retrieve": true,
        "processing": true,
        "aaSorting": [],
        "order": [],
    };



    $('#tabla-actividades').dataTable( params );
    
    
    //!--------- Agregar eventos de mouseover y mouseout a las filas -----------
    $('#tabla-actividades tbody').on('mouseover', 'tr', function() {
        $(this).addClass('highlight-row');
    }).on('mouseout', 'tr', function() {
        $(this).removeClass('highlight-row');
    });

    $('#tabla-actividades').on('click', '.i_modificar', function(){
        actividad = this.getAttribute('data-proceso');
        subproceso = this.getAttribute('data-subproceso');
        const boton_guardar = document.getElementById('btn_guardar');
        boton_guardar.setAttribute("data_guardado", "editar");
        var form_data = new FormData();
            form_data.append("actividad", actividad);
            form_data.append("subproceso", subproceso);
            form_data.append("case", 2);

        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_02.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                
                if(arreglo){
                    const { id_actividad, proceso, subproceso, descripcion, ur, fecha_inicio, fecha_fin } = arreglo;

                    $('#text_actividad').val(id_actividad);
                    $('#text_subproceso').val(subproceso);
                    $('#text_descripcion').val(descripcion);
                    $('#fecha_ini_txt').val(arreglaFecha(fecha_inicio));
                    $('#fecha_fin_txt').val(arreglaFecha(fecha_fin));

                    // ? Seleccionamos las opciones de los select
                    $('#proceso-form_lst').val(proceso).trigger('change');
                    setTimeout(() => {
                        $('#subproceso-form_lst').val(subproceso).trigger('change');
                    }, 1000);
                    $('#ur_lst').val(ur).trigger('change');

                    $('#btn_guardar').attr("data-guardado", "editar");
                }
            }
        });

        toggleModal('show');
    });

    $('#btn_guardar').click(function (e) { 
        const actividad     = $('#text_actividad').val();
        const proceso       = $('#proceso-form_lst').val();
        const subproceso    = $('#text_subproceso').val();
        const descripcion   = $('#text_descripcion').val();
        const ur            = $('#ur_lst').val();
        const fecha_ini     = $('#fecha_ini_txt').val();
        const fecha_fin     = $('#fecha_fin_txt').val();
        let mensajeSuccess  = "";

        let form_data = new FormData();
        form_data.append("actividad", actividad);
        form_data.append("proceso", proceso);
        form_data.append("subproceso", subproceso);
        form_data.append("descripcion", descripcion);
        form_data.append("ur", ur);
        form_data.append("fecha_ini", fecha_ini);
        form_data.append("fecha_fin", fecha_fin);
        const guardado = this.getAttribute('data-guardado');
        if (guardado == 'editar'){
            form_data.append("case", 3);
            mensajeSuccess = "Registro editado";
        }else{
            form_data.append("case", 4);
            mensajeSuccess = "Registro guardado";
        }
        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_02.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                
                if(arreglo.error == ""){
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito',
                        html: mensajeSuccess,
                        confirmButtonText: 'Continuar'
                    });
                    // ? Recargamos la tabla de listados enviando el proceso seleccionado como parametro
                    $('#tabla-actividades').DataTable().destroy();
                    params.ajax.data = {
                        case:1,
                        proceso:proceso
                    };
                    $('#tabla-actividades').dataTable( params );
                    // ? Limpiamos los campos del formulario
                    limpiarCampos();
                    // ? Cerrar modal
                    toggleModal('hide');
                }
            }
        });
    });

    $('#proceso_lst').change(function (e) { 
        const proceso = this.value;
        if(proceso){
            // ? Recargamos la tabla de listados enviando el proceso seleccionado como parametro
            $('#tabla-actividades').DataTable().destroy();
            params.ajax.data = {
                case:1,
                proceso:proceso
            };
            $('#tabla-actividades').dataTable( params );
            document.getElementById('tabla').style.display = "block";
        }else{
            document.getElementById('tabla').style.display = "hidden";
            
        }
        
    });

    $('#btn_nuevo').click(function (e) { 
        const boton_guardar = document.getElementById('btn_guardar');
        boton_guardar.setAttribute("data_guardado", "guardar");
        toggleModal('show');
        limpiarCampos();
    });

    $(window).click(function(e) {
        if (e.target.id == "myModal") {
            toggleModal('hide')
        }
    });

    $('.close').on('click', function (event) {
        toggleModal('hide')
	});

    const limpiarCampos = () => {
        $('#proceso-form_lst').val("").trigger('change');
        $('#text_subproceso').val("");
        $('#text_descripcion').val("");
        $('#fecha_ini_txt, #fecha_fin_txt').val("").trigger('change');

        $('#btn_guardar').attr("data-guardado", "guardar");
    };

});