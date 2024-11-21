document.addEventListener("DOMContentLoaded", function () {
    iniciar();
});

function iniciar() {
    document.getElementById("carrerForm").addEventListener("submit", validar, false);
}

function validar(e) {
    e.preventDefault(); 
    esborrarError(); 

    if (validarId() && validarNom() && confirm("Confirma si vols enviar el formulari")) {
        gravarCarrer(); 
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
            error(element, "El nom ha de tindre entre 2 i 70 caracters.");
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

function gravarCarrer() {
    let carrers = JSON.parse(localStorage.getItem("carrers")) || []; 

    let nouCarrer = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
       
    };

    carrers.push(nouCarrer); 
    localStorage.setItem("carrers", JSON.stringify(carrers)); 

    alert("Informació emmagatzemada correctament!"); 
    neteja();
    window.location.assign("formulariLlistaC.html"); 
}

function neteja() {
    const formulari = document.forms[0]; 
    formulari.reset();
    esborrarError();
}
