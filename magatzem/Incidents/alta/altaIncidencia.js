let suppliers;

$(document).ready(function () {
    carregarCapçalera();
    thereIsUser();  
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
        const usuarioActual = JSON.parse(localStorage.getItem("currentUser"));
        const unitats = document. getElementById("quantity").value;
        const descripcio = document.getElementById("description").value;
        const data = new Date().toLocaleDateString('es-ES');

        const incidencia = {
            created_at: data,
            description: descripcio,
            supplier: ordreRecepcioSeleccionada.supplier_id,
            orderReception_id:  ordreRecepcioSeleccionada.id,
            product: String(orderLineReception.product_id),
            operator: usuarioActual.id,
            status: "Pendent",
            quantity_ordered: orderLineReception.quantity_ordered,
            quantity_received: unitats
        };

        let nouIncident = await postData(url,"Incident",incidencia);
        //EIXIDA
        let quantitatNegativa = - incidencia.quantity_received;
        newMoviment ("01", "01", "01", "01", incidencia.product,quantitatNegativa , usuarioActual.id, "Incident",nouIncident.id )
        
        //ENTRADA
        newMoviment ("04", "01", "01", "01", incidencia.product, incidencia.quantity_received, usuarioActual.id, "Incident",nouIncident.id )
        window.location.href = "../incidencies.html";
    }
}

function getProveidor(id){ 
    const proveidorExistent = suppliers.find(o => Number(o.id) === id);
    if(proveidorExistent){ 
        return proveidorExistent.name;         
    }
    
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