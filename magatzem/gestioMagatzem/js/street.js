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
        gravarMagatzem();
    } else {
        return false;
    }
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

function gravarMagatzem() {
    let magatzems = JSON.parse(localStorage.getItem("magatzems")) || [];

    let idMagatzem = document.getElementById("id").value;

    let existingMagatzem = magatzems.find(m => m.id === idMagatzem);

    if (existingMagatzem) {
        existingMagatzem.id_pasillo = document.getElementById("id_pasillo").value;
        existingMagatzem.name_ = document.getElementById("name_").value;
    } else {
        let nouMagatzem = {
            id: idMagatzem,
            name: null,         
            tipus: null,
            adress: null,
            id_pasillo: document.getElementById("id_pasillo").value,
            name_: document.getElementById("name_").value
        };
        magatzems.push(nouMagatzem);
    }

    localStorage.setItem("magatzems", JSON.stringify(magatzems));

    alert("Informació emmagatzemada correctament!");
    neteja();
    window.location.assign("formulariLlista.html");
}

function neteja() {
    const formulari = document.forms[0];
    formulari.reset(); 
    esborrarError();
}
