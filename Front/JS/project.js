import { TaskManager }  from "./taskManager.js";

export class Proyecto{
    constructor(nombre,color){
        this.nombre=nombre;
        this.nombre=color
        this.gestorTareas= new TaskManager();
        this.nombresListas= {
            "POR HACER": "Por hacer",
            "EN PROCESO": "En proceso",
            "REVISIÓN": "En revisión",
            "HECHO": "Hecho"
        };
    }

    renombrarLista(estado, nuevoNombre){
        this.nombresListas[estado]=nuevoNombre;
    }
}