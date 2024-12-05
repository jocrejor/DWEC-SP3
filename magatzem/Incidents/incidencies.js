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

function convertirAFecha(fecha) {
    const [dia, mes, anio] = fecha.split("/").map(Number);
    return new Date(anio, mes - 1, dia); 
}

function filtrar() {
    const producto = document.getElementById("producte").value;
    const estatSeleccionat = document.getElementById("status").value;
    const dataDesde = document.getElementById("dataDesde").value;
    const dataFins = document.getElementById("dataFins").value;

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

    if (dataDesde) {
        const desdeDate = new Date(dataDesde).setHours(0, 0, 0, 0);
        incidenciesFiltrades = incidenciesFiltrades.filter(
            incident => convertirAFecha(incident.created_at) >= desdeDate
        );
    }
    
    if (dataFins) {
        const finsDate = new Date(dataFins);
        incidenciesFiltrades = incidenciesFiltrades.filter(
            incident => convertirAFecha(incident.created_at) <= finsDate
        );
    }

    incidenciesFiltrades.forEach((ordre) => {
        const row = document.createElement("tr");

        row.appendChild(CrearCelda(ordre.created_at,"Data de creació"));
        row.appendChild(CrearCelda(ordre.description, "Descripció"));
        row.appendChild(CrearCelda(getProducte(ordre.product,"Producte")));
        row.appendChild(CrearCelda(ordre.quantity_ordered,"Quantitat demanada"));
        row.appendChild(CrearCelda(ordre.quantity_received,"Quantitat rebuda"));
        row.appendChild(CrearCelda(getEstat(ordre.status,"Estat")));

         let tdAccions = document.createElement("td");
         let divAccions = document.createElement("div");
         divAccions.className = "divAccions";

         let accioRevisar = document.createElement("a");
         let iModificar = document.createElement("i");
         iModificar.className = "fas fa-edit";
         accioRevisar.appendChild(iModificar)     
         $(accioRevisar).click(function(){
             modificarIncidencia(ordre.id);
         });
         divAccions.appendChild(accioRevisar);

        let accioResoldre = document.createElement("a");
        let iResoldre = document.createElement("i");
        iResoldre.className = "fas fa-check";
        accioResoldre.appendChild(iResoldre);
        $(accioResoldre).click(function(){
            resolIncidencia(ordre.id);
        });
        divAccions.appendChild(accioResoldre);
        tdAccions.appendChild(divAccions);
        row.appendChild(tdAccions);

        tabla.appendChild(row);
    });
}



async function carregarIncidencies() {
    incidencies = await getData(url, "Incident");
    const tabla = document.getElementById("files");

    incidencies.forEach((ordre) => {
        
            const row = document.createElement("tr");

            row.appendChild(CrearCelda(ordre.created_at,"Data creació"));
            row.appendChild(CrearCelda(ordre.description, "Descripció"));
            row.appendChild(CrearCelda(getProducte(ordre.product),"Producte"));
            row.appendChild(CrearCelda(ordre.quantity_ordered,"Quantitat demanada"));
            row.appendChild(CrearCelda(ordre.quantity_received,"Quantitat rebuda"));
            row.appendChild(CrearCelda(getEstat(ordre.status),"Estat"));

             let tdAccions = document.createElement("td");
             tdAccions.setAttribute("data-no-colon","true");
             let divAccions = document.createElement("div");
             divAccions.className = "divAccions";

             let accioRevisar = document.createElement("a");
             let iModificar = document.createElement("i");
             iModificar.className = "fas fa-edit";
             accioRevisar.appendChild(iModificar)     
             $(accioRevisar).click(function(){
                 modificarIncidencia(ordre.id);
             });
             divAccions.appendChild(accioRevisar);

            let accioResoldre = document.createElement("a");
            let iResoldre = document.createElement("i");
            iResoldre.className = "fas fa-check";
            accioResoldre.appendChild(iResoldre);
            $(accioResoldre).click(function(){
                resolIncidencia(ordre.id);
            });
            divAccions.appendChild(accioResoldre);
            tdAccions.appendChild(divAccions);
            row.appendChild(tdAccions);

            tabla.appendChild(row);
          
    });
}

function CrearCelda(contingut,clase) {
    const cell = document.createElement("td");
    cell.setAttribute("data-cell",clase);
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


