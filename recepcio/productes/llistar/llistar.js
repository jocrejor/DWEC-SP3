let arrProductes = [];

window.onload = main;

//const url = 'http://localhost:5001/';  // URL del servidor backend
const endPoint = 'Product'; // Creem la variable endPoint per a que siga més pràctic

function main() {
    document.getElementById('altaProducte').addEventListener('click', altaProducte);
    document.getElementById('icon-filter').addEventListener('click', showFilters);

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

// Función per obtindre tots els productes de la base de datos utilitzant getData() del crud.js
async function obtenerProductos() {
    try {
        // Cridem a la funció getData() del script crud.js
        const arrProductes = await getData(url, endPoint);
        console.log(arrProductes);
        mostrarProductes(arrProductes);
        activateAutocomplete(arrProductes);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar los productos en la tabla
function mostrarProductes(arrProductes) {
    let tbody = document.getElementById("files");

    // Crear las opciones para el select de "lot"
    const opciones = [
        { value: "Seleccione un lot",       text: "Seleccione un lot" },
        { value: "Non",                     text: "Non" },
        { value: "Lote",                    text: "Lot" },
        { value: "Serial",                  text: "Serial" }
    ];

    const selectLotorserial = document.getElementById("lot");

    // Limpiar las opciones anteriores utilizando el DOM
    while (selectLotorserial.firstChild) {
        selectLotorserial.removeChild(selectLotorserial.firstChild);
    }

    // Añadir las nuevas opciones utilizando el DOM
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

function activateAutocomplete(arrProductes) {
    const sku           = arrProductes.map(product => product.sku);
    const description   = arrProductes.map(product => product.description);
    const name          = arrProductes.map(product => product.name);

    $("#sku").autocomplete({
        source: sku,
        minLength: 3, //Autcompletem después de 3 caràcters
        select: function (event, sku) {
            console.log("Sku:", sku.item.value);
            // Filtra els productes per sku
            filterSKUProducts(sku.item.value, arrProductes);
        }
    });
    $('#sku').on('input', function() {
        const query = $(this).val().trim();
        if (query === '') {
            mostrarProductes(arrProductes); // Mostrar todos los productos
        }
    });
    $("#name").autocomplete({
        source: name,
        minLength: 3, //Autcompletem después de 3 caràcters
        select: function (event, name) {
            console.log("Name:", name.item.value);
            // Filtra els productes per nom
            filterNameProducts(name.item.value, arrProductes);
        }
    });
    $('#name').on('input', function() {
        const query = $(this).val().trim();
        if (query === '') {
            mostrarProductes(arrProductes); // Mostrar todos los productos
        }
    });
    $("#description").autocomplete({
        source: description,
        minLength: 3, //Autcompletem después de 3 caràcters
        select: function (event, description) {
            console.log("Description:", description.item.value);
            // Filtra els productes per descripció
            filterDescriptionProducts(description.item.value, arrProductes);
        }
    });
    $('#description').on('input', function() {
        const query = $(this).val().trim();
        if (query === '') {
            mostrarProductes(arrProductes); // Mostrar todos los productos
        }
    });
    
    $("#lot").on(function() {
        const query = $(this).val();  // Obtiene el valor seleccionado   
        console.log('Valor seleccionado:', query);  // Depuración para ver qué valor se obtiene
    
        // Verificar si se seleccionó la primera opción (vacía)
        if (query === "") {
            mostrarProductes(arrProductes);  // Mostrar todos los productos
        } else {
            filterLotProducts(query, arrProductes);  // Filtrar productos por "lot"
        }
    });
}

//Funció per filtrar els productes per SKU
function filterSKUProducts(query, arrProductes) {
    const filteredProducts = arrProductes.filter(product => product.sku.toLowerCase().includes(query.toLowerCase()));
    mostrarProductes(filteredProducts);
}

//Funció per filtrar els productes per Nom
function filterNameProducts(query, arrProductes) {
    const filteredProducts = arrProductes.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    mostrarProductes(filteredProducts);
}

//Funció per filtrar els productes per Descripció
function filterDescriptionProducts(query, arrProductes) {
    const filteredProducts = arrProductes.filter(product => product.description.toLowerCase().includes(query.toLowerCase()));
    mostrarProductes(filteredProducts);
}

function filterLotProducts(query, arrProductes) {
    const filteredProducts = arrProductes.filter(product => product.lotorserial && product.lotorserial.includes(query));
    mostrarProductes(filteredProducts);
}