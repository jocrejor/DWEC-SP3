let currentUser;
 //obtinre els usuaris 
let users; 


 document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("enviar").addEventListener("click", validar);
    carregarUsuaris();
});

async function carregarUsuaris () {
    users = await getData(url,"User");    
}

function validar(e) {
    e.preventDefault();
    esborrarError();

    if (validarEmail() && validarContrasenya() && validarExisteixUser()) {
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


function validarExisteixUser() {
    const email =  document.getElementById("email").value;
    const password =  document.getElementById("password").value;
    
    currentUser = users.find( ele => ele.email == email );
    if (currentUser == undefined || currentUser.password != password ){  
        error(email, "El correu o la contrasenya no coincideix amb cap usuari");
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
    
    // Si les credencials són correctes, emmagatzemem que l'usuari està logat
        localStorage.setItem("currentUser",JSON.stringify(currentUser));

        // Redirigim l'usuari a la pàgina principal
        setTimeout(() => {
           window.location.href = "../index.html";  // Redirecció després d'1 segon
        }, 1000);

}