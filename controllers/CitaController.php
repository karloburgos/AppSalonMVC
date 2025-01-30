<?php

namespace Controllers;

use MVC\Router;

class CitaController {
    public static function index (Router $router){
        if(!$_SESSION){
            session_start();
        }
        isAuth();


        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'] . " " . $_SESSION['apellido'],
            'id' => $_SESSION['id']
        ]);
    }
}