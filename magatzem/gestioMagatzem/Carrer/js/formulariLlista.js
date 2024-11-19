window.onload = main;

function main() {
    document.getElementById("producte").addEventListener("click", nou);
    obtindreProducte();
}

function nou() {
    window.location.assign("nouFormulari.html");
}

function obtindreProducte() {
    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    carrers.forEach((product, index) => {
        let row = `
            <tr>
                <td><button class="btn btn-danger" onclick="esborrar(${index})">Esborrar</button></td>
                <td><button class="btn btn-primary" onclick="modificar(${product.id}, '${product.name}')">Modificar</button></td>
                <td>${product.id || ""}</td>
                <td>${product.name || ""}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function esborrar(index) {
    var carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    carrers.splice(index, 1);
    localStorage.setItem("carrers", JSON.stringify(carrers));
    obtindreProducte(); 
}

function modificar(id, name) {
    var nouCarrer = { id, name };
    localStorage.setItem("modificaFormulari", JSON.stringify(nouCarrer));
    window.location.assign("modificarFormulari.html");
}
