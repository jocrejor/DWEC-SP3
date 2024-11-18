window.onload = iniciar;

/* iniciar: funcio que s'executa al inici de carregar la pàgina */
function iniciar() {
    replenaSelectTransportistes();
    replenaSelectClients();
    replenarProductes();
    document.getElementById("btnGravar").addEventListener("click", validar);
    document.getElementById("btnAfegir").addEventListener("click", validarLlistar);
    document.getElementById("btnGuardar").addEventListener("click", guardarModificacio);
    document.getElementById("btnLlistat").addEventListener("click", llistarOrdres);
    carregarDadesOrdre();
}

/* llistarOrdres: funcio que redirigeix a la página llistatOrdres.html */
function llistarOrdres(){
    window.location.href = "llistatOrdres.html";
}

/* funcio que valida si esta tot correcte per donar d'alta una nova ordre */
function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarClient() 
        && validarTransportista()
        && validarProducte()
        && validarQuantitat()) {

        enviarFormulari();
        return true;
    } 
    else {
        return false;
    }
}

/* validarLlistar: funcio que valida si es pot llistar en la taula per al orderLineShipping */
function validarLlistar(e){
    esborrarError();
    e.preventDefault();
    if (validarProducte()
    && validarQuantitat()) {
        llistar();
        return true;
    } 
    else {
        return false;
    }
}

/** validarClient: funcio que valida el nom del client del formulari
 */
function validarClient(){
    const elementClient = document.getElementById("client");

    if(!elementClient.checkValidity()){
        if(elementClient.validity.valueMissing){
            error(elementClient,"Has de introduir un client");
            return false;
        }
    }
    return true;
}

/** validarTransportista: funcio que valida el transportista
 */
function validarTransportista() {
    const elementTransportista = document.getElementById("carrier");

    if(!elementTransportista.checkValidity()){
        if(elementTransportista.validity.valueMissing){
            error(elementTransportista,"Has d'indicar un transportista");
            return false;
        }
    }
    return true;
}

/** replenaSelectClients: funcio que replena el select de les comunitats a partir del JSON
*/
function replenaSelectClients() {
    var clientSeleccionat = document.getElementById("client");

    Client.forEach(clients => {    
        var option = document.createElement("option");
        option.value = clients.name;
        var text = document.createTextNode(clients.name);
        option.appendChild(text);
        clientSeleccionat.appendChild(option);       
    });
}

/* replenarProductes: funcio que replena el input de productes */
function replenarProductes(){
    var producteSeleccionat = document.getElementById("product");

    Product.forEach(products => {    
        var option = document.createElement("option");
        option.value = products.name;
        var text = document.createTextNode(products.name);
        option.appendChild(text);
        producteSeleccionat.appendChild(option);       
    });

}

/** replenaSelectTransportistes: funcio que replena el select dels transportistes a partir del JSON
*/
function replenaSelectTransportistes() {
    var transportistaSeleccionat = document.getElementById("carrier");

    Carriers.forEach(carrier => {    
        var option = document.createElement("option");
        option.value = carrier.name;
        var text = document.createTextNode(carrier.name);
        option.appendChild(text);
        transportistaSeleccionat.appendChild(option);       
    });
}

/** validarProducte: funcio que valida el producte
 */
function validarProducte() {
    const elementNom = document.getElementById("product");

    if(!elementNom.checkValidity()){
        if(elementNom.validity.valueMissing){
            error(elementNom,"Has d'indicar un producte");
            return false;
        }
    }
    return true;
}


/** validarquantitat: funcio que valida la quantitat dels productes del formulari
 */
function validarQuantitat(){
    const quantitat = document.getElementById("quantitat");

    if(!quantitat.checkValidity()){
        if(quantitat.validity.valueMissing){
            error(quantitat,"Has d'indicar una quantitat");
            return false;
        }
        else if(quantitat.validity.patternMismatch){
            error(quantitat,"Introdueix una quantitat valida");
            return false;
        }
    }
    return true;
}

let arrayTemporal = [];
let id_Llista = 0;
let idElementEnEdicio = null;

/*llistar: funcio per llistar les ordresAfegides del arrayTemporal a una taula */
function llistar() {
    let producteSeleccionat = document.getElementById("product").value;
    let quantitatIngresada = document.getElementById("quantitat").value;
    let tabla = document.getElementById("tabla");
    id_Llista++;

    const nouElement = {
        id: id_Llista,
        producte: producteSeleccionat,
        quantitat: quantitatIngresada
    };
    arrayTemporal.push(nouElement);

    const trTabla = document.createElement("tr");
    trTabla.setAttribute('data-id', id_Llista);

    const tdModificar = document.createElement("td");
    const btnModificar = document.createElement("button");
    btnModificar.type = "button";
    const textModificar = document.createTextNode("Modificar");
    btnModificar.appendChild(textModificar);
    btnModificar.className = "btn btn-primary";
    btnModificar.addEventListener("click", () => modificar(nouElement.id));
    tdModificar.appendChild(btnModificar);

    const tdEliminar = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    const textEliminar = document.createTextNode("Eliminar");
    btnEliminar.appendChild(textEliminar);
    btnEliminar.className = "btn btn-primary";
    btnEliminar.addEventListener("click", () => eliminar(nouElement.id));
    tdEliminar.appendChild(btnEliminar);

    const tdProducte = document.createElement("td");
    const textProducte = document.createTextNode(nouElement.producte);
    tdProducte.appendChild(textProducte);

    const tdQuantitat = document.createElement("td");
    const textQuantitat = document.createTextNode(nouElement.quantitat);
    tdQuantitat.appendChild(textQuantitat);

    trTabla.appendChild(tdModificar);
    trTabla.appendChild(tdEliminar);
    trTabla.appendChild(tdProducte);
    trTabla.appendChild(tdQuantitat);
    
    tabla.appendChild(trTabla);
    document.getElementById("product").value = "";
    document.getElementById("quantitat").value = "";
}

