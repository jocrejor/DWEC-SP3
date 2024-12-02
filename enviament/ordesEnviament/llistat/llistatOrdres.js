window.onload = main;

function main() {
    document.getElementById("nouOrdre").addEventListener("click", nouordre);
    obtindreordres();
}

function nouordre() {
    window.location.href = "../alta/altaOrdre.html";
}

// Obtindre ordres del localStorage y mostrarles en una tabla 

function obtindreordres() {
    const ordres = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    const ordresShipping = JSON.parse(localStorage.getItem("orderShipping")) || [];
    const tabla = document.getElementById("files");

    tabla.innerHTML = "";

    ordres.forEach((ordre) => {
        const row = document.createElement("tr");

        let tdEsborrar = document.createElement("td");
        let btnEsborrar = document.createElement("button");
        btnEsborrar.className = "btn btn-danger";
        let textBtnEsborrar = document.createTextNode("Esborrar");
         btnEsborrar.appendChild(textBtnEsborrar);
         btnEsborrar.addEventListener("click", function () { esborrar(ordre.id); });
        tdEsborrar.appendChild(btnEsborrar);
        row.appendChild(tdEsborrar);
 
        let tdModificar = document.createElement("td");
        let btnModificar = document.createElement("button");
        btnModificar.className = "btn btn-warning";
        let textmodifica = document.createTextNode("Modificar");
        btnModificar.appendChild(textmodifica);
        btnModificar.addEventListener("click", function () { modificar(ordre.id); });
        tdModificar.appendChild(btnModificar);
        row.appendChild(tdModificar);

        row.appendChild(CrearCelda(ordre.id));
        const orderShipping = ordresShipping.find(order => order.id === ordre.id);
        if (orderShipping) {
            row.appendChild(CrearCelda(orderShipping.client_id));
            row.appendChild(CrearCelda(orderShipping.carrier_id));
            row.appendChild(CrearCelda(orderShipping.shipping_date));
            row.appendChild(CrearCelda(ordre.product));
            row.appendChild(CrearCelda(ordre.quantity));
            row.appendChild(CrearCelda(orderShipping.ordershipping_status));
        }

        tabla.appendChild(row);
    });
}

function CrearCelda(contingut) {
    const cell = document.createElement("td");
    let dom = document.createTextNode(contingut);
    cell.appendChild(dom);
    return cell;
}

async function esborrar(id) {
    try {
        let ordres = JSON.parse(localStorage.getItem("orderShipping")) || [];
        let ordresLine = JSON.parse(localStorage.getItem("orderLineShipping")) || [];

        const idEliminar = ordres.findIndex(order => order.id === id);

        if (idEliminar !== -1) {
            ordres.splice(idEliminar, 1);
            ordresLine.splice(idEliminar, 1);

            localStorage.setItem("orderShipping", JSON.stringify(ordres));
            localStorage.setItem("orderLineShipping", JSON.stringify(ordresLine));
            obtindreordres();
            alert("L'ordre ha estat esborrada correctament.");
        } else {
            alert("No s'ha trobat l'ordre amb l'ID especificat.");
        }
    } catch (error) {
        alert("No s'ha pogut eliminar l'ordre.");
    }
}

function modificar(id) {
    let ordresShipping = JSON.parse(localStorage.getItem("orderShipping")) || [];
    let ordreSeleccionada = ordresShipping.find(o => o.id === id);

    if (ordreSeleccionada) {
        localStorage.setItem("ordreSeleccionada", JSON.stringify(ordreSeleccionada));
        window.location.href = "../modificar/modificarOrdres.html"; 
    }
     else {
        alert("No s'ha trobat l'ordre seleccionada.");
    }
}




