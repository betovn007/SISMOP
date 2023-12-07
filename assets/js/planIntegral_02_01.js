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
    datatable = $('#tabla-procesos').DataTable( {
		responsive: true,
		"ajax":{            
            "processing": true,
            "serverSide":true,
			"url": "assets/php/scripts/script_catalogo_02_01.php", 
			"serverMethod": 'POST',
			"data":{case:1}, 
			"dataSrc":"datos"
		},
		"deferRender": true,
		"retrieve": true,
		"processing": true,
		"aaSorting": [],
		"order": [],
        "columnDefs": [
            {
                "targets": 0,
                "className": "column-pl",
            },
            {
                "targets": 1,
                "className": "column-pl-2",
            }
        ],
        "language": {
            "emptyTable":"No hay números de OSP disponibles aún",
        },
	});
    
    //!--------- Agregar eventos de mouseover y mouseout a las filas -----------
    $('#tabla-procesos tbody').on('mouseover', 'tr', function() {
        $(this).addClass('highlight-row');
    }).on('mouseout', 'tr', function() {
        $(this).removeClass('highlight-row');
    });

    $('#tabla-procesos').on('click', '.i_modificar', function(){
        proceso = this.getAttribute('data-proceso');
        const boton_guardar = document.getElementById('btn_guardar');
        boton_guardar.setAttribute("data_guardado", "editar");
        var form_data = new FormData();
            form_data.append("proceso", proceso);
            form_data.append("case", 2);

        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_01.php",
            type: 'POST',
            // async: false,
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response){
                arreglo = JSON.parse(response)
                
                if(arreglo){
                    // ? Desestructuramos el arreglo
                    const { id_proceso, descripcion, fecha_inicio, fecha_fin } = arreglo;

                    // ? Llenamos los campos del formulario
                    $('#text_proceso').val(id_proceso);
                    $('#text_descripcion').val(descripcion);
                    $('#fecha_ini_txt').val(arreglaFecha(fecha_inicio)).trigger('change');
                    $('#fecha_fin_txt').val(arreglaFecha(fecha_fin)).trigger('change');

                    // ? Cambiamos el atributo del boton guardar
                    $('#btn_guardar').attr("data-guardado", "editar");
                }
            }
        });

        toggleModal('show');
    });

    $('#btn_guardar').click(function (e) { 
        const proceso       = $('#text_proceso').val();
        const descripcion   = $('#text_descripcion').val();
        const fecha_ini     = $('#fecha_ini_txt').val();
        const fecha_fin     = $('#fecha_fin_txt').val();
        const tipo_registro = this.getAttribute('data_guardado'); 
        let mensajeSuccess  = "";

        let form_data = new FormData();
        form_data.append("case", 3);
        form_data.append("proceso", proceso);
        form_data.append("descripcion", descripcion);
        form_data.append("fecha_ini", fecha_ini);
        form_data.append("fecha_fin", fecha_fin);
        form_data.append("tipo_registro", tipo_registro);

        if (tipo_registro == 'editar'){
            mensajeSuccess = "Registro editado";
        }else{
            mensajeSuccess = "Registro guardado";
        }

        $.ajax({
            url: "assets/php/scripts/script_catalogo_02_01.php",
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
                    $('#tabla-procesos').DataTable().ajax.reload();
                    // ? Limpiamos los campos del formulario
                    limpiarCampos();
                    // ? Cerrar modal
                    toggleModal('hide');
                }
            }
        });
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
        $('#text_proceso').val("");
        $('#text_descripcion').val("");
        $('#fecha_ini_txt, #fecha_fin_txt').val("").trigger('change');

        $('#btn_guardar').attr("data-guardado", "guardar");
    };

});