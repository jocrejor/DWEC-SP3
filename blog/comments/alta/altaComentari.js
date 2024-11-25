window.onload = function () {
    iniciar();
};

url = 'http://localhost:5002/';

function iniciar() {
    //thereIsUser();
    document.getElementById("btnGravar").addEventListener("click", validar);
    document.getElementById("btnTornarArrere").addEventListener("click", tornarArrere);
}

function validarDescripcio() {
    var element = document.getElementById("descripcio");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduïr una descripcio.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La descripcio ha de tindre entre 2 i 100 caracters.");
        }
        error(element);
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    esborrarError();

    // Validar todos los campos
    if (validarDescripcio()) {
        enviarFormulari();
        return true;
    } else {
        error(document.getElementById("descripcio"), "El comentari no és vàlid.");
        return false;
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
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

async function enviarFormulari() {
    const descripcio = document.getElementById("descripcio").value.trim();
    const postID = sessionStorage.getItem("currentPostID");
    const postTitle = sessionStorage.getItem("currentPostTitle");

    // Validar la longitud de la descripción
    if (descripcio.length < 2 || descripcio.length > 100) {
        const missatgeError = document.getElementById("missatgeError");

        // Limpiar cualquier mensaje de error previo
        while (missatgeError.firstChild) {
            missatgeError.removeChild(missatgeError.firstChild);
        }

        // Crear un nodo de texto y añadirlo al contenedor de error
        const textNode = document.createTextNode("El comentario debe tener entre 2 y 100 caracteres.");
        missatgeError.appendChild(textNode);
        return;
    }

    // Crear un nuevo comentario con el ID y título del post
    const comentari = {
        id: await getNewId(url, "Comment"),
        description: descripcio,
        post_id: postID,
        post_title: postTitle
    };

    const resultat = await postData(url, "Comment", comentari);

    // Redirigir a la página llistatComentaris.html
    setTimeout(function () {
        window.location.href = "../llistat/llistarComentaris.html"; // Cambia la ruta si es necesario
    }, 0);
}

function tornarArrere() {
    window.location.href = "../llistat/llistarComentaris.html";
}