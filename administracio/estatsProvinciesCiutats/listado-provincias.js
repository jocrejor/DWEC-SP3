window.onload = function() {
    const provincias = JSON.parse(localStorage.getItem("provincias")) || [];
    const tableBody = document.getElementById("provinciaTableBody");

    tableBody.innerHTML = "";

    provincias.forEach((provincia, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${provincia}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="modifyProvincia(${index})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProvincia(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

function modifyProvincia(index) {
    const newProvincia = prompt("Modificar Provincia:", localStorage.getItem("provincias").split(",")[index]);
    if (newProvincia !== null && newProvincia !== "") {
        const provincias = JSON.parse(localStorage.getItem("provincias"));
        provincias[index] = newProvincia;
        localStorage.setItem("provincias", JSON.stringify(provincias)); 
        window.location.reload(); 
    }
}

function deleteProvincia(index) {
    const provincias = JSON.parse(localStorage.getItem("provincias"));
    provincias.splice(index, 1); 
    localStorage.setItem("provincias", JSON.stringify(provincias)); 
    window.location.reload(); 
}
