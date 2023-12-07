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
        $proceso = $_REQUEST['proceso'];
        $subproceso = $_REQUEST['subproceso'];
        $datosJson = '{
            "datos": [';

                $con_datos = false;
                $rst = pg_prepare($conn_pg, "get_actividades", "SELECT * FROM actividades WHERE id_proceso = $1 and id_subproceso = $2 ORDER BY id_actividad");
                $rst = pg_execute($conn_pg, "get_actividades", array($proceso,$subproceso));
                if(pg_num_rows($rst) == 0){
                    $datosJson .= "";
                }
                while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) { 
                        $boton_modificar = "<a class='i_modificar' data-revisor='".$row['id_actividad']."'><ion-icon class='editar' name='create'></ion-icon></a>";
                        //---------------------------------------------------------------------------------------------------------
                        
                        $datosJson .='{
                            "id_actividad":"'.$row['id_actividad'].'",
                            "descripcion":"'.$row['descripcion'].'",
                            "ur":"'.$row['ur'].'",
                            "fecha_ini":"'.getFormatoFechaPaginas($row['fecha_inicio']).'",
                            "fecha_fin":"'.getFormatoFechaPaginas($row['fecha_fin']).'",
                            "editar":"'.$boton_modificar.'"
                        },';
                        $con_datos = true;
                }
        
                if($con_datos){
                    $datosJson = substr($datosJson, 0,-1);  	
                }
                $datosJson .= '] 
            }';
            
        echo $datosJson;

    break;
    case 2:
        $actividad = $_REQUEST['actividad'];
        $arreglo           = array();
        $rst_get = pg_prepare($conn_pg, "get_actividad", "SELECT * FROM actividades WHERE id_actividad = $1");
        $rst_get = pg_execute($conn_pg, "get_actividad", array( $actividad ));
        if ( $row = pg_fetch_row($rst_get, NULL, PGSQL_ASSOC) ) {
            $arreglo['id_actividad'] = $row['id_actividad'];
            $arreglo['descripcion']  = $row['descripcion'];
            $arreglo['ur']           = $row['ur'];
            $arreglo['fecha_inicio'] = $row['fecha_inicio'];
            $arreglo['fecha_fin']    = $row['fecha_fin'];
            $arreglo['proceso']      = $row['id_proceso'];
            $arreglo['subproceso']   = $row['id_subproceso'];
        }
        echo json_encode($arreglo);	
    break;
    case 3:
        $actividad = $_REQUEST['actividad'];
        $v_Error = "";
        $result = pg_prepare($conn_pg, "update_actividades", 'UPDATE actividades SET descripcion = $1, ur = $2,fecha_inicio = $3,fecha_fin = $4 WHERE id_actividad = $5');
        $result = pg_execute($conn_pg, "update_actividades", array($_REQUEST['descripcion'],$_REQUEST['ur'],$_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'],$actividad));
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

        $result = pg_prepare($conn_pg, "insert_actividades", 'INSERT INTO actividades VALUES (default, $1,$2,$3,$4,$5,$6)');
        $result = pg_execute($conn_pg, "insert_actividades", array($_REQUEST['descripcion'],$_REQUEST['ur'],$_REQUEST['fecha_ini'],$_REQUEST['fecha_fin'],$_REQUEST['proceso'],$_REQUEST['subproceso'])) or die(pg_last_error());
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
        
        $rst_get = pg_prepare($conn_pg, "get_subprocesos", "SELECT id_proceso, id_subproceso, descripcion FROM subprocesos WHERE id_proceso = $1 ORDER BY id_proceso, id_subproceso;");
        $rst_get = pg_execute($conn_pg, "get_subprocesos", array( $proceso ));
        $row     = pg_fetch_all($rst_get);

        echo json_encode($row);	
    break;
}


?>