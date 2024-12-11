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
    if(validarUnitats() && validarDescripcio()){
        return true;
    }
    else{
        return false;
    }
}

function validarUnitats(){
    const unitats = document.getElementById("quantity");
    var missatgeError = document.getElementById("missatgeError");
    missatgeError.textContent = "";
    if(!unitats.checkValidity()){
        if(unitats.validity.valueMissing){
            const textNode = document.createTextNode("Insereix una quantitat d'unitats rebudes");
            missatgeError.appendChild(textNode);
            return false;
        }
    }
    return true;
}

function validarDescripcio(){
    const textDescripcio = document.getElementById("description");
    var missatgeError = document.getElementById("missatgeError");
    missatgeError.textContent = "";
    if(!textDescripcio.checkValidity()){
        if(textDescripcio.validity.valueMissing){
            const textNode = document.createTextNode("Insereix una descripcio");
            missatgeError.appendChild(textNode);
            return false;
        }
        else if(textDescripcio.validity.patternMismatch){
            const textNode = document.createTextNode("Insereix una descripcio valida, entre 7 i 20 caracters");
            missatgeError.appendChild(textNode);
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
