window.onload = main;

function main() {
    document.getElementById("producte").addEventListener("click", nou);
    carregarInformacio();
    obtindreProducte();

}

function carregarInformacio() {
    let storage = JSON.parse(localStorage.getItem("storage")) || { storage: { name: "Desconegut" } };
    let street = JSON.parse(localStorage.getItem("street")) || { street: { name: "Desconegut" } };
    let shelf = JSON.parse(localStorage.getItem("shelf")) || { shelf: { name: "Desconegut" } };
   
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
                <td><button class="btn btn-primary" onclick="modificar(${product.id}, '${product.name}', '${product.tipus}', '${product.adress}')">Modificar</button></td>
                <td>${product.id || ""}</td>
                <td>${product.name || ""}</td>
                <td>${product.tipus || ""}</td>
                <td>${product.adress || ""}</td>
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

function modificar(id, name, tipus, adress) {
    var nouMagatzem = { id, name, tipus, adress };
    localStorage.setItem("modificaFormulari", JSON.stringify(nouMagatzem));
    window.location.assign("modificarFormulari.html");
}

