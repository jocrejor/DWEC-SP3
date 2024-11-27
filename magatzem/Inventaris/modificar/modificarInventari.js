$(document).ready(function() {
    const inventory = JSON.parse(localStorage.getItem("inventariarInventory")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }

    document.getElementById("guardarBtn").addEventListener("click", () => {
        actualitzarQuantitat(inventory.id);
        localStorage.removeItem("inventariarInventory");
        window.location.assign("../llistar/llistarGeneral.html"); 
    });
});

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
        // Obtener el nombre del producto
        const productObj = products.find(p => p.id === producte.product_id);
        const productName = productObj.name;

        // Crear un div per a cada producte
        const divProducte = document.createElement('div');
        divProducte.className = "form-group";

        // Crear el label per a cada producte
        const labelProducte = document.createElement('label');
        labelProducte.textContent = productName;
        labelProducte.setAttribute("for", `product-${producte.product_id}`);
        divProducte.appendChild(labelProducte);

        // Crear el input par a cada producte
        const inputQuantitat = document.createElement('input');
        inputQuantitat.type = "number";
        inputQuantitat.className = "form-control";
        inputQuantitat.id = `product-${producte.product_id}`;
        inputQuantitat.name = `quantitat-${producte.product_id}`;
        inputQuantitat.placeholder = "Introduïu la quantitat";
        divProducte.appendChild(inputQuantitat);

        // Añadir el div al formulario
        productesBody.appendChild(divProducte);
    });
}

async function actualitzarQuantitat(inventoryID) {
    const lineInventorys = await getData(url,"InventoryLine");
    const productesInventari = lineInventorys.filter(line => line.inventory_id === inventoryID);

    await productesInventari.forEach(producte => {
        const quantitatInsertada = document.getElementById(`product-${producte.product_id}`);

        if (quantitatInsertada) {
            const novaQuantitat = quantitatInsertada.value.trim();

            if (novaQuantitat !== "" && !isNaN(novaQuantitat)) {
                const updatedData = {
                    real_quantity: parseInt(novaQuantitat, 10)
                };

                updateId(url, "InventoryLine", producte.id, updatedData);
            }
        }
    });  
}