$(document).ready(function() {
    const inventory = JSON.parse(localStorage.getItem("inventariarInventory")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }

    document.getElementById("tornarBtn").addEventListener("click",tornar,false)
    document.getElementById("guardarBtn").addEventListener("click", () => {
        actualitzarQuantitat();
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
        quantitatTD.appendChild(inputQuantitat);
        fila.appendChild(quantitatTD);

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

async function actualitzarQuantitat() {
     const valorsDetall = document.querySelectorAll("table input");
     
    for (const ele of valorsDetall){
        if (ele.value) {
            const novaQuantitat = ele.value.trim();

            if (novaQuantitat !== "" && !isNaN(novaQuantitat)) {
                const updatedData =  parseInt(novaQuantitat, 10);
                const selectJustificacio = document.getElementById(`justificacio-${ele.id}`);
                const justificacioValue = selectJustificacio.value;

                if (justificacioValue) {
                    let inventoryLine = await getData(url, `InventoryLine/${ele.id}`);

                    if (inventoryLine) {
                        inventoryLine.real_quantity = updatedData;
                        inventoryLine.inventory_season = justificacioValue; // Actualiza el campo

                        await updateId(url, "InventoryLine", ele.id, inventoryLine);
                    }
                    alert('Inventari correctament inventariat');
                }

                //Falta operador
            }
        }
    }
}