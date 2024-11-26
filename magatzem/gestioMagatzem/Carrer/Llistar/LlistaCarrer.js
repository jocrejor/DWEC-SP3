window.onload = main;
let streets;

function main() {
    document.getElementById("producte").addEventListener("click", nou);
    carregarInformacio();
}

async function carregarInformacio() {
    streets = await getData(url, "Street");
    obtindreMagatzem();
}


function nou() {
    window.location.assign("../Nou/nouCarrer.html");
}

function obtindreCarrer() {
            let tbody = document.getElementById("files");
        tbody.innerHTML = ""; 
    
        streets.forEach((street) => {
            let row = `
            <tr id="${street.id}">
                <td><button class="btn btn-danger" onclick="esborrar(${street.id})">Esborrar</button></td>
                <td><button class="btn btn-primary" onclick="modificar(${street.id})">Modificar</button></td>
                <td><button class="btn btn-primary" onclick="estanteria(${street.id})">Estanteria</button></td>
       
                <td>${street.id || ""}</td>
                <td>${street.name || ""}</td>
            </tr>
       `;
            tbody.innerHTML += row;
        });
    }

    async function esborrar(id) {
   
        await deleteData(url, "Street", id);
        document.getElementById(id).remove();
    }
    
    function modificar(storageId) {
     
            localStorage.setItem("modificaCarrer", JSON.stringify(storageId));
            window.location.assign("../Modificar/modificarCarrer.html");
    }
    function estanteria(storageId) {
        window.location.assign(``);//Posar la ruta de la estanteria
    }
