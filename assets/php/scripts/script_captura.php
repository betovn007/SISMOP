<?php
include("../../../../cgi-bin/con_pg_sismop.php");
include("../../../../tools/utilerias_STIA.php");

$v_Salida   = null;
$v_Error   = null;
$v_Opciones = null;
$v_Mensaje = null;

switch($_REQUEST['case']){   
    // Cargar SubProcesos
    case 1:
        // recibimos un valor por ajax y lo vamos a usar en la consulta para filtrar "where unidad_id = $valor" la consulta se debe de hacer con un prepare y un execute y es un SELECT nombre FROM datos_laborales WHERE unidad_id = $valor ORDER BY nombre ASC y luego retornamos esos valores en un obj de tipo array al ajax
        $v_unidad = $_REQUEST['unidad'];

        $rst = prepare($conn_pgCS, "get_empleados", "SELECT nombre FROM datos_laborales WHERE unidad_id = '$1' ORDER BY nombre ASC");
        $rst = execute($conn_pgCS, "get_empleados", array($v_unidad));
        $datos = array();
        while ($row = pg_fetch_assoc($rst)) {
            $v_Opciones .= "<option value='" . $row['nombre'] . "'>" . $row['nombre'] . "</option>";
        }
        $datos[] = array("opciones" => $v_Opciones);
        $datosJson["estatus"] = "Success";
        $v_Salida = json_encode($datos);
        echo $v_Salida;
    break;
    //==========================================================================================================================
    // Cargar Actividades
    case 2:
        
    break;
    //==========================================================================================================================
    // Llenar input dirección y/o coordinación
    case 3:
        
    break;
    //==========================================================================================================================
}
