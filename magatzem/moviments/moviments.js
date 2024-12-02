// URL base i endpoint del servidor
let arrayMoviments = [];
let arrayProduct = [];
let arrayUser = [];

window.onload = main;

/**
 * Funció principal que s'executa en carregar la pàgina.
 * Configura els events dels botons i crida a les funcions per a crear la taula i llistar els estats.
 */
async function main() {
    arrayMoviments = await getData(url, "Moviment");
    arrayProduct = await getData(url, "Product");
    arrayUser = await getData(url, "User");
    mostrarTaula();
}

function getProductName(id) {
    const obj = arrayProduct.find(prod => id == prod.id);
    return obj.name;
}


function mostrarTaula() {
    const tablaContenido = document.getElementById("tablaContenido");
    tablaContenido.innerHTML = "";

    arrayMoviments.forEach(mov => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${mov.id}</td>
            <td>${getProductName(mov.product_id)}</td>
            <td>${mov.storage_id}</td>
            <td>${mov.storage_id}</td>
            <td>${mov.street_id}</td>
            <td>${mov.space_id}</td>
            <td>${mov.space_id}</td>
            <td>${mov.date}</td>
            <td>${mov.operator_id}</td>
            <td>${mov.orgin}</td>
            <td>${mov.document}</td>
            <td><button class="btn btn-info" id="ver">Visualitzar</button></td>
            
        `;

        tablaContenido.appendChild(fila);

        // Afegir addEventListeners als boto Visualitzar
        fila.querySelector("#ver").addEventListener("click", () => verEstado(estat.id));
    });
}

/**
 * Redirigeix a la pàgina de visualització d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a visualitzar.
 */
function verEstado(id) {
    window.location.href = `../Visualizar/ver.html?id=${id}`;
}
