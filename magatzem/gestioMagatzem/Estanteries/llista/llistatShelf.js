window.onload = iniciar;
let shelfs;
function iniciar() {
    document.getElementById("nouShelf").addEventListener("click", () => window.location.assign("../alta/altaShelf.html"));
    carregarInformacio();
}

async function carregarInformacio() {
    shelfs = await getData(url, 'Shelf')
    carregarEstanteries();
}

function carregarEstanteries() {
   let tbody = document.getElementById("files");
   tbody.innerHTML = "";

    shelfs.forEach((shelf) => {
        let row = `
            <tr id="${shelf.id}">
                <td><button class="btn btn-danger" onclick="esborrar('${shelf.id}')">Esborrar</button></td>
                <td><button class="btn btn-warning" onclick="modificar('${shelf}')">Modificar</button></td>
                <td>${shelf.id || ""}</td>
                 <td>${shelf.name || ""}</td>
                <td>${shelf.storage_id || ""}</td>
                <td>${shelf.steet_id || ""}</td>
            </tr>
            
        `;
        tbody.innerHTML += row;
    });
}

async function esborrar(id) {
    await deleteData(url, "Shelf", id)
    document.getElementById("id").remove();
}

function modificar(shelf) {
        localStorage.setItem("modShelf", JSON.stringify(shelf));
        window.location.assign("../modificar/modificarShelf.html");
    }
