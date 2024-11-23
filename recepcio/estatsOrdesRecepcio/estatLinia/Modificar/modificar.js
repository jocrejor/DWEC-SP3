window.onload = main;

function main() {
    cargarDatosEstados();

    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
    document.getElementById("name").addEventListener("blur", validarNombreEstado, false);
}

/**
 * Carga la lista de estados de línea de orden de recepción desde localStorage.
 * @returns {Array} Lista de estados
 */
function inicializarEstados() {
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));
    }
    estados.sort((a, b) => a.id - b.id);
    return estados;
}

/**
 * Carga los datos del estado que se va a modificar en el formulario.
 */
function cargarDatosEstados() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = parseInt(urlParams.get("id"));
    
    let estados = inicializarEstados();
    const estado = estados.find(estado => estado.id === id);

    if (estado) {
        document.getElementById('id').value = id;
        document.getElementById('name').value = estado.name;
    }
}

/**
 * Guarda los datos modificados del estado de línea de orden de recepción.
 */
function modificarEstado() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = parseInt(urlParams.get("id"));

    let estados = inicializarEstados();
    const indiceEstado = estados.findIndex(estado => estado.id === id);

    const eModificado = {
        id: id,
        name: document.getElementById("name").value.trim(),
    };

    if (!eModificado.name) {
        alert("Por favor, rellene todos los campos.");
        return;
    }

    estados[indiceEstado] = eModificado;
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));

    alert("Estat modificat correctament.");
    document.location.href = "../Listar/listar.html";
}

/**
 * Verifica que el nombre del estado cumpla con el patrón.
 */
function validarNombreEstado() {
    let element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Ha d'introduir el nom de l'estat.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nom de l'estat ha de tindre entre 2 i 25 caràcters.");
        }
        return false;
    }
    valid();
    element.className = "valid";
    return true;
}

/**
 * Valida el formulario y guarda los cambios si son correctos.
 * @param {Event} e 
 * @returns {boolean}
 */
function validar(e) {
    borrarError();
    if (validarNombreEstado() && confirm("Desitja guardar l'estat?")) {
        modificarEstado();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

/**
 * Muestra un mensaje de error si no se cumple con la validación.
 */
function error2(element, mensaje) {
    let formulario = document.getElementById("formulario");
    let p = document.getElementById("mensajeError");

    if (!p) {
        p = document.createElement("p");
        p.setAttribute("id", "mensajeError");
        p.setAttribute("class", "error");
        formulario.appendChild(p);
    }
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
    let mensaje_mostrar = document.createTextNode(mensaje);
    p.appendChild(mensaje_mostrar);

    element.className = "mensajeError";
    element.focus();
}

/**
 * Elimina el mensaje de error mostrado cada vez que no se cumple con las verificaciones.
 */
function valid() {
    let valid = document.getElementById("mensajeError");
    if (valid) {
        while (valid.firstChild) {
            valid.removeChild(valid.firstChild);
        }
    }
}

/**
 * Elimina todos los CSS de error de todos los elementos del formulario.
 */
function borrarError() {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "";
    }
}
