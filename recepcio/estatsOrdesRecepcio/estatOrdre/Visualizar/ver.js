window.onload = main;

function main() {
    cargarDatosEstados();

    document.getElementById("tornar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
}

/**
 * Carga y retorna la lista de estados de recepción almacenada en el localStorage. En caso de no haber datos, devuelve un array vacío.
 */
function inicializarEstados() {
    const estados = JSON.parse(localStorage.getItem("OrderReception_Status")) || [];
    console.log("Estados en localStorage:", estados);
    return estados;
}

/**
 * Carga el formulario con los datos del estado de orden de recepción indicado en la URL por el ID.
 */
function cargarDatosEstados() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    console.log("ID obtenido de la URL:", id);

    const estados = inicializarEstados();
    const estado = estados.find(estado => estado.id === id);

    if (estado) {
        console.log("Estado encontrado:", estado);
        document.getElementById("id").value = estado.id;
        document.getElementById("name").value = estado.name;
    } else {
        console.warn("Estado no encontrado para el ID:", id);
    }
}
