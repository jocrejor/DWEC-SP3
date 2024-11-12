window.addEventListener("load", main);

function main() {
    // Afegir un event listener al botó "nouTransportista"
    document.getElementById("nouTransportista").addEventListener("click", nouTransportista);
    
    // Obtenir la llista de transportistes
    obtindreTransportistes();
}

function nouTransportista() {
    // Redirigir a la pàgina d'alta de transportistes
    window.location.assign("altaTransportistes.html");
}

function obtindreTransportistes() {
    // Recuperar la llista de transportistes del localStorage
    const arrCarriers = JSON.parse(localStorage.getItem("Carriers")) || [];
    const llistat = document.getElementById("files");
    llistat.innerHTML = ""; // Netejar la taula anterior

    arrCarriers.forEach(function (carrier) {
        const tr = document.createElement("tr");

        // Botó "Esborrar"
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.className = "btn btn-danger btn-log";
        btnEsborrar.textContent = "Esborrar";
        btnEsborrar.onclick = function() { esborrar(carrier.id); };
        tdEsborrar.appendChild(btnEsborrar);
        tr.appendChild(tdEsborrar);

        // Botó "Modificar"
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.className = "btn btn-warning btn-log";
        btnModificar.textContent = "Modificar";
        btnModificar.onclick = function() {
            modificar(carrier);
        };
        tdModificar.appendChild(btnModificar);
        tr.appendChild(tdModificar);

        tr.appendChild(crearTd(carrier.name));
        tr.appendChild(crearTd(carrier.id));
        tr.appendChild(crearTd(carrier.nif));
        tr.appendChild(crearTd(carrier.phone));
        tr.appendChild(crearTd(carrier.email));
        tr.appendChild(crearTd(carrier.state));
        tr.appendChild(crearTd(carrier.province));
        tr.appendChild(crearTd(carrier.city));

        llistat.appendChild(tr);
    });
}

function crearTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
}

function esborrar(id) {
    // Recuperar la llista de transportistes
    const arrCarriers = JSON.parse(localStorage.getItem("carriers")) || [];
    const index = arrCarriers.findIndex(carrier => carrier.id === id);
    if (index > -1) {
        arrCarriers.splice(index, 1); // Esborrar el transportista trobat
        localStorage.setItem("carriers", JSON.stringify(arrCarriers)); // Actualitzar el localStorage
        obtindreTransportistes(); // Actualitzar la llista mostrada
    }
}

function modificar(carrier) {
    // Guardar els valors del transportista seleccionat al localStorage
    localStorage.setItem("modTransportista", JSON.stringify(carrier));
    window.location.assign("modificarTransportistes.html"); // Redirigir a la pàgina de modificació
}