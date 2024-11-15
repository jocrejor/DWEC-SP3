window.onload = main;

function main() {
    let modifica = JSON.parse(localStorage.getItem("modificaFormulari"));
    console.log("Dades cargades per a modificar:", modifica); 
    if (modifica) {
        document.getElementById("id").value = modifica.id || "";
        document.getElementById("name").value = modifica.name || "";
        document.getElementById("tipus").value = modifica.tipus || "";
        document.getElementById("adress").value = modifica.adress || "";
        document.getElementById("id_pasillo").value = modifica.id_pasillo || "";
        document.getElementById("name_").value = modifica.name_ || "";
    } else {
        alert("No s'ha trobat el registre a modificar.");
        window.location.assign("formulariLlista.html");
    }
    document.getElementById("btnGuardar").addEventListener("click", validar, false);
}
function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity()) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos numeros.");
        }
        if (idValidar.validity.patternMismatch) {
            error(idValidar, "El id ha de tindre entre 2 numeros");
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
function validarId() {
    var idValidar = document.getElementById("id_pasillo");
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
    var element = document.getElementById("name_");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un nom.");
        }
        return false;
    }
    return true;
}

function btnGuardar(e) {
    e.preventDefault();
    let modifica = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        tipus: document.getElementById("tipus").value,
        adress: document.getElementById("adress").value,
        id_pasillo: document.getElementById("id_pasillo").value,
        name_: document.getElementById("name_").value
    };

    let magatzems = JSON.parse(localStorage.getItem("magatzems")) || [];
    if (modifica.id) {
        const index = magatzems.findIndex(m => m.id === modifica.id);
        if (index !== -1) {
            magatzems[index] = modifica; 
            localStorage.setItem("magatzems", JSON.stringify(magatzems));
            alert("Informació guardada correctament!");
        } else {
            alert("El registre no s'ha trobat.");
        }
    } else {
        alert("L'ID no és buit.");
    }

    window.location.assign("formulariLlista.html"); 
}

