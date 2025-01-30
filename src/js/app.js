let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();

})

//Iniciamos App
function iniciarApp(){
    mostrarSeccion(); //Mostrar y ocultar Secciones
    tabs(); //Cambia la seccion cuando se presionen las tabs
    botonesPaginador();//Agrega o quita los botones
    paginadorSiguiente();//Boton Siguiente
    paginadorAnterior();//Boton Anterior

    consultarAPI(); //Consulta a la BD

    idCliente();
    nombreCliente();//Añade el nombre del cliente al objeto de la cita
    seleccionarfecha();//Añade y valida la fecha seleccionada
    seleccionarHora();//Añade y valida la fecha seleccionada

    mostrarResumen();
}

//Funcionamiento App
function mostrarSeccion(){
    //Ocultamos
    const ocultarSeccion = document.querySelectorAll('.mostrar');
    ocultarSeccion.forEach(seccion =>{
        seccion.classList.remove('mostrar');
    })
    const seccion = document.querySelector(`#paso-${paso}`);
    if(seccion){
        seccion.classList.add('mostrar');
    }

    //ElminarAnterior
    const tabsAnteriores = document.querySelectorAll('.tabs button');
    tabsAnteriores.forEach(tab => {
        tab.classList.remove('actual');
    })

    //Tab Actual
    const tabActual = document.querySelector(`[data-paso="${paso}"]`);
    tabActual.classList.add('actual');

}


function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        })
    })

}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    paginaAnterior.classList.remove('ocultar');
    paginaSiguiente.classList.remove('ocultar');

    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }

}

function paginadorAnterior(){
    const paginadorAnterior = document.querySelector('#anterior');
    paginadorAnterior.addEventListener('click', function (){
         if(pasoInicial >= paso) return;

        paso--;
        console.log(paso);
        mostrarSeccion();
        botonesPaginador();
    })

}

function paginadorSiguiente(){
    const paginadorSiguiente = document.querySelector('#siguiente');
    paginadorSiguiente.addEventListener('click', function () {
         if(pasoFinal <= paso) return;

        paso++;
        console.log(paso);
        mostrarSeccion();
        botonesPaginador();
    })

}

//Apis

async function consultarAPI(){
    try {
        const url = 'http://localhost:3000/api/servicios';
        const respuesta = await fetch(url);
        const servicios = await respuesta.json();

        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;
        //Creando Elementos
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio)
        }

        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}

 function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;

    const existe = servicios.some(agregado => agregado.id === id);

    if(existe){
        // Eliminar el servicio si ya está agregado
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
    } else {
        // Agregar el nuevo servicio
        cita.servicios = [...servicios, servicio];
    }

    const divServicio = document.querySelector(`[data-id-servicio='${id}']`);
    divServicio.classList.toggle('seleccionado');
}

function idCliente(){
    cita.id = document.querySelector('#id').value;
}

function nombreCliente (){
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
    console.log(cita.nombre);
}

function seleccionarfecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){
        const dia = new Date(e.target.value).getUTCDay();
        console.log(dia);
        if([6,0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Los fines de semana no se trabaja', 'error', '#paso-2 p');
        }else{
            cita.fecha = e.target.value;

        }
    })
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function (e){
        let horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 19){
            mostrarAlerta('Nuestro Horario es de 10:00 am a 19:00 pm', 'error', '#paso-2 p');
        }else{
            cita.hora = e.target.value;
        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    };
    
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece){
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function mostrarResumen(){
    const resume = document.querySelector('.contenido-resumen');

    while(resume.firstChild){
        resume.firstChild.remove();
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        if(cita.servicios.length === 0){
            mostrarAlerta('No has seleccionado un Servicio', 'error', '#paso-3', false);
        }
        console.log('Hacen Falta Datos');
        if(Object.values(cita).includes('')){
            mostrarAlerta('Hacen Falta Datos', 'error', '#paso-3', false);
        }
        return;
    }else{
        if(document.querySelector('.alerta')){
            document.querySelector('.alerta').remove();
        }
    }
    //Continuación
    const {nombre, fecha, hora, servicios} = cita;

    const headingCita = document.createElement('H3');
    headingCita.textContent = "Resumen de la Cita";

    const headingServicios = document.createElement('H3');
    headingServicios.textContent = "Resumen de Servicios";

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

    //Formatear Fecha
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date (Date.UTC(year, mes, dia ));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
    console.log(fechaFormateada);

    console.log(fechaUTC);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha de la Cita: </span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora de la Cita: </span> ${hora}`;

    resume.appendChild(headingCita);
    resume.appendChild(nombreCliente);
    resume.appendChild(fechaCita);
    resume.appendChild(horaCita);
    resume.appendChild(headingServicios);

    let totalServicios = 0;
    servicios.forEach(servicio => {

        const {id, precio, nombre} = servicio;
        const divServicio = document.createElement('DIV');
        divServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: </span> $${precio}`;

        divServicio.appendChild(textoServicio);
        divServicio.appendChild(precioServicio);
        resume.appendChild(divServicio);
        totalServicios = totalServicios +  parseFloat(precio);
    })

    const total = document.createElement('P');
    total.classList.add('total');
    total.innerHTML = `<span>Total a Pagar por los Servicios: </span>$${totalServicios}`;

    resume.appendChild(total);

    //Btn Reservar
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = "Reservar Cita";
    botonReservar.onclick = reservarCita;

    resume.appendChild(botonReservar);

}

async function reservarCita (){
    const datos = new FormData();
    const {id, nombre, fecha, hora, servicios} = cita;

    datos.append('usuarioId', id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);

    const idServicios = servicios.map(servicio => servicio.id);
    datos.append('servicioId', idServicios);
    // console.log([...datos]);

    //Conexión a la Api
    $url = 'http://localhost:3000/api/cita';

    try {
        const respuesta = await fetch($url, {
            method: 'POST',
            body: datos
        });
    
        if (!respuesta.ok) {  
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
    
        resultado = await respuesta.json();
        console.log(resultado);
    
        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Listo...",
                text: "Se guardó su cita con éxito!!",
                button: "OK",
            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error al querer guardar tu cita",
            footer: "Ntp estamos trabajando en eso",
        });
    }
    

    
}