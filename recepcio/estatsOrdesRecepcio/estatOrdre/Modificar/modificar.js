document.addEventListener("DOMContentLoaded", main);

function main() {
    cargarDatosEstados();

    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });

    document.getElementById("name").addEventListener("blur", validarNombreEstado, false);
}
/**
 * Carga la llista d'estats en línea d'orden de recepció des-de localStorage.
 * @returns {Array} Llista d'estats
 */
function inicializarEstados() {
    let estados = JSON.parse(localStorage.getItem("OrderReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderReception_Status", JSON.stringify(estados));
    }
    return estados;
}
/**
 * Carga les dades del estat que es va a modificar en el formulari.
 */
function cargarDatosEstados() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));

    const estados = inicializarEstados();
    const estado = estados.find(estado => estado.id === id);

    if (estado) {
        document.getElementById("id").value = id;
        document.getElementById("name").value = estado.name;
    }
}

/**
 * Guarda les dades modificades de l'estat de linia d'ordre de recepció.
 */
function modificarEstado() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));

    const estados = inicializarEstados();
    const indiceEstado = estados.findIndex(estado => estado.id === id);

    const eModificado = {
        id: id,
        name: document.getElementById("name").value.trim(),
    };

    if (!eModificado.name) {
        alert("Per favor, emplene tots els camps.");
        return;
    }

    estados[indiceEstado] = eModificado;
    localStorage.setItem("OrderReception_Status", JSON.stringify(estados));

    alert("Estat modificat correctament.");
    document.location.href = "../Listar/listar.html";
}

/**
 * Verifica que el nom de l'estat no estiga repetit.
 */
function validarNombreEstado() {
    const element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Ha d'introduir el nom de l'estat.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nom de l'estat ha de tindre entre 2 i 25 caràcters.");
        }
        return false;
    }
    borrarError();
    element.classList.add("valid");
    return true;
}

/**
 * Valida el formulari i guarda els canvis si son correctes.
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
 * Mostra un missatge d'error si no s'ha validat el nom de l'estat.
 */
function error2(element, mensaje) {
    const p = document.getElementById("mensajeError");
    p.textContent = mensaje;
    element.classList.add("error");
    element.focus();
}
/**
 * Elimina els CSS d'error de tots els elements del formulari.
 */
function borrarError() {
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.textContent = "";
    document.getElementById("name").classList.remove("error");
}
