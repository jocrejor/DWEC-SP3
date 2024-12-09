$(document).ready(function() {
    thereIsUser();
    const inventory = JSON.parse(localStorage.getItem("inventariarInventory")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }

    document.getElementById("tornarBtn").addEventListener("click",tornar,false)
    //document.getElementById("guardarBtn").addEventListener("click", validar, false);
    document.getElementById("guardarBtn").addEventListener("click", () => {
        validar();
        //actualitzarQuantitat(inventory.id);
        localStorage.removeItem("inventariarInventory");
    });
});

function tornar() {
    window.location.assign("../processarInventari/processarInventari.html"); 
}

async function mostrarInventari(inventory) {
    const inventoryBody = document.getElementById("inventariBody");
    const storages = await getData(url, "Storage");

    const fila = document.createElement('tr');
    
    const idTD = document.createElement('td');
    idTD.textContent = inventory.id; 
    fila.appendChild(idTD);

    const dataTD = document.createElement('td');
    dataTD.textContent = inventory.date;
    fila.appendChild(dataTD);

    const estatTD = document.createElement('td');
    estatTD.textContent = inventory.inventory_status;
    fila.appendChild(estatTD);

    //obtindre el nom del magatzem
    const storageObj = storages.find(storage => storage.id === inventory.storage_id);
    const storageName =storageObj.name; 

    const magatzemTD = document.createElement('td');
    magatzemTD.textContent = storageName;
    fila.appendChild(magatzemTD);

    inventoryBody.appendChild(fila);
}

async function mostrarProductes(inventoryID) {
    const productesBody = document.getElementById("productesBody");

    const lineInventorys = await getData(url,"InventoryLine");
    const productesInventari = lineInventorys.filter(line => line.inventory_id === inventoryID);

    //altra infor
    const products = await getData(url, "Product");

    productesInventari.forEach(producte => {
        const fila = document.createElement('tr');

        // Obtener el nombre del producto
        const productObj = products.find(p => p.id === producte.product_id);
        const productName = productObj.name;

        const carrerTD = document.createElement('td');
        carrerTD.textContent = producte.street_id; 
        fila.appendChild(carrerTD);

        const estanteriaTD = document.createElement('td');
        estanteriaTD.textContent = producte.selft_id; 
        fila.appendChild(estanteriaTD);

        const spaceTD = document.createElement('td');
        spaceTD.textContent = producte.space_id; 
        fila.appendChild(spaceTD);
        
        const productTD = document.createElement('td');
        productTD.textContent = productName; 
        fila.appendChild(productTD);

        const quantitatTD = document.createElement('td');
        const inputQuantitat = document.createElement('input');
        inputQuantitat.type = "number";
        inputQuantitat.className = "form-control";
        inputQuantitat.id = producte.id;  //id inventory Line
        inputQuantitat.name = `quantitat-${producte.product_id}`;
        inputQuantitat.placeholder = "Introduïu la quantitat";
        inputQuantitat.setAttribute("required","required");    
        quantitatTD.appendChild(inputQuantitat);
        fila.appendChild(quantitatTD);

        
        productesBody.appendChild(fila);
    });
}

async function actualitzarQuantitat(inventoryID) {
    //actualitzar inventari
    const inventari = await getData(url,"Inventory");
    const inventariObj = inventari.find(inventari => inventari.id === inventoryID);

    if (inventariObj) {
        inventariObj.inventory_status = "Fent-se";
        await updateId(url, "Inventory", inventoryID, inventariObj);
    }

    //actualitzar InventoryLine
    const valorsDetall = document.querySelectorAll("table input");
     
    for (const ele of valorsDetall){
        if (ele.value) {
            const novaQuantitat = ele.value.trim();

            if (novaQuantitat !== "" && !isNaN(novaQuantitat)) {
                const updatedData =  parseInt(novaQuantitat, 10);
                let inventoryLine = await getData(url, `InventoryLine/${ele.id}`);

                if (inventoryLine) {
                    inventoryLine.real_quantity = updatedData;
                    await updateId(url, "InventoryLine", ele.id, inventoryLine);
                }
                //Falta operador
            }
        }
    }
    alert('Inventari correctament inventariat');
}

function validarQuantitat() {
    
    let taula = document.querySelectorAll("#productesBody input");
    for (let input of taula){
        if (!input.checkValidity()) {
            if (input.validity.valueMissing) {
                error(input, "Introdueix totes les quantitats reals");
            }
            else if (input.validity.patternMismatch) {
                error(input, "Introduce sols números");
            }
            return false;
        }
       
    }
 return true;

}

function validar() {
    esborrarError();
   
    if (validarQuantitat()) {
       // actualitzarQuantitat(inventory.id);
       // localStorage.removeItem("inventariarInventory");
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
    let inputs = document.querySelectorAll("#productesBody input");
   
    for (let ele of inputs) {
        ele.classList.remove("error")
    }
    document.getElementById("missatgeError").replaceChildren();
}