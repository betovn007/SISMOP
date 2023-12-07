<!--------- Data Tables by jQuery ----------->

<link  href="assets/css/dataTable.css" rel="stylesheet">
<script src="assets/js/dataTable.js"></script>

<!---------Menu Style----------->
<link rel="stylesheet" href="assets/css/menu_style.css?v=2">

<!---------General Configuration----------->
<script>
    //=============================================================
    // Función para enviar (Dropdown)
    function EnviarDropdown(clase, tipo, interes){
        //console.log('Clase: '+clase+'\nTipo: '+tipo+'\nInterés: '+interes);
        /*$('#clases_dropdown').fadeTo("fast" , 0);*/
        var media1200px = window.matchMedia("(min-width: 1200px)");
        if(media1200px.matches == false){
            alert("Tactil")
        }
    }
    //=============================================================
    // Función para enviar (Dropdown)
    function Enviar(sitio){
        //console.log('Sitio: '+sitio);
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = sitio;
        }, 600);
    }
    function Enviar1(sitio,cTabla){
        //console.log('Sitio: '+sitio);
        $('#main_container').fadeOut(600);
        setTimeout(function(){
            location.href = sitio+"?tabla="+cTabla;
        }, 600);
    }
    //=============================================================
    // Convert normal table to DataTable jquery
    $(document).ready(function (){
    });
</script>

<?php

// Recuperamos el valor del menú
$v_Menu       = $_SESSION['sismopMenu'];
$v_SubMenu    = $_SESSION['sismopMenuP'];
$v_SubMenuSub = $_SESSION['sismopMenuPS'];
$v_tipo       = $_SESSION['sismopTipo'];
$v_Usu        = trim($_SESSION['sismopClave']);
$v_Area       = $_SESSION['sismopArea'];
//echo "[" . $v_Usu . "]";

$v_Color      = 'style="color: #ff41ae;"';

switch ($v_Menu){
    case 1:
        $v_Class_1 = $v_Color;
    break;
    case 2:   
        $v_Class_2 = $v_Color;                  // Catálogos
        switch ($v_SubMenu){
            case 1:
                $v_Class_2_1 = $v_Color;
            break;
            case 2:
                $v_Class_2_2 = $v_Color;
            break;
            case 3:
                $v_Class_2_3 = $v_Color;
            break;
            case 4:
                $v_Class_2_4 = $v_Color;
            break;
            case 5:
                $v_Class_2_5 = $v_Color;
            break;
            case 6:
                $v_Class_2_6 = $v_Color;
            break;
            case 7:
                $v_Class_2_7 = $v_Color;
            break;
            case 8:
                $v_Class_2_8 = $v_Color;
            break;
            case 9:
                $v_Class_2_9 = $v_Color;
            break;
            case 10:
                $v_Class_2_10 = $v_Color;
            break;
        }
    break;
    case 3:                     // Validación
        $v_Class_3 = $v_Color;
        switch ($v_SubMenu){
            case 1:
                $v_Class_3_1 = $v_Color;
            break;
            case 2:
                $v_Class_3_2 = $v_Color;
            break;
            case 3:
                $v_Class_3_3 = $v_Color;
            break;
            case 4:
                $v_Class_3_4 = $v_Color;
            break;
        }
    break;
    case 4:                     
        $v_Class_4 = $v_Color;
        switch ($v_SubMenu){
            case 1:
                $v_Class_4_1 = $v_Color;
            break;
            case 2:
                $v_Class_4_2 = $v_Color;
            break;
            case 3:
                $v_Class_4_3 = $v_Color;
            break;
        }
    break;
    case 6:
        $v_Class_6 = $v_Color;
        switch ($v_SubMenu){
            case 1:
                $v_Class_6_1 = $v_Color;
            break;
            case 2:
                $v_Class_6_2 = $v_Color;
                switch ($v_SubMenuSub){
                    case 1:
                        $v_Class_6_2_1 = $v_Color;
                    break;
                    case 2:
                        $v_Class_6_2_2 = $v_Color;
                    break;
                    case 3:
                        $v_Class_6_2_3 = $v_Color;
                    break;
                }
            break;
            case 3:
                $v_Class_6_3 = $v_Color;
            break;
            case 4:
                $v_Class_6_4 = $v_Color;
                switch ($v_SubMenuSub){
                    case 1:
                        $v_Class_6_4_1 = $v_Color;
                    break;
                    case 2:
                        $v_Class_6_4_2 = $v_Color;
                    break;
                }
            break;
            case 5:
                $v_Class_6_5 = $v_Color;
                switch ($v_SubMenuSub){
                    case 1:
                        $v_Class_6_5_1 = $v_Color;
                    break;
                }
            break;
        }
    break;
    case 7:
        $v_Class_7 = $v_Color;
        switch ($v_SubMenu){
            case 1:
                $v_Class_7_1 = $v_Color;
            break;
            case 2:
                $v_Class_7_2 = $v_Color;
            break;
            case 3:
                $v_Class_7_3 = $v_Color;
            break;
            case 4:
                $v_Class_7_4 = $v_Color;
            break;
        }
    break;
    case 8:
        $v_Class_8 = $v_Color;
        switch ($v_SubMenu){
            case 1:
                $v_Class_8_1 = $v_Color;
            break;
        }
    break;
    case 10:
        $v_Class_10 = $v_Color;
    break;
}

