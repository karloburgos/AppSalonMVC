<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController {
    public static function login(Router $router){

        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $auth = new Usuario($_POST);

            $alertas = $auth->validarLogin();

            if(empty($alertas)){
                $usuario = Usuario::where('email', $auth->email);

                //Validamos si esta el Correo
                if($usuario){
                    echo "El usuario Existe";
                    //Validamos la Contraseña y que este verificado
                    if($usuario->passwordAndConfirmado($auth->password)){
                        if(!$_SESSION){
                        session_start();
                        }

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre;
                        $_SESSION['apellido'] = $usuario->apellido;

                        if($usuario->admin === "1"){
                            $_SESSION['admin'] = $usuario->admin ?? null;
                            header('Location: /admin');
                        }else{
                            header('Location: /cita');
                        }

                        printArray($_SESSION);
                    };


                }else{
                    Usuario::setAlerta('error', 'Usuario no Encontrado');
                    $alertas = Usuario::getAlertas();
                }
            }
        }

        $router->render('auth/login', [
            'alertas' => $alertas
        ]);
        
    }

    public static function logout(){
        
    }

    public static function recuperarCuenta(Router $router){
        $alertas = [];
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();

            if(empty($alertas)){
                //Comprobar que el email exista
                $usuario = $auth->where('email', $auth->email);

                if($usuario && $usuario->confirmado === "1"){


                    //Generar Token
                    $usuario->crearToken();
                    $usuario->guardar();

                    //Enviar Email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarInstrucciones();

                    //Alerta de exito
                    Usuario::setAlerta('exito', 'Revisa tu Email y siguie las instrucciones');
                    $alertas = Usuario::getAlertas();
                }else{
                    Usuario::setAlerta('error', 'El usuario no existe o no esta confirmado');
                    $alertas = Usuario::getAlertas();
                }
            }
        }
        
        $router->render('auth/recuperar-cuenta', [
            'alertas' => $alertas
        ]);
    }

    public static function recuperar(Router $router){
        $alertas = [];
        $error = false;
        if(isset($_GET['token'])){
            $token = s($_GET['token']) ?? null;
            $usuario = Usuario::where('token', $token);
        }

        //Buscar Usuario por su Token


        if(empty($usuario)){
            Usuario::setAlerta('error', 'Token no Valido');
            $alertas = Usuario::getAlertas();
            $error = TRUE;
        }

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $password = new Usuario($_POST);
            $alertas = $password->validarPassword();

            if(empty($alertas)){
                $usuario->password = null;
                $usuario->password = $password->password;
                $usuario->hashPassword();
                $usuario->token = '';
                $resultado = $usuario->guardar();
                if($resultado){
                    header('Location: /');
                }
            }

            

        }

        $router->render('auth/recuperar', [
            'alertas' => $alertas,
            'error' => $error
        ]);
        
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