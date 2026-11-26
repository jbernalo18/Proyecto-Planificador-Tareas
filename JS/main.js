import { pintarTarjeta, pintarColumnas, renderizarTareas } from "./dom.js";
import { ValidarFormulario, limpiarMensajes } from "./validaciones.js";
import { Proyecto } from "./project.js";

const colorLabradorita= "#fff";
const proyectos = [];
let proyectoAct = proyectos[0];
let columnas;
const formularioTarea = document.getElementById("form-principal");
const contenedorTareas = document.getElementById("contenedor-tareas");
const seccionFormulario = document.querySelector(".formulario-seccion");
const btnAbrirFormulario = document.getElementById("btn-abrir-formulario");
const btnCerrarFormulario = document.getElementById("btn-cancelar");
const botonAnadirEtiq= document.getElementById("btn-crear-etiqueta");
const botonGestorProyector = document.getElementById("btn-selector");
const listaProyectos = document.getElementById("lista-proyectos");
const botonCrearProyecto = document.getElementById("btn-nuevo-proyecto");
const nombreProyectoActual = document.getElementById("nombre-proyecto-actual");
const mensajeBienvenida = document.getElementById("mensaje-bienvenida");
const botonCrearPrimerProyecto = document.getElementById("btn-crear-primer-proyecto");
const filaNuevoProyecto = document.getElementById("fila-nuevo-proyecto");
const campoNuevoProyecto = document.getElementById("campo-nuevo-proyecto");
const botonConfirmarProyecto = document.getElementById("btn-confirmar-crear-proyecto");
const overlaySelector = document.getElementById("overlay-selector");
const botonTema = document.querySelector(".boton-tema-header");
const iconoTema = botonTema.querySelector("img");
const botonGuardarEditar = document.getElementById("btn-crear")

let idEdicion = null;
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


aplicarTema(localStorage.getItem("tema") || "oscuro");

//listeners inicio

botonTema.addEventListener("click", () => {
    const nuevoTema = document.documentElement.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
    aplicarTema(nuevoTema);
    localStorage.setItem("tema", nuevoTema);
});

botonCrearPrimerProyecto.addEventListener("click", () => {
    listaProyectos.classList.remove("lista-oculta");
    overlaySelector.classList.remove("lista-oculta");
    botonCrearProyecto.click();
});

botonGestorProyector.addEventListener("click",()=>{

listaProyectos.classList.toggle("lista-oculta");
overlaySelector.classList.toggle("lista-oculta", listaProyectos.classList.contains("lista-oculta"));
});

overlaySelector.addEventListener("click", cerrarSelector);

document.addEventListener("keydown",(e)=>{
    if (e.key==="Escape") {
        cerrarSelector();}
})

botonCrearProyecto.addEventListener("click", () => {
    filaNuevoProyecto.classList.remove("lista-oculta");
    campoNuevoProyecto.focus();
});

botonConfirmarProyecto.addEventListener("click", () => {
    const nombreProyectoConfirmado = campoNuevoProyecto.value.trim();
    if (nombreProyectoConfirmado === "") {
        return;
    }

    const nuevoProyecto = new Proyecto(nombreProyectoConfirmado, colorLabradorita);
    proyectos.push(nuevoProyecto);

    campoNuevoProyecto.value = "";
    filaNuevoProyecto.classList.add("lista-oculta");

    const itemListaProyecto = document.createElement("li");
    itemListaProyecto.style.listStyle = "none";
    const botonProyecto = document.createElement("button");
    const spanPunto = document.createElement("span");
    spanPunto.classList.add("punto");
    botonProyecto.append(spanPunto, " ", nombreProyectoConfirmado);
    itemListaProyecto.append(botonProyecto);
    botonCrearProyecto.before(itemListaProyecto);

    botonProyecto.addEventListener("click", () => {
        seleccionarProyecto(nuevoProyecto);
    });

    seleccionarProyecto(nuevoProyecto);
});


//listeners  form
btnAbrirFormulario.addEventListener("click",()=>{
    idEdicion = null;
    botonGuardarEditar.textContent = "Guardar tarea";
    seccionFormulario.classList.add("abierta");
})

btnCerrarFormulario.addEventListener("click",()=>{
seccionFormulario.classList.remove("abierta");
    formularioTarea.reset();
    document.getElementById("contenedor-etiquetas").innerHTML = "";
    limpiarMensajes();
    idEdicion = null;
    botonGuardarEditar.textContent = "Guardar tarea";
});

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
        botonEliminarEtiqueta.addEventListener("click",()=>{
            itemEtiqueta.remove();
        });

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
            etiquetas: etiquetas,
            prioridad: document.querySelector('input[name="prioridad-tarjeta"]:checked').value
        }

        //el gestor coloca el ID y guarda la atrea
        if (idEdicion === null) {
            proyectoAct.gestorTareas.agregarTarea(nuevaTarea);
        } else {
            proyectoAct.gestorTareas.editarTarea(idEdicion, nuevaTarea);
            idEdicion = null;
        }
        renderizarTareas(proyectoAct.gestorTareas.getTodasTareas(),columnas)
        proyectoAct.gestorTareas.save(); 
        seccionFormulario.classList.remove("abierta");
        formularioTarea.reset();
        document.getElementById("contenedor-etiquetas").innerHTML = "";
        limpiarMensajes();
        botonGuardarEditar.textContent = "Guardar tarea";
        console.table(proyectoAct.gestorTareas.getTodasTareas());

        
    }else{
        const primerError = formularioTarea.querySelector(".texto-error");
        if (primerError) {
        primerError.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }    
    }



});

