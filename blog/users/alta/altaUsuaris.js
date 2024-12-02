window.onload = iniciar;
//url = 'http://localhost:5002/';

async function iniciar() {
    document.getElementById("signup").addEventListener("click", validar);
    document.getElementById("tornar-arrere").addEventListener("click", tornarArrere);
    let newId   = await getNewId(url, 'Users') ?? "0";
    let users   = await getData(url, 'Users');
    console.log(users);
    console.log(newId);
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
        return true;
    } else {
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


async function enviarFormulari () {
    let name        = document.getElementById("name").value;
    let email       = document.getElementById("email").value;
    let password    = document.getElementById("password").value;

    let newId   = await getNewId(url, 'Users') ?? "0";
    console.log(newId);

    let user = {
        id: newId,
        name: name,
        email: email,
        password: password,
        user_profile: newId == 0 ? "Administrador" : "Publicador",
    };
    await postData(url, 'Users', user);

   // window.location.href = '../../access/login.html';
}

function tornarArrere() {
    window.location.href = "../../access/login.html";
}