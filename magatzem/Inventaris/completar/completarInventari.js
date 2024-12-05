$(document).ready(function() {
    thereIsUser();
    const inventory = JSON.parse(localStorage.getItem("inventoryCompletar")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }
    document.getElementById("btnCompletar").addEventListener("click",completarInventari,false);
    document.getElementById("btnRegresar").addEventListener("click", () => {
        localStorage.removeItem("inventoryCompletar");
        window.location.assign("../processarInventari/processarInventari.html"); 
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
        const fila = document.createElement('tr');

        //obtindre nom producte
        const product = products.filter(p => p.id === producte.product_id)[0];
        const productName =product.name;

        const productTD = document.createElement('td');
        productTD.textContent = productName; 
        fila.appendChild(productTD);

        const quantitatEstimadaTD = document.createElement('td');
        quantitatEstimadaTD.textContent = producte.quantity_estimated; 
        fila.appendChild(quantitatEstimadaTD);

        const quantitatRealTD = document.createElement('td');
        quantitatRealTD.textContent = producte.real_quantity; 
        fila.appendChild(quantitatRealTD);

        const justificacioTD = document.createElement('td');
        const selectJustificacio = document.createElement('select');
        selectJustificacio.className = "form-select";
        selectJustificacio.id = `justificacio-${producte.id}`;

        const opciones = [
            'Defectuós', 'Trencat', 'Robatori', 
            'Desaparegut', 'Error administratiu', 'Recompte cíclic'
        ];
    
        opciones.forEach(opcio => {
            const optionElement = document.createElement('option');
            optionElement.value = opcio;
            optionElement.textContent = opcio;
            selectJustificacio.appendChild(optionElement);
        });
        justificacioTD.appendChild(selectJustificacio);
        fila.appendChild(justificacioTD);

        
        productesBody.appendChild(fila);
    });
}

async function completarInventari() {
    //actualitzar linea inventari
    const valorsDetall = document.querySelectorAll("table select");
     
    for (const ele of valorsDetall) {
        const inventoryLineId = ele.id.split('-')[1]; 
        const justificacioValue = ele.value; 

        if (justificacioValue) {
            let inventoryLine = await getData(url, `InventoryLine/${inventoryLineId}`);
            let spaces = await getData(url, `Space`);
            

            if (inventoryLine) {
                inventoryLine.justification = justificacioValue; 
                await updateId(url, "InventoryLine", inventoryLineId, inventoryLine);

                const space = spaces.filter(s => s.id === inventoryLine.space_id)[0];
                let diferenciaQuantitat = inventoryLine.quantity_estimated - inventoryLine.real_quantity;
                if(space) {
                    space.quantity = inventoryLine.real_quantity;
                    await updateId(url, "Space", space.id, space);

                    newMoviment (inventoryLine.storage_id, inventoryLine.street_id, inventoryLine.selft_id, inventoryLine.space_id, inventoryLine.product_id, diferenciaQuantitat, 1, "Inventory",inventoryLine.inventory_id);
                }
            }
        }
    }
    alert('Inventari correctament completat'); 
}
