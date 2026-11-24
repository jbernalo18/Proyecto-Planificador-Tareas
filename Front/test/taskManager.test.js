import { test, expect } from "@jest/globals";
import { TaskManager } from "../JS/taskManager.js";

test ('agregarTarea guarda una tarea en la lista',()=>{
const taskManager = new TaskManager();
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

test ('borrarTarea elimina la tarea de la lista',()=>{
const taskManager = new TaskManager();
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
const id = tarea.id;
taskManager.borrarTarea(id);
expect(taskManager.tareas.length).toBe(0);
});


test('editarTarea cambia el nombre y el estado de la tarea', () => {
const taskManager = new TaskManager();
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

const tareaActualizada={
    nombre: "Validación de formularios",
    descripcion: "Implementar reglas en JavaScript",
    asignadoA: "Camila Vargas",
    fechaDeEntrega: "2026-12-05",
    estado: "EN PROCESO",
    etiquetas: [],
    prioridad: "alta"
}
taskManager.editarTarea(tarea.id, tareaActualizada);
expect(taskManager.tareas[0].nombre).toBe("Validación de formularios");
expect(taskManager.tareas[0].estado).toBe("EN PROCESO");
});

test('asignarTarea cambia el responsable de la tarea', () => {
const taskManager = new TaskManager();
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

taskManager.asignarTarea(tarea.id, "Luis Villada");

expect(taskManager.tareas[0].asignadoA).toBe("Luis Villada");
});