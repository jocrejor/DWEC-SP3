let inventory;
let inventoryLine;
let arrTemp = [];

var productID = 0;

$(document).ready(function() {
    document.getElementById("btnAfegir").addEventListener("click", validar, false);
    document.getElementById("btnGuardar").addEventListener("click", guardarModificacion, false);
    document.getElementById("btnGravar").addEventListener("click", gravarInventari, false);
    document.getElementById("llistatInventari").addEventListener("click", llistarinventari, false);

    const storageSelectID =localStorage.getItem("storageSelectedID");

    if (storageSelectID) {
        carregarProductes(storageSelectID);
        //localStorage.removeItem("storageSelectedID");
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
        option.value = product.id; 
        option.text = product.name;
        productsSelect.appendChild(option);
    });
   }
}

function llistarinventari() {
    window.location.assign("../llistar/llistarGeneral.html");
}

function afegirProducte() {
    var producteId = parseInt(document.getElementById("product").value); 
    var producteNom = document.getElementById("product").options[document.getElementById("product").selectedIndex].text;

    var quantitatReal = document.getElementById("real_quantity").value;
    var rao = document.getElementById("inventory_reason").value;
    
    let idObj = ++productID;
    
    let producteObj = {
        id: idObj,  //per manejar la eliminació i modificació en el arrayTemp
        product: producteNom,
        product_id: producteId,
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
    checkbox.addEventListener("click", () => borrarProducte(productObj.id));
    esborrarTD.appendChild(checkbox);

    var modificarTD = document.createElement('td');
    var buttonModificar = document.createElement('button');
    buttonModificar.textContent = 'Modificar';
    buttonModificar.className = "btn btn-primary btn-lg";
    buttonModificar.addEventListener("click", () => modificarProducte(productObj.id, productObj.product, productObj.real_quantity, productObj.inventory_reason));
    modificarTD.appendChild(buttonModificar);

    linea.appendChild(producteTD);
    linea.appendChild(quantitatRealTD);
    linea.appendChild(raoTD);
    linea.appendChild(esborrarTD);
    linea.appendChild(modificarTD);

    files.appendChild(linea);
}

function borrarProducte(productId) {
    arrTemp = arrTemp.filter(producte=> producte.id !== productId);

    var fila = document.getElementById(`fila-${productId}`);
    if (fila) {
        fila.remove();
    }
}

var productoEditadoID = null;
function modificarProducte(productID, product, real_quantity,inventory_reason) {
    productoEditadoID = productID;

    document.getElementById("btnGuardar").style.display = "inline-block";
    document.getElementById("btnAfegir").style.display = "none";
    document.getElementById("btnGravar").style.display = "none";
    document.getElementById('llistatInventari').style.display = "none";

    document.getElementById("product").value = product;
    document.getElementById("real_quantity").value = real_quantity;
    document.getElementById("inventory_reason").value = inventory_reason;
}

function guardarModificacion() {
    const nouProducte = document.getElementById("product").value;
    const novaQuantitat = document.getElementById("real_quantity").value;
    const novaRao = document.getElementById("inventory_reason").value;

    const productObj = arrTemp.find(product => product.id === productoEditadoID);
    if (productObj) {
        productObj.product = nouProducte;
        productObj.real_quantity = novaQuantitat;
        productObj.inventory_reason = novaRao;
    }

    const fila = document.getElementById(`fila-${productoEditadoID}`);

    if (fila && fila.children.length > 1) {
        fila.children[0].textContent = nouProducte;
        fila.children[1].textContent = novaQuantitat;
        fila.children[2].textContent = novaRao;
    } 

    document.getElementById("product").value = "";
    document.getElementById("real_quantity").value = "";
    document.getElementById("inventory_reason").value = "";

    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnGravar").style.display = "block";
    document.getElementById('llistatInventari').style.display = "inline-block";
    document.getElementById("btnAfegir").style.display = "inline-block";

    productoEditadoID = null;
}

function gravarInventari() {
    let idInventory;
    let idInventoryLine;

    inventory = JSON.parse(localStorage.getItem('inventoryGeneral')) || [];
    inventoryLine = JSON.parse(localStorage.getItem('inventoryGeneralLine')) || [];
    
    const spaces = JSON.parse(localStorage.getItem('Space')) || [];


    //capçalera inventari
    if(inventory.length == 0) {
        idInventory = 1;
    } else {
        const maxObj = inventory.reduce((max, obj) => (obj.id > max.id ? obj : max), inventory[0]);
        idInventory= ++ maxObj.id;
    }

    var dataInventari = new Date();

    
    let inventoryGeneral = {
        id: idInventory,
        date: dataInventari,
        created_by: 1,
        inventory_status: "Pendent",
    }

    inventory.push(inventoryGeneral);
    localStorage.setItem('inventoryGeneral', JSON.stringify(inventory));
   
    //detall inventari
    if(inventoryLine.length == 0) {
        idInventoryLine = 0;
    } else {
        const maxObj = inventoryLine.reduce((max, obj) => (obj.id > max.id ? obj : max), inventoryLine[0]);
        idInventoryLine = maxObj.id;
    }
    
    arrTemp.forEach(product => {
        const spaceDetails = spaces.find(space => space.product_id === product.product_id);

        product.id = ++idInventoryLine;
        product.inventory_id = idInventory;
        product.estimated_quantity = spaceDetails.quantity;
        product.user = 1;
        product.street_id = spaceDetails.steet_id;
        product.shelft_id = spaceDetails.selft_id;
        product.space_id = spaceDetails.id;

        inventoryLine.push(product);
    });

    localStorage.setItem('inventoryGeneralLine', JSON.stringify(inventoryLine));

    alert('Guardat correctament');
}

function validarProducte() {
    var producte = document.getElementById("product");
    if (!producte.checkValidity()) {
        if (producte.validity.valueMissing) {
            error(producte, "Selecciona un producte");
        }
        return false;
    }
    return true;
}


function validarQuantitatReal() {
    var quantitatReal = document.getElementById("real_quantity");
    if (!quantitatReal.checkValidity()) {
        if (quantitatReal.validity.valueMissing) {
            error(quantitatReal, "Introdueix la quantitat real");
        }
        else if (quantitatReal.validity.patternMismatch) {
            error(quantitatReal, "introdueix sols números");
        }
        return false;
    }
    return true;
}

function validarRao() {
    var rao = document.getElementById("inventory_reason");
    if (!rao.checkValidity()) {
        if (rao.validity.valueMissing) {
            error(rao, "Selecciona una raó");
        }
        return false;
    }
    return true;
}

function validar(e) {
    esborrarError();
    e.preventDefault();

    if (validarProducte() && validarQuantitatReal() && validarRao()) {
        afegirProducte();
        return true;

    } else {
        return false;
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add("error")
    element.focus();
}

function esborrarError() {
    let formulari = document.forms[0].elements;
    for (let ele of formulari) {
        ele.classList.remove("error")
    }
    document.getElementById("missatgeError").replaceChildren();
}
