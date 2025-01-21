<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password a continuación:</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<?php 
if(!$error):
?> 
<form action="" method="POST" >
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Tu nuevo Password">
    </div>
    <input type="submit" value="Guardar Password" class="boton">


</form>

<?php endif; ?>


<div class="acciones">
    <a href="/">¿Ya tienes una Cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aun no tienes una Cuenta? Crea Una</a>
</div>