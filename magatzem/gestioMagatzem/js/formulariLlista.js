window.onload = main;

function main() {
    document.getElementById("producte").addEventListener("click", nou);
    obtindreProducte();
}

function nou() {
    window.location.assign("nouFormulari.html");
}

function obtindreProducte() {
    let magatzems = JSON.parse(localStorage.getItem("magatzems")) || [];
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    magatzems.forEach((product, index) => {
        let row = `
            <tr>
                <td><button class="btn btn-danger" onclick="esborrar(${index})">Esborrar</button></td>
                <td><button class="btn btn-primary" onclick="modificar(${product.id}, '${product.name}', '${product.tipus}', '${product.adress}', ${product.id_pasillo}, '${product.name_}')">Modificar</button></td>
                <td>${product.id || ""}</td>
                <td>${product.name || ""}</td>
                <td>${product.tipus || ""}</td>
                <td>${product.adress || ""}</td>
                <td>${product.id_pasillo || ""}</td>
                <td>${product.name_ || ""}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function esborrar(index) {
    var magatzems = JSON.parse(localStorage.getItem("magatzems")) || [];
    magatzems.splice(index, 1);
    localStorage.setItem("magatzems", JSON.stringify(magatzems));
    obtindreProducte(); 
}

function modificar(id, name, tipus, adress, id_pasillo, name_) {
    var nouMagatzem = { id, name, tipus, adress, id_pasillo, name_ };
    localStorage.setItem("modificaFormulari", JSON.stringify(nouMagatzem));
    window.location.assign("modificarFormulari.html");
}
