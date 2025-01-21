<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        //Crear el Objeto email
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '6d248d37c524cd';
        $mail->Password = '3a8c23d60cdff0';

        $mail->setFrom('Cuentas@appsalon.com', 'Appsalon.com');
        $mail->addAddress($this->email);
        $mail->Subject = 'Confirma tu Cuenta';

        //Set html
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en appSalon.com</p>";
        $contenido .= "<p>Para continuar con tu registro porfavor haz click en el siguiente enlace para confirmar tu correo electronico</p>";
        $contenido .= "<p>Has Click Aqui: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar este correo</p>"; 
        $contenido .= "</html>";     
        
        $mail->Body = $contenido;

        $mail->send();

    }

    public function enviarInstrucciones(){
         //Crear el Objeto email
         $mail = new PHPMailer;
         $mail->isSMTP();
         $mail->Host = 'sandbox.smtp.mailtrap.io';
         $mail->SMTPAuth = true;
         $mail->Port = 2525;
         $mail->Username = '6d248d37c524cd';
         $mail->Password = '3a8c23d60cdff0';
 
         $mail->setFrom('Cuentas@appsalon.com', 'Appsalon.com');
         $mail->addAddress($this->email);
         $mail->Subject = 'Restablece tu Password';
 
         //Set html
         $mail->isHTML(TRUE);
         $mail->CharSet = 'UTF-8';
 
         $contenido = "<html>";
         $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has Solicitado restablecer tu password.</p>";
         $contenido .= "<p>Da click en el enlace para restablecer tu password:</p>";
         $contenido .= "<p>Has Click Aqui: <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>Restablecer Password</a></p>";
         $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar este Mensaje</p>"; 
         $contenido .= "</html>";     
         
         $mail->Body = $contenido;
 
         $mail->send();
    }

}

