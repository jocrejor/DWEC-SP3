window.onload = main;
let storages;

function main() {
    document.getElementById("producte").addEventListener("click", nou);
    document.getElementById("toggleFiltersBtn").addEventListener("click", toggleFilters);
    document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
    carregarInformacio();
}

async function carregarInformacio() {
    try {
        storages = await getData(url, "Storage");

        if (storages && storages.length > 0) {
            obtindreMagatzem();
        } else {
            alert("No se han encontrado almacenes.");
        }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("No se pudieron cargar los datos.");
    }
}

function nou() {
    window.location.assign("../Alta/altaStorage.html");
}

function obtindreMagatzem(filteredStorages = storages) {
    let tbody = document.getElementById("files");
    tbody.innerHTML = "";

    filteredStorages.forEach((storage) => {
        let row = `
        <tr id="storage-${storage.id}">
            <td><button class="btn btn-danger" onclick="esborrar(${storage.id})">Esborrar</button></td>
            <td><button class="btn btn-primary" onclick="modificar(${storage.id})">Modificar</button></td>
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
    const confirmacio = window.confirm("Vols eliminar aquest magatzem?");
    if (confirmacio) {
        try {
            await deleteData(url, "Storage", id);
            document.getElementById(`storage-${id}`).remove();
            alert("Magatzem eliminat amb èxit.");
        } catch (error) {
            console.error("Error en esborrar el magatzem:", error);
            alert("Hi ha hagut un error en eliminar el magatzem.");
        }
    }
}
    function modificar(storageId) {
        try {
            const storageSeleccionat = storages.find(storage => storage.id === storageId);
        
            if (storageSeleccionat) {
                localStorage.setItem("modificaMagatzem", JSON.stringify(storageSeleccionat));
                window.location.assign("../Modificar/modificarMagatzem.html");
            } else {
                window.location.assign("../Modificar/modificarMagatzem.html");
            }
        } catch (error) {
            console.error("Error al modificar el magatzem:", error);
            alert("Hi ha hagut un problema accedint a les dades. Torna-ho a intentar més tard.");
        }
    }
           
function carrers(storageId) {
    localStorage.setItem("magatzemId", storageId);
    window.location.assign(`../../Carrer/Llistar/LlistatCarrer.html`);
}

function toggleFilters() {
    const filterSection = document.getElementById("filter-section");
    if (filterSection.style.display === "none" || filterSection.style.display === "") {
        filterSection.style.display = "block";
    } else {
        filterSection.style.display = "none";
    }
}

function applyFilters() {
    const filterName = document.getElementById("filterName").value.toLowerCase();
    const filterType = document.getElementById("filterType").value.toLowerCase();
    const filterAddress = document.getElementById("filterAddress").value.toLowerCase();

    const filteredStorages = storages.filter(storage => {
        const nameMatch = filterName ? storage.name.toLowerCase().includes(filterName) : true;
        const typeMatch = filterType ? storage.type.toLowerCase().includes(filterType) : true;
        const addressMatch = filterAddress ? storage.address.toLowerCase().includes(filterAddress) : true;

        return nameMatch && typeMatch && addressMatch;
    });

    obtindreMagatzem(filteredStorages);
}
