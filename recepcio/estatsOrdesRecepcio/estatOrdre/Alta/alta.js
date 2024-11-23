window.onload = main;

function main () {
    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
    document.getElementById("id").value = generarNuevoCodigo();
    document.getElementById("id").addEventListener("blur", validarID, false);
    document.getElementById("name").addEventListener("blur", validarNombreEstado, false);
}

/**
 * Carga y retorna la lista de estados de recepción almacenada en el localStorage. 
 * En caso de no haber datos devuelve un array vacío
 * @returns array de objetos
 */
function inicializarEstado () {
    let estados = JSON.parse(localStorage.getItem("OrderReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderReception_Status", JSON.stringify(estados));
    }
    estados.sort((a, b) => {
        return a.id - b.id;
    });
    return estados;
}

/**
 * Genera un nuevo código con la secuencia 2000
 * Lo hace de manera automática para tener un orden
 * @returns int
 */
function generarNuevoCodigo() {
    let estados = inicializarEstado();
    let ultimoEstado = estados.length ? estados[estados.length - 1] : null;
    let ultimoId = ultimoEstado ? parseInt(ultimoEstado.id) : 2000;
    if (ultimoId < 2000) {
        ultimoId = 2000;
    }
    // Genera nuevo código incremental en formato 2000
    const nuevoId = ultimoId + 1;
    // Si el número de ID ya está en uso, genera otro
    while (estados.some(estado => estado.id === nuevoId)) {
        nuevoId++;
    }

    return nuevoId;
}

/**
 * Guarda el objeto con los datos del formulario en el array de proveedores
 * que se encuentra en localStorage
 * @returns void
 */
function guardarEstado() {
    const estado = obtenerDatosFormulario();
    if (!estado) return;
    let estados = inicializarEstado();
    estados.push(estado);
    localStorage.setItem("OrderReception_Status", JSON.stringify(estados));

    alert("Estat guardat correctament.");
    document.getElementById("altaForm").reset();
    window.location.href = "../Listar/listar.html";
}

/**
 * Recoleta todos los datos del formulario creando un objeto para ser guardado en localStorage
 * @returns object
 */
function obtenerDatosFormulario() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value.trim();

    if (!name) {
        alert("Per favor, emplene tots els camps.");
        return null;
    }

    id = parseInt(id);
    return { id, name };
}

/**
 * Valida el ID para asegurarse de que sea único y cumpla con el formato requerido
 * @returns boolean
 */
function validarID() {
    let element = document.getElementById("id");
    let valor = parseInt(element.value);

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "El camp ID està buit");
        }
        if (element.validity.patternMismatch || element.value.length !== 4) {
            error(element, "El ID ha d'estar compost de 4 números.");
        }
        return false;
    }

    let estados = inicializarEstado();
    let idOcupado = estados.some(estado => estado.id === valor);

    if (idOcupado) {
        error(element, "El ID existix per a un altre estat.");
        return false;
    }
    
    valid();
    element.className = "valid";
    return true;
}

/**
 * Valida el nombre del estado según los patrones establecidos
 * @returns boolean
 */
function validarNombreEstado() {
    let element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Ha d'introduir el nom de l'estat.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error(element, "El nom de l'estat ha de tindre entre 2 i 25 caràcters.");
        }
        return false;
    }
    
    valid();
    element.className = "valid";
    return true;
}

/**
 * Valida los campos antes de proceder con el guardado de los datos
 * @param {*} e
 * @returns boolean
 */
function validar(e) {
    borrarError();
    if (validarID() && validarNombreEstado() && confirm("Desitja guardar l'estat?")) {
        guardarEstado();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

/**
 * Muestra un mensaje de error si no se cumple con la validación
 * @param {*} element --> elemento en el cual se encuentra el error
 * @param {*} mensaje --> mensaje que mostrará
 */
function error(element, mensaje) {
    let formulario = document.getElementById("altaForm");
    let p = document.getElementById("missatgeError");

    if (!p) {
        p = document.createElement("p");
        p.setAttribute("id", "missatgeError");
        p.setAttribute("class", "error");
        formulario.appendChild(p);
    }
    p.textContent = mensaje;

    element.className = "error";
    element.focus();
}

/**
 * Elimina el mensaje de error
 */
function valid() {
    let valid = document.getElementById("missatgeError");
    if (valid) {
        valid.textContent = "";
    }
}

/**
 * Elimina todos los CSS de error de todos los elementos del formulario
 */
function borrarError() {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "";
    }
}