?>

<!--<script src="assets/js/menu_config.js"></script> -->

<!-- Menu -->
<section id="Menu">
    <div class="Menu container">
        <div class="nav-bar">
            <div class="brand">
                <a id="b_hero_logo">
                    <h1><img src="assets/img/logo_ine_completo_svg1200.svg" alt="INE Logo" class="logo_ine_bn"></h1>
                    <!-- <h1><img src="assets/img/ine_logo_bn_hd.png" alt="INE Logo" class="logo_ine_bn"><span></span>INE</h1> -->
                </a>
            </div>
            <div class="nav-list">
                
                    <ul id="menu_list">

                        <?php if($v_tipo =='1' || $v_tipo =='2'){  ?>
                        <li class="li-dr media1200px"><a id="b_inicio" data-after="Inicio" onClick="Enviar('sismop_00.php');" <?= $v_Class_1 ?>>Inicio</a></li>
                        <li class="li-dr media1200px"><a id="usuarios" data-after="Usuarios" onClick="Enviar('sismop_01.php');" <?= $v_Class_3_1 ?>>Captura</a></li>
                        <li class="li-dr media1200px"><a id="usuarios" data-after="Usuarios" onClick="Enviar('#');" <?= $v_Class_3_2 ?>>Validación</a></li>
                        <li class="li-dr media1200px"><a id="usuarios" data-after="Usuarios" onClick="Enviar('#');" <?= $v_Class_2 ?>>Carga FUM</a></li>
                        <li class="li-dr media1200px">
                                <a data-after="Catálogos" <?= $v_Class_4 ?>>
                                    Catálogos
                                    <ion-icon name="arrow-dropdown" size="small" class="arrow-dropdown" id="AD-Clases"></ion-icon>
                                </a>
                                <ul class="sub-menu-dr" id="clases_dropdown">
                                    <li id="li-drop" onClick="Enviar('#');"><a <?= $v_Class_4_1 ?>>Catálogo 1</a></li>
                                    <li id="li-drop" onClick="Enviar('#');"><a <?= $v_Class_4_2 ?>>Catálogo 2</a></li>
                                    <li id="li-drop" onClick="Enviar('#');"><a <?= $v_Class_3_3 ?>>Catálogo 3</a></li>
                                </ul>
                            </li>
                    </li>
                    <?php } 
                    if($v_tipo =='0'){  ?>
                    <?php } ?>
                    <li class="li-dr media1200px-device">
                        <a data-after="Mi cuenta" style="color: #ff41ae;">
                            Mi cuenta
                            <ion-icon name="arrow-dropdown" size="small" class="arrow-dropdown"></ion-icon>
                        </a>
                        <ul class="sub-menu-dr" id="clases_dropdown">
                            <li id="li-drop"><a <?= $v_Class_C_1 ?> onClick="Enviar('sismop_00_01.php');">Configuración</a></li>
                            <li id="li-drop"><a class="b_csesion">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="phone_distrb">
                <div class="hamburger">
                    <div class="bar"></div>
                </div>
            </div>
            <div class="user">
                <div class="nav-list">
                    <ul id="menu_list">
                        <li>
                            <a id="b_user" data-after="Mi cuenta" style="color: #ff41ae; text-transform: uppercase;">
                                <?= $v_NombreLDAP ?>
                                <ion-icon name="arrow-dropdown" size="small" class="arrow-dropdown" id="AD-Clases"></ion-icon>
                                <img src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png" style="filter: invert(100%); position: absolute; top: 8px; right: -30px; "/>
                            </a>
                            <ul class="sub-menu-dr">
                                <li id="li-drop"><a <?= $v_Class_C_1 ?> id="b_configuracion" onClick="Enviar('sismop_00_01.php');">Configuración</a></li>
                                <li id="li-drop"><a class="b_csesion" onClick="Enviar('sismop_salir.php');">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Menu -->

<div id="data_content"></div>

<!-- Menu -->
<div class="side-bar">
    <div class="menu-list" id="close_side" style="-webkit-tap-highlight-color: transparent;">
        <ion-icon name="close-circle-outline"></ion-icon>
    </div>
    <img class="go-home" id="go-home" src="https://img.icons8.com/material/96/000000/person-at-home.png"/>
</div>
<!-- Menu -->

<!-- Marca de agua SC -->
<section class="logo_SC" id="logo_SC">
    <a id="b_sc_logo">
        <h1>
            <img alt="Sistemas complementarios Logo" class="logo_sc_bn">
        </h1>
    </a>
</section>
<!-- Marca de agua CTIA -->
<section class="logo_CTIA" id="logo_CTIA">
    <a id="b_ctia_logo">
        <h1>
            <img alt="CTIA Logo" class="logo_ctia_bn">
        </h1>
    </a>
</section>

<script type="module" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.esm.js"></script> <!-- Iconos de IONICONS-->
<script nomodule="" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.js"></script> <!--Iconos de IONICONS-->

<script src="assets/js/menu_hamburger.js"></script> <!-- Hamburger animation -->