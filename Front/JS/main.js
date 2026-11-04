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


    const paletaEtiqueta = [    
    "linear-gradient(135deg, #9ADFD8, #A9C8F2, #CBB6F0)", //turquesa azul lavanda
    "linear-gradient(135deg, #8FE0E6, #F4E1A0, #F7C4A5)", //aqua dorado durazno
    "linear-gradient(135deg, #A5CBF5, #C3AEF0, #F2B6DA)", // azul violeta rosa
    "linear-gradient(135deg, #A8E6C9, #8FDCE6, #9CBFF2)", // verde  aqua azul
    "linear-gradient(135deg, #C4B0F0, #F2B4D6, #F6DD9A)", // violeta rosa dorado
    "linear-gradient(135deg, #CFDB9C, #F3DC95, #F2B5C6)", // oliva dorado rosa
    "linear-gradient(135deg, #8EDDD6, #B5E3A8, #F3E096)", // turquesa verde  dorado
    "linear-gradient(135deg, #9FD0F4, #CDB8F2, #F6BBD8)", // azul cielo lavanda  rosa
    "linear-gradient(135deg, #EDB0DC, #BDA9EF, #9FC6F3)", // magenta  violeta azul
    "linear-gradient(135deg, #BADFA8, #93E0D2, #A0C4F4)", // salvia  turquesa  azul
    "linear-gradient(135deg, #F7CBA0, #F4B1CB, #C8ADEF)", // durazno rosa  violeta
    "linear-gradient(135deg, #F2DC98, #A5E4CB, #96C6F2)"  //dorado  verde agua  azul
    ]



    
    const botonAnadirEtiq= document.getElementById("btn-crear-etiqueta");
    botonAnadirEtiq.addEventListener("click",()=>{
        const ulEtiquetas=document.getElementById("contenedor-etiquetas");
        const itemEtiqueta=document.createElement("li");
        itemEtiqueta.classList.add("item-etiqueta");
        const inputEtiqueta=document.createElement("input");
        inputEtiqueta.type="text";
        ulEtiquetas.appendChild(itemEtiqueta);
        itemEtiqueta.appendChild(inputEtiqueta);

        let colorElegido= "linear-gradient(135deg, #F2DC98, #A5E4CB, #96C6F2)";
        paletaEtiqueta.forEach((color)=>{
        const botonColor=document.createElement("button");
        botonColor.type="button";
        botonColor.classList.add("boton-color");
        botonColor.style.background=color;
        itemEtiqueta.appendChild(botonColor);

        botonColor.addEventListener("click",()=>{
            colorElegido=color;
            console.log(colorElegido);
        })
        });

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
            const colorEtiqueta=colorElegido;
            const etiquetaGuardada=document.createElement("span");
            etiquetaGuardada.textContent=nombreEtiqueta;
            etiquetaGuardada.classList.add("etiqueta-tarjeta");
            etiquetaGuardada.style.background=colorEtiqueta;
            ulEtiquetas.replaceChild(etiquetaGuardada,itemEtiqueta);

        });
        

    });