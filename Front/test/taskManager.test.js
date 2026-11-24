import { test, expect } from "@jest/globals";
import { TaskManager } from "../JS/taskManager.js";

test ('agregarTarea guarda una tarea en la lista',()=>{
const taskManager = new TaskManager;
const tarea = {
    nombre: "Maquetación del tablero",
    descripcion: "Estructurar las columnas principales",
    asignadoA: "Camila Vargas",
    fechaDeEntrega: "2026-12-01",
    estado: "POR HACER",
    etiquetas: [],
    prioridad: "media"
}
taskManager.agregarTarea(tarea);
expect(taskManager.tareas.length).toBe(1);
});