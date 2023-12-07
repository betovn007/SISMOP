<!DOCTYPE html>
<html lang="es">
<head>

    <script src="https://www.google.com/recaptcha/api.js?render=6LeGRc4UAAAAAIwlQMJVzz0Y2obd-j97NbpAqbxh"></script>
    
    <script>
        grecaptcha.ready(function (){
            grecaptcha.execute('6LeGRc4UAAAAAIwlQMJVzz0Y2obd-j97NbpAqbxh', { action: 'contact' }).then(function (token) {
                var recaptchaResponse = document.getElementById('recaptchaResponse');
                recaptchaResponse.value = token;
            });
        });
    </script>

    <?php
    //habilitar para ver errores
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    if (session_status() == PHP_SESSION_NONE){
        session_start();
    }

    $_SESSION['socket__'] = "s_nuevo";
    
    include("../cgi-bin/con_pg_sismop.php");
    // include("../cgi-bin/valida_ldap.php");
    include("../cgi-bin/valida_ldap2.php");
    include("../tools/utilerias_STIA.php");

    // ============================================================================
    // Valida sí es que existe un usuario activo

    if(isset($_SESSION['sismopClave'])){
        header("Location: sismop_00.php");
    }

    // ============================================================================
    // Inicialización de varialbes
    $v_Start = "NO";
    $v_Error = "";

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $v_Sistema = "sismop";
        $v_Start    = $_POST['Start'];
    
        // Take items
        $v_User     = $_POST['user_login'];
        $v_Pass     = json_decode(json_encode(($_POST['password_login']))); // $_RE QUEST['password_login'];
        
        // Build POST Re quest
        $v_Recaptcha_url      = 'https://www.google.com/recaptcha/api/siteverify';
        $v_Recaptcha_secret   = '6LeGRc4UAAAAAOzWD1RFtia4_P0pw-BLYGPH3Vd9';
        $v_Recaptcha_response = $_POST['recaptcha_response'];
        
        // Make and decode POST re quest
        $v_Recaptcha = file_get_contents($v_Recaptcha_url . '?secret=' . $v_Recaptcha_secret . '&response=' . $v_Recaptcha_response);
        $v_Recaptcha = json_decode($v_Recaptcha);
    }
    

    // ============================================================================
    // Inicio de Sesión

    if($v_Start == "SI"){

        if ($v_Recaptcha->score >= 0.1){

            if(validaLdap(htmlspecialchars($v_User), $v_Pass) == '9'){

                if(getPermisos(htmlspecialchars($v_User))){

                    // Obtención de objetos y datos
                    $v_Datos  = getDatos(htmlspecialchars($v_User), $v_Pass); // Del LDap
                    $arrDatos = explode("|", $v_Datos);
                    
                    $v_Datos  = getTipo($arrDatos[1]);
                    $arrInfo  = explode("|", $v_Datos);

                    // // Creación del variables de SESSION
                    $_SESSION[$v_Sistema.'Clave']      = $arrDatos[1];
					$_SESSION[$v_Sistema.'Apellidos']  = $arrDatos[3];
					$_SESSION[$v_Sistema.'Nombres']    = $arrDatos[4];
					$_SESSION[$v_Sistema.'Curp']       = $arrDatos[6];
					$_SESSION[$v_Sistema.'NC']		  = $arrDatos[10]; // Nombre completo(Empezando por apellidos)
                    $_SESSION[$v_Sistema."Puesto"]     = $arrDatos[11];
                    // ______________________________________________ $salida = $row['esquema_id'] ."|". $row['unidad_id'] ."|". $row['unidad_inicio'] ."|". $row['unidad_fin'] ."|". $row['puesto'] ."| | "
					$_SESSION[$v_Sistema.'Tipo']       = $arrInfo[0]; // esquema_id
					/*$_SESSION[$v_Sistema.'Unidad']     = $arrInfo[1]; // Unidad_id
					$_SESSION[$v_Sistema.'UnidadIni']  = $arrInfo[2]; // UnidadInicio
					$_SESSION[$v_Sistema.'UnidadFin']  = $arrInfo[3]; // UnidadFin
					$_SESSION[$v_Sistema.'Puesto1']    = $arrInfo[4]; // Puesto*/
                    $_SESSION[$v_Sistema.'Esquema1']   = $arrInfo[5]; // Descripcion
                    $_SESSION[$v_Sistema.'Esquema']    = pg_prepare($conn_pg, "get_esquema", "SELECT descripcion FROM esquemas WHERE esquema_id = $1");
                    $_SESSION[$v_Sistema.'Esquema']    = pg_execute($conn_pg, "get_esquema", array($arrInfo[0]));
                    $_SESSION[$v_Sistema.'TituloS']    = "SISMOP";
                    // var_dump($_SESSION[$v_Sistema.'Area']);
                    // // Creación de cookie de usuario(Solo sí se acepta)
                    if(isset($v_Remember)){
                        setcookie('usercookie', $v_User, time()+604800, "/");
                    }
                    
                    // Redirigimos a la pantalla principal del sistema
                    header("Location: {$v_Sistema}_00.php");
                    

                }else{
                    $v_Error = "El usuario <strong>". htmlspecialchars($_POST['usuario_txt']) ."</strong> no tiene permiso para usar esta aplicaci&oacute;n.";
                }

            }else{
                $v_Error = "Clave de usuario o contrase&ntilde;a inv&aacute;lidas<br> intenta nuevamente. Error: ". validaLdap(htmlspecialchars($_POST['usuario_txt']), $_POST['password_txt']);
            }
        
        }else{
            $v_Error = "Error [CAPTCHA]. Intente nuevamente";
        }

    }
    // validamos que el indice mensaje exista
    if(!isset($_SESSION['mensaje'])){
        $_SESSION['mensaje'] = "";
    }
