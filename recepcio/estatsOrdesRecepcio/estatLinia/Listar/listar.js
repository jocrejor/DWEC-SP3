window.onload = main;
const endPoint="OrderLineReception_Status";
/**
 * Funció principal que s'executa en carregar la pàgina.
 * Configura els events dels botons i crida a les funcions per a crear la taula i llistar els estats.
 */
function main() {
    getEstats();

    document.getElementById("crear").addEventListener("click", () => {
        document.location.href = "../Alta/alta.html";
    });
}

/**
 * Obté els estats des de la base de dades i els mostra a la taula.
 */
async function getEstats() {
    try {
        const data = await getData(url,endPoint);
        
        // Comprovació
        if (data && Array.isArray(data)) {
            mostrarTaula(data);
        } else{
            console.error('Error al obtenir els estats del servidor');
        }

    } catch (error) {
        console.error('Error al carregar els estats:', error);
    }
}

/**
 * Mostra els estats a la taula HTML.
 * @param {Array} estats - Llista d'estats obtinguts des de la base de dades.
 */
function mostrarTaula(estats) {
    const tablaContenido = document.getElementById("tablaContenido");
    tablaContenido.innerHTML = "";
    
    estats.forEach(estat => {
        const fila = document.createElement("tr");
        
        fila.innerHTML = `
            <td><button class="btn btn-danger" id="eliminar">Esborrar</button></td>
            <td><button class="btn btn-warning" id="modificar">Modificar</button></td>
            <td><button class="btn btn-info" id="ver">Visualitzar</button></td>
            <td>${estat.id}</td>
            <td>${estat.name}</td>
        `;
        
        tablaContenido.appendChild(fila);

        // Afegir addEventListeners als botons
        fila.querySelector("#eliminar").addEventListener("click",() => deleteData(url,endPoint,estat.id));
        fila.querySelector("#modificar").addEventListener("click",() => modificarEstado(estat.id));
        fila.querySelector("#ver").addEventListener("click",() => verEstado(estat.id));
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


