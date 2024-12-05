let suppliers;

$(document).ready(function () {
    carregarCapçalera();  
    $("#btnTorna").click(function(){
        window.location.href = "../../../recepcio/ordesRecepcio/visualitzar/visualizar.html";
    }),
    $("#btnGravar").click(function(){
        altaIncidencia();
    })
});

function validar(){
    esborrarError();
    if(validarUnitats() && validarDescripcio()){
        return true;
    }
    else{
        return false;
    }
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

async function carregarCapçalera(){
    suppliers = await getData(url,"Supplier");
    const ordreRecepcioSeleccionada = JSON.parse(localStorage.getItem("ordreLineSeleccionada"));
    const orderReception = await getData(url,"OrderReception");

    const orderReceptionTrobada = orderReception.find(o => o.id === ordreRecepcioSeleccionada.order_reception_id);
    let inputID = document.getElementById("orderReceptiod_ID");
    inputID.value = ordreRecepcioSeleccionada.id;

    let inputProveidor = document.getElementById("supplier");
    let nomProveidor = getProveidor(orderReceptionTrobada.supplier_id);
    inputProveidor.value = nomProveidor;

    let inputOrdered = document.getElementById("quantity_order");
    inputOrdered. value = ordreRecepcioSeleccionada.quantity_ordered;
}

async function altaIncidencia(){
    if(validar()){ 
        const ordreRecepcioSeleccionada = JSON.parse(localStorage.getItem("ordenVisualizar"));
        const orderLine = await getData(url,"OrderLineReception");
        const orderLineReception = orderLine.find(o => o.order_reception_id === ordreRecepcioSeleccionada.id);

        const unitats = document. getElementById("quantity").value;
        const descripcio = document.getElementById("description").value;
        const data = new Date().toLocaleDateString();

        const incidencia = {
            created_at: data,
            description: descripcio,
            supplier: ordreRecepcioSeleccionada.supplier_id,
            orderReception_id:  ordreRecepcioSeleccionada.id,
            product: orderLineReception.product_id,
            status: "Pendent",
            quantity_ordered: orderLineReception.quantity_ordered,
            quantity_received: unitats
        };
        await postData(url,"Incident",incidencia);
        window.location.href = "../incidencies.html";
    }
}

function getProveidor(id){ 
    const proveidorExistent = suppliers.find(o => Number(o.id) === id);
    if(proveidorExistent){ 
        return proveidorExistent.name;         
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