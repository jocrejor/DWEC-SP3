
window.onload = iniciar;
let spaces;

function iniciar() {
    document.getElementById("nouSpace").addEventListener("click", nouSpace);
    carregarInformacioSpaces();
}

async function carregarInformacioSpaces() {
    spaces = await getData(url, "Space"); 
    obtindreSpaces();
}

function nouSpace() {
    window.location.assign("../alta/altaSpace.html");
}

function obtindreSpaces() {
    let tbody = document.getElementById("files");
    tbody.innerHTML = ""; 

    spaces.forEach((space) => {
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
        <td>${space.selft_id}</td>
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
