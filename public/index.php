<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\APIController;
use Controllers\CitaController;
use MVC\Router;
use Controllers\LoginController;

$router = new Router();

//Iniciar Sesion
$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->POST('/logout', [LoginController::class, 'logout']);

//Recupersr Password
$router->get('/recuperar-cuenta', [LoginController::class, 'recuperarCuenta']);
$router->post('/recuperar-cuenta', [LoginController::class, 'recuperarCuenta']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

//Crear Cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crear']);
$router->post('/crear-cuenta', [LoginController::class, 'crear']);

//Confirmar Cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

//Area Privada
$router->get('/cita', [CitaController::class, 'index']);

//API Controller
$router->get('/api/servicios', [APIController::class, 'index']);


// Comprobar Rutas
$router->comprobarRutas();