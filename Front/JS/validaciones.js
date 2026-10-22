

/**reglas*/
const minNombre = 8;
const minDescripcion = 15;
const minAsignado = 8;

/**funciones de validar: solo devuelven true o false */
function validarTextoLargo (texto, minimo) {
    return texto.trim().length > minimo;
}

function validarFecha (fecha) {
    return fecha !== ""; /*un input date vacio devuelve texto vacio*/
}

function validarEstado () {
    /*busca el radio marcado; si no hay ninguno devuelve null*/
    return document.querySelector('input[name="estado-tarjeta"]:checked') !== null;
}

/**traer elementos del DOM*/
const entradaNombre = document.getElementById("campo-nombre-tarjeta");
const entradaDescripcion = document.getElementById("campo-descripcion-tarjeta");
const entradaAsignado = document.getElementById("campo-asignacion-tarjeta");
const entradaFecha = document.getElementById("campo-fecha-tarjeta");

const errorNombre = document.getElementById("error-nombre");
const errorDescripcion = document.getElementById("error-descripcion");
const errorAsignado = document.getElementById("error-asignado");
const errorFecha = document.getElementById("error-fecha");
const errorEstado = document.getElementById("error-estado");

/**pinta el mensaje en verde o rojo*/
function mostrarResultado (campo, esValido, textoValido, textoError) {
    if (esValido === true) {
        campo.classList.remove("texto-error");
        campo.classList.add("texto-exito");
        campo.textContent = textoValido;
    } else {
        campo.classList.remove("texto-exito");
        campo.classList.add("texto-error");
        campo.textContent = textoError;
    }
}

/**revisar cada campo: validan, muestran el mensaje y devuelven true/false*/
function revisarNombre () {
    const esValido = validarTextoLargo(entradaNombre.value, minNombre);
    mostrarResultado(errorNombre, esValido, "✓ Nombre válido", "X El nombre debe tener más de 8 caracteres");
    return esValido;
}

function revisarDescripcion () {
    const esValido = validarTextoLargo(entradaDescripcion.value, minDescripcion);
    mostrarResultado(errorDescripcion, esValido, "✓ Descripción válida", "X La descripción debe tener más de 15 caracteres");
    return esValido;
}

function revisarAsignado () {
    const esValido = validarTextoLargo(entradaAsignado.value, minAsignado);
    mostrarResultado(errorAsignado, esValido, "✓ Responsable válido", "X El campo 'Asignado a' debe tener más de 8 caracteres");
    return esValido;
}

function revisarFecha () {
    const esValido = validarFecha(entradaFecha.value);
    mostrarResultado(errorFecha, esValido, "✓ Fecha válida", "X Debes elegir una fecha de entrega");
    return esValido;
}

function revisarEstado () {
    const esValido = validarEstado();
    mostrarResultado(errorEstado, esValido, "✓ Estado seleccionado", "X Debes seleccionar un estado");
    return esValido;
}

/**revisar al salir de cada campo (blur)*/
entradaNombre.addEventListener("blur", revisarNombre);
entradaDescripcion.addEventListener("blur", revisarDescripcion);
entradaAsignado.addEventListener("blur", revisarAsignado);
entradaFecha.addEventListener("blur", revisarFecha);

/**juntar todas las revisiones en una sola funcion*/
export function ValidarFormulario() {
    /*se guardan primero en variables para que se revisen TODOS los campos*/
    const nombreValidado = revisarNombre();
    const descripcionValidada = revisarDescripcion();
    const asignadoValidado = revisarAsignado();
    const fechaValidada = revisarFecha();
    const estadoValidado = revisarEstado();

    return nombreValidado && descripcionValidada && asignadoValidado && fechaValidada && estadoValidado;
}


/**borra los mensajes de validacion*/
export function limpiarMensajes() {
    const mensajes = [errorNombre, errorDescripcion, errorAsignado, errorFecha, errorEstado];

    mensajes.forEach(function (mensaje) {
        mensaje.textContent = "";
        mensaje.classList.remove("texto-error", "texto-exito");
    });
}
