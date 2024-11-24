window.onload = main;

/**
 * Funció principal que s'executa en carregar la pàgina.
 * Configura els events dels botons i crida a les funcions per a crear la taula i llistar els estats.
 */
function main() {
    listarEstados();
    
    document.getElementById("crear").addEventListener("click", () => {
        document.location.href = "../Alta/alta.html";
    });
}

/**
 * Inicialitza els estats de línia d'ordres de recepció desde el localStorage.
 * Retorna els estats ordenats per ID o un array buit si no existeixen.
 * @returns {Array} Array d'estats.
 */
function inicializarEstados() {
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status")) || [];
    estados.sort((a, b) => a.id - b.id);
    return estados;
}

/**
 * Crea les files de la taula amb els estats de línia d'ordres de recepció existents.
 */
function listarEstados() {
    let estados = inicializarEstados();
    let tablaContenido = document.getElementById("tablaContenido");
    
    tablaContenido.innerHTML = "";
    
    estados.forEach(estado => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td><button class="btn btn-danger" onclick="eliminarEstado(${estado.id})">Esborrar</button></td>
            <td><button class="btn btn-warning" onclick="modificarEstado(${estado.id})">Modificar</button></td>
            <td><button class="btn btn-info" onclick="verEstado(${estado.id})">Visualitzar</button></td>
            <td>${estado.id}</td>
            <td>${estado.name || 'Estat no trobat'}</td>
        `;
        
        tablaContenido.appendChild(row);
    });
}

/**
 * Redirigeix a la pàgina de visualització d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a visualitzar.
 */
function verEstado(id) {
    window.location.href = `../Visualizar/ver.html?id=${id}`;
}

/**
 * Redirigeix a la pàgina de modificació d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a modificar.
 */
function modificarEstado(id) {
    window.location.href = `../Modificar/modificar.html?id=${id}`;
}

/**
 * Elimina l'estat de línia d'ordres de recepció seleccionat i actualitza la taula.
 * @param {number} id - ID de l'estat a eliminar.
 */
function eliminarEstado(id) {
    let estados = inicializarEstados();
    
    if (confirm("Estàs segur que vols eliminar aquest estat?")) {
        let indice = estados.findIndex(estado => estado.id === id);
        if (indice !== -1) {
            estados.splice(indice, 1);
            localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));
            listarEstados(); // Actualitza la taula després d'eliminar l'estat.
        }
    }
}
