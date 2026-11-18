
export function pintarTarjeta(tarea){
    const tarjeta = document.createElement("article") //creamos el contenedor de la tarjeta
    tarjeta.classList.add("tarjta-tarea");
    tarjeta.dataset.id=tarea.id; //guardamos el id para luego poder eliminar l tarjeta
    //titulo de tarjeta
    const tituloTarjeta = document.createElement("h3");
    tituloTarjeta.textContent = tarea.nombre  ;
    //editar
    const botonEditar = document.createElement("button");
    botonEditar.type = "button"

    botonEditar.classList.add("boton-editar-tarjeta")
    const imagen = document.createElement("img");
    imagen.src="../assets/iconos/iconoir_edit-pencil.svg" 
    imagen.alt="Boton Editar"
    botonEditar.append(imagen);

    const filaTitulo = document.createElement("div");
    filaTitulo.classList.add("tarjeta-titulo-fila");
    filaTitulo.append(tituloTarjeta, botonEditar);

    //etiquetas
    const contenedorEtiquetas = document.createElement("div");
    contenedorEtiquetas.classList.add("tarjeta-etiquetas");
    tarea.etiquetas.forEach((etiqueta) => {
        const pildora = document.createElement("span");
        pildora.classList.add("etiqueta-mini");
        pildora.textContent = etiqueta.nombre;
        pildora.style.background = etiqueta.color;
        contenedorEtiquetas.append(pildora);
    });
    //descripcion tarjeta
    const descripcionTarjeta= document.createElement("p");
    descripcionTarjeta.textContent=tarea.descripcion;
    descripcionTarjeta.classList.add("tarjeta-descripcion"); 
    descripcionTarjeta.title = tarea.descripcion;   
    //estado
    const estadoTarjeta= document.createElement("span");
    estadoTarjeta.classList.add("tarjeta-estado");
    estadoTarjeta.textContent=tarea.estado;
    //asignadoa
    const asignacionTarjeta = document.createElement("p");
    asignacionTarjeta.textContent="Asignado a: " +tarea.asignadoA;
    //fecha
    const fechaEntrega = document.createElement("p");
    fechaEntrega.textContent="Entrega: "+tarea.fechaDeEntrega;

    //prioridad
    const prioridadTarjeta = document.createElement("span");
    prioridadTarjeta.classList.add("tarjeta-prioridad");
    const puntoPrioridad = document.createElement("span");
    puntoPrioridad.classList.add("punto", `punto-${tarea.prioridad}`);
    const textoPrioridad = document.createElement("span");
    textoPrioridad.textContent = tarea.prioridad;
    prioridadTarjeta.append(puntoPrioridad, textoPrioridad);

    const filaFecha = document.createElement("div");
    filaFecha.classList.add("tarjeta-fecha-fila");
    filaFecha.append(fechaEntrega, prioridadTarjeta);


    //circulo de seleccion 
    const circulo = document.createElement("button");
    circulo.type = "button";
    circulo.classList.add("tarjeta-check");
    if(tarea.estado=="HECHO"){
        circulo.classList.add("hecho")
    }else{
        circulo.classList.remove("hecho")
    }

    //contenedor que agrupa todo el texto de la tarjeta
    const contenido = document.createElement("div");
    contenido.classList.add("tarjeta-contenido");
 //agergamos el boton de eliminar
    const botonEliminar=document.createElement("button");
    botonEliminar.type="button";
    botonEliminar.classList.add("tarjeta-eliminar");
    botonEliminar.textContent = "Eliminar";

    const botonYEstado=document.createElement("div");
    botonYEstado.classList.add("tarjeta-eliminar-estado");
    botonYEstado.append(estadoTarjeta, botonEliminar);
    contenido.append(filaTitulo,contenedorEtiquetas, descripcionTarjeta, asignacionTarjeta, filaFecha, botonYEstado);
    tarjeta.append(circulo, contenido);
    return tarjeta;


}

export function pintarColumnas(proyecto, contenedor){
    
    const listaEstados = ["POR HACER", "EN PROCESO", "REVISIÓN", "HECHO"];
    const columnas= {};

    listaEstados.forEach(estado => {
        const columna = document.createElement("div");
        const nombre = proyecto.nombresListas[estado];
        
        columna.classList.add("columna");
        columna.dataset.estado = estado;

        const titulo = document.createElement("h3");
        titulo.classList.add("columna-titulo");
        titulo.textContent = nombre;

        const listaTarjetas = document.createElement("div");
        listaTarjetas.classList.add("columna-tarjetas");

        columna.append(titulo, listaTarjetas);
        contenedor.append(columna);
        columnas[estado]=listaTarjetas;
    });

    return columnas;
}


export function renderizarTareas(tareas, columnas){
Object.values(columnas).forEach((lista)=>{
    lista.innerHTML = "";
})

tareas.forEach((tarea)=>{
    const tarjeta = pintarTarjeta(tarea)
    columnas[tarea.estado].append(tarjeta);
})
}