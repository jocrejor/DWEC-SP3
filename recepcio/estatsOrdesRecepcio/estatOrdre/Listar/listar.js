window.onload = main;
const endPoint="OrderReception_Status";
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
        // Crear una nova fila
        const fila = document.createElement("tr");
        fila.setAttribute("id", estat.id);

        // Botó Esborrar
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.textContent = "Esborrar";
        btnEsborrar.className = "btn btn-danger";
        btnEsborrar.addEventListener("click", async () => await esborrar(estat.id));
        tdEsborrar.appendChild(btnEsborrar);

        // Botó Modificar
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.className = "btn btn-warning";
        btnModificar.addEventListener("click", () => modificaEstat(estat.id));
        tdModificar.appendChild(btnModificar);

        // Botó Visualitzar
        const tdVisualitzar = document.createElement("td");
        const btnVisualitzar = document.createElement("button");
        btnVisualitzar.textContent = "Visualitzar";
        btnVisualitzar.className = "btn btn-info";
        btnVisualitzar.addEventListener("click", () => visualitzaEstat(estat.id));
        tdVisualitzar.appendChild(btnVisualitzar);

        // Columna ID
        const tdId = document.createElement("td");
        tdId.textContent = estat.id;

        // Columna Name
        const tdName = document.createElement("td");
        tdName.textContent = estat.name;

        // Afegir les columnes a la fila
        fila.appendChild(tdEsborrar);
        fila.appendChild(tdModificar);
        fila.appendChild(tdVisualitzar);
        fila.appendChild(tdId);
        fila.appendChild(tdName);

        // Afegir la fila a la taula
        tablaContenido.appendChild(fila);
    });
}

/**
 * Redirigeix a la pàgina de visualització d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a visualitzar.
 */
function visualitzaEstat(id) {
    window.location.href = `../Visualizar/ver.html?id=${id}`;
}

/**
 * Redirigeix a la pàgina de modificació d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a modificar.
 */
function modificaEstat(id) {
    window.location.href = `../Modificar/modificar.html?id=${id}`;
}

async function esborrar(id){
    await deleteData(url,"OrderReception_Status",id);
    $(`#${id}`).remove();
}
