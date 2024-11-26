window.onload = iniciar;

function iniciar() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar() {
    window.location.assign("../llista/llistatSpace.html");
}

function validar(e) {
    esborrarError();
    e.preventDefault();

    if (validarNom() &&validarProducte() && validarVolum() && validarPes() && validarMagatzem() && validarCarrer() && validarEstanteria) {
        enviarFormulari();
        return true;
    }

    return false;
}

function validarNom() {
    const nom = document.getElementById("nom");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "El nom ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validarProducte() {
    const producte = document.getElementById("producte");
    if (producte.value < 1 || producte.value > 1000) {
        error(producte, "La id producte no es correcte .");
        return false;
    }
    return true;
}

function validarVolum() {
    const volum = document.getElementById("volum");
    if (volum.value < 1 || volum.value > 1000) {
        error(volum, "El volum no es correcte .");
        return false;
    }
    return true;
}

function validarPes() {
    const pes = document.getElementById("pes");
    if (pes.value < 1 || pes.value > 1000) {
        error(pes, "El pes no es correcte .");
        return false;
    }
    return true;
}
function validarMagatzem() {
    const magatzem = document.getElementById("magatzem");
    if (magatzem.value < 1 || magatzem.value > 1000) {
        error(magatzem, "La id magatzem no es correcte .");
        return false;
    }
    return true;
}

function validarCarrer() {
    const carrer = document.getElementById("carrer");
    if (carrer.value < 1 || carrer.value > 500) {
        error(carrer, "La id del carrer no es correcte.");
        return false;
    }
    return true;
}
function validarEstanteria() {
    const estanteria = document.getElementById("estanteria");
    if (estanteria.value < 1 || estanteria.value > 500) {
        error(estanteria, "La id de la estanteria no es correcte.");
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

function enviarFormulari() {
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const producte = document.getElementById("producte").value;
    const volum = document.getElementById("volum").value;
    const pes = document.getElementById("pes").value;
    const magatzem = document.getElementById("magatzem").value;
    const carrer = document.getElementById("carrer").value;
    const quantitat = document.getElementById("quantitat").value;
    const estanteria = document.getElementById("estanteria").value;

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    const newSpace = { id, nom,producte,volum,pes, magatzem, carrer, quantitat, estanteria };
    arrSpaces.push(newSpace);

    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    alert("Espai creat correctament.");
    window.location.assign("../llista/llistatSpace.html");
}