document.getElementById("contenedor-etiquetas").addEventListener("click", (e) => {
    const etiqueta = e.target.closest(".etiqueta-tarjeta");
    if (etiqueta !== null) {
        etiqueta.remove();
    }
});



//listener targets tarjetas
contenedorTareas.addEventListener("click",(e)=>{
    const botonEliminar=e.target.closest(".tarjeta-eliminar")
    if(botonEliminar!==null){
        const tarjeta = botonEliminar.closest(".tarjta-tarea");
        const idAEliminar = Number(tarjeta.dataset.id);
        proyectoAct.gestorTareas.borrarTarea(idAEliminar);
        proyectoAct.gestorTareas.save(); 
        renderizarTareas(proyectoAct.gestorTareas.getTodasTareas(), columnas);
        return;
    }
       const botonCheck = e.target.closest(".tarjeta-check");
    if (botonCheck !== null) {
        const tarjeta = botonCheck.closest(".tarjta-tarea");
        const idACompletar = Number(tarjeta.dataset.id);
        proyectoAct.gestorTareas.actualizarEstadoTarea(idACompletar, "HECHO");
        renderizarTareas(proyectoAct.gestorTareas.getTodasTareas(), columnas);
        proyectoAct.gestorTareas.save(); 
        return;
    } // actualizamos DOM
    const botonEditar = e.target.closest(".boton-editar-tarjeta")
    if(botonEditar!=null){
        botonGuardarEditar.textContent = "Actualizar";

        const tarjeta = botonEditar.closest(".tarjta-tarea");
        
        const id = Number(tarjeta.dataset.id);
        const tarea = proyectoAct.gestorTareas.buscarTareaID(id);
        idEdicion = id;
        document.getElementById("campo-nombre-tarjeta").value = tarea.nombre;
        document.getElementById("campo-descripcion-tarjeta").value = tarea.descripcion;
        document.getElementById("campo-asignacion-tarjeta").value = tarea.asignadoA;
        document.getElementById("campo-fecha-tarjeta").value = tarea.fechaDeEntrega;
        document.querySelector(`input[name="estado-tarjeta"][value="${tarea.estado}"]`).checked = true;
        document.querySelector(`input[name="prioridad-tarjeta"][value="${tarea.prioridad}"]`).checked = true;
        const ulEtiquetas = document.getElementById("contenedor-etiquetas");
        ulEtiquetas.innerHTML = "";
        tarea.etiquetas.forEach((etiqueta) => {
            const etiquetaGuardada = document.createElement("span");
            etiquetaGuardada.textContent = etiqueta.nombre;
            etiquetaGuardada.classList.add("etiqueta-tarjeta");
            etiquetaGuardada.title = "Clic para quitar";
            etiquetaGuardada.style.background = etiqueta.color;
            ulEtiquetas.append(etiquetaGuardada);
        });
        seccionFormulario.classList.add("abierta");
        return;
    }

});

if (proyectoAct) {
    columnas = pintarColumnas(proyectoAct, contenedorTareas);
    proyectoAct.gestorTareas.load();
    renderizarTareas(proyectoAct.gestorTareas.getTodasTareas(), columnas);
}

//FUNCIONES

function seleccionarProyecto(proyecto) {
mensajeBienvenida.classList.add("mensaje-bienvenida-oculto");
    btnAbrirFormulario.disabled = false;
    btnAbrirFormulario.title = "";
    proyectoAct = proyecto;
    nombreProyectoActual.textContent = proyectoAct.nombre;
    columnas = pintarColumnas(proyectoAct, contenedorTareas);
    proyectoAct.gestorTareas.load();
    renderizarTareas(proyectoAct.gestorTareas.getTodasTareas(), columnas);
    cerrarSelector();
}

function cerrarSelector() {
    listaProyectos.classList.add("lista-oculta");
    overlaySelector.classList.add("lista-oculta");
}

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);

    if (tema === "claro") {
        iconoTema.src = "../assets/iconos/icons_moon.svg";
        iconoTema.alt = "Icono Luna Tema";
    } else {
        iconoTema.src = "../assets/iconos/icons_sun.svg";
        iconoTema.alt = "Icono Sol Tema";
    }
}