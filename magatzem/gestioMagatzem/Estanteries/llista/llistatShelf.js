window.onload = iniciar;
let shelfs;

function iniciar() {
    document.getElementById("nouShelf").addEventListener("click", nouShelf);
    carregarInformacio();
}

async function carregarInformacio() {

    shelfs = await getData(url, "Shelf"); 
    obtindreShelf();
}

function nouShelf() {
    window.location.assign("../alta/altaShelf.html");
}

function obtindreShelf() {
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    shelfs.forEach((shelf) => {
        agregarFila(shelf);
    });
}

function agregarFila(shelf) {
    const tbody = document.getElementById("files");

   
    const row = document.createElement("tr");
    row.id = `shelf-${shelf.id}`;

    row.innerHTML = `
        <td><button class="btn btn-danger" onclick="esborrar(${shelf.id})">Esborrar</button></td>
        <td><button class="btn btn-primary" onclick="modificar(${shelf.id})">Modificar</button></td>
        <td><button class="btn btn-primary" onclick="espai(${shelf.id})">Espai</button></td>
        <td>${shelf.id}</td>
        <td>${shelf.name}</td>
        <td>${shelf.storage_id}</td>
        <td>${shelf.steet_id}</td>
    `;

    tbody.appendChild(row); 
}
async function esborrar(id) {
    try {
        await deleteData(url, "Shelf", id); 
        const element = document.getElementById(`shelf-${id}`);
        if (element) {
            element.remove();  // Elimina la fila
            // Vuelve a cargar la lista de estanterías si es necesario
            carregarInformacio();
        } else {
            console.log(`Elemento con ID 'shelf-${id}' no encontrado.`);
        }
    } catch (error) {
        console.error("Error al borrar:", error);
        alert("No se pudo eliminar la estantería.");
    }
}
async function modificar(storageId) {
    try {
        
        const formattedId = String(storageId).padStart(2, '0');

        
        const estanteries = await getData(url, "Shelf");

       
        const estanteriaSeleccionada = estanteries.find(estanteria => estanteria.id === formattedId);

        if (estanteriaSeleccionada) {
            
            window.localStorage.setItem('Estanteria', JSON.stringify(formattedId));
            window.location.assign("../modificar/modificarShelf.html");
        } else {
            
            alert(`No s'ha trobat cap estanteria amb l'ID: ${formattedId}`);
        }
    } catch (error) {
        console.error("Error obtenint les dades de l'estanteria:", error);
        alert("Hi ha hagut un problema accedint a les dades. Torna-ho a intentar més tard.");
    }
}


function espai() {
    window.location.assign("../../Espais/llista/llistatSpace.html");
   
}
