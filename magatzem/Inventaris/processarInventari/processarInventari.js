$(document).ready(function() {
    document.getElementById("nouInventari").addEventListener("click", nouInventari);
    obtindreInventaris();
});

function nouInventari() {
    window.location.assign("../generar/generarInventari.html");
}

async function obtindreInventaris() {
    var arrInventari = await getData(url,"Inventory");
    const storages = await getData(url, "Storage");
    var files = document.getElementById('files');

    arrInventari.forEach(inventari => {
        var linea = document.createElement('tr');
        linea.setAttribute('id', inventari.id);

        var esborrarTD = document.createElement('td');
        var buttonEsborrar = document.createElement ('button');
        buttonEsborrar.textContent = 'Esborrar';
        buttonEsborrar.className = "btn btn-primary btn-lg";
        esborrarTD.appendChild(buttonEsborrar);
        buttonEsborrar.addEventListener("click", () => esborrarInventari(inventari.id));

        var visualizarTD = document.createElement('td');
        var buttonVisualizar = document.createElement ('button');
        buttonVisualizar.textContent = 'Visualitzar';
        buttonVisualizar.className = "btn btn-primary btn-lg";
        visualizarTD.appendChild(buttonVisualizar);
        buttonVisualizar.addEventListener("click", () => visualitzarInventari(inventari.id));

        var inventariarTD = document.createElement('td');
        var buttonInventariar = document.createElement ('button');
        buttonInventariar.textContent = 'Inventariar';
        buttonInventariar.className = "btn btn-primary btn-lg";
        inventariarTD.appendChild(buttonInventariar);
        buttonInventariar.addEventListener("click", () => inventariar(inventari.id));

        var id = document.createElement('td');
        var textId = document.createTextNode(inventari.id);
        id.appendChild(textId);

        var dataInventari = document.createElement('td');
        var textDataInventari = document.createTextNode(inventari.date);
        dataInventari.appendChild(textDataInventari);

        var estatInventari = document.createElement('td');
        var textEstatInventari = document.createTextNode(inventari.inventory_status);
        estatInventari.appendChild(textEstatInventari);

        var storage = document.createElement('td');
        const storageObj = storages.find(storage => storage.id === inventari.storage_id);
        const storageName =storageObj.name; 
        var textStorage = document.createTextNode(storageName);
        storage.appendChild(textStorage);

        linea.appendChild(esborrarTD);
        linea.appendChild(visualizarTD);
        linea.appendChild(inventariarTD);
        linea.appendChild(id);
        linea.appendChild(dataInventari);
        linea.appendChild(estatInventari);
        linea.appendChild(storage);

        files.appendChild(linea);
    });
}

async function esborrarInventari(id) {
    if (confirm("¿Estàs segur de que vols esborrar aquest inventari?")) {
        const arrInventoryLine = await getData(url, "InventoryLine");
        const inventoryLines = arrInventoryLine.filter(linea => linea.inventory_id === id);

        await inventoryLines.forEach(linea => {
            deleteData(url, "InventoryLine", linea.id);
        });

        await deleteData(url, "Inventory", id);

        //esborrar liniea inventari
        const filaOrden = document.querySelector(`tr[id="${id}"]`);
        if (filaOrden) {
            filaOrden.remove();
        }

        alert("Inventari esborrat correctament.");
    }
}

async function inventariar(id) {
    const inventory = await getData(url,"Inventory");
    const inventorySelected = inventory.find(inventory => inventory.id === id);
        
    if (inventorySelected) {
        localStorage.setItem("inventariarInventory", JSON.stringify(inventorySelected));
        window.location.assign("../inventariar/inventariar.html");
    }   
}

async function visualitzarInventari(id) {
    const inventory = await getData(url,"Inventory");
    const inventorySelected = inventory.find(inventari => inventari.id === id);

    if (inventorySelected) {
        localStorage.setItem("inventoryVisualizar", JSON.stringify(inventorySelected));
        window.location.assign("../visualitzar/visualitzarInventari.html"); 
    }
}
