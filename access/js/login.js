document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser === "true") {
        window.location.href = "../index.html";
    }

    document.getElementById("enviar").addEventListener("click", validar);
});

function validar(e) {
    esborrarError();
    e.preventDefault();

    if (validarEmail() && validarContrasenya()) {
        enviarFormulari();
    }
}

function validarEmail() {
    const element = document.getElementById("email");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr el correu electrònic.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El correu electrònic no és vàlid.");
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
    elementError.innerHTML = "";  // Netegem missatges d'error anteriors
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function esborrarError() {
    const formulari = document.forms[0].elements;
    for (let ele of formulari) {
        ele.classList.remove("error");
    }
    document.getElementById("missatgeError").innerHTML = "";  // Netegem el missatge d'error
}

function enviarFormulari() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Comprovem si l'usuari existeix a localStorage
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    // Validem les credencials
    if (email === savedEmail && password === savedPassword) {
        // Si les credencials són correctes, emmagatzemem que l'usuari està logat
        localStorage.setItem("currentUser", "true");

        // Redirigim l'usuari a la pàgina principal
        setTimeout(() => {
            window.location.href = "../index.html";  // Redirecció després d'1 segon
        }, 1000);

        // Netegem el formulari
        setTimeout(() => {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        }, 1000);

    } else {
        error(document.getElementById("email"), "Les credencials no són vàlides.");
    }
}