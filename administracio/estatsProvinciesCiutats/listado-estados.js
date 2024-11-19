window.onload = function() {
    const estados = JSON.parse(localStorage.getItem("estados")) || [];
    const tableBody = document.getElementById("estadoTableBody");

    tableBody.innerHTML = "";

    estados.forEach((estado, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${estado}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="modifyEstado(${index})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEstado(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

function modifyEstado(index) {
    const newEstado = prompt("Modificar Estado:", localStorage.getItem("estados").split(",")[index]);
    if (newEstado !== null && newEstado !== "") {
        const estados = JSON.parse(localStorage.getItem("estados"));
        estados[index] = newEstado;
        localStorage.setItem("estados", JSON.stringify(estados));
        window.location.reload(); 
    }
}

function deleteEstado(index) {
    const estados = JSON.parse(localStorage.getItem("estados"));
    estados.splice(index, 1);
    localStorage.setItem("estados", JSON.stringify(estados));
    window.location.reload(); 
}
