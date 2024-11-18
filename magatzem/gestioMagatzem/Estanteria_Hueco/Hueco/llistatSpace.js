window.onload = iniciar;

function iniciar () {
    // Obtindre magatzem, carrer i estanteria
    let storages        = JSON.parse(localStorage.getItem('storage')) || {};
    let elementMagatzem = document.getElementById('magatzem');
    let textMagatzem    = document.createTextNode(storages.storage.id + ", " + storages.storage.name + ", " + storages.storage.type);
    elementMagatzem.appendChild(textMagatzem);
    //console.log(storages.storage.id, elementMagatzem);

    let streets       = JSON.parse(localStorage.getItem('street'));
    let elementCarrer = document.getElementById('carrer');
    let textCarrer    = document.createTextNode(streets.street.id + ", " + streets.street.name);
    elementCarrer.appendChild(textCarrer);

    let shelfs            = JSON.parse(localStorage.getItem('shelf'));
    let elementEstanteria = document.getElementById('estanteria');
    let textEstanteria    = document.createTextNode(shelfs.shelf.id + ", " + shelfs.shelf.name);
    elementEstanteria.appendChild(textEstanteria);

    document.getElementById("nouSpace").addEventListener("click", nouSpace);
    obtindreSpace();
}

function nouSpace () {
    window.location.assign("altaSpace.html");
}

// Obtindre les dades
function obtindreSpace () {
    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || []; //obtindre de localStorage
    const tbody   = document.getElementById("files");

    // Recorrer l'arrray i mostrar en pantalla els elements.
    arrSpaces.forEach (space => {
        let row       = document.createElement("tr");
        row.innerHTML = `
            <td><button type="button" class="btn btn-primary btn-lg" onclick="esborrar('${space.id}')">Esborrar</button></td>
            <td><button type="button" class="btn btn-primary btn-lg" onclick="modificar('${space.id}', '${space.nom}', '${space.volum}', '${space.pes}')">Modificar</button></td>
            <td>${space.id}</td>
            <td>${space.nom}</td>
            <td>${space.quantitat}</td>
            <td>${space.volum}</td>
            <td>${space.pes}</td>
        `;
        tbody.appendChild(row);
    });
}

function esborrar (id) {
    // Fer les comprobacions si el hueco es pot esborrar.
    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    arrSpaces     = arrSpaces.filter(space => space.id !== id);
    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    // Esborrar del localstorage


    //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
    const row = document.querySelector(`button[onclick="esborrar('${id}')"]`).parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function modificar (id, nom, volum, pes) {
    const modSpace = { id: id, nom: nom, volum: volum, pes: pes };
    localStorage.setItem("modSpace", JSON.stringify(modSpace));
    
    window.location.assign("modificarSpace.html");
}
