let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginadorSiguiente(),paginadorAnterior(),consultarAPI(),nombreCliente(),fechaHora()}function mostrarSeccion(){document.querySelectorAll(".mostrar").forEach((e=>{e.classList.remove("mostrar")}));const e=document.querySelector(`#paso-${paso}`);e&&e.classList.add("mostrar");document.querySelectorAll(".tabs button").forEach((e=>{e.classList.remove("actual")}));document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))}))}function botonesPaginador(){const e=document.querySelector("#anterior"),o=document.querySelector("#siguiente");e.classList.remove("ocultar"),o.classList.remove("ocultar"),1===paso?e.classList.add("ocultar"):3===paso&&(e.classList.remove("ocultar"),o.classList.add("ocultar"))}function paginadorAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){1>=paso||(paso--,console.log(paso),mostrarSeccion(),botonesPaginador())}))}function paginadorSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){3<=paso||(paso++,console.log(paso),mostrarSeccion(),botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",o=await fetch(e);mostrarServicios(await o.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:o,nombre:t,precio:a}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=t;const n=document.createElement("P");n.classList.add("precio-servicio"),n.textContent=`$${a}`;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=o,r.appendChild(c),r.appendChild(n),r.onclick=function(){seleccionarServicio(e)},document.querySelector("#servicios").appendChild(r)}))}function seleccionarServicio(e){const{id:o}=e,{servicios:t}=cita,a=t.some((e=>e.id===o));cita.servicios=a?t.filter((e=>e.id!==o)):[...t,e];document.querySelector(`[data-id-servicio='${o}']`).classList.toggle("seleccionado")}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e,console.log(cita.nombre)}function fechaHora(){document.querySelector("#fecha").addEventListener("input",(function(e){const o=new Date(e.target.value).getUTCDay();console.log(o),[6,0].includes(o)?(e.target.value="",mostrarAlerta("Los fines de semana no se trabaja","error")):cita.fecha=e.target.value}))}function mostrarAlerta(e,o){if(document.querySelector(".alerta"))return;const t=document.createElement("DIV");t.textContent=e,t.classList.add("alerta"),t.classList.add(o);document.querySelector("#paso-2 p").appendChild(t),setTimeout((()=>{t.remove()}),3e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));