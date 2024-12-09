window.onload = iniciar;
let spaces;

function iniciar() {
    document.getElementById("nouSpace").addEventListener("click", nouSpace);
    document.getElementById("toggleFilters").addEventListener("click", toggleFilters);
    document.getElementById("applyFilters").addEventListener("click", aplicarFiltres);
    carregarInformacioSpaces();
}

async function carregarInformacioSpaces() {
    spaces = await getData(url, "Space"); 
    obtindreSpaces();
}

function nouSpace() {
    window.location.assign("../alta/altaSpace.html");
}

function obtindreSpaces(filteredSpaces = spaces) {
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    filteredSpaces.forEach((space) => {
        agregarFilaSpace(space);
    });
}

function agregarFilaSpace(space) {
    const tbody = document.getElementById("files");

    const row = document.createElement("tr");
    row.id = `space-${space.id}`;

    row.innerHTML = `
        <td><button class="btn btn-danger" onclick="esborrarSpace(${space.id})">Esborrar</button></td>
        <td><button class="btn btn-primary" onclick="modificarSpace(${space.id})">Modificar</button></td>
        <td>${space.id}</td>
        <td>${space.name}</td>
        <td>${space.product_id}</td>
        <td>${space.quantity}</td>
        <td>${space.maxVol}</td>
        <td>${space.maxWeight}</td>
        <td>${space.storage_id}</td>
        <td>${space.street_id}</td>
        <td>${space.shelf_id}</td> <!-- Corrige si es shelf_id o selft_id -->
    `;

    tbody.appendChild(row); 
}

async function esborrarSpace(id) {
    try {
        const formattedId = String(id).padStart(2, '0');
        await deleteData(url, "Space", formattedId);

        const element = document.getElementById(`space-${id}`);
        if (element) {
            element.remove();
            console.log(`Espai amb ID ${formattedId} eliminat correctament.`);
        } else {
            console.warn(`Element amb ID 'space-${id}' no trobat al DOM.`);
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert(`No s'ha pogut eliminar l'espai amb ID ${id}. Verifica si existeix al servidor.`);
    }
}

async function modificarSpace(spaceId) {
    try {
        const formattedId = String(spaceId).padStart(2, '0');
        const espais = await getData(url, "Space");

        const espaiSeleccionat = espais.find(espai => espai.id === formattedId);

        if (espaiSeleccionat) {
            window.localStorage.setItem('Espai', JSON.stringify(formattedId));
            window.location.assign("../modificar/modificarSpace.html");
        } else {
            alert(`No s'ha trobat cap espai amb l'ID: ${formattedId}`);
        }
    } catch (error) {
        console.error("Error obtenint les dades de l'espai:", error);
        alert("Hi ha hagut un problema accedint a les dades. Torna-ho a intentar més tard.");
    }
}


function toggleFilters() {
    const filterSection = document.getElementById("filter-section");
    const isHidden = filterSection.style.display === "none";

    filterSection.style.display = isHidden ? "block" : "none";
}

function aplicarFiltres() {
    const filterName = document.getElementById("filter-name").value.toLowerCase();
    const filterStorage = document.getElementById("filter-storage").value.toLowerCase();
    const filterStreet = document.getElementById("filter-street").value.toLowerCase();
    const filterShelf = document.getElementById("filter-shelf").value.toLowerCase();
    
    const filterProduct = document.getElementById("filter-product").value.toLowerCase();
    const filterQuantity = parseInt(document.getElementById("filter-quantity").value) || undefined; 
    const filterVolume = parseFloat(document.getElementById("filter-volume").value) || undefined; 
    const filterWeight = parseFloat(document.getElementById("filter-weight").value) || undefined; 

    const filteredSpaces = spaces.filter(space => {
        return (
            (!filterName || space.name.toLowerCase().includes(filterName)) &&
            (!filterStorage || space.storage_id.toLowerCase().includes(filterStorage)) &&
            (!filterStreet || space.street_id.toLowerCase().includes(filterStreet)) &&
            (!filterShelf || space.shelf_id.toLowerCase().includes(filterShelf)) &&
            (!filterProduct || space.product_id.toLowerCase().includes(filterProduct)) &&
            (filterQuantity === undefined || parseInt(space.quantity) === filterQuantity) &&
            (filterVolume === undefined || parseFloat(space.maxVol) === filterVolume) &&
            (filterWeight === undefined || parseFloat(space.maxWeight) === filterWeight)
        );
    });
    

    obtindreSpaces(filteredSpaces);
}
