window.onload = main;
let storages
function main() {
    document.getElementById("producte").addEventListener("click", nou);
    carregarInformacio();
}

async function carregarInformacio() {
     storages = await getData(url,"Storage")
     obtindreMagatzem();
    
}
function nou() {
    window.location.assign("../Nou/nouMagatzem.html");
}

function obtindreMagatzem() {
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    storages.forEach((storage) => {
        let row = `
            <tr id="${storage.id}">
                <td><button class="btn btn-danger" onclick="esborrar(${storage.id})">Esborrar</button></td>
                <td><button class="btn btn-primary" onclick="modificar(${storage})">Modificar</button></td>
                <td><button class="btn btn-primary" onclick="carrers(${storage.id})">Carrer</button></td>

                <td>${storage.id || ""}</td>
                <td>${storage.name || ""}</td>
                <td>${storage.type || ""}</td>
                <td>${storage.address || ""}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function esborrar(id) {
    await deleteData(url, "Storage", id)
    document.getElementById("id").remove();

}

function modificar(storage) {
    localStorage.setItem("modificaMagatzem", JSON.stringify(storage));
    window.location.assign("../Modificar/modificarMagatzem.html");
}

function carrers(storageId) {
    window.location.assign(`../../Carrer/Llistar/LlistatCarrer.html`);
}

