window.onload = iniciar;

function iniciar() {
    document.getElementById("nouShelf").addEventListener("click", () => window.location.assign("../alta/altaShelf.html"));
    carregarEstanteries();
}

function carregarEstanteries() {
    const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
    const tbody = document.getElementById("files");

    estanteries.forEach((estanteria) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><button class="btn btn-danger" onclick="esborrar('${estanteria.id}')">Esborrar</button></td>
            <td><button class="btn btn-warning" onclick="modificar('${estanteria.id}')">Modificar</button></td>
            <td>${estanteria.id}</td>
            <td>${estanteria.nom}</td>
            <td>${estanteria.id_carrer}</td>
            <td>${estanteria.adreça}</td>
            <td>${estanteria.tipus}</td>
        `;
        tbody.appendChild(fila);
    });
}

function esborrar(id) {
    let estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
    estanteries = estanteries.filter((e) => e.id !== id);
    localStorage.setItem("shelfs", JSON.stringify(estanteries));
    document.location.reload();
}

function modificar(id) {
    const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
    const estanteria = estanteries.find((e) => e.id === id);

    if (estanteria) {
        localStorage.setItem("modShelf", JSON.stringify(estanteria));
        window.location.assign("../modificar/modificarShelf.html");
    }
}