/*modificar: funcio que introdueix els camps de producte i quantitat seleccionats en els inputs per a la seva futura modificacio */
function modificar(id) {
    const idTrobat = arrayTemporal.findIndex(llista => llista.id === id);

    if (idTrobat !== -1) {
        idElementEnEdicio = id;
        document.getElementById("btnGravar").style.display = "none";
        document.getElementById("btnAfegir").style.display = "none";
        document.getElementById("btnLlistat").style.display = "none";
        document.getElementById("btnGuardar").style.display = "block";

        document.getElementById("product").value = arrayTemporal[idTrobat].producte;
        document.getElementById("quantitat").value = arrayTemporal[idTrobat].quantitat;
    }
}

/*guardarModificacio: funcio que, si estem editant una ordre del arrayTemporal, cambiara els camps seleccionats per els existens */
function guardarModificacio() {
    if (idElementEnEdicio !== null) {
        const idTrobat = arrayTemporal.findIndex(llista => llista.id === idElementEnEdicio);
        if (idTrobat !== -1) {
            const producteNou = document.getElementById("product").value;
            const quantitatNova = document.getElementById("quantitat").value;

            arrayTemporal[idTrobat].producte = producteNou;
            arrayTemporal[idTrobat].quantitat = quantitatNova;

            document.getElementById("product").value = "";
            document.getElementById("quantitat").value = "";

            document.getElementById("btnGravar").style.display = "block";
            document.getElementById("btnAfegir").style.display = "block";
            document.getElementById("btnLlistat").style.display = "block";
            document.getElementById("btnGuardar").style.display = "none";

            const fila = document.querySelector(`tr[data-id='${idElementEnEdicio}']`);
            fila.querySelector('td:nth-child(3)').textContent = producteNou; 
            fila.querySelector('td:nth-child(4)').textContent = quantitatNova; 

            idElementEnEdicio = null;
        }
    }
}
/* eliminar: funcio per eliminar del arrayTemporal una de les ordres afegides */
function eliminar(id) {
    const idTrobat = arrayTemporal.findIndex(llista => llista.id === id);
    if (idTrobat !== -1) {
        arrayTemporal.splice(idTrobat, 1); 
        const fila = document.querySelector(`tr[data-id='${id}']`);
        fila.remove(); 
    }
}

/** error: funcio que mostrara el missatge de error corresponent y marcara en un focus on esta el camp erroni
 */
function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add( "error" )
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

let idAEditar = null; 

/** enviarFormulari: funcio que agafara les dades introduides al formulari i les guardara al localStorage */
function enviarFormulari() {
    const nomClient = document.getElementById("client").value;
    const producte = document.getElementById("product").value;
    const quantitat = document.getElementById("quantitat").value;
    const fecha = new Date();
    const data = fecha.getDate();
    const transportista = document.getElementById("carrier").value;
    let idOrdre = parseInt(localStorage.getItem("ultimIDOrdre")) || 1000;
    const orderLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    const orderShipping = JSON.parse(localStorage.getItem("orderShipping")) || [];

    if (idAEditar !== null) {
        const idExistente = orderShipping.findIndex(order => order.id === idAEditar);

        if (idExistente >= 0) {
            orderShipping[idExistente].client_id = nomClient;
            orderShipping[idExistente].carrier_id = transportista;
            orderLineShipping[idExistente].product = producte;
            orderLineShipping[idExistente].quantity = quantitat;
        }

        idAEditar = null; 
    } 
    else {
        const novaOrdre = {
            id: idOrdre,
            client_id: nomClient,
            ordershipping_status: "Pendent",
            carrier_id: transportista,
            shipping_date: data,
        };

        const orderLine = {
            id: idOrdre,
            product: producte,
            quantity: quantitat,
        };

        orderShipping.push(novaOrdre);
        orderLineShipping.push(orderLine);
        idOrdre++;
    }

    localStorage.setItem("ultimIDOrdre", idOrdre);
    localStorage.setItem("orderLineShipping", JSON.stringify(orderLineShipping));
    localStorage.setItem("orderShipping", JSON.stringify(orderShipping));

    setTimeout(function () {
        document.getElementById("client").value = "";
        document.getElementById("carrier").value = "";
        document.getElementById("product").value = "";
        document.getElementById("quantitat").value = "";
    }, 1000);
}

/*carregarDadesOrdre: funcio per carregar les dades de la ordreSeleccionada en llistarOrdres en els inputs*/
function carregarDadesOrdre() {
    const ordreSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));
    const ordresLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    const ordresLine = JSON.parse(localStorage.getItem("orderShipping")) || [];
  
    if (ordreSeleccionada) {
        const orderLine = ordresLine.find(o => o.id === ordreSeleccionada.id);
        const ordre = ordresLineShipping.find(o => o.id === ordreSeleccionada.id);

        if (ordre && orderLine) {
            document.getElementById("client").value = orderLine.client_id;
            document.getElementById("carrier").value = orderLine.carrier_id;
            document.getElementById("product").value = ordre.product;
            document.getElementById("quantitat").value = ordre.quantity;
        }

        idAEditar = ordreSeleccionada.id;
    }
    localStorage.removeItem("ordreSeleccionada");
}