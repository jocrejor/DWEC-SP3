let estats;

$(document).ready(async function () {
    estats = await getData(url,"OrderReception_Status");
    carregarOrdres();
    $("#llistarIncidencies").click(function(){
        window.location.assign("../incidencies.html");
    })   
});

async function carregarOrdres() {
    
    const ordreLineRecepcio = await getData(url,"OrderLineReception"); 
    const ordreRecepcioSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));  
    const ordreFinal = ordreLineRecepcio.filter(o => o.order_reception_id === ordreRecepcioSeleccionada.id); 
    const tabla = document.getElementById("files");
    ordreFinal.forEach((ordre) => {
        const row = document.createElement("tr");
        // Crear celda para el botón "Revisar"
        let tdRevisar = document.createElement("td");
        let btnRevisar = document.createElement("button");
        $(btnRevisar).click(function(){
            revisarOrdre(ordre.order_reception_id);
        });
        btnRevisar.className = "btn btn-primary";
        let textRevisar = document.createTextNode("Crear Incidencia");
        btnRevisar.appendChild(textRevisar);
        tdRevisar.appendChild(btnRevisar);
        row.appendChild(tdRevisar);
        
        row.appendChild(CrearCelda(ordre.id));
        row.appendChild(CrearCelda(ordre.product_id));
        row.appendChild(CrearCelda(ordre.quantity_ordered));
        row.appendChild(CrearCelda(ordre.quantity_received));
        row.appendChild(CrearCelda(getOrderStatus(ordre.orderlinereception_status_id)));

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
    const ordreLineRecepcio = await getData(url,"OrderLineReception"); 
    const ordreSeleccionada = ordreLineRecepcio.find(o => o.order_reception_id === id);
    if(ordreSeleccionada){
        localStorage.setItem("ordreLineSeleccionada", JSON.stringify(ordreSeleccionada));
        window.location.href = "../alta/altaIncidencia.html";
    }
}
