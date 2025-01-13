<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController {
    public static function login(Router $router){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

        }

        $router->render('auth/login', [

        ]);
        
    }

    public static function logout(){
        
    }

    public static function recuperarCuenta(Router $router){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

        }
        
        $router->render('auth/recuperar-cuenta', [

        ]);
    }

    public static function recuperar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

        }
        
    }

    public static function crear( Router $router){
        $usuario = new Usuario;
        $alertas = [];
        
        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarNuevoUsuario();

            if(empty($alertas)){
                //Verificar que el Email no se haya registrado
                $resultado = $usuario->existeUsuario();
                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{
                    //Hashear
                    $usuario->hashPassword();
                    
                    //Generar Token
                    $usuario->crearToken();

                    //Enviar el Email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarConfirmacion();

                    //Guardamos el Usuario en la BD
                    $resultado = $usuario->guardar();

                    if($resultado){
                        header('Location: /mensaje');
                    }

                }

            }
        }

        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function confirmar(Router $router) {
        $alertas = [];

        $token = s($_GET['token']) ?? null;
        if(!$token){
            header('Location: /404');   
        }
        
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)){
            Usuario::setAlerta('error', 'El Token no es Valido');
        }else{
            $usuario->confirmado = '1';
            $usuario->token = '';

            //Actualizamos a Usuario
            $usuario->guardar();

            Usuario::setAlerta('exito', 'Tu correo ha sido confirmado con Exito');
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router) {
        $router->render('auth/mensaje');
    }

}