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

    tarjeta.append(tituloTarjeta,descripcionTarjeta,estadoTarjeta,asignacionTarjeta,fechaEntrega);
    return tarjeta;


}