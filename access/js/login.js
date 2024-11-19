document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enviar").addEventListener("click", validar);
});

function validar(e) {
    esborrarError();
    e.preventDefault();
    
    if (validarEmail() && validarContrasenya()) {
        enviarFormulari();
        return true;
    } else {
        return false;
    }
}

function validarEmail() {
    const element = document.getElementById("email");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr el correu electrònic.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El correu electrònic no és vàlid, exemple: nom@domini.com");
        }
        return false;
    }
    return true;
}

function validarContrasenya() {
    const element = document.getElementById("password");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr la contrasenya.");
        }
        if (element.validity.patternMismatch) {
            error(element, "La contrasenya no és vàlida, ha de contenir almenys 6 caràcters.");
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
    const formulari = document.forms[0].elements;
    for (let ele of formulari) {
        ele.classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function enviarFormulari() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("email", email);
    localStorage.setItem("password", password); // Normalment, mai es guarda la contrasenya sense xifrar

    alert("Inici de sessió correcte!");

    // Netejar el formulari després d'enviar
    setTimeout(function () {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }, 1000);
}
