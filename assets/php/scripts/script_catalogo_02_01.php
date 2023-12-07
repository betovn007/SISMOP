    <?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("../../../../cgi-bin/con_pg_planIntegral.php");
include("../../../../cgi-bin/valida_ldap.php");
include("../../../../tools/utilerias_STIA.php");
session_start();
switch ($_REQUEST['case']) {
    case 1:
        // ? Definimos el arreglo de datos
        $datos   = array();

        $rst = pg_prepare($conn_pg, "get_procesos", "SELECT * FROM procesos;");
        $rst = pg_execute($conn_pg, "get_procesos", array());
        while ($row = pg_fetch_assoc($rst)) {
            // ? Definimos las variables
            $boton_modificar = "<button type='button' class='btn_table i_modificar' data-proceso='".$row['id_proceso']."'><ion-icon class='editar' name='create'></ion-icon></button>";

            // ? Guardamos los datos en el arreglo
            $datos[] = array(
                $row['id_proceso'],
                $row['descripcion'],
                getFormatoFechaPaginas($row['fecha_inicio']),
                getFormatoFechaPaginas($row['fecha_fin']),
                $boton_modificar
            );
        }

        $datosJson = array("datos" => $datos);
        echo json_encode($datosJson);
    break;
    case 2:
        $proceso = $_REQUEST['proceso'];
        $arreglo           = array();
        $rst_get = pg_prepare($conn_pg, "get_proceso", "SELECT * FROM procesos WHERE id_proceso = $1");
        $rst_get = pg_execute($conn_pg, "get_proceso", array( $proceso ));
        if ( $row = pg_fetch_row($rst_get, NULL, PGSQL_ASSOC) ) {
            $arreglo['id_proceso']   = $row['id_proceso'];
            $arreglo['descripcion']  = $row['descripcion'];
            $arreglo['fecha_inicio'] = $row['fecha_inicio'];
            $arreglo['fecha_fin']    = $row['fecha_fin'];
        }
        echo json_encode($arreglo);	
    break;
    case 3:
        $v_Error        = "";
        $tipo_registro  = $_REQUEST['tipo_registro'];

        if( $tipo_registro == "editar" ){
            $proceso = $_REQUEST['proceso'];
            $result = pg_prepare($conn_pg, "update_procesos", 'UPDATE procesos SET descripcion = $1, fecha_inicio = $2, fecha_fin = $3 WHERE id_proceso = $4');
            $result = pg_execute($conn_pg, "update_procesos", array($_REQUEST['descripcion'],$_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'],$proceso));
        }else
        if( $tipo_registro == "guardar" ){
            $result = pg_prepare($conn_pg, "insert_procesos", 'INSERT INTO procesos VALUES (default, $1,$2,$3)');
            $result = pg_execute($conn_pg, "insert_procesos", array($_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'],$_REQUEST['descripcion'])) or die(pg_last_error());
        }
        if( ! $result ){
            $v_Error .= "update_procesos";   
        }
        // Creamos objetos para envíar un JSON
        $obj = new stdClass();
        $obj->error = $v_Error;
        $v_Salida = json_encode($obj);

        // Devuelve el JSON
        echo $v_Salida; 
    break;
    case 5:
        $proceso = $_REQUEST['proceso'];
        
        $rst_get = pg_prepare($conn_pg, "get_subprocesos", "SELECT id_proceso, id_subproceso, descripcion FROM subprocesos WHERE id_proceso = $1 ORDER BY id_proceso, id_subproceso;");
        $rst_get = pg_execute($conn_pg, "get_subprocesos", array( $proceso ));
        $row     = pg_fetch_all($rst_get);

        echo json_encode($row);	
    break;
}


?>