import { TaskManager } from "./taskManager.js";
import { pintarTarjeta } from "./dom.js";
import { ValidarFormulario, limpiarMensajes } from "./validaciones.js";


const gestorTareas = new TaskManager();
const formularioTarea = document.getElementById("form-principal");
const contenedorTareas = document.getElementById("contenedor-tareas");
const seccionFormulario = document.querySelector(".formulario-seccion");
const btnAbrirFormulario = document.getElementById("btn-abrir-formulario");
const btnCerrarFormulario = document.getElementById("btn-cancelar");

btnAbrirFormulario.addEventListener("click",function () {
    seccionFormulario.classList.add("abierta");
});

btnCerrarFormulario.addEventListener("click",function(){
    seccionFormulario.classList.remove("abierta");
    formularioTarea.reset();
    limpiarMensajes();
});

formularioTarea.addEventListener("submit", function (e) {
    e.preventDefault(); //evita que la pagina se recargue

    if(ValidarFormulario()===true){//validmos el formulario,, si el resultado es true se crea la tarea
        const nuevaTarea={
            nombre:document.getElementById("campo-nombre-tarjeta").value,
            descripcion:document.getElementById("campo-descripcion-tarjeta").value,
            asignadoA: document.getElementById("campo-asignacion-tarjeta").value,
            fechaDeEntrega: document.getElementById("campo-fecha-tarjeta").value,
            estado: document.querySelector('input[name="estado-tarjeta"]:checked').value
        }

        //el gestor coloca el ID y guarda la atrea
        const tareaGuardada= gestorTareas.agregarTarea(nuevaTarea);
        contenedorTareas.append(pintarTarjeta(tareaGuardada));
        seccionFormulario.classList.remove("abierta");
        formularioTarea.reset();
        limpiarMensajes();
        console.log("Tarea guardada:", tareaGuardada);
        console.table(gestorTareas.getTodasTareas());

        
    }else{
        console.log("Formulario inválido: no se agrega la tarea");
    }
});