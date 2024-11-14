window.onload = iniciar;

function iniciar() {
    document.getElementById("signup").addEventListener("click", validar);
    document.getElementById("tornar-arrere").addEventListener("click", tornarArrere);
}

function validarName() {
    var element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir un nom");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom ha de tindre entre 2 i 15 caràcters");
        }
        error(element);
        return false;
    }
    return true;
}

function validarEmail() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir un email");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El cognom ha de tindre el format xxx@xxx.com");
        }
        error(element);
        return false;
    }
    return true;
}

function validarPassword() {
    var element = document.getElementById("password");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir una contrassenya");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contrassenya ha de tindre entre 8 i 20 caràcters");
        }
        error(element);
        return false;
    }
    return true;
}

function validarRepeatPassword() {
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;

    if (repeatPassword !== password) {
        error2(repeatPassword, "Les contrassenyes no coincideixen");
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    borrarError();

    if (validarName() && validarEmail() && validarPassword() && validarRepeatPassword() && confirm("Confirma si vols enviar el formulari")) {
        enviarFormulari();
        window.location.href = 'login.html';
        return true;
    }

    else {
        return false;
    }
}

function error(element) {
    document.getElementById("missatgeError").innerHTML = element.validationMessage;
    element.classList.add("error");
    element.focus();
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.classList.add("error");
    element.focus();
}

function borrarError() {
    var formulari = document.forms[0].elements;
    for (var i=0; i < formulari.length; i++) {
        formulari[i].classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function enviarFormulari() {
    var name        = document.getElementById("name").value;
    var email       = document.getElementById("email").value;
    var password    = document.getElementById("password").value;

    var user = {
        id: 0,
        name,
        email,
        password,
        role: "Publicador"
    };

    var storedUsers = localStorage.getItem("users");
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    // Asignar rol de "Administrador" si es el primer usuario
    if (users.length === 0) {
        user.role = "Administrador";
    }

    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [];
    }

    if (users.length > 0) {
        var maxId = 0;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id > maxId) {
                maxId = users[i].id;
            }
        }
        user.id = maxId + 1;
    } else {
        user.id = 1;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function tornarArrere() {
    window.location.href = "login.html";
}