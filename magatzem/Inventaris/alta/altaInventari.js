let inventoryLine;

$(document).ready(function() {
    carregarMagatzem();

    document.getElementById("btnGenerar").addEventListener("click", generarInventari, false);
});

async function carregarMagatzem() {
    const storages = await getData(url,"Storage");
    const storageSelect = document.getElementById("storage");

    storages.forEach(storage => {
        const option = document.createElement("option");
        option.value = storage.id; 
        option.text = storage.name;
        storageSelect.appendChild(option);
    });
}

async function carregarCarrers() {
    const streets = await getData(url,"Street");
    const selectedStorageId = document.getElementById("storage").value;
    const streeetSelect = document.getElementById("street");

    const filteredStreets = streets.filter(street => street.storage_id === selectedStorageId);

    filteredStreets.forEach(street => {
        const option = document.createElement("option");
        option.value = street.id; 
        option.text = street.name;
        streeetSelect.appendChild(option);
    });
}

async function generarInventari() {
    const spaces = await getData(url,"Space");
    const storageSelect = document.getElementById("storage").value;
    const streetSelect = document.getElementById("street").value;

    const filteredSpaces = spaces.filter(space => 
        space.storage_id === storageSelect && space.street_id === streetSelect
    );

    console.log(filteredSpaces);

    //inventory
    let idInventory = await getNewId(url, "Inventory");
    let dataInventory = new Date().toISOString();
    
    let newInventory = {
        id: idInventory,
        date: dataInventory,
        created_by: 1,
        inventory_status: "Pendent",
    }
    
    await postData(url, "Inventory", newInventory);

    //inventoryLine
    let idInventoryLine = await getNewId(url, "InventoryLine"); 
    
    await filteredSpaces.forEach(space => {
        let newInventoryLine =  {
            inventory_id: idInventory,
            product_id: space.product_id,
            real_quantity: space.quantity,
            user: 1,
            storage_id: space.storage_id,
            street_id: space.street_id,
            selft_id: space.selft_id,
            space_id: space.id
        }

        postData(url, "InventoryLine", newInventoryLine);
    });

    alert("Inventari Generat Correctament")
}