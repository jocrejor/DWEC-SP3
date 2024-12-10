window.onload = main;
let streets;

async function main() {
    const magatzemId = localStorage.getItem("magatzemId");
    document.getElementById("magatzem").innerText = magatzemId ? ` ${magatzemId}` : "No seleccionat";

    document.getElementById("producte").addEventListener("click", nou);
    document.getElementById("toggleFiltersBtn").addEventListener("click", toggleFilters);
    document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
    await carregarInformacio();
}

async function carregarInformacio() {
    streets = await getData(url, "Street");
    for (let street of streets) {
        const magatzemData = await getData(url, "Warehouse", street.magatzemId);
        street.magatzem = magatzemData;
    }
    obtindreCarrer();
}

function nou() {
    window.location.assign("../Alta/altaStreet.html");
}

function obtindreCarrer(filteredStreets = streets) {
    let tbody = document.getElementById("files");
    tbody.innerHTML = "";

    filteredStreets.forEach((street) => {
        let row = `
        <tr id="street-${street.id}">
            <td><button class="btn btn-danger" onclick="esborrar(${street.id})">Esborrar</button></td>
            <td><button class="btn btn-primary" onclick="modificar(${street.id})">Modificar</button></td>
            <td><button class="btn btn-primary" onclick="estanteria(${street.id})">Estanteria</button></td>
            <td>${street.id || ""}</td>
            <td>${street.name || ""}</td>
            <td>${street.storage_id || ""}</td>
        </tr>
        `;
        tbody.innerHTML += row;
    });
}

function modificar(streetId) {
    const street = streets.find(street => street.id === streetId);
    if (street) {
        localStorage.setItem("modificaCarrer", JSON.stringify(street));
        window.location.assign("../Modificar/modificarCarrer.html");
    } else {
        console.error("Carrer no trobat per a la modificació");
        window.location.assign("../Modificar/modificarCarrer.html");
    }
}


async function esborrar(id) {
    await deleteData(url, "Street", id);
    document.getElementById(`street-${id}`).remove();
}

function estanteria(streetId) {
    localStorage.setItem("estanteriaID", streetId);
    window.location.assign(`../../shelf/llista/llistatShelf.html`);
}

function toggleFilters() {
    const filterSection = document.getElementById("filter-section");
    filterSection.style.display = (filterSection.style.display === "none" || filterSection.style.display === "") ? "block" : "none";
}

function applyFilters() {
    const filterName = document.getElementById("filterName").value.toLowerCase();
    const filterId = document.getElementById("filterId").value.toLowerCase();

    const filteredStreets = streets.filter(street => {
        const nameMatch = filterName ? street.name.toLowerCase().includes(filterName) : true;
        const idMatch = filterId ? street.id.toString().includes(filterId) : true;

        return nameMatch && idMatch;
    });

    obtindreCarrer(filteredStreets);
}
