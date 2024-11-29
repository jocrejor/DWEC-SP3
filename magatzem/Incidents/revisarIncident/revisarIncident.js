let proveidors;
$(document).ready(async function () { 
    proveidors = await getData(url,"Supplier"); 
    $("#btnTorna").click(function(){
        window.location.assign("../incidencies.html");
    }),
    $("#btnRevisar").click(function(){
        revisaIncidencia();
    })
    carregarCapçalera();
});

async function revisaIncidencia(){
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));
    let valorInputQuantitat = document.getElementById("quantity").value;
    let valorInputDescripcio = document.getElementById("description").value;
    incidentSeleccionat.description = valorInputDescripcio;
    incidentSeleccionat.quantity_received = valorInputQuantitat;
    await updateId(url,"Incident",incidentSeleccionat.id,incidentSeleccionat);
    window.location.href = "../incidencies.html";
}

async function carregarCapçalera(){
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));

    let inputID = document.getElementById("orderReceptiod_ID");
    inputID.value = incidentSeleccionat.orderReception_id;

    let inputProveidor = document.getElementById("supplier");
    let nomProveidor = getProveidor(incidentSeleccionat.supplier);
    inputProveidor.value = nomProveidor;

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

