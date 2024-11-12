window.onload = iniciar;

function iniciar() {
    carregarDadesOrdre();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}


function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarIdentificador() 
        && validarClient()
        && validarEstado()
        && validarTransportista()
        && validarDataEnviament()
        && validarNom()
        && validarCantitat()) {
        enviarFormulari();
        return true;
    } else {
        return false;
    }
}

function validarClient() {
    const elementClient = document.getElementById("client");
    if (!elementClient.checkValidity()) {
        if (elementClient.validity.valueMissing) {
            error(elementClient, "Has d'introduir un client");
            return false;
        } else if (elementClient.validity.patternMismatch) {
            error(elementClient, "Introdueix un nom de client vàlid");
            return false;
        }
    }
    return true;
}

function validarTransportista() {
    const transportista = document.getElementById("transportista");
    if (!transportista.checkValidity()) {
        if (transportista.validity.valueMissing) {
            error(transportista, "Has d'introduir un transportista");
            return false;
        } else if (transportista.validity.patternMismatch) {
            error(transportista, "Introdueix un transportista vàlid");
            return false;
        }
    }
    return true;
}

function validarNom() {
    const elementNom = document.getElementById("producte");
    if (!elementNom.checkValidity()) {
        if (elementNom.validity.valueMissing) {
            error(elementNom, "Has d'indicar un producte");
            return false;
        } else if (elementNom.validity.patternMismatch) {
            error(elementNom, "El nom del producte ha de ser vàlid");
        }
    }
    return true;
}

function validarCantitat() {
    const cantitat = document.getElementById("cantitat");
    if (!cantitat.checkValidity()) {
        if (cantitat.validity.valueMissing) {
            error(cantitat, "Has d'indicar una quantitat");
            return false;
        }
    }
    return true;
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function esborrarError() {   
    let formulari = document.forms[0].elements;
    for (let ele of formulari) {
        ele.classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function enviarFormulari() {
    let ordres = JSON.parse(localStorage.getItem("ordresEmmagatzemades")) || [];
    let ordreModificada = {
        identificadorProducte: document.getElementById("identificador").value,
        nomClient: document.getElementById("client").value,
        transportista: document.getElementById("transportista").value,
        dataEnviament: document.getElementById("dataEnviament").value,
        nomProducte: document.getElementById("producte").value,
        cantitat: document.getElementById("cantitat").value,
        estado: document.getElementById("estado").value,
    };

    const index = ordres.findIndex(ordre => ordre.identificadorProducte == ordreModificada.identificadorProducte);
    if (index !== -1) {
        ordres[index] = ordreModificada;
    }
    localStorage.setItem("ordresEmmagatzemades", JSON.stringify(ordres));
    localStorage.removeItem("ordreSeleccionada");
    window.location.assign("llistatOrdres.html");
}
