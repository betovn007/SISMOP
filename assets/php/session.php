<?php

$v_Sistema = "sismop";

session_start();    

include("../cgi-bin/con_pg_sismop.php");
include("../tools/utilerias_STIA.php");
include("../tools/get_browser_xa.php");

header('Access-Control-Allow-Origin: *');
header_remove('x-powered-by');

$vinactivo = 900;

if(isset($_SESSION['tiempo'])){
    $vida_session = time() - $_SESSION['tiempo'];
    if($vida_session > $vinactivo){
        header($v_Sistema."_salir.php"); 
    }
}

$_SESSION['tiempo'] = time();

if(!isset($_SESSION[$v_Sistema.'Clave'])){
    header("Location: ".$v_Sistema."_home.php");
}else{
    $usrClave     = $_SESSION['sismopClave'];
    $usrNombres   = $_SESSION['sismopNombres'];
    $usrApellidos = $_SESSION['sismopApellidos'];
    $v_NombreLDAP = $usrApellidos." ".$usrNombres;
    $usrTipo      = $_SESSION['sismopTipo'];
    //$usrCdc       = $_SESSION['sismopUnidad'];
    //$usrCdc01     = $_SESSION['sismopUnidadIni'];
    //$usrCdc02     = $_SESSION['sismopUnidadFin'];
    $usrSubProg   = $_SESSION['sismopSubPrograma'];
    //$usrCurp	  = $_SESSION['sismopCurp'];
    $usrLogin     = $_SESSION['VerificaLogin'];

    $v_TituloS       = $_SESSION[$v_Sistema.'TituloS'];
}
$mensaje   = $_SESSION['mensaje'];
if($mensaje != ""){
    $v_Mensaje = "success|$mensaje|SI|20000";
    $_SESSION['mensaje'] = "";
}

?>