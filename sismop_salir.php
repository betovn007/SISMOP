<?php
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 604800,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    setcookie('usercookie', '', time()-604800, "/");
    
    session_destroy();

    header("Location: sismop_home.php"); 
?>
