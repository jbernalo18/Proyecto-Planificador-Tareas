import { TaskManager } from "./taskManager.js";
import { ValidarFormulario } from "./validaciones.js";
import { pintarTarjeta } from "./dom.js";


const gestorTareas = new TaskManager();
const formularioTarea = document.getElementById("form-principal");
const contenedorTareas = document.getElementById("contenedor-tareas");

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
        console.log("Tarea guardada:", tareaGuardada);
        console.table(gestorTareas.getTodasTareas());

        
    }else{
        console.log("Formulario inválido: no se agrega la tarea");
    }
});