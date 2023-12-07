<!DOCTYPE html>
<html lang="en">
<head>

    <?php
    // PHP referente a todo lo de sessión
    include("assets/php/session.php");

    $_SESSION[$v_Sistema.'Menu']   = 3;
    $_SESSION[$v_Sistema.'MenuP']  = 1;
    $_SESSION[$v_Sistema.'MenuPS'] = 0;

    // Declaración de variables
    $v_tramite = $_REQUEST['no_tramite'];
    // $v_subprocesos = $_REQUEST['subprocesos_txt'];
    // $v_actividades = $_REQUEST['actividades_txt'];
    // $v_direccion = $_REQUEST['direccion'];
    // $v_fechaIni = $_REQUEST['fecha_inicio_progr'];
    // $v_fechaFin = $_REQUEST['fecha_final_progr'];

    // $v_direccionCaptura = $_REQUEST['areaDEA'];
    // $v_fechaCaptura = $_REQUEST['fecha_captura_txt'];
    // $v_fechaIniCap = $_REQUEST['fecha_inicio_actividad'];
    // $v_fechaFinCap = $_REQUEST['fecha_fin_actividad'];
    // $v_avance = $_REQUEST['porcentaje_lst'];
    // $v_actividadCap = $_REQUEST['actividad_txt'];
    // $v_observaCap = $_REQUEST['observaciones'];
    
    ?>

    <title><?php $v_TituloS ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-------------General Style's--------------->
    
    <link rel="stylesheet" href="assets/css/panel_style.css">
    <!------------JQuery library's-------------->
    
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <!------------Calendar Takataka library's-------------->

    <script src="assets/js/calendarTktk.min.js"></script>
    <link rel="stylesheet" href="assets/css/calendarTktk.min.css">
    <!---------General Configuration----------->
    
    <script src="assets/js/panel_config.js"></script>
    <script src="assets/js/config_captura.js"></script>
    <!---------Push notifications----------->
    
    <script src="assets/js/push.min.js"></script>
    <!------------Sweetalert library's-------------->
    
    <script src="assets/js/sweetalert2.all.min.js"></script>

    <!------------Select2 jQuery library's-------------->
    
    <script src="assets/js/select2/select2.min.js"></script>
    <link rel="stylesheet" href="assets/js/select2/select2.min.css">
    
    <!---------Material icons to input file----------->

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!---------Global alerts and him utilities----------->
    
    <link rel="stylesheet" href="assets/css/gl_alerts.css">
    
    <script src="assets/js/gl_alerts.js"></script>
    
    <script src="https://kit.fontawesome.com/e0d3b41532.js" crossorigin="anonymous"></script> <!-- Iconos fontawesome -->
    
    <!----------------------------------------------->

    <script src="../tools/utilerias_STIA.js"></script>
    <?php

    if($v_Browser != "Mozilla Firefox"){ ?>

        <style>
            .data-form .input-text:focus + .label,
            .data-form .input-text:valid + .label{
                -webkit-text-fill-color: transparent;
            }
        </style>

        <?php
    }else{ ?>

        <style>
            .tablex.info .body{
                padding-right: 100px;
            }
            @media screen and (max-width: 900px){
                .tablex.info .body{
                    padding-right: inherit;
                }
            }
        </style>

        <?php
    }

    ?>

    <style>
        .select2-container--default.select2-container--focus .select2-selection--multiple {
        /* .select2-container-multi .select2-choices { */
            height: auto !important;
            height: 1%;
            margin: 0;
            padding: 0 5px 0 0;
            position: relative;
            border: 1px solid #aaa;
            cursor: text;
            overflow: hidden;
            background-color: #fff;
            background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(1%, #eee), color-stop(15%, #fff));
            background-image: -webkit-linear-gradient(top, #eee 1%, #fff 15%);
            background-image: -moz-linear-gradient(top, #eee 1%, #fff 15%);
            background-image: linear-gradient(to bottom, #eee 1%, #fff 15%);
        }
        .select2-container--default .select2-selection--multiple{
            height: auto !important;
            min-height: 45px;
        }
        .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
            background-color: transparent;
            border: none;
            border-right: 1px solid #aaa;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            color: #cd2f8a;
            cursor: pointer;
            font-size: 1.1em;
            font-weight: bold;
            padding: 0 4px;
            transition: .3s ease;
            padding-right: 6px;
        }
        .select2-container--default.select2-container--disabled .select2-selection--single {
            background-color: #ffecf8;
        }

        .swal2-popup{
            font-size: 1.5rem;
        }
        .swal2-content{
            text-align: left !important;
        }
        .activar_tbl{
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            box-shadow: none;
            text-decoration: underline;
            cursor: pointer;
            user-select: none;
            transition: .3s ease all;
        }

        .activar_tbl:hover{
            color: #1bb420;
        }

        .no-white-space td{
            white-space: initial;
        }

        @media screen and (max-width: 950px){
            .align-by-width{
                justify-content: center !important;
                margin-right: 0 !important;
            }
        }
    </style>

    <div id="focus-table"></div>

</head>
<body>
    <div id="main_container" style="display: none;">
            
        <?php include('sismop_menu_principal.php'); ?>

        <div id="gl-alerts"></div>

        <?php

        if($v_Mensaje != ""){

            include('assets/php/gl_alerts.php');

        }
        
        ?>

        <section class="datos-personales">
            <div class="container-data">
                <div class="data-form">
                    <div class="wrapper">
                        <input type="hidden" name="hidUser" id="hidUser" value="<?= $usrClave ?>">
                        <form name="form1" id="form1" method="post" action="<?= htmlspecialchars($PHP_SELF, ENT_QUOTES) ?>">
                            <br><br><br>
                            <h1 class="title">Captura Actividades DEA</h1>
                            <br><br><br>
                            <input type="hidden" name="hidActividad" id="hidActividad" value="">
                            <input type="hidden" name="hidClave" id="hidClave" value="">
                            <div class="form-field inline-block-input">
                                <input type="text" name="no_tramite" id="no_tramite" value="" class="input-text" required onkeyup="this.title=this.value;"> 
                                <label for="no_tramite" class="label">No de Trámite</label>
                            </div>
                            <div class="form-field inline-block-input fecha_label" id="fecha_label">
                                <input type="text" name="fecha_captura_txt" id="fecha_captura_txt" value="<?php echo $v_fechaCaptura; ?>" class="input-text input-readonly" required onkeyup="this.title=this.value;" readonly>
                                <label for="fecha_captura_txt" class="label">Fecha Captura:</label>
                            </div>
                            <div class="inline-block-list">
                                <p data-name="tramites_lst" class="titles <?php echo "titles-filled"; ?>">Tipos de Trámites:</p>
                                <div class="box">
                                    <select name="tramites_lst" id="tramites_lst" class="select-input">
                                        <option value="" selected>Seleccione  una opción</option>
                                        <?php 
                                            $sql  = "SELECT * FROM cat_tramites ORDER BY id ASC";
                                            $rst = pg_query($conn_pg, $sql) or die ($error_fatal . "<br>" . $sql);	
                                            while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) { ?>
                                            <option value="<?php echo $row['id'] ?>"> <?php echo $row['descripcion'];?></option>
                                            <?php }
                                                pg_free_result($rst);
                                            ?>
                                    </select>
                                </div>
                            </div>
                            <div class="inline-block-list">
                                <p data-name="areaDEA" class="titles <?php echo "titles-filled"; ?>">Unidad Responsable:</p>
                                <div class="box">
                                    <select name="areaDEA" id="areaDEA" class="select-input">
                                        <option value="" selected>Seleccione  una opción</option>
                                        <?php 
                                            $sql  = "SELECT * FROM cat_areas ORDER BY id ASC";
                                            $rst = pg_query($conn_pg, $sql) or die ($error_fatal . "<br>" . $sql);	
                                            while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) { ?>
                                            <option value="<?php echo $row['id'] ?>"> <?php echo $row['nomenclatura']. " - ".  $row['descripcion'];?></option>
                                            <?php }
                                            pg_free_result($rst);
                                            ?>
                                    </select>
                                </div>
                            </div>
                            <div class="box">
                                <input type="radio" name="select" id="option-1" value="">
                                <input type="radio" name="select" id="option-2" value="">
                                    <label for="option-1" class="option-1 pointer">
                                        <div class="dot"></div>
                                        <div class="text">Aspirante</div>
                                    </label>
                                    <label for="option-2" class="option-2 pointer">
                                        <div class="dot"></div>
                                        <div class="text">Empleado</div>
                                    </label>
                            </div>
                            <div class="seleccion-1">
                                <div class="form-field inline-block-input fecha_label" id="fecha_label" style="width: 35% !important">
                                    <input type="text" name="nombre_txt" id="nombre_txt" value="" class="input-text" required onkeyup="this.title=this.value;">
                                    <label for="nombre_txt" class="label">Nombre(s):</label>
                                </div>
                                <div class="form-field inline-block-input oficio_label" style="width: 25% !important">
                                    <input type="text" name="aPaterno_txt" id="aPaterno_txt" value="" class="input-text" required onkeyup="this.title=this.value;">
                                    <label for="aPaterno_txt" class="label">Apellido Paterno</label>
                                </div>
                                <div class="form-field inline-block-input partidas_label" style="width: 25% !important">
                                    <input type="text" name="aMaterno_txt" id="aMaterno_txt" value="" class="input-text" required onkeyup="this.title=this.value;"> 
                                    <label for="aMaterno_txt" class="label">Apellido Materno</label>
                                </div>
                            </div>
                            <div class="seleccion-2">
                                <div class="inline-block-list">
                                    <p data-name="unidad_empleado" class="titles <?php echo "titles-filled"; ?>">Unidad Empleado:</p>
                                    <div class="box">
                                        <select name="unidad_empleado" id="unidad_empleado" class="select-input">
                                            <option value="" selected>Seleccione  una opción</option>
                                            <?php 
                                                $sql  = "SELECT unidad_id, unidad_desc FROM unidades ORDER BY unidad_id ASC";
                                                $rst = pg_query($conn_pgCS, $sql) or die ($error_fatal . "<br>" . $sql);	
                                                while ($row = pg_fetch_row($rst, NULL, PGSQL_ASSOC)) { 
                                            ?>
                                            <option value="<?php echo $row['unidad_id'] ?>"> <?php echo $row['unidad_id']." | ".$row['unidad_desc'];?></option>
                                            <?php }
                                                pg_free_result($rst);
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="inline-block-list">
                                    <p data-name="nombre_empleado" class="titles <?php echo "titles-filled"; ?>">Empleado:</p>
                                    <div class="box">
                                        <select name="nombre_empleado" id="nombre_empleado" class="select-input">
                                            <option value="" selected>Seleccione  una opción</option>

                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="form-field-button" style="flex-direction: initial;">
                                <a class="btn efecto" id="btn_guardar" style="margin-left: 15px;" data-guardado="guardar">
                                    <span>Guardar</span>
                                </a>
                                <a class="btn efecto" id="btn_nuevo" style="margin-left: 15px;">
                                    <span>Nuevo</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script type="module" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.esm.js"></script> <!--Iconos de IONICONS-->
    <script nomodule="" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.js"></script> <!--Iconos de IONICONS-->
    <?php
    pg_close($conn_pg);
    ?>

</body>
</html>