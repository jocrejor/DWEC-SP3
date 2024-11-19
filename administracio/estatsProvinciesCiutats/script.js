function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function addElement(type, value) {
    const data = getDataFromLocalStorage(type);
    data.push(value);
    saveDataToLocalStorage(type, data);
}

function showInputContainer(containerId) {
    document.getElementById(containerId).style.display = "block";
}

function hideInputContainer(containerId) {
    document.getElementById(containerId).style.display = "none";
}

document.getElementById("addEstadoBtn").addEventListener("click", () => {
    showInputContainer("estadoInputContainer");
});

document.getElementById("saveEstadoBtn").addEventListener("click", () => {
    const estado = document.getElementById("estadoInput").value;
    if (estado) {
        addElement("estados", estado);
        alert("Estado agregado");
        hideInputContainer("estadoInputContainer");
        document.getElementById("estadoInput").value = "";  
    } else {
        alert("Por favor, ingresa un nombre de Estado");
    }
});

document.getElementById("addProvinciaBtn").addEventListener("click", () => {
    showInputContainer("provinciaInputContainer");
});

document.getElementById("saveProvinciaBtn").addEventListener("click", () => {
    const provincia = document.getElementById("provinciaInput").value;
    if (provincia) {
        addElement("provincias", provincia);
        alert("Provincia agregada");
        hideInputContainer("provinciaInputContainer");
        document.getElementById("provinciaInput").value = "";
    } else {
        alert("Por favor, ingresa un nombre de Provincia");
    }
});

document.getElementById("addCityBtn").addEventListener("click", () => {
    showInputContainer("cityInputContainer");
});

document.getElementById("saveCityBtn").addEventListener("click", () => {
    const ciudad = document.getElementById("cityInput").value;
    if (ciudad) {
        addElement("ciudades", ciudad);
        alert("Ciudad agregada");
        hideInputContainer("cityInputContainer");
        document.getElementById("cityInput").value = "";
    } else {
        alert("Por favor, ingresa un nombre de Ciudad");
    }
});
