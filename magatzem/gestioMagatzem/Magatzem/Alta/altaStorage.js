window.onload = iniciar;

function iniciar() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar() {
    window.location.assign("../Llistar/LlistaMagatzem.html");
}

function validar(e) {
    e.preventDefault();
    esborrarError();

    if (
        validarId() &&
        validarNom() &&
        validarTipus() &&
        validarAdress() &&
        confirm("Confirma si vols enviar el formulari")
    ) {
        enviarFormulari().catch((error) =>
            console.error('Error en enviarFormulari:', error)
        );
    } else {
        console.log("Formulari no vàlid");
        return false;
    }
}

function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity()) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos numeros.");
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
    var tipusValidar = document.getElementById("type");
    if (!tipusValidar.checkValidity()) {
        if (tipusValidar.validity.valueMissing) {
            error(tipusValidar, "Deus de selecionar una opció");
        }
        return false;
    }
    return true;
}

function validarAdress() {
    var addressValidar = document.getElementById("address");
    if (!addressValidar.checkValidity()) {
        if (addressValidar.validity.valueMissing) {
            error(addressValidar, "Deus d'introduïr una adreça.");
        }
        if (addressValidar.validity.patternMismatch) {
            error(addressValidar, "L'adreça ha de tindre entre 2 i 40 caracters.");
        }
        return false;
    }
    return true;
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.textContent = ""; 
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

async function enviarFormulari() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const address = document.getElementById("address").value;

    const nouMagatzem = { id, name, type, address };

    let arrShelfs = JSON.parse(localStorage.getItem("storages")) || [];
    arrShelfs.push(nouMagatzem);
    localStorage.setItem("storages", JSON.stringify(arrShelfs));

    await postData(url, 'Storage', nouMagatzem);

    alert("Estanteria gravada correctament.");
    document.getElementById("formulariMagatzem").reset(); 
    window.location.assign("../Llistar/LlistaMagatzem.html");
}

function esborrarError() {
    document.getElementById("missatgeError").textContent = "";
    const elements = document.querySelectorAll(".error");
    elements.forEach((el) => el.classList.remove("error"));
}