<?php

$v_Opciones = explode('|', $v_Mensaje);

$v_Type    = $v_Opciones[0];
$v_Msg     = $v_Opciones[1];
$v_G_time  = $v_Opciones[2];
$v_Time    = $v_Opciones[3];

switch ($v_Type){

    case 'success':
        echo "<script>gl_success('$v_G_time', '$v_Time', '$v_Msg');</script>";
    break;

    case 'warning':
        echo "<script>gl_warning('$v_G_time', '$v_Time', '$v_Msg');</script>";
    break;

    case 'error':
        echo "<script>gl_error('$v_G_time', '$v_Time', '$v_Msg');</script>";
    break;

    case 'info':
        echo "<script>gl_info('$v_G_time', '$v_Time', '$v_Msg');</script>";
    break;
    
}

?>