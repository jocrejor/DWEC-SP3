let arrTemp = [];

var productID = 0;

$(document).ready(function() {
    document.getElementById("btnAfegir").addEventListener("click", afegirProducte, false);

    const storageSelectID = localStorage.getItem("storageSelectedID");

    if (storageSelectID) {
        carregarProductes(storageSelectID);
        localStorage.removeItem("storageSelectedID");
    }
});

function carregarProductes(storageSelectID) {
    const spaces = JSON.parse(localStorage.getItem("Space")) || [];
    const products = JSON.parse(localStorage.getItem("Product")) || [];
    const productsSelect = document.getElementById("product");

   // Spaces del storage seleccionat
   const spacesStorage = spaces.filter(space => space.storage_id === storageSelectID);

   // Array per als id dels productes dels spaces
   const productStorage = spacesStorage.map(space => space.product_id);
   
   // Obtindre els productes a llistar
   const productsList = products.filter(product => productStorage.includes(product.id));

   if (productsList.length > 0) {
    productsList.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name; 
        option.text = product.name;
        productsSelect.appendChild(option);
    });
   }
}

function afegirProducte() {
    var producte = document.getElementById("product").value;
    var quantitatReal = document.getElementById("real_quantity").value;
    var rao = document.getElementById("inventory_reason").value;
    
    let idObj = ++productID;
    
    let producteObj = {
        id: idObj,
        product: producte,
        real_quantity: quantitatReal,
        inventory_reason: rao
    }

    arrTemp.push(producteObj);

    document.getElementById("product").value = "";
    document.getElementById("real_quantity").value = "";
    document.getElementById("inventory_reason").value = "";
   
    afegirLinea(producteObj);
}

function afegirLinea(productObj) {
    var files = document.getElementById('files');

    var linea = document.createElement('tr');
    linea.setAttribute("id", `fila-${productObj.id}`);

    var producteTD = document.createElement('td');
    var textProducte = document.createTextNode(productObj.product);
    producteTD.appendChild(textProducte);

    var quantitatRealTD = document.createElement('td');
    var textCantidadOrdenada = document.createTextNode(productObj.real_quantity);
    quantitatRealTD.appendChild(textCantidadOrdenada);

    var raoTD = document.createElement('td');
    var textRao = document.createTextNode(productObj.inventory_reason);
    raoTD.appendChild(textRao);
    
    var esborrarTD = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = 'opcio';
    //checkbox.addEventListener("click", () => borrarLineReception(productObj.id));
    esborrarTD.appendChild(checkbox);

    var modificarTD = document.createElement('td');
    var buttonModificar = document.createElement('button');
    buttonModificar.textContent = 'Modificar';
    buttonModificar.className = "btn btn-primary btn-lg";
    //buttonModificar.addEventListener("click", () => modificarLineReception(productObj.id, productObj.product, productObj.quantity_ordered));
    modificarTD.appendChild(buttonModificar);

    linea.appendChild(producteTD);
    linea.appendChild(quantitatRealTD);
    linea.appendChild(raoTD);
    linea.appendChild(esborrarTD);
    linea.appendChild(modificarTD);

    files.appendChild(linea);
}