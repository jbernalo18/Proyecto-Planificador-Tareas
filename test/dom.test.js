/**
 * @jest-environment jsdom
 */

import { test, expect } from "@jest/globals";
import { pintarColumnas, renderizarTareas } from "../JS/dom.js";
import { Proyecto } from "../JS/project.js";

test('renderizarTareas agrega la tarjeta a la columna POR HACER', () => {
    const proyecto = new Proyecto("Planificador", "#4C8FA3");
    const contenedor = document.createElement("div");
    const columnas = pintarColumnas(proyecto, contenedor);
    const tarea = {
        id: 1,
        nombre: "Maquetación del tablero",
        descripcion: "Estructurar las columnas principales",
        asignadoA: "Camila Vargas",
        fechaDeEntrega: "2026-12-01",
        estado: "POR HACER",
        etiquetas: [],
        prioridad: "media"
    };
    renderizarTareas([tarea] , columnas)
    expect(columnas["POR HACER"].children.length).toBe(1);
});



test('renderizarTareas quita la tarjeta de la columna al eliminar la tarea', () => {
    const proyecto = new Proyecto("Planificador", "#4C8FA3");
    const contenedor = document.createElement("div");
    const columnas = pintarColumnas(proyecto, contenedor);
    const tarea ={
        id: 1,
        nombre: "Maquetación del tablero",
        descripcion: "Estructurar las columnas principales",
        asignadoA: "Camila Vargas",
        fechaDeEntrega: "2026-12-01",
        estado: "POR HACER",
        etiquetas: [],
        prioridad: "media"
    };
    renderizarTareas([tarea], columnas);
    renderizarTareas([], columnas);
    expect(columnas["POR HACER"].children.length).toBe(0);
});