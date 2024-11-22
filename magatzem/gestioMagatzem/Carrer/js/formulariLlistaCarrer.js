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

    document.getElementById("magatzem").innerText = storage.storage.name || "Desconegut";
    
}

function nou() {
    window.location.assign("nouFormulariCarrer.html");
}

function obtindreProducte() {
    
    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    let tbody = document.getElementById("files");
    tbody.innerHTML = "";  

    if(carrers.length === 0){
        let row = document.createElement("tr");
        row.innerHTML = `<td colspan="4" class="text-center">No hi ha carrers disponibles.</td>`;
        tbody.appendChild(row);
        return; 
    }

    carrers.forEach((product, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><button class="btn btn-danger" onclick="esborrar(${index})">Esborrar</button></td>
            <td><button class="btn btn-primary" onclick="modificar(${index})">Modificar</button></td>
            <td>${product.id || ""}</td>
            <td>${product.name || ""}</td>
        `;
        tbody.appendChild(row);  
    });
}

function esborrar(index) {
    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    carrers.splice(index, 1);  
    localStorage.setItem("carrers", JSON.stringify(carrers));  
    obtindreProducte();  
}

function modificar(index) {
    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    let product = carrers[index];  
    localStorage.setItem("modificaFormulari", JSON.stringify(product));  
    window.location.assign("modificarFormulariCarrer.html"); 
}
