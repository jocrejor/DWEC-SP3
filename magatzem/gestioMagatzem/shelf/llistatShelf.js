window.onload = iniciar;

function iniciar () {
    // Obtindre magatzem i carrer
    let storages        = JSON.parse(localStorage.getItem('storage')) || {};
    let elementMagatzem = document.getElementById('magatzem');
    let textMagatzem    = document.createTextNode(storages.storage.id + ", " + storages.storage.name + ", " + storages.storage.type);
    elementMagatzem.appendChild(textMagatzem);

    let streets       = JSON.parse(localStorage.getItem('street'));
    let elementCarrer = document.getElementById('carrer');
    let textCarrer    = document.createTextNode(streets.street.id + ", " + streets.street.name);
    elementCarrer.appendChild(textCarrer);

    document.getElementById("nouShelf").addEventListener("click", nouShelf);
    obtindreShelf();
}

function nouShelf () {
    window.location.assign("altaShelf.html");
}

// Obtindre les dades
function obtindreShelf () {
    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || []; //obtindre de localstorage
    // recorrer l'arrray i mostrar en pantalla els elements.
    const tbody = document.getElementById("files");

    arrShelfs.forEach (shelf => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><button type="button" class="btn btn-primary btn-lg" onclick="esborrar('${shelf.id}')">Esborrar</button></td>
            <td><button type="button" class="btn btn-primary btn-lg" onclick="modificar('${shelf.id}', '${shelf.nom}')">Modificar</button></td>
            <td>${shelf.id}</td>
            <td>${shelf.nom}</td>
        `;
        tbody.appendChild(row);
    });
}

function esborrar (id) {
    // fer les comprobacions si l'estanteria es pot esborrar.
    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];
    arrShelfs = arrShelfs.filter(shelf => shelf.id !== id);
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    // esborrar del localstorage


    //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
    const row = document.querySelector(`button[onclick="esborrar('${id}')"]`).parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function modificar (id, nom) {
    const modShelf = { id: id, nom: nom };
    //guardar valors al local storage 
    localStorage.setItem("modShelf", JSON.stringify(modShelf));
    
    window.location.assign("modificarShelf.html");
}
