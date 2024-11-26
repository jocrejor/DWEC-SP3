let arrTemp = []; 
let productoEditadoID = null;
let inventoryLine;

$(document).ready(function() {
    carregarProductes(storageSelectID);

    let inventoryMod = JSON.parse(localStorage.getItem("modInventory"));
    inventoryLine = JSON.parse(localStorage.getItem("inventoryGeneralLine"));

    if (inventoryMod) {
        arrTemp = inventoryLine.filter(line => line.inventory_id === inventoryMod.id);
        arrTemp.forEach(afegirLinea); 
    }

    document.getElementById("btnAfegir").addEventListener("click", validar, false);
    document.getElementById("btnGuardarCambios").addEventListener("click", guardarCambios, false);
    document.getElementById("btnGuardar").addEventListener("click", guardarModificacion, false);
    document.getElementById("btnCancelar").addEventListener("click", () => {
        window.location.assign("../llistar/llistarGeneral.html"); 
    });
});

function carregarProductes(storageSelectID) {
    const products = JSON.parse(localStorage.getItem("Product")) || [];
    const productSelect = document.getElementById("product");

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.text = product.name;
        productSelect.appendChild(option);
    });
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

function guardarCambios() {
    let inventoryMod = JSON.parse(localStorage.getItem("modInventory"));

    if (inventoryMod) {
        let inventoryLine = JSON.parse(localStorage.getItem("inventoryGeneralLine")) || [];
        inventoryLine = inventoryLine.filter(line => line.inventory_id !== inventoryMod.id);

        arrTemp.forEach(product => {
            product.inventory_id = inventoryMod.id;
            inventoryLine.push(product);
        });

        localStorage.setItem("inventoryGeneralLine", JSON.stringify(inventoryLine));
        localStorage.removeItem("modInventory");

        alert("Cambios guardados correctamente");
        window.location.assign("../llistar/llistarGeneral.html");
    }
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
