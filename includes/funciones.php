<?php

function printArray($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

//Comprobación de Inicio de Sessión
function isAuth ():void{
    if(!isset($_SESSION['login'])){
        header('Location: /');
    }
}