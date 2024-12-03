let users;
let estats;
let productes;

$(document).ready(async function () {
    users = await getData(url,"User");
    estats = await getData(url,"OrderLineReception_Status");
    productes = await getData(url,"Product");
    carregarIncidencies();
    autocompletarProductes();
    $("#llistatOrdres").click(function()
        {
            window.location.href = "../../../recepcio/ordesRecepcio/llistar/llistatOrden.html";
        }
    ),
    $("#filter").on("click", function () {
        $("#search-group ,#search-button").slideToggle(400);
    });
});

function autocompletarProductes(){
    var nomsProductes = productes.map(producte => producte.name);
    $( "#producte" ).autocomplete({
        source: nomsProductes
    });
}

async function carregarIncidencies() {
    const incidencies = await getData(url,"Incident");
    const tabla = document.getElementById("files");

    incidencies.forEach((ordre) => {
        
            const row = document.createElement("tr");

            // Crear celda para el botón "Revisar"
            let tdRevisar = document.createElement("td");
            let btnModificar = document.createElement("button");
            $(btnModificar).click(function(){
                modificarIncidencia(ordre.id);
            });
            btnModificar.className = "btn btn-primary";
            let textRevisar = document.createTextNode("Revisar");
            btnModificar.appendChild(textRevisar);
            tdRevisar.appendChild(btnModificar);
            row.appendChild(tdRevisar);
            
            let tdResol = document.createElement("td");
            let btnResol = document.createElement("button");
            $(btnResol).click(function(){
                resolIncidencia(ordre.id);
            });
            btnResol.className = "btn btn-primary";
            let textResol = document.createTextNode("Resol");
            btnResol.appendChild(textResol);
            tdResol.appendChild(btnResol);
            row.appendChild(tdResol);

            // Crear celdas para las demás columnas
            row.appendChild(CrearCelda(ordre.id));
            row.appendChild(CrearCelda(ordre.description));
            row.appendChild(CrearCelda(getEstat(ordre.status)));
            row.appendChild(CrearCelda(getProducte(ordre.product)));
            row.appendChild(CrearCelda(ordre.quantity_ordered));
            row.appendChild(CrearCelda(ordre.quantity_received));

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
    const operariExistent = users.find(o => Number(o.id) === id);
    if(operariExistent){ 
        return operariExistent.name;
    }
}

function getEstat(id){
    if(id == "Pendent"){
        return "Pendent";
    }
    else{
        const estatExistent = estats.find(o => o.id === id);
    
        if(estatExistent){ 
            return estatExistent.name;
        }
    }
}

function getProducte(id){
    const producteExistent = productes.find(o => Number(o.id) === id);
    
    if(producteExistent){ 
        return producteExistent.name;
    }
}

async function modificarIncidencia(id){
    const incidencies = await getData(url,"Incident"); 
    const incidentSeleccionat = incidencies.find(o => o.id === id);

    if(incidentSeleccionat){
        localStorage.setItem("incidentSeleccionat", JSON.stringify(incidentSeleccionat));
        window.location.href = "revisarIncident/revisarIncident.html";
    }
}

async function resolIncidencia(id){
    const incidencies = await getData(url,"Incident"); 
    const incidentSeleccionat = incidencies.find(o => o.id === id);

    if(incidentSeleccionat){
        localStorage.setItem("incidentSeleccionat", JSON.stringify(incidentSeleccionat));
        window.location.href = "resol/resolIncident.html";
    }
}


