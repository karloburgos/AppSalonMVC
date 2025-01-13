<h1 class="nombre-pagina">Recuperar Cuenta</h1>
<p class="descripcion-pagina">Restablece tu password ingresando tu email a continuación.</p>

<form action="/recuperar-cuenta" method="POST" class="formulario">
    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" placeholder="Tu Email" id="email" name="email">
    </div>

    <input type="submit" class="boton" value="Recuperar Cuenta">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una Cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aun no tienes una Cuenta? Crea Una</a>
</div>