<?php
namespace Controllers;

use Model\Cita;
use Model\CitaServicios;
use Model\Servicio;

class APIController{
    public static function index (){
        $servicios = Servicio::all();

        echo json_encode($servicios);
    }

    public static function guardar (){
        $cita = new Cita($_POST);

        //Guardamos la Cita
        $resultado = $cita->guardar();
        
        echo json_encode($resultado);
        //Extraemos el Id
        $id = $resultado['id'];

        //Guardamos las CitasServicios
        $serviciosId = explode(',', $_POST['servicioId']);

        foreach($serviciosId as $servicioId){
            $args = [
                'citaId' => $id,
                'servicioId' => $servicioId 
            ];
            $citaServicio = new CitaServicios($args);
            $citaServicio->guardar();
        }

        $respuesta = [
            'resultado' => $resultado['resultado']
        ];

        echo json_encode($respuesta);
        
    }
}