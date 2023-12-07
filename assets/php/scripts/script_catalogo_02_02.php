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
        $proceso = $_REQUEST['proceso'];
        if ($proceso!=""){
            $rst = pg_prepare($conn_pg, "get_actividades", "SELECT * FROM subprocesos WHERE id_proceso = $1 ORDER BY id_proceso");
            $rst = pg_execute($conn_pg, "get_actividades", array($proceso));
            while ($row = pg_fetch_assoc($rst)) {
                // ? Definimos las variables
                $boton_modificar = "<a class='i_modificar' data-proceso='".$row['id_proceso']."' data-subproceso='".$row['id_subproceso']."'><ion-icon class='editar' name='create'></ion-icon></a>";

                // ? Guardamos los datos en el arreglo
                $datos[] = array(
                    $row['id_proceso'],
                    $row['id_subproceso'],
                    $row['descripcion'],
                    getFormatoFechaPaginas($row['fecha_inicio']),
                    getFormatoFechaPaginas($row['fecha_fin']),
                    $boton_modificar
                );
            }
        }
        
        $datosJson = array("datos" => $datos);
        echo json_encode($datosJson);
    break;
    case 2:
       
        $actividad = $_REQUEST['actividad'];
        $subproceso = $_REQUEST['subproceso'];
        $arreglo           = array();
        $rst_get = pg_prepare($conn_pg, "get_actividad", "SELECT * FROM subprocesos WHERE id_proceso = $1 AND id_subproceso = $2");
        $rst_get = pg_execute($conn_pg, "get_actividad", array( $actividad, $subproceso ));
        if ( $row = pg_fetch_row($rst_get, NULL, PGSQL_ASSOC) ) {
            // $arreglo['id_actividad'] = $row['id_actividad'];
            $arreglo['descripcion']  = $row['descripcion'];
            // $arreglo['ur']           = $row['ur'];
            $arreglo['fecha_inicio'] = $row['fecha_inicio'];
            $arreglo['fecha_fin']    = $row['fecha_fin'];
            $arreglo['proceso']      = $row['id_proceso'];
            $arreglo['subproceso']   = $row['id_subproceso'];
        }
        echo json_encode($arreglo);	
    break;
    case 3:
        $proceso = $_REQUEST['proceso'];
        $subproceso = $_REQUEST['subproceso'];
        $v_Error = "";
        $result = pg_prepare($conn_pg, "update_actividades", 'UPDATE subprocesos SET descripcion = $1,fecha_inicio = $2,fecha_fin = $3 WHERE id_proceso = $4 AND id_subproceso=$5');
        $result = pg_execute($conn_pg, "update_actividades", array($_REQUEST['descripcion'],$_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'],$proceso,$subproceso));
        if(!$result){
            $v_Error .= "update_actividades";   
        }
        // Creamos objetos para envíar un JSON
        $obj = new stdClass();
        $obj->error = $v_Error;
        $v_Salida = json_encode($obj);

        // Devuelve el JSON
        echo $v_Salida; 
    break;
    case 4:
        $v_Error = "";
        $proceso = $_REQUEST['proceso'];
        $subproceso = $_REQUEST['subproceso'];
        $result = pg_prepare($conn_pg, "insert_actividades", 'INSERT INTO subprocesos VALUES ($1,$2,$3,$4,$5)');
        $result = pg_execute($conn_pg, "insert_actividades", array($proceso,$subproceso,$_REQUEST['descripcion'],$_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'])) or die(pg_last_error());
        if(!$result){
            $v_Error .= "insert_actividades";   
        }
        // Creamos objetos para envíar un JSON
        $obj = new stdClass();
        $obj->error = $v_Error;
        $v_Salida = json_encode($obj);

        echo $v_Salida; 
    break;
    case 5:
        $proceso = $_REQUEST['proceso'];
        $subproceso = $_REQUEST['subproceso'];
        $rst_get = pg_prepare($conn_pg, "get_subprocesos", "SELECT id_proceso, id_subproceso, descripcion FROM subprocesos WHERE id_proceso = $1 and id_subproceso = $2 ORDER BY id_proceso;");
        $rst_get = pg_execute($conn_pg, "get_subprocesos", array( $proceso, $subproceso ));
        $row     = pg_fetch_all($rst_get);

        echo json_encode($row);	
    break;
}


?>