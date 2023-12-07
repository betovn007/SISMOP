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

var currYear = (new Date()).getFullYear();

$(document).ready(function(){
    $('#proceso_lst').select2();
    $('#subproceso_lst').select2();
    $('#proceso-form_lst').select2();
    $('#subproceso-form_lst').select2();
    $('#proceso_modal_lst').select2();
    $('#subproceso_modal_lst').select2();
    $('#proceso_modal-form_lst').select2();
    $('#subproceso_modal-form_lst').select2();
    $('#ur_lst').select2();

    $(".datepicker").datepicker({
        maxDate: new Date((currYear + 1),12,31),
        yearRange: [currYear, (currYear + 1)],
        format: "dd/mm/yyyy"    
    });
    
    let datatable = $('#tabla-actividades').DataTable( {
        columns: [
            { title: "ID", data: "id_actividad" },
            { title: "Descripcion", data: "descripcion" },
            { title: "UR", data: "ur" },
            { title: "FECHA INICIO", data: "fecha_ini" },
            { title: "FECHA FIN", data: "fecha_fin" },
            { title: "EDITAR", data: "editar" },
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
    
    //!--------- Agregar eventos de mouseover y mouseout a las filas -----------
    $('#tabla-actividades tbody').on('mouseover', 'tr', function() {
        $(this).addClass('highlight-row');
    }).on('mouseout', 'tr', function() {
        $(this).removeClass('highlight-row');
    });

    $('#tabla-actividades').on('click', '.i_modificar', function(){
        actividad = this.getAttribute('data-revisor');
        const boton_guardar = document.getElementById('btn_guardar');
        boton_guardar.setAttribute("data_guardado", "editar");
        var form_data = new FormData();
            form_data.append("actividad", actividad);
            form_data.append("case", 2);

        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_03.php",
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
                    $('#text_descripcion').val(descripcion);
                    $('#fecha_ini_txt').val(arreglaFecha(fecha_inicio));
                    $('#fecha_fin_txt').val(arreglaFecha(fecha_fin));

                    // ? Seleccionamos las opciones de los select
                    $('#proceso_modal-form_lst').val(proceso).trigger('change');
                    setTimeout(() => {
                        $('#subproceso_modal-form_lst').val(subproceso).trigger('change');
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
        const proceso       = $('#proceso_modal-form_lst').val();
        const subproceso    = $('#subproceso_modal-form_lst').val();
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
            url: "assets/php/scripts/script_catalogo_02_03.php",
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
                    // ? Recargamos la tabla de listados
                    if (guardado == 'editar'){
                        var form_data = new FormData();
                        form_data.append("case", 1);
                        form_data.append("proceso", $('#proceso_lst').val());
                        form_data.append("subproceso", $('#subproceso_lst').val());
                        $.ajax({
                            url: "assets/php/scripts/script_catalogo_02_03.php",
                            type: 'POST',
                            // async: false,
                            data: form_data,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            success: function(response){
                                let datatable = $('#tabla-actividades').DataTable();
                                datatable.clear().draw();

                                // Agregar los nuevos datos desde la respuesta de la solicitud AJAX
                                datatable.rows.add(response.datos).draw();
                                }
                        });
                    }
                    else{
                        let proceso = $('#proceso_lst').val();
                        let subproceso =  $('#subproceso_lst').val();
                        console.log(proceso);
                        if(proceso != "" && subproceso != ""){
                            var form_data = new FormData();
                            form_data.append("case", 1);
                            form_data.append("proceso", $('#proceso_lst').val());
                            form_data.append("subproceso", $('#subproceso_lst').val());
                            $.ajax({
                                url: "assets/php/scripts/script_catalogo_02_03.php",
                                type: 'POST',
                                // async: false,
                                data: form_data,
                                dataType: 'json',
                                processData: false,
                                contentType: false,
                                success: function(response){
                                    let datatable = $('#tabla-actividades').DataTable();
                                    datatable.clear().draw();

                                    // Agregar los nuevos datos desde la respuesta de la solicitud AJAX
                                    datatable.rows.add(response.datos).draw();
                                }
                            });
                        }

                    }
                    // ? Limpiamos los campos del formulario
                    limpiarCampos();
                    // ? Cerrar modal
                    toggleModal('hide');
                }
            }
        });
    });

    $('#proceso_lst, #proceso-form_lst').change(function (e) { 
        const proceso = this.value;

        if( proceso ){
            var form_data = new FormData();
            form_data.append("proceso", proceso);
            form_data.append("case", 5);
            $.ajax({
                url: "assets/php/scripts/script_catalogo_02_03.php",
                type: 'POST',
                // async: false,
                data: form_data,
                processData: false,
                contentType: false,
                success: function(response){
                    arreglo = JSON.parse(response)
                    if( Object.keys(arreglo).length > 0 ){
                        // ? Recorre el arreglo y agrega los subprocesos al select
                        $('#subproceso_lst, #subproceso-form_lst').empty();
                        $('#subproceso_lst, #subproceso-form_lst').append('<option value="">Seleccione un subproceso</option>');
                        arreglo.forEach(subproceso => {
                            $('#subproceso_lst, #subproceso-form_lst').append(`
                                <option value="${ subproceso.id_subproceso }">
                                    ${ subproceso.id_proceso +"." + subproceso.id_subproceso + " - " + subproceso.descripcion }
                                </option>
                            `);
                        });
                    }
                }
            });
        }
    });

    $('#proceso_modal_lst,#proceso_modal-form_lst').change(function (e) { 
        const proceso = this.value;

        if( proceso ){
            var form_data = new FormData();
            form_data.append("proceso", proceso);
            form_data.append("case", 5);
            $.ajax({
                url: "assets/php/scripts/script_catalogo_02_03.php",
                type: 'POST',
                // async: false,
                data: form_data,
                processData: false,
                contentType: false,
                success: function(response){
                    arreglo = JSON.parse(response)
                    if( Object.keys(arreglo).length > 0 ){
                        // ? Recorre el arreglo y agrega los subprocesos al select
                        $('#subproceso_modal_lst , #subproceso_modal-form_lst').empty();
                        $('#subproceso_modal_lst , #subproceso_modal-form_lst').append('<option value="">Seleccione un subproceso</option>');
                        arreglo.forEach(subproceso => {
                            $('#subproceso_modal_lst, #subproceso_modal-form_lst').append(`
                                <option value="${ subproceso.id_subproceso }">
                                    ${ subproceso.id_proceso +"." + subproceso.id_subproceso + " - " + subproceso.descripcion }
                                </option>
                            `);
                        });
                    }
                }
            });
        }
    });

    $('#subproceso_lst, #subproceso-form_lst').change(function (e) { 
        var form_data = new FormData();
        form_data.append("case", 1);
        form_data.append("proceso", $('#proceso_lst').val());
        form_data.append("subproceso", $('#subproceso_lst').val());
        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_03.php",
            type: 'POST',
            // async: false,
            data: form_data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(response){
                let datatable = $('#tabla-actividades').DataTable();
                datatable.clear().draw();

                // Agregar los nuevos datos desde la respuesta de la solicitud AJAX
                datatable.rows.add(response.datos).draw();
                }
        });
        document.getElementById('tabla').style.display = "block";
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

    $('#btn_xls').click(function (e) { 

        const fecha_inicio_actividad = $('#fecha_inicio_actividad').val();
        const fecha_fin_actividad    = $('#fecha_fin_actividad').val();

        // ? Validamos que se haya seleccionado un rango de fechas
        if( fecha_inicio_actividad == "" || fecha_fin_actividad == "" ){
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                html: 'Debe seleccionar un rango de fechas para generar el reporte',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#cd2f8a',
            });
            return;
        }
        
        var forma = document.form1;
            forma.action = "planIntegral_reportes_xls.php";
            forma.method = "post";
            forma.target = "_blank";
            forma.submit();

    });

    const limpiarCampos = () => {
        $('#text_actividad').val("");
        $('#text_descripcion').val("");
        $('#proceso_modal_lst, #proceso_modal-form_lst, #subproceso_modal_lst, #subproceso_modal-form_lst, #ur_lst').val("");
        $('#fecha_ini_txt').val("");
        $('#fecha_fin_txt').val("");

        $('#btn_guardar').attr("data-guardado", "guardar");
    };

});