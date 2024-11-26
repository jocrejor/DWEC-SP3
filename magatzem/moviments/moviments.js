// URL base i endpoint del servidor
const urlBase = "http://localhost:5001/";
const endPointStorage = "Storage";
const endPointStreet = "Street";
const endPointShelf = "Shelf";
const endPointSpace ="Space";
const endPointProduct ="Product";

window.onload = main;

/**
 * Funció principal que s'executa en carregar la pàgina.
 * Configura els events dels botons i crida a les funcions per a crear la taula i llistar els estats.
 */
function main() {
    getEstatsStorage();
    getEstatsStreet();
    getEstatsShelf();
    getEstatsSpace();
    getEstatsProduct();
}

/**
 * Obté els estats des de la base de dades de  i els mostra a la taula.
 */
async function getEstatsStorage() {
    try {
        const data = await getData(urlBase,endPointStorage);

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

async function getEstatsStreet() {
    try {
        const data = await getData(urlBase,endPointStreet);

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

async function getEstatsShelf() {
    try {
        const data = await getData(urlBase,endPointShelf);

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

async function getEstatsSpace() {
    try {
        const data = await getData(urlBase,endPointSpace);

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

async function getEstatsProduct() {
    try {
        const data = await getData(urlBase,endPointProduct);

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
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td><button class="btn btn-info" id="ver">Visualitzar</button></td>
            
        `;
        
        tablaContenido.appendChild(fila);

        // Afegir addEventListeners als boto Visualitzar
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