//  __________________________________________________
    function getPermisos($clave){
        global $conn_pg;
        $salida = false;
        $rst = pg_prepare($conn_pg, "get_permisos", "SELECT usuario_id FROM usuarios WHERE usuario_id = $1 and estatus = 'ACTIVO'");
        $rst = pg_execute($conn_pg, "get_permisos", array($clave));
        while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) {   
            $salida = true;
        }
        pg_free_result($rst);
        return $salida;
    }
//  __________________________________________________    
    function getTipo($clave){
        global $conn_pg;
        $salida = "";
        $rst = pg_prepare($conn_pg, "get_tipo", "SELECT u.esquema_id, e.descripcion FROM usuarios as u , esquemas as e WHERE u.usuario_id = $1 and u.esquema_id=e.esquema_id");
        $rst = pg_execute($conn_pg, "get_tipo", array($clave));

        while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) {   
            $salida = $row['esquema_id']  ."|" . $row["descripcion"] . "| |"; 
        }
        pg_free_result($rst);
        return $salida;
    }
?>

    <title>Integración de actividades del Plan Integral</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-------------General Style's--------------->
    
    <link rel="stylesheet" href="assets/css/login_style.css">
    <!------------JQuery library's-------------->

    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <!------------Sweetalert library's-------------->
    
    <script src="assets/js/sweetalert2.all.min.js"></script>

    <!------------Icons library's-------------->

    <script src="https://kit.fontawesome.com/a81368914c.js"></script>
    <script src="../tools/utilerias_STIA2.js?v=1"></script>

    <script language="JavaScript">
        //cifrado de contraseña para homes v2 

        $(document).ready(function () {
            $('#b_iniciar').click(function(){
                var txtPassWord = $('#password_login').val();
                var encriptado = SubmitsEncry(txtPassWord);
                $('#password_login').val(encriptado);
            });
        });
        // function ObtPass() {
        // 	var txtPassWord = document.getElementById("txtPws").value.trim();
        // 	var encriptado = SubmitsEncry(txtPassWord);
        // 	document.getElementById("txtPws").value = encriptado;
        // }    
    </script>

</head>
<body>

    <?php
        if($v_Error != ""){
            echo 
            "<script> 
                Swal.fire({
                    icon: 'error',
                    title: 'Alerta!',
                    html: '$v_Error',
                }); 
            </script>";
        }
    ?>

    <div id="main_container" style="display: none;">
        <div class="logo" style="position: absolute; top: 8px;">
            <img src="assets/img/logo_ine_hd.svg" alt="Ine logo" style="user-select: none;" class="logo">
        </div>
        <div class="brand">
            <h1><span>Integración de actividades del Plan Integral</span></h1>
        </div>
        <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#d30076" fill-opacity="1" d="M0,96L48,133.3C96,171,192,245,288,256C384,267,480,213,576,176C672,139,768,117,864,128C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>

        <div class="container">
            <div class="img">
                <img src="assets/img/sesion_background_gd4.svg">
            </div>
            <div class="login-content">
                <form name="form1" id="form1" method="post" action="sismop_home.php" enctype="application/x-www-form-urlencoded">

                    <input type="hidden" name="Start" id="Start">
                    <input type="hidden" name="recaptcha_response" id="recaptchaResponse">

                    <img class="avatar" src="assets/img/icono_perfil_p1.svg" style="user-select: none;">
                    <h2 class="title">Bienvenido</h2>
                    <!--Datos de logeo-->
                    <div id="login">
                        <div class="input-div one">
                            <div class="i">
                                <i class="fas fa-user" id="i_user"></i>
                            </div>
                            <div class="div">
                                <h5 style="user-select: none; z-index: 99;">Usuario</h5>
                                <input type="email" class="input" spellcheck='false' name="user_login" id="user_login" onkeypress="return permite(event, 'user');">
                            </div>
                        </div>
                        <div class="input-div pass">
                            <div class="i"> 
                                <i class="fas fa-lock" id="i_pass"></i>
                            </div>
                            <div class="div">
                                <h5 style="user-select: none;">Contraseña</h5>
                                <input type="password" class="input" spellcheck='false' name="password_login" id="password_login">
                            </div>
                        </div>
                        <div class="form-field-button">
                            <a class="btn efecto" id="b_iniciar">
                                <span>Iniciar Sesión</span>
                            </a>
                        </div>
                    </div>
                    <!--Fin de datos de logeo-->

                </form>
            </div>
        </div>
        <div id="errors"></div>

        <script type="text/javascript" src="assets/js/login_config.js?v=1"></script><!-- General Configuration -->
    </div>

    <?php include("sismop_footer_nuevo.php"); ?>

    <script>
        grecaptcha.ready(function(){
            grecaptcha.execute('6LdbltIUAAAAAG9GvYfgMKg5qT2OYvxDw3_qK-kA', {
                action: 'homepage'
            }).then(function(token) {
                document.getElementById("token").value = token;
            });
        });
    </script>
    <?php
    pg_close($conn_pg);
    ?>
</body>
</html>