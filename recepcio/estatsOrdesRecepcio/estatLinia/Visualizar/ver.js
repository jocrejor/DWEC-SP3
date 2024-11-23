window.onload = main;

function main() {
    cargarDatosEstados();

    document.getElementById("tornar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
}

/**
 * Carga y retorna la lista de estados de línea de ordenes de recepción almacenada en el localStorage.
 * En caso de no haber datos, devuelve un array vacío.
 */
function inicializarEstados() {
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));
    }
    return estados;
}

/**
 * Carga el formulario con los datos del estado de línea de orden de recepción indicado en la URL por el id.
 */
function cargarDatosEstados() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = parseInt(urlParams.get("id"));

    let estados = inicializarEstados();
    let estado = estados.find(estado => estado.id === id);

    if (estado) {
        document.getElementById("id").value = estado.id;
        document.getElementById("name").value = estado.name;
    }
}
