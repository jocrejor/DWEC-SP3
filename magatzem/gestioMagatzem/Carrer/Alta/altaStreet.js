document.addEventListener("DOMContentLoaded", function () {
    iniciar();
});

function iniciar() {
    document.getElementById("btnGuardar").addEventListener("click", validar, false);
}

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarId() && validarNom() &&  confirm("Confirma si vols enviar el formulari")) {
        gravarCarrer();
    } else {
        return false;
    }
}

function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity()) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos números.");
        }
        if (idValidar.validity.patternMismatch) {
            error(idValidar, "El ID ha de tenir exactament 2 números.");
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
        return false;
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

function gravarCarrer() {
        let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    
        let nouCarrers = {
            id: document.getElementById("id").value,
            name: document.getElementById("name").value
        };
    
        carrers.push(nouCarrers);
        localStorage.setItem("carrers", JSON.stringify(carrers));
    
    
    alert("Informació emmagatzemada correctament!");
    neteja();
    window.location.assign("../Llistar/LlistatCarrer.html");
}

function neteja() {
    const formulari = document.forms[0];
    formulari.reset(); 
    esborrarError();
}
