<h1 class="nombre-pagina">Panel de Administración</h1>

<?php include_once __DIR__ . '/../templates/barra.php'; ?>

<h2>Buscar Citas</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha: </label>
            <input type="date" id="fecha" name="fecha">
        </div>
    </form>
</div>

<div class="" id="citas-admin">
    <ul class="citas">
        <?php 
        $idCita = 0; 
        foreach ($citas as $cita): 
            if($idCita !== $cita->id):
        ?>
            <p>ID: <?php echo $cita->id ?></p>
            <p>Hora: <?php echo $cita->hora ?></p>
            <p>Cliente: <?php echo $cita->cliente ?></p>
            <p>Cliente: <?php echo $cita->email ?></p>
            <p>Cliente: <?php echo $cita->telefono ?></p>
            <h3>Servicios:</h3>
        <?php 
        
                endif; 
                ?>
                <p class="servicio <?php if(empty($cita->servicio)){ echo "error";} ?>"><?php 
                if(empty($cita->servicio)){
                    echo "No se Encontraron Servicios";
                }else{

                
                echo $cita->servicio;
                } ?></p>
                <?php
                $idCita=$cita->id; 
            endforeach; 
        ?>    
    </ul>
</div>