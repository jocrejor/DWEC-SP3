$(document).ready(function() {
    thereIsUser();
    const inventory = JSON.parse(localStorage.getItem("inventoryVisualizar")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }

    document.getElementById("btnRegresar").addEventListener("click", () => {
        localStorage.removeItem("inventoryVisualizar");
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
    const streets = await getData(url, "Street");
    const shelves = await getData(url, "Shelf");
    const spaces = await getData(url, "Space");

    productesInventari.forEach(producte => {
        const fila = document.createElement('tr');

        //obtindre nom producte
        const product = products.filter(p => p.id === producte.product_id)[0];
        const productName =product.name;
        //obtindre nom carrer
        const street = streets.filter(s => s.id === producte.street_id)[0];
        const streetName = street.name;
        //obtindre nom estanteria
        const shelf = shelves.filter(s => s.id === producte.selft_id)[0];
        const shelfName = shelf.name;
        //obtindre nom space
        const space = spaces.filter(s => s.id === producte.space_id)[0];
        const spaceName = space.name;

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
        quantitatTD.textContent = producte.quantity_estimated; 
        fila.appendChild(quantitatTD);

        productesBody.appendChild(fila);
    });
}