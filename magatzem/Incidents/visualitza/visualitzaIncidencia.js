let proveidors;
let operaris;
let productes;
$(document).ready(async function () { 
    proveidors = await getData(url,"Supplier");
    operaris = await getData(url,"User");
    productes = await getData(url,"Product"); 
    $("#btnTorna").click(function(){
        window.location.assign("../incidencies.html");
    })
    carregarCapçalera();
});

async function revisaIncidencia(){
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));
    let valorInputQuantitat = document.getElementById("quantity").value;
    let valorInputDescripcio = document.getElementById("description").value;
    incidentSeleccionat.description = valorInputDescripcio;
    incidentSeleccionat.quantity_received = valorInputQuantitat;
    if(validar()){
        await updateId(url,"Incident",incidentSeleccionat.id,incidentSeleccionat);
        window.location.href = "../incidencies.html";
    }
}

function validar(){ 
    if(validarQuantitat() && validarDescripcio()){
        return true;
    }
    else{
        return false;
    }
}

function validarQuantitat(){
    var inputQuantitat = document.getElementById("quantity");
    var missatgeError = document.getElementById("missatgeError");

    missatgeError.textContent = "";

    if(!inputQuantitat.checkValidity()){
        if(inputQuantitat.validity.valueMissing){
            const textNode = document.createTextNode("Insereix una quantitat de productes rebuts");
            missatgeError.appendChild(textNode);
            return false;
        }
    }
    else{
        return true;
    }
}

function validarDescripcio(){
    var inputDescription = document.getElementById("description");
    var missatgeError = document.getElementById("missatgeError");

    missatgeError.textContent = "";

    if(!inputDescription.checkValidity()){
        if(inputDescription.validity.valueMissing){
            const textNode = document.createTextNode("Insereix una descripció per a l'incidencia");
            missatgeError.appendChild(textNode);
            return false;
        }
    }
    else{
        return true;
    }
}

async function carregarCapçalera(){
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));

    let inputID = document.getElementById("orderReceptiod_ID");
    inputID.value = incidentSeleccionat.orderReception_id;

    let dataCreacio = document.getElementById("data");
    dataCreacio.value = incidentSeleccionat.created_at;

    let producte = document.getElementById("product");
    let nomProducte = getProducte(incidentSeleccionat.product);
    producte.value = nomProducte;

    let inputProveidor = document.getElementById("supplier");
    let nomProveidor = getProveidor(incidentSeleccionat.supplier);
    inputProveidor.value = nomProveidor;

    let inputOperari = document.getElementById("operator");
    let nomOperari = getOperari(incidentSeleccionat.operator);
    inputOperari.value = nomOperari;

    let inputOrdered = document.getElementById("quantity_order");
    inputOrdered. value = incidentSeleccionat.quantity_ordered;

    let inputReceived = document.getElementById("quantity");
    inputReceived.value = incidentSeleccionat.quantity_received;

    let inputDescription = document.getElementById("description");
    inputDescription.value = incidentSeleccionat.description;
}

function getProveidor(id){  
    const proveidorExistent = proveidors.find(o => Number(o.id) === id);
    if(proveidorExistent){ 
        return proveidorExistent.name;         
    }  
}

function getOperari(id){  
    const operariExistent = operaris.find(o => o.id === id);
    if(operariExistent){ 
        return operariExistent.name;         
    }  
}

function getProducte(id){
    const producteExistent = productes.find(o => o.id === id);
    
    if(producteExistent){ 
        return producteExistent.name;
    }
}
