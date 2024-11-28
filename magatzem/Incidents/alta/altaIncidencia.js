$(document).ready(function () {
    replenaProducte();
    replenaOperaris();
    replenaEstats();
    $("#btnTorna").click(function(){
        window.location.href = "../incidencies.html";
    }),
    $("#btnGravar").click(function(){
        altaIncidencia();
    })
});

function validar(){
    esborrarError();
    if(validarOperari() && validarEstat() && validarProducte() && validarUnitats() && validarDescripcio()){
        return true;
    }
    else{
        return false;
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

function validarOperari(){
    esborrarError();
    const operari = document.getElementById("operator");

    if(!operari.checkValidity()){
        if(operari.validity.valueMissing){
            error(operari,"Has d'indicar un operari");
            return false;
        }
    }
    return true;
}

function validarEstat(){
    esborrarError();
    const estat = document.getElementById("status");

    if(!estat.checkValidity()){
        if(estat.validity.valueMissing){
            error(estat,"Has d'indicar un estat");
            return false;
        }
    }
    return true;
}

function validarProducte(){
    esborrarError();
    const producte = document.getElementById("product");

    if(!producte.checkValidity()){
        if(producte.validity.valueMissing){
            error(producte,"Has d'indicar un producte");
            return false;
        }
    }
    return true;
}

function validarUnitats(){
    esborrarError();
    const unitats = document.getElementById("quantity");

    if(!unitats.checkValidity()){
        if(unitats.validity.valueMissing){
            error(unitats,"Has d'indicar les unitats");
            return false;
        }
    }
    return true;
}

function validarDescripcio(){
    esborrarError();
    const textDescripcio = document.getElementById("description");

    if(!textDescripcio.checkValidity()){
        if(textDescripcio.validity.valueMissing){
            error(textDescripcio,"Has d'escriure una descripcio");
            return false;
        }
        else if(textDescripcio.validity.patternMismatch){
            error(quantitat,"Introdueix una descripció valida");
            return false;
        }
    }
    return true;
}

async function altaIncidencia(){
    if(validar()){
        let ordreRecepcioSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));
        //let incidenciaId = await getNewId(url,"Incident");
        let operari = document.getElementById("operator").value;
        let estat = document.getElementById("status").value;
        let producte = document.getElementById("product").value;
        let unitats = document. getElementById("quantity").value;
        let descripcio = document.getElementById("description").value;

        let incidencia = {
            created_at: "CURRENT_TIMESTAMP",
            description: descripcio,
            //id:incidenciaId ,
            operator_id: operari,
            orderReception_id:ordreRecepcioSeleccionada,
            orderlinereception_status_id: estat,
            product_id: producte,
            quantity: unitats
        };

        await postData(url,"Incident",incidencia);
        
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add( "error" );
    element.focus();
}

/** esborrarError: funcio que borra el mensatge de error
 */
function esborrarError() {   
    let formulari = document.forms[0].elements;
        for (let ele of formulari) {
            ele.classList.remove("error")
        }    
    document.getElementById("missatgeError").replaceChildren(); 

}