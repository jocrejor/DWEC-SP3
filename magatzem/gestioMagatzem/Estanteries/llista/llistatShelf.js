window.onload = iniciar;

function iniciar () {
    // Obtendre magatzem i carrer
    let storages = JSON.parse(localStorage.getItem('storage')) || {};
    let elementMagatzem = document.getElementById('magatzem');
    if (storages && storages.storage) {
        let textMagatzem = document.createTextNode(storages.storage.id + ", " + storages.storage.name + ", " + storages.storage.type);
        elementMagatzem.appendChild(textMagatzem);
    }

    let streets = JSON.parse(localStorage.getItem('street')) || {};
    let elementCarrer = document.getElementById('carrer');
    if (streets && streets.street) {
        let textCarrer = document.createTextNode(streets.street.id + ", " + streets.street.name);
        elementCarrer.appendChild(textCarrer);
    }

    document.getElementById("nouShelf").addEventListener("click", nouShelf);
    obtindreShelf();
}

function nouShelf () {
    window.location.assign("../alta/altaShelf.html"); 
}


function obtindreShelf () {
    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || []; 
    const tbody = document.getElementById("files");

   
    if (arrShelfs.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = "";
        tbody.appendChild(row);
    } else {
       
        arrShelfs.forEach(shelf => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><button type="button" class="btn btn-danger btn-lg" onclick="esborrar('${shelf.id}')">Esborrar</button></td>
                <td><button type="button" class="btn btn-primary btn-lg" onclick="modificar('${shelf.id}', '${shelf.nom}', '${shelf.id_carrer}', '${shelf.id_magatzem}')">Modificar</button></td>
                <td>${shelf.id}</td>
                <td>${shelf.nom}</td>
                <td>${shelf.id_carrer}</td>
                <td>${shelf.id_magatzem}</td>
            `;
            tbody.appendChild(row);
        });
    }
}


function esborrar(id) {
  
    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];
    arrShelfs = arrShelfs.filter(shelf => shelf.id !== id);
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    const row = document.querySelector(`button[onclick="esborrar('${id}')"]`).parentNode.parentNode;
    row.parentNode.removeChild(row);
}


function modificar(id, nom, id_carrer, id_magatzem) {
    const modShelf = { id: id, nom: nom, id_carrer: id_carrer, id_magatzem: id_magatzem };
   
    localStorage.setItem("modShelf", JSON.stringify(modShelf));
    
    window.location.assign("../modificar/modificarShelf.html");  
}
