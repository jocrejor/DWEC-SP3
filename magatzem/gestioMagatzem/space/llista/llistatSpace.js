window.onload = iniciar;

function iniciar() {
    document.getElementById("nouSpace").addEventListener("click", nouSpace);
    obtindreSpace();
}

function nouSpace() {
    window.location.assign("../alta/altaSpace.html");
}

function obtindreSpace() {
    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    const tbody = document.getElementById("files");

    arrSpaces.forEach(space => {
        let row = document.createElement("tr");
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

function esborrar(id) {
    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    arrSpaces = arrSpaces.filter(space => space.id !== id);
    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    const row = document.querySelector(`button[onclick="esborrar('${id}')"]`).parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function modificar(id, nom, volum, pes) {
    const modSpace = { id, nom, volum, pes };
    localStorage.setItem("modSpace", JSON.stringify(modSpace));
    
    window.location.assign("../modificar/modificarSpace.html");
}
