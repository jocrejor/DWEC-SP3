window.onload = main;

const url = 'http://localhost:5001/';  // URL del servidor backend

function main() {
    document.getElementById("nuevoProducto").addEventListener("click", nuevoProducto);
    obtenerProductos();
}

function nuevoProducto() {
    window.location.assign("../alta/alta.html");
}

// Función para obtener todos los productos de la base de datos
async function obtenerProductos() {
    try {
        const response = await fetch(url + 'Product');  // Endpoint para obtener los productos
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const arrProductos = await response.json();
        mostrarProductos(arrProductos);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar los productos en la tabla
function mostrarProductos(arrProductos) {
    let tbody = document.getElementById("files");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    arrProductos.forEach(function (product) {
        let row = document.createElement('tr');

        let eliminarCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.appendChild(document.createTextNode('Eliminar'));
        eliminarBtn.className = 'btn btn-primary btn-lg';
        eliminarBtn.onclick = function () { eliminar(product.id); };
        eliminarCell.appendChild(eliminarBtn);

        let modificarCell = document.createElement('td');
        let modificarBtn = document.createElement('button');
        modificarBtn.appendChild(document.createTextNode('Modificar'));
        modificarBtn.className = 'btn btn-primary btn-lg';
        modificarBtn.onclick = function () { modificar(product.id); };
        modificarCell.appendChild(modificarBtn);

        let nameCell = document.createElement('td');
        nameCell.appendChild(document.createTextNode(product.name));

        let descriptionCell = document.createElement('td');
        descriptionCell.appendChild(document.createTextNode(product.description));

        let volumeCell = document.createElement('td');
        volumeCell.appendChild(document.createTextNode(product.volume));

        let weightCell = document.createElement('td');
        weightCell.appendChild(document.createTextNode(product.weight));

        let lotorserialCell = document.createElement('td');
        lotorserialCell.appendChild(document.createTextNode(product.lotorserial));

        let skuCell = document.createElement('td');
        skuCell.appendChild(document.createTextNode(product.sku));

        let image_urlCell = document.createElement('td');
        image_urlCell.appendChild(document.createTextNode(product.image_url));

        row.appendChild(eliminarCell);
        row.appendChild(modificarCell);
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(volumeCell);
        row.appendChild(weightCell);
        row.appendChild(lotorserialCell);
        row.appendChild(skuCell);
        row.appendChild(image_urlCell);

        tbody.appendChild(row);
    });
}