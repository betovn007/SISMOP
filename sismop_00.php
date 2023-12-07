<!DOCTYPE html>
<html lang="es">
<head>

    <?php

    // include("../cgi-bin/con_pg_sismop.php");
    // include("../tools/utilerias_STIA.php");
    // include("../tools/get_browser_xa.php");
    include("assets/php/session.php");
    //include("planIntegral_00_00CtasSesion.php") // Variables de Sesion
    ?>

    <title><?= $v_TituloS ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-------------General Style's--------------->
    
    <link rel="stylesheet" href="assets/css/panel_style.css">
    <!------------JQuery library's-------------->
    
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <!---------General Configuration----------->
    
    <script src="assets/js/panel_config.js"></script>
    <!---------Push notifications----------->
    
    <script src="assets/js/push.min.js"></script>
    <!------------Sweetalert library's-------------->
    
    <script src="assets/js/sweetalert2.all.min.js"></script>

    <!------------Select2 jQuery library's-------------->
    
    <script src="assets/js/select2/select2.min.js"></script>
    <link rel="stylesheet" href="assets/js/select2/select2.min.css">
    
    <!---------Global alerts and him utilities----------->
    
    <link rel="stylesheet" href="assets/css/gl_alerts.css">
    
    <script src="assets/js/gl_alerts.js"></script>
    
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js"></script> -->
    <!-- <script src="https://kit.fontawesome.com/6d0c0ff97f.js" crossorigin="anonymous"></script> -->
    
    <!----------------------------------------------->

    <script src="../tools/utilerias_STIA.js"></script>

    <script>
        $(document).ready(function (){

            $('#unidad_lst').select2();

        });

    </script>
    
    <?php

    if($v_Browser != "Mozilla Firefox"){ ?>
        <style>
            .data-form .input-text:focus + .label,
            .data-form .input-text:valid + .label{
                -webkit-text-fill-color: transparent;
            }
        </style>
    <?php
        } 
    ?>

    <style>

        .swal2-popup{
            font-size: 1.5rem;
        }

        @media screen and (max-width: 900px){
            .title{
                width: initial !important;
            }
        }

    </style>

    <div id="focus-table"></div>

</head>
<body>

    <input type="hidden" id="s_usuario" value="<?= $s_Usuario ?>">

    <div id="main_container" style="display: none;">
            
        <?php include('sismop_menu_principal.php'); ?>

        <div id="gl-alerts"></div>

        <section class="datos-personales">
            <br><br><br>
            <h1 class="title" style="width: 70%; margin: 0 auto;"><?= $v_TituloS ?></h1>
            <div class="container-data" style="min-height: 300px;">
            </div>
            
        </section>
    </div>
    <?php
    pg_close($conn_pg);
    ?>
</body>
</html>