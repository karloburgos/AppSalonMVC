let paso = 1;
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();

})

//Iniciamos App
function iniciarApp(){
    mostrarSeccion(); //Mostrar y ocultar Secciones
    tabs(); //Cambia la seccion cuando se presionen las tabs
    botonesPaginador();//Agrega o quita los botones
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

    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
}