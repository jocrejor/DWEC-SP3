window.onload = function() {
    const ciudades = JSON.parse(localStorage.getItem("ciudades")) || [];
    const tableBody = document.getElementById("cityTableBody");

    tableBody.innerHTML = "";

    ciudades.forEach((ciudad, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${ciudad}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="modifyCiudad(${index})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCiudad(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

function modifyCiudad(index) {
    const newCiudad = prompt("Modificar Ciudad:", localStorage.getItem("ciudades").split(",")[index]);
    if (newCiudad !== null && newCiudad !== "") {
        const ciudades = JSON.parse(localStorage.getItem("ciudades"));
        ciudades[index] = newCiudad;
        localStorage.setItem("ciudades", JSON.stringify(ciudades));
        window.location.reload(); 
    }
}

function deleteCiudad(index) {
    const ciudades = JSON.parse(localStorage.getItem("ciudades"));
    ciudades.splice(index, 1);
    localStorage.setItem("ciudades", JSON.stringify(ciudades));
    window.location.reload(); 
}
