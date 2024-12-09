window.onload = iniciar;
let shelfs = [];

function iniciar() {
    document.getElementById("nouShelf").addEventListener("click", nouShelf);
    document.getElementById("toggleFilters").addEventListener("click", toggleFilters);
    document.getElementById("applyFilters").addEventListener("click", aplicarFiltres);
    carregarInformacio();
}

async function carregarInformacio() {
    shelfs = await getData(url, "Shelf");
    obtindreShelf(shelfs);
}

function nouShelf() {
    window.location.assign("../alta/altaShelf.html");
}

function obtindreShelf(filteredShelfs) {
    const tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    filteredShelfs.forEach((shelf) => {
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
        const formattedId = String(id).padStart(2, '0');
        await deleteData(url, "Shelf", formattedId);

        const element = document.getElementById(`shelf-${id}`);
        if (element) {
            element.remove();
            console.log(`Estantería con ID ${formattedId} eliminada correctamente.`);
        } else {
            console.warn(`Elemento con ID 'shelf-${id}' no encontrado en el DOM.`);
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert(`No se pudo eliminar la estantería con ID ${id}. Verifica si existe en el servidor.`);
    }
}

function modificar(storageId) {
    const formattedId = String(storageId).padStart(2, '0');
    const selectedShelf = shelfs.find(shelf => shelf.id === formattedId);

    if (selectedShelf) {
        localStorage.setItem('Estanteria', JSON.stringify(selectedShelf));
        window.location.assign("../modificar/modificarShelf.html");
    } else {
        alert(`No s'ha trobat cap estanteria amb l'ID: ${formattedId}`);
    }
}

function espai() {
    window.location.assign("../../Espais/llista/llistatSpace.html");
}

function toggleFilters() {
    const filterSection = document.getElementById("filter-section");
    const filterIcon = document.getElementById("filter-icon");
    const isHidden = filterSection.style.display === "none";

    filterSection.style.display = isHidden ? "block" : "none";
    filterIcon.src = isHidden ? "ocultarFiltres.png" : "mostrarFiltres.png";
    filterIcon.alt = isHidden ? "Ocultar Filtres" : "Mostrar Filtres";
}


function aplicarFiltres() {
    const filterName = document.getElementById("filter-name").value.toLowerCase();
    const filterStorage = document.getElementById("filter-storage").value;
    const filterStreet = document.getElementById("filter-street").value;

    const filteredShelfs = shelfs.filter(shelf => {
        return (
            (!filterName || shelf.name.toLowerCase().includes(filterName)) &&
            (!filterStorage || shelf.storage_id === filterStorage) &&
            (!filterStreet || shelf.steet_id === filterStreet)
        );
    });

    obtindreShelf(filteredShelfs);
}
