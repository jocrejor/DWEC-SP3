document.addEventListener("DOMContentLoaded", function () {
    iniciar();
});

function iniciar() {
    document.getElementById("magatzemForm").addEventListener("submit", validar, false);
}

function validar(e) {
    e.preventDefault(); 
    esborrarError(); 

    if (validarId() && validarNom() && validarTipus() && validarAdress() && confirm("Confirma si vols enviar el formulari")) {
        gravarMagatzem(); 
    } else {
        return false; 
    }
}

function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity()) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos numeros.");
        }
        if (idValidar.validity.patternMismatch) {
            error(idValidar, "El id ha de tindre entre 2 numeros.");
        }
        return false; 
    }
    return true; 
}

function validarNom() {
    var element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un nom.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El nom ha de tindre entre 2 i 40 caracters.");
        }
        return false; 
    }
    return true; 
}

function validarTipus() {
    var tipusValidar = document.getElementById("tipus");
    if (!tipusValidar.checkValidity()) {
        if (tipusValidar.validity.valueMissing) {
            error(tipusValidar, "Deus de seleccionar una opció.");
        }
        return false; 
    }
    return true; 
}

function validarAdress() {
    var adrecaValidar = document.getElementById("adress");
    if (!adrecaValidar.checkValidity()) {
        if (adrecaValidar.validity.valueMissing) {
            error(adrecaValidar, "Deus d'introduïr una adreça.");
        }
        if (adrecaValidar.validity.patternMismatch) {
            error(adrecaValidar, "L'adreça ha de tindre entre 2 i 40 caracters.");
        }
        return false; 
    }
    return true; 
}


function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.innerHTML = "";  
    elementError.appendChild(textError); 
    element.classList.add("error"); 
    element.focus(); 
}

function esborrarError() {
    let formulari = document.forms[0].elements; 
    for (let ele of formulari) {
        ele.classList.remove("error"); 
    }
    document.getElementById("missatgeError").innerHTML = ""; 
}

function gravarMagatzem() {
    let magatzems = JSON.parse(localStorage.getItem("magatzems")) || []; 

    let nouMagatzem = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        tipus: document.getElementById("tipus").value,
        adress: document.getElementById("adress").value,
    };

    magatzems.push(nouMagatzem); 
    localStorage.setItem("magatzems", JSON.stringify(magatzems)); 

    alert("Informació emmagatzemada correctament!"); 
    neteja();
    window.location.assign("../Llistar/LlistaMagatzem.html"); 
}

function neteja() {
    const formulari = document.forms[0]; 
    formulari.reset();
    esborrarError();
}
