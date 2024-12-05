let users;
let estats;
let productes;
let incidencies;

$(document).ready(async function () {
    users = await getData(url,"User");
    estats = await getData(url,"OrderLineReception_Status");
    productes = await getData(url,"Product");
    carregarIncidencies();
    autocompletarProductes();
    replenarEstats();
    $("#llistatOrdres").click(function()
        {
            window.location.href = "../../../recepcio/ordesRecepcio/llistar/llistatOrden.html";
        }
    ),
    $("#filtre").on("click", function () {
        filtrar();
    });
});

function autocompletarProductes(){
    var nomsProductes = productes.map(producte => producte.name);
    $( "#producte" ).autocomplete({
        source: nomsProductes
    });
}

function replenarEstats() {
    let selectEstats = document.getElementById("status");

    while (selectEstats.firstChild) {
        selectEstats.removeChild(selectEstats.firstChild);
    }

    let defaultOption = document.createElement("option");
    let defaultText = document.createTextNode("Selecciona un estat");
    defaultOption.appendChild(defaultText);
    defaultOption.value = ""; 
    selectEstats.appendChild(defaultOption);

    estats.forEach(estat => {
        let option = document.createElement("option");
        let optionText = document.createTextNode(estat.name);
        option.appendChild(optionText);
        option.value = estat.id;
        selectEstats.appendChild(option);
    });
}

function filtrar() {
    const producto = document.getElementById("producte").value;
    const estatSeleccionat = document.getElementById("status").value;

    const tabla = document.getElementById("files");
    tabla.innerHTML = ""; 

    let incidenciesFiltrades = incidencies;

    if (producto) {
        const producteSeleccionat = productes.find(p => p.name === producto);
        if (producteSeleccionat) {
            incidenciesFiltrades = incidenciesFiltrades.filter(
                incident => Number(incident.product) === Number(producteSeleccionat.id)
            );
        } else {
            incidenciesFiltrades = []; 
        }
    }

    if (estatSeleccionat) {
        incidenciesFiltrades = incidenciesFiltrades.filter(
            incident => incident.status === estatSeleccionat
        );
    }

    incidenciesFiltrades.forEach((ordre) => {
        const row = document.createElement("tr");

        let tdRevisar = document.createElement("td");
        let btnModificar = document.createElement("button");
        $(btnModificar).click(function () {
            modificarIncidencia(ordre.id);
        });
        btnModificar.className = "btn btn-primary";
        let textRevisar = document.createTextNode("Revisar");
        btnModificar.appendChild(textRevisar);
        tdRevisar.appendChild(btnModificar);
        row.appendChild(tdRevisar);

        let tdResol = document.createElement("td");
        let btnResol = document.createElement("button");
        $(btnResol).click(function () {
            resolIncidencia(ordre.id);
        });
        btnResol.className = "btn btn-primary";
        let textResol = document.createTextNode("Resol");
        btnResol.appendChild(textResol);
        tdResol.appendChild(btnResol);
        row.appendChild(tdResol);

        row.appendChild(CrearCelda(ordre.created_at));
        row.appendChild(CrearCelda(ordre.description));
        row.appendChild(CrearCelda(getProducte(ordre.product)));
        row.appendChild(CrearCelda(ordre.quantity_ordered));
        row.appendChild(CrearCelda(ordre.quantity_received));
        row.appendChild(CrearCelda(getEstat(ordre.status)));

        tabla.appendChild(row);
    });
}



async function carregarIncidencies() {
    incidencies = await getData(url, "Incident");
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
            row.appendChild(CrearCelda(ordre.created_at));
            row.appendChild(CrearCelda(ordre.description));
            row.appendChild(CrearCelda(getProducte(ordre.product)));
            row.appendChild(CrearCelda(ordre.quantity_ordered));
            row.appendChild(CrearCelda(ordre.quantity_received));
            row.appendChild(CrearCelda(getEstat(ordre.status)));

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


