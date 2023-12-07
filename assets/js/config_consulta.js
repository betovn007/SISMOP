
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

    $('#procesos_lst').select2();
    $('#subproceso_lst').select2();
    $('#actividades_lst').select2();
    $('#porcentaje_lst').select2();
    $('#areaDEA').select2();
    $('#estatus_lst').select2();
    $('#proceso_modal_lst').select2();
    $('#subproceso_modal_lst').select2();
    $('#proceso_modal-form_lst').select2();
    $('#subproceso_modal-form_lst').select2();

    $(".datepicker").datepicker({
        maxDate: new Date(currYear,12,31),
        yearRange: [2000, currYear + 1],
        format: "dd/mm/yyyy"    
    });
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    setDateCaptura(); // * Función para establecer la fecha de captura

    let datatable = $('#tabla-seguimientos').DataTable( {
        columns: [
            { title: "ID", data: "id_seguimiento" },
            { title: "Actividad", data: "actividad" },
            { title: "Avance", data: "porcentaje" },
            { title: "Estatus", data: "estatus" },
            // { title: "FECHA FIN", data: "fecha_fin" },
            { title: "Editar", data: "editar" },
            // Agrega más columnas según tus necesidades
        ],
        "columnDefs": [
            { "targets": 0, "createdCell": function (td, cellData, rowData, row, col) {
                // Verifica si la columna es la primera (col === 0) y agrega la clase "column-pl"
                if (col === 0) {
                    $(td).addClass("column-pl");
                }
            } },
            { "targets": 1, "createdCell": function (td, cellData, rowData, row, col) {
                // Verifica si la columna es la primera (col === 0) y agrega la clase "column-pl"
                if (col === 1) {
                    $(td).addClass("column-pl-2");
                }
            } },
            { "width": "150px", "targets": 1 }
        ],
        
    });
    
    var filter_selector = $('.dataTables_length select').select2();
    if(filter_selector.length > 0){
        filter_selector.data('select2').$container.addClass("dataTable_filter");
    }

    //!------- S C R I P T S  S E L E C T O R E S
    //!---Procesos
    $('#procesos_lst').on('change', function() {
        const selectedValue = this.value;
        if( selectedValue ){
            const data = {
                id_proceso: selectedValue,
                case: 1
            };
    
            // Realizar una solicitud AJAX al archivo "ajax.php" y pasar el valor seleccionado
            $.ajax({
                url: 'assets/php/scripts/script_captura.php',
                type: 'POST',
                data: data,
                success: function(data) {
                    if( data ){
                        arreglo = JSON.parse(data)
                        mensaje = "";
    
                        if( arreglo.opciones ){
                            $("#subproceso_lst").html( '<option value="" selected>Selecciona el subproceso</option>' + arreglo.opciones );
                        }
                    }
                }
            });
        }
    });

    //!----------SubProcesos
    $('#subproceso_lst').on('change', function() {
        const selectedValue = this.value;
        const selectedProceso = $('#procesos_lst').val();
        if ( selectedValue ) {
            const data = {
                id_proceso: selectedProceso,
                id_subproceso: selectedValue,
                case: 2
            };
    
            // Realizar una solicitud AJAX al archivo "ajax.php" para cargar el tercer selector
            $.ajax({
                url: 'assets/php/scripts/script_captura.php',
                type: 'POST',
                data: data,
                success: function(data) {
                    if (data) {
                        var arreglo = JSON.parse(data);
    
                        if (arreglo.opciones) {
                            $("#actividades_lst").html('<option value="" selected>Seleccione una opción</option>' + arreglo.opciones);
                        }
                    }
                }
            });
        }
    });
    //!----------Actividades
    $('#actividades_lst').change(function(e) {
        const selectedActividad  = this.value;
        const selectedProceso    = $('#procesos_lst').val(); // Obtener el valor del primer selector
        const selectedSubproceso = $('#subproceso_lst').val(); // Obtener el valor del segundo selector
    
        if (selectedProceso !== "" && selectedSubproceso !== "" && selectedActividad !== "") {
            var form_data = new FormData();
            form_data.append("case", 7);
            form_data.append("id_actividad", selectedActividad);
    
            $.ajax({
                url: 'assets/php/scripts/script_captura.php',
                type: 'POST',
                data: form_data,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(response){
                    let datatable = $('#tabla-seguimientos').DataTable();
                    datatable.clear().draw();
    
                    // Agregar los nuevos datos desde la respuesta de la solicitud AJAX
                    datatable.rows.add(response.datos).draw();
                    }
            });
            document.getElementById('tabla').style.display = "block";
        }
    });

    //!--------- Agregar eventos de mouseover y mouseout a las filas -----------
    $('#tabla-seguimientos tbody').on('mouseover', 'tr', function() {
        $(this).addClass('highlight-row');
    }).on('mouseout', 'tr', function() {
        $(this).removeClass('highlight-row');
    });

    $('#tabla-seguimientos').on('click', '.i_modificar', function(){
        seguimiento_id = this.getAttribute('data-seguimiento');
        const boton_guardar = document.getElementById('btn_guardar');
        boton_guardar.setAttribute("data_guardado", "editar");
        var form_data = new FormData();
            form_data.append("seguimiento_id", seguimiento_id);
            form_data.append("case", 6);

        $.ajax({
            url: "assets/php/scripts/script_captura.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                
                if(arreglo){
                    // ? Desestructuramos el arreglo
                    const { actividad, fecha_inicio, fecha_termino, id_actividad, id_area, id_estatus, id_seguimiento, observaciones, porcentaje, proceso_id, subproceso_id } = arreglo;

                    // ? Llenamos los campos del formulario
                    $('#procesos_lst').val(proceso_id).trigger('change');
                    setTimeout(() => {
                        $('#subproceso_lst').val(subproceso_id).trigger('change');
                        setTimeout(() => {
                            $('#actividades_lst').val(id_actividad).trigger('change');
                        }, 1000);
                    }, 1000);

                    $('#hidClave').val(id_seguimiento);
                    $('#fecha_inicio_actividad').val(arreglaFecha(fecha_inicio)).trigger('change');
                    $('#fecha_fin_actividad').val(arreglaFecha(fecha_termino)).trigger('change');
                    $('#areaDEA').val(id_area).trigger('change');
                    $('#porcentaje_lst').val(porcentaje).trigger('change');
                    $('#estatus_lst').val(id_estatus).trigger('change');
                    $('#actividad_txt').val(actividad).trigger('change');
                    $('#observaciones').val(observaciones).trigger('change');

                    // ? Cambiamos el atributo del boton guardar
                    $('#btn_guardar').attr("data-guardado", "editar");

                    // ? Scroll al formulario
                    scrollToTop();
                }
            }
        });
        toggleModal('show');
    });

    $(window).click(function(e) {
        if (e.target.id == "myModal") {
            toggleModal('hide')
        }
    });

    $('.close').on('click', function (event) {
        toggleModal('hide')
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