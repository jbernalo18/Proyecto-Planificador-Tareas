export function pintarTarjeta(tarea){
    const tarjeta = document.createElement("article") //creamos el contenedor de la tarjeta
    tarjeta.classList.add("tarjta-tarea");
    tarjeta.dataset.id=tarea.id; //guardamos el id para luego poder eliminar l tarjeta
    //titulo de tarjeta
    const tituloTarjeta = document.createElement("h3");
    tituloTarjeta.textContent = tarea.nombre  ;
    //descripcion tarjeta
    const descripcionTarjeta= document.createElement("p");
    descripcionTarjeta.textContent=tarea.descripcion;
    descripcionTarjeta.classList.add("tarjeta-descripcion");    
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


    //circulo de seleccion 
    const circulo = document.createElement("span");
    circulo.classList.add("tarjeta-check");

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
    contenido.append(tituloTarjeta, descripcionTarjeta, asignacionTarjeta, fechaEntrega, botonYEstado);
    tarjeta.append(circulo, contenido);
    return tarjeta;


}