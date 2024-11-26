$(document).ready(function () {
    replenaProducte();
    replenaOperaris();
    replenaEstats();
    revisarOrdre();
    $("#btnTorna").click(function(){
        window.location.assign("../incidencies.html");
    }),
    $("#btnGravar").click(function(){
        modificarIncidencia();
    })
    
});

async function revisarOrdre(){
    const incidencies = await getData(url,"Incident"); 
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));
    if(incidentSeleccionat){
        const incidentRevisar = incidencies.find(o => o.id === incidentSeleccionat.id);
        if(incidentRevisar){
            document.getElementById("operator").value = incidentRevisar.operator_id;
            document.getElementById("product").value = incidentRevisar.product_id;
            document.getElementById("status").value = incidentRevisar.orderlinereception_status_id;
            document.getElementById("quantity").value = incidentRevisar.quantity;
        }
    }
}

async function replenaEstats(){
    const estats = await getData(url,"OrderLineReception_Status");
    const estatSeleccionat = document.getElementById("status");

    estats.forEach(estat=> {
        var option = document.createElement("option");
        option.value = estat.id;
        var text = document.createTextNode(estat.name);
        option.appendChild(text);
        estatSeleccionat.appendChild(option); 
        }
    )
}


async function replenaProducte(){
    const productes = await getData(url,"Product");
    const producteSeleccionat = document.getElementById("product");

    productes.forEach(product=> {
        var option = document.createElement("option");
        option.value = product.id;
        var text = document.createTextNode(product.name);
        option.appendChild(text);
        producteSeleccionat.appendChild(option); 
        }
    )
}

async function replenaOperaris(){
    const operaris = await getData(url,"User");
    const operariSeleccionat = document.getElementById("operator");

    operaris.forEach(operari=> {
        var option = document.createElement("option");
        option.value = operari.id;
        var text = document.createTextNode(operari.name);
        option.appendChild(text);
        operariSeleccionat.appendChild(option); 
        }
    )
}

async function modificarIncidencia(){
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));

    incidentSeleccionat.operator_id = document.getElementById("operator").value;
    incidentSeleccionat.product_id = document.getElementById("product").value;
    incidentSeleccionat.orderlinereception_status_id = document.getElementById("status").value;
    incidentSeleccionat.quantity = document.getElementById("quantity").value;
    await updateId(url,"Incident",incidentSeleccionat.id,incidentSeleccionat);
    window.location.href = "../incidencies.html";
}
