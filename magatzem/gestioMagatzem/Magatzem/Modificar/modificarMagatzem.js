window.onload = main;

function main() {
    var modifica = JSON.parse(localStorage.getItem("modificaMagatzem"));
    console.log("Dades carregades per a modificar:", modifica); 

    if (modifica) {
        document.getElementById("id").value = modifica.id || "";  
        document.getElementById("name").value = modifica.name || ""; 
        document.getElementById("tipus").value = modifica.type || "";  
        document.getElementById("adress").value = modifica.address || "";  
    } else {
        alert("No s'ha trobat el registre a modificar.");
        window.location.assign("../Llistar/LlistaMagatzem.html");  
    }
}

function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity() || isNaN(idValidar.value)) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos números.");
        } else if (idValidar.validity.patternMismatch) {
            error(idValidar, "El id ha de tindre entre 2 números.");
        } else if (isNaN(idValidar.value)) {
            error(idValidar, "L'ID ha de ser un número vàlid.");
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
            error(tipusValidar, "Deus de selecionar una opció");
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

function btnGuardar(e) {
    e.preventDefault();

    if (!validarId() || !validarNom() || !validarTipus() || !validarAdress()) {
        alert("Corregiu els errors abans de desar.");
        return;
    }

    var modifica = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        tipus: document.getElementById("tipus").value,
        adress: document.getElementById("adress").value
    };

 
    var magatzems = JSON.parse(localStorage.getItem("magatzems")) || [];
    var index = magatzems.findIndex(m => m.id === modifica.id);

    if (index !== -1) {
        magatzems[index] = modifica;  
        localStorage.setItem("magatzems", JSON.stringify(magatzems));  
        alert("Informació guardada correctament!");
    } else {
        alert("El registre no s'ha trobat.");
    }

    window.location.assign("../Llistar/LlistaMagatzem.html"); 
}

function error(element, message) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = message;
    element.parentNode.appendChild(errorSpan);

    setTimeout(() => errorSpan.remove(), 3000); 
    element.focus();
}

