import { TaskManager } from "./taskManager.js";
import { pintarTarjeta } from "./dom.js";
import { ValidarFormulario, limpiarMensajes } from "./validaciones.js";


const gestorTareas = new TaskManager();
const formularioTarea = document.getElementById("form-principal");
const contenedorTareas = document.getElementById("contenedor-tareas");
const seccionFormulario = document.querySelector(".formulario-seccion");
const btnAbrirFormulario = document.getElementById("btn-abrir-formulario");
const btnCerrarFormulario = document.getElementById("btn-cancelar");




btnAbrirFormulario.addEventListener("click",()=>{
    seccionFormulario.classList.add("abierta");
});

btnCerrarFormulario.addEventListener("click",()=>{
    seccionFormulario.classList.remove("abierta");
    formularioTarea.reset();
    limpiarMensajes();
});

formularioTarea.addEventListener("submit", (e)=> {
    e.preventDefault(); //evita que la pagina se recargue

    if(ValidarFormulario()===true){//validmos el formulario,, si el resultado es true se crea la tarea
        const nuevaTarea={
            nombre:document.getElementById("campo-nombre-tarjeta").value.trim(),
            descripcion:document.getElementById("campo-descripcion-tarjeta").value.trim(),
            asignadoA: document.getElementById("campo-asignacion-tarjeta").value.trim(),
            fechaDeEntrega: document.getElementById("campo-fecha-tarjeta").value,
            estado: document.querySelector('input[name="estado-tarjeta"]:checked').value
        }

        //el gestor coloca el ID y guarda la atrea
        const tareaGuardada= gestorTareas.agregarTarea(nuevaTarea);
        contenedorTareas.append(pintarTarjeta(tareaGuardada));
        seccionFormulario.classList.remove("abierta");
        formularioTarea.reset();
        limpiarMensajes();
        console.table(gestorTareas.getTodasTareas());

        
    }else{
        alert("Formulario inválido: no se agrega la tarea");
    }




});

contenedorTareas.addEventListener("click",(e)=>{
    const botonEliminar=e.target.closest(".tarjeta-eliminar")
    if(botonEliminar==null){
        return;//nohacemos nada
    }
    console.log("click eneliminar");
    const tarjeta=botonEliminar.closest(".tarjta-tarea");
    const idAEliminar=Number(tarjeta.dataset.id);
    gestorTareas.borrarTarea(idAEliminar); ///eliinamos la tarea del array con el gestor de tareas
    console.table(gestorTareas.getTodasTareas());
    tarjeta.remove();//la borramos del DOM

});


    const botonAnadirEtiq= document.getElementById("btn-crear-etiqueta");
    botonAnadirEtiq.addEventListener("click",()=>{
        const ulEtiquetas=document.getElementById("contenedor-etiquetas");
        const itemEtiqueta=document.createElement("li");
        itemEtiqueta.classList.add("item-etiqueta");
        const inputEtiqueta=document.createElement("input");
        inputEtiqueta.type="text";
        ulEtiquetas.appendChild(itemEtiqueta);
        itemEtiqueta.appendChild(inputEtiqueta);

        const inputEtiquetaColor = document.createElement("input");
        inputEtiquetaColor.type="color";
        itemEtiqueta.appendChild(inputEtiquetaColor);


        const botonEliminarEtiqueta=document.createElement("button");
        botonEliminarEtiqueta.type="button";
        botonEliminarEtiqueta.textContent="Eliminar";
        itemEtiqueta.appendChild(botonEliminarEtiqueta);
        

        const botonGuardarEtiqueta=document.createElement("button");
        botonGuardarEtiqueta.type="button";
        botonGuardarEtiqueta.textContent="Guardar";
        itemEtiqueta.appendChild(botonGuardarEtiqueta);

        botonGuardarEtiqueta.addEventListener("click",()=>{
            const nombreEtiqueta=inputEtiqueta.value.trim();
            const colorEtiqueta=inputEtiquetaColor.value;
            const etiquetaGuardada=document.createElement("span");
            etiquetaGuardada.textContent=nombreEtiqueta;
            etiquetaGuardada.classList.add("etiqueta-tarjeta");
            etiquetaGuardada.style.backgroundColor=colorEtiqueta;
            ulEtiquetas.replaceChild(etiquetaGuardada,itemEtiqueta);

        });
        

    });