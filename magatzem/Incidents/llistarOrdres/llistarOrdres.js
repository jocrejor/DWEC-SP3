let estats;

$(document).ready(async function () {
    estats = await getData(url,"OrderReception_Status");
    carregarOrdres();
});

async function carregarOrdres() {
    const ordresRecepcio = await getData(url,"OrderReception");
    const tabla = document.getElementById("files");

    ordresRecepcio.forEach((ordre) => {
        const row = document.createElement("tr");

        // Crear celda para el botón "Revisar"
        let tdRevisar = document.createElement("td");
        let btnRevisar = document.createElement("button");
        $(btnRevisar).click(function(){
            revisarOrdre(ordre.id);
        });

        btnRevisar.className = "btn btn-primary";
        let textRevisar = document.createTextNode("Crear Incidencia");
        btnRevisar.appendChild(textRevisar);
        tdRevisar.appendChild(btnRevisar);
        row.appendChild(tdRevisar);

        // Crear celdas para las demás columnas
        row.appendChild(CrearCelda(ordre.id));
        row.appendChild(CrearCelda(ordre.supplier_id));
        row.appendChild(CrearCelda(ordre.estimated_reception_date));
        row.appendChild(CrearCelda(getOrderStatus(ordre.orderreception_status_id)));

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
    const estatIncidencia = estats.find(o => o.id == estatID);

    if(estatIncidencia){
        return estatIncidencia.name;
    }
}

async function revisarOrdre(id){
    const ordresRecepcio = await getData(url,"OrderReception");
    const ordreSeleccionada = ordresRecepcio.find(o => o.id === id);

    if(ordreSeleccionada){
        localStorage.setItem("ordreSeleccionada", JSON.stringify(ordreSeleccionada));
        window.location.href = "../revisarIncident/revisarIncident.html";
    }
}
