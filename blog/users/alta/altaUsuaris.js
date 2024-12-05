window.onload = iniciar;
//url = 'http://localhost:5002/';

function iniciar() {
    document.getElementById("signup").addEventListener("click", validar);
    document.getElementById("tornar-arrere").addEventListener("click", tornarArrere);

    document.getElementById("name").addEventListener('blur', validarName, false);
    document.getElementById("email").addEventListener('blur', validarEmail, false);
    document.getElementById("password").addEventListener('blur', validarPassword, false);
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
    valid();
    element.className = 'form-control valid';
    return true;
}

async function validarEmail() {
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

    let users = await getData(url, 'Users');
    let email_taken = users.some(e => e.email === element.value);

    if (email_taken){
        error2(element, "Este correo está en uso.");
        return false;
    } 


    valid();
    element.className = 'form-control valid';
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
    valid();
    element.className = 'form-control valid';
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

function valid () {
    let valid  = document.getElementById("missatgeError");
    if(valid){
        while(valid.firstChild){
            valid.replaceChildren();
        }
    }
}

async function enviarFormulari () {
    let name        = document.getElementById("name").value;
    let email       = document.getElementById("email").value;
    let password    = document.getElementById("password").value;

    let users = await getData(url, 'Users');
    console.log(user.lenght);
    let user = {    
        name: name,
        email: email,
        password: password,
        user_profile: users.lenght == 0 ? "Administrador" : "Publicador"
    };
    await postData(url, 'Users', user);

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(!currentUser){
        window.location.href = '../../access/login.html';
    } else {
        window.location.href = '../llistat/gestioUsuaris.html';
    }
}

function tornarArrere() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(!currentUser.user_profile){
        window.location.href = '../../access/login.html';
    } else if(currentUser.user_profile === 'Administador') {

        window.location.href = '../llistat/gestioUsuaris.html';
    }
}