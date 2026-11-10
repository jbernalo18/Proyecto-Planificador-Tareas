import { TaskManager } from "./taskManager.js";
import { pintarTarjeta, pintarColumnas } from "./dom.js";
import { ValidarFormulario, limpiarMensajes } from "./validaciones.js";


const proyecto = new Proyecto("Planificador","#4C8FA3");
const gestorTareas= proyecto.gestorTareas;
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
    document.getElementById("contenedor-etiquetas").innerHTML = "";
    limpiarMensajes();
});

formularioTarea.addEventListener("submit", (e)=> {
    e.preventDefault(); //evita que la pagina se recargue

    if(ValidarFormulario()===true){//validmos el formulario,, si el resultado es true se crea la tarea
        const etiquetas = [];
        document.querySelectorAll("#contenedor-etiquetas .etiqueta-tarjeta").forEach((span) => {
        etiquetas.push({ nombre: span.textContent, color: span.style.background });
        });
        const nuevaTarea={
            nombre:document.getElementById("campo-nombre-tarjeta").value.trim(),
            descripcion:document.getElementById("campo-descripcion-tarjeta").value.trim(),
            asignadoA: document.getElementById("campo-asignacion-tarjeta").value.trim(),
            fechaDeEntrega: document.getElementById("campo-fecha-tarjeta").value,
            estado: document.querySelector('input[name="estado-tarjeta"]:checked').value,
            etiquetas: etiquetas
        }

        //el gestor coloca el ID y guarda la atrea
        const tareaGuardada= gestorTareas.agregarTarea(nuevaTarea);
        columnas[tareaGuardada.estado].append(pintarTarjeta(tareaGuardada));
        seccionFormulario.classList.remove("abierta");
        formularioTarea.reset();
        document.getElementById("contenedor-etiquetas").innerHTML = "";
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
    "linear-gradient(135deg, #7DB8FF80, #2563EB80)", // azul eléctrico
    "linear-gradient(135deg, #8FA0F580, #3B3FC980)", // índigo
    "linear-gradient(135deg, #C0A0F880, #7B3FE080)", // violeta
    "linear-gradient(135deg, #F2A0DC80, #C73FB580)", // magenta
    "linear-gradient(135deg, #F7B49A80, #D9705A80)", // cobre
    "linear-gradient(135deg, #F8C86A80, #C98A1B80)", // ámbar
    "linear-gradient(135deg, #CFD47A80, #7F8F2B80)", // oliva
    "linear-gradient(135deg, #8EDCA880, #2E9E6A80)", // jade
    "linear-gradient(135deg, #6FE0C880, #14907F80)", // turquesa
    "linear-gradient(135deg, #7FE3F080, #12A4C480)", // aqua
    "linear-gradient(135deg, #A9D6FF80, #4C8FD680)", // azul hielo
    "linear-gradient(135deg, #A8B8B080, #5E726880)"  // piedra
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
        const todosLosColores=itemEtiqueta.querySelectorAll(".boton-color");
        todosLosColores.forEach((boton)=>{
        boton.classList.remove("elegido");
        });

        botonColor.classList.add("elegido");
        })
        });

        const botonGuardarEtiqueta=document.createElement("button");
        botonGuardarEtiqueta.type="button";
        botonGuardarEtiqueta.classList.add("boton-guardar-etiqueta");
        botonGuardarEtiqueta.textContent="✓";
        itemEtiqueta.appendChild(botonGuardarEtiqueta);

        const botonEliminarEtiqueta=document.createElement("button");
        botonEliminarEtiqueta.type="button";
        botonEliminarEtiqueta.classList.add("boton-eliminar-etiqueta");
        botonEliminarEtiqueta.textContent="✕";
        itemEtiqueta.appendChild(botonEliminarEtiqueta);
        


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


    import { Proyecto } from "./project.js";


    let columnas = pintarColumnas(proyecto,contenedorTareas);
