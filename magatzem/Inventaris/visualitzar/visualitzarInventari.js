$(document).ready(function() {
    const inventory = JSON.parse(localStorage.getItem("inventoryVisualizar")); 
    if (inventory) {
        mostrarInventari(inventory);
        mostrarProductes(inventory.id);
    }

    document.getElementById("btnRegresar").addEventListener("click", () => {
        localStorage.removeItem("inventoryVisualizar");
        window.location.assign("../llistar/llistarGeneral.html"); 
    });
});

//millorar posar noms magatzem
function mostrarInventari(inventory) {
    const inventoryBody = document.getElementById("inventariBody");

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

    const magatzemTD = document.createElement('td');
    magatzemTD.textContent = "mejorar";
    fila.appendChild(magatzemTD);

    inventoryBody.appendChild(fila);
}

//millorar canviar id per els noms
async function mostrarProductes(inventoryID) {
    const productesBody = document.getElementById("productesBody");
    const productes = await getData(url,"InventoryLine");
    const productesInventari = productes.filter(producte => producte.inventory_id === inventoryID);

    productesInventari.forEach(producte => {
        const fila = document.createElement('tr');

        const productTD = document.createElement('td');
        productTD.textContent = producte.product_id; 
        fila.appendChild(productTD);

        const quantitatTD = document.createElement('td');
        quantitatTD.textContent = producte.real_quantity; 
        fila.appendChild(quantitatTD);

        const carrerTD = document.createElement('td');
        carrerTD.textContent = producte.street_id; 
        fila.appendChild(carrerTD);

        const estanteriaTD = document.createElement('td');
        estanteriaTD.textContent = producte.selft_id; 
        fila.appendChild(estanteriaTD);

        const spaceTD = document.createElement('td');
        spaceTD.textContent = producte.space_id; 
        fila.appendChild(spaceTD);

        productesBody.appendChild(fila);
    });
}