let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
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

    nombreCliente();
    fechaHora();
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

function nombreCliente (){
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
    console.log(cita.nombre);
}

function fechaHora(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){
        const dia = new Date(e.target.value).getUTCDay();
        console.log(dia);
        if([6,0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Los fines de semana no se trabaja', 'error');
        }else{
            cita.fecha = e.target.value;

        }
    })
}

function mostrarAlerta(mensaje, tipo){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) return;
    
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const formulario = document.querySelector('#paso-2 p' );
    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}