   import { TaskManager } from "./taskManager.js";
import { ValidarFormulario } from "./validaciones.js";
const ejemplo = new TaskManager();


ejemplo.agregarTarea({
    nombre: "Diseñar la vista",
    descripcion: "Hacer el wireframe del formulario",
    asignadoA: "María Fernanda",
    fechaDeEntrega: "2026-10-30",
    estado: "POR HACER"
});

ejemplo.agregarTarea({
    nombre: "Escribir las validaciones",
    descripcion: "Validar los cinco campos del formulario",
    asignadoA: "Luis Villada",
    fechaDeEntrega: "2026-11-02",
    estado: "EN PROCESO"
});

console.table(ejemplo.getTodasTareas());