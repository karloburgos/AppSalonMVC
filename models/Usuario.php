<?php

namespace Model;

class Usuario extends ActiveRecord{
    //Base de Datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'email', 'telefono', 'admin', 'confirmado', 'token', 'password'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;
    public $password;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
        $this->password = $args['password'] ?? '';
    }

    //Mensajes de Validación para la creación de la cuenta
    public function validarNuevoUsuario(){
        if(!$this->nombre){
            self::$alertas['error'][] = 'El Nombre es Oblogatorio';
        }
        if(!$this->apellido){
            self::$alertas['error'][] = 'El Apellido es Oblogatorio';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Oblogatorio';
        }
        if(!$this->telefono){
            self::$alertas['error'][] = 'El Telefono es Oblogatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Oblogatorio';
        }
        if(strlen($this->password) < 8){
            self::$alertas['error'][] = "El password debe contener al menos 8 caracteres";
        }

        return self::$alertas;
    }

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = "No has Ingresado un Email";
        }
        if(!$this->password){
            self::$alertas['error'][] = "No has Ingresado un Password";
        }

        return self::$alertas;
    }

    public function existeUsuario(){
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";

        $resultado = self::$db->query($query);
        if($resultado->num_rows === 1){
            self::$alertas['error'][] = "El correo que estas intentando registrar ya esta registrado";
        }

        return $resultado;
    }

    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken(){
        $this->token = uniqid();
    }

    public function passwordAndConfirmado($password){
        $resultado = password_verify($password, $this->password);

        if($resultado){
            //Comprobar si esta verificado
            if(!$this->confirmado){
                return false;
            }
        }

        return $resultado;
    }
}