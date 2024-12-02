window.onload = iniciar;
let shelfs;

function iniciar () {
    document.getElementById("nouShelf").addEventListener("click", nouShelf);
    carregarInformacio() 
}
async function carregarInformacio() {
    shelfs = await getData(url, "Shelf");
    obtindreShelf();
}

 function nouShelf () {
    window.location.assign("../alta/altaShelf.html");
}


function obtindreShelf () {
    let tbody = document.getElementById("files");
    tbody.innerHTML = "";

        shelfs.forEach((shelf) => {
            let row = `
            <tr id="${shelf.id}">
                <td><button class="btn btn-danger" onclick="esborrar(${shelf.id})">Esborrar</button></td>
                <td><button class="btn btn-primary" onclick="modificar(${shelf.id})">Modificar</button></td>
                <td><button class="btn btn-primary" onclick="espai(${shelf.id})">Espai</button></td>
       
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
   
        await deleteData(url, "Storage", id);
        document.getElementById(id).remove();
    }
    
    async function modificar(storageId) {
              
            
        const estanteria = await getData(url,"Shelf");

        window.localStorage.setItem('Estanteria', JSON.stringify(storageId));

        window.location.assign("../modificar/modificarShelf.html")


    }
    
    function espai(storageId) {
        window.location.assign("../../Espais/llista/llistatSpace.html");
    }
    
