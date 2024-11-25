let users;

$(document).ready(async function () {
    users = await getData(url,"User");
    carregarIncidencies();
    $("#novaIncidencia").click(function()
        {
            crearIncidencia();
        }
    )
});

async function carregarIncidencies() {
    const incidencies = await getData(url,"Incident");
    const tabla = document.getElementById("files");

    incidencies.forEach((ordre) => {
        const row = document.createElement("tr");

        // Crear celda para el botón "Revisar"
        let tdRevisar = document.createElement("td");
        let btnModificar = document.createElement("button");
        $(btnModificar).click(function(){
            modificarIncidencia(ordre.incident_id);
        });
        btnModificar.className = "btn btn-primary";
        let textRevisar = document.createTextNode("Modificar");
        btnModificar.appendChild(textRevisar);
        tdRevisar.appendChild(btnModificar);
        row.appendChild(tdRevisar);
        
        let tdEliminar = document.createElement("td");
        let btnEliminar = document.createElement("button");
        $(btnEliminar).click(function(){
            eliminarIncidencia(ordre.incident_id);
        });
        btnEliminar.className = "btn btn-primary";
        let textEliminar = document.createTextNode("Eliminar");
        btnEliminar.appendChild(textEliminar);
        tdEliminar.appendChild(btnEliminar);
        row.appendChild(tdEliminar);

        // Crear celdas para las demás columnas
        row.appendChild(CrearCelda(ordre.incident_id));
        row.appendChild(CrearCelda(getOperari(ordre.operator_id)));
        row.appendChild(CrearCelda(ordre.description));

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

function getOperari(id){
    const operariExistent = users.find(o => o.id === id);
    
    if(operariExistent){ 
        return operariExistent.name;
    }
}

async function modificarIncidencia(id){
    const incidencies = await getData(url,"Incident"); 
    const incidentSeleccionat = incidencies.find(o => o.incident_id === id);

    if(incidentSeleccionat){
        localStorage.setItem("incidentSeleccionat", JSON.stringify(incidentSeleccionat));
        window.location.href = "revisarIncident/revisarIncident.html";
    }
}

function crearIncidencia(){
    window.location.href = "llistarOrdres/llistarOrdres.html";
}
