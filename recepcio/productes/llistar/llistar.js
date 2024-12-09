arrProductes = [];

window.onload = main;

//const url = 'http://localhost:5001/';  // URL del servidor backend
const endPoint = 'Product'; // Creem la variable endPoint per a que siga més pràctic

function main() {
    document.getElementById('altaProducte').addEventListener('click', altaProducte);
    document.getElementById('icon-filter').addEventListener('click', showFilters);
    document.getElementById('filtrarProductes').addEventListener('click', filtrarProductes);

    obtenerProductos();
}

function showFilters() {
    const filters = $('#filters');
    filters.slideToggle(500);  // 500ms de duración para la animación
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

async function visualitzarProducte(productId) {
    try {
        // Obtenim les dades actuals del producte
        const product = await getData(url, `${endPoint}/${productId}`);
        
        window.localStorage.setItem('producteVisualitzar', JSON.stringify(product));
        
        // Redirigim a la página de modificar
        window.location.href = '../visualitzar/visualitzar.html';
    } catch (error) {
        console.error('Error al visualizar el producto:', error);
    }
}

//Funció per obtindre tots els productes de la base de datos utilitzant getData() del crud.js
async function obtenerProductos() {
    try {
        // Cridem a la funció getData() del script crud.js
        arrProductes = await getData(url, endPoint);
        console.log(arrProductes);
        mostrarProductes(arrProductes);
        activateAutocomplete();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

//Funció para mostrar los productos en la tabla
function mostrarProductes(arrProductes) {
    let tbody = document.getElementById("files");

    //Crear las opciones para el select de "lot"
    const opciones = [
        { value: "Seleccione un lot",       text: "Seleccione un lot" },
        { value: "Non",                     text: "Non" },
        { value: "Lote",                    text: "Lot" },
        { value: "Serial",                  text: "Serial" }
    ];

    const selectLotorserial = document.getElementById("lot");

    //Limpiar las opciones anteriores utilizando el DOM
    while (selectLotorserial.firstChild) {
        selectLotorserial.removeChild(selectLotorserial.firstChild);
    }

    //Añadir las nuevas opciones utilizando el DOM
    opciones.forEach(opcion => {
        const optionElement = document.createElement("option");
        optionElement.value = opcion.value;
        optionElement.textContent = opcion.text;
        selectLotorserial.appendChild(optionElement);
    });

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

        let visualitzarCell = document.createElement('td');
        let visualitzarBtn = document.createElement('button');
        visualitzarBtn.appendChild(document.createTextNode('Visualitzar'));
        visualitzarBtn.className = 'btn btn-primary btn-lg';
        visualitzarBtn.onclick = function() { visualitzarProducte(product.id); };
        visualitzarCell.appendChild(visualitzarBtn);

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

        let image_urlCell           = document.createElement('td');
        let imageElement            = document.createElement('img');
        let URLImage                = 'testImage.jpg';
        imageElement.src            = URLImage;
        imageElement.alt            = 'Imagen del producto';
        imageElement.style.width    = '50px';
        imageElement.style.height   = '50px';
        image_urlCell.appendChild(imageElement);

        // Añadir celdas a la fila
        row.appendChild(eliminarCell);
        row.appendChild(modificarCell);
        row.appendChild(visualitzarCell);
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

// Funció que aplica els filtros i mostra els productes filtrats
async function filtrarProductes() {
    arrProductes = await getData(url, endPoint);

    const skuInput          = $('#sku').val().trim().toLowerCase();
    const nameInput         = $('#name').val().trim().toLowerCase();
    const descriptionInput  = $('#description').val().trim().toLowerCase();
    const lotInput          = $('#lot').val().trim();

    console.log('SKU Input:', skuInput);
    console.log('Name Input:', nameInput);
    console.log('Description Input:', descriptionInput);
    console.log('Lot Input:', lotInput);

    // Filtrar productes depenent dels valors dels filtros
    const productosFiltrados = arrProductes.filter(product => {
        const matchesSKU = !skuInput || product.sku.toLowerCase().includes(skuInput);
        const matchesName = !nameInput || product.name.toLowerCase().includes(nameInput);
        const matchesDescription = !descriptionInput || product.description.toLowerCase().includes(descriptionInput);

        // Filtro de lote con verificación adicional
        const matchesLot = lotInput && lotInput !== "Seleccione un lot" && product.lotorserial && String(product.lotorserial).toLowerCase().includes(lotInput.toLowerCase());

        // El producto pasa el filtro si cumple todos los criterios
        return matchesSKU && matchesName && matchesDescription && matchesLot;
    });

    // Mostrar los productos filtrados
    console.log('Productos filtrados:', productosFiltrados);
    mostrarProductes(productosFiltrados);

    // Mantener la opción seleccionada en el select
    $('#lot').val(lotInput); // Establece el valor seleccionado de "lot" en el select
}

// Funció per activar el autocompletat pels camps de filtro
function activateAutocomplete() {
    const skuOptions = arrProductes.map(product => product.sku);
    const nameOptions = arrProductes.map(product => product.name);
    const descriptionOptions = arrProductes.map(product => product.description);

    // Activar autocompletado para SKU
    $('#sku').autocomplete({
        source: function(request, response) {
            const filtered = skuOptions.filter(option => option.toLowerCase().includes(request.term.toLowerCase()));
            response(filtered);
        },
        minLength: 3,
    });

    // Activar autocompletado para Name
    $('#name').autocomplete({
        source: function(request, response) {
            const filtered = nameOptions.filter(option => option.toLowerCase().includes(request.term.toLowerCase()));
            response(filtered);
        },
        minLength: 3,
    });

    // Activar autocompletado para Description
    $('#description').autocomplete({
        source: function(request, response) {
            const filtered = descriptionOptions.filter(option => option.toLowerCase().includes(request.term.toLowerCase()));
            response(filtered);
        },
        minLength: 3,
    });
}