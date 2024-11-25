$(document).ready(function () {
    replenaProducte();
    replenaOperaris();
    replenaEstats();
    $("#btnTorna").click(function(){
        window.location.href = "../incidencies.html";
    })
});

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
