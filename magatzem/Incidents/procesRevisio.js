$(document).ready(function () {
    carregarOrdres();
});

function carregarOrdres() {
    const ordresRecepcio = JSON.parse(localStorage.getItem("OrderReception")) || [];
    const tabla = document.getElementById("files");

    ordresRecepcio.forEach((ordre) => {
        const row = document.createElement("tr");

        // Crear celda para el botón "Revisar"
        let tdRevisar = document.createElement("td");
        let btnRevisar = document.createElement("button");
        btnRevisar.className = "btn btn-primary";
        let textRevisar = document.createTextNode("Revisar");
        btnRevisar.appendChild(textRevisar);
        tdRevisar.appendChild(btnRevisar);
        row.appendChild(tdRevisar);

        // Crear celdas para las demás columnas
        row.appendChild(CrearCelda(ordre.id));
        row.appendChild(CrearCelda(ordre.supplier_id));
        row.appendChild(CrearCelda(ordre.estimated_reception_date));
        row.appendChild(CrearCelda(getOrderStatus(ordre.order_reception_status_id)));

        // Añadir la fila a la tabla
        tabla.appendChild(row);
    });
}

function CrearCelda(contingut) {
    const cell = document.createElement("td");
    let dom = document.createTextNode(contingut);
    cell.appendChild(dom);
    return cell;
}

// Función para obtener el estado por ID
function getOrderStatus(estatID) {
    const estatText = {
        1: "Pendent",
        2: "En procés",
        3: "Finalitzat"
    };
    return estatText[estatID] ;
}
