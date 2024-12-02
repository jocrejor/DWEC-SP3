window.onload = main;

//const url = 'http://localhost:5001/';  // URL del servidor backend
const endPoint = 'Product'; // Creem la variable endPoint per a que siga més pràctic

function main() {
    document.getElementById('altaProducte').addEventListener('click', altaProducte);
    document.getElementById('btnEliminar').addEventListener('click', eliminarProducte);
    document.getElementById('btnModificar').addEventListener('click', modificarProducte);
    document.getElementById('filters').addEventListener('click', showFilters);
    obtenerProductos();
}

function showFilters() {
    const filters = document.getElementById('filters');

    if (filters.style.display == 'block') {
        filters.style.display = 'none';
    }
    else {
        filters.style.display = 'block';
    }
}

function altaProducte() {
    window.location.href = "../alta/alta.html";
}

// Función para eliminar un producto
async function eliminarProducte(productId) {
    deleteData(url, endPoint, productId);
    obtenerProductos();
}

async function modificarProducte(productId) {
    try {
        // Obtenim les dades actuals del producte
        const product = await getData(url, `${endPoint}/${productId}`);
        
        window.localStorage.setItem('producteModificat', JSON.stringify(product));

        // Redirigim a la página de modificar
        window.location.href = '../modificar/modificar.html';
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
}

// Función per obtindre tots els productes de la base de datos utilitzant getData() del crud.js
async function obtenerProductos() {
    try {
        // Cridem a la funció getData() del script crud.js
        const arrProductes = await getData(url, endPoint);
        mostrarProductes(arrProductes);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar los productos en la tabla
function mostrarProductes(arrProductes) {
    let tbody = document.getElementById("files");

    // Limpiar el contenido actual de la tabla
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Recorrer el array de productos y agregarlos a la tabla
    arrProductes.forEach(function (product) {
        let row = document.createElement('tr');

        let eliminarCell        = document.createElement('td');
        let eliminarBtn         = document.createElement('button');
        eliminarBtn.appendChild(document.createTextNode('Eliminar'));
        eliminarBtn.className   = 'btn btn-primary btn-lg';
        eliminarBtn.onclick     = function () { eliminarProducte(product.id); };
        eliminarCell.appendChild(eliminarBtn);

        let modificarCell       = document.createElement('td');
        let modificarBtn        = document.createElement('button');
        modificarBtn.appendChild(document.createTextNode('Modificar'));
        modificarBtn.className  = 'btn btn-primary btn-lg';
        modificarBtn.onclick    = function () { modificarProducte(product.id); };
        modificarCell.appendChild(modificarBtn);

        let nameCell            = document.createElement('td');
        nameCell.appendChild(document.createTextNode(product.name));

        let descriptionCell     = document.createElement('td');
        descriptionCell.appendChild(document.createTextNode(product.description));

        let volumeCell          = document.createElement('td');
        volumeCell.appendChild(document.createTextNode(product.volume));

        let weightCell          = document.createElement('td');
        weightCell.appendChild(document.createTextNode(product.weight));

        let skuCell             = document.createElement('td');
        skuCell.appendChild(document.createTextNode(product.sku));

        let image_urlCell       = document.createElement('td');
        image_urlCell.appendChild(document.createTextNode(product.image_url));

        // Añadir celdas a la fila
        row.appendChild(eliminarCell);
        row.appendChild(modificarCell);
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(volumeCell);
        row.appendChild(weightCell);
        row.appendChild(skuCell);
        row.appendChild(image_urlCell);

        // Añadir la fila a la tabla
        tbody.appendChild(row);
    });
}