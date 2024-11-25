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

    if (validarNom() && validarVolum() && validarPes()) {
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

function validarVolum() {
    const volum = document.getElementById("volum");
    if (volum.value < 1 || volum.value > 1000) {
        error(volum, "El volum ha de ser entre 1 i 1000 m³.");
        return false;
    }
    return true;
}

function validarPes() {
    const pes = document.getElementById("pes");
    if (pes.value < 1 || pes.value > 500) {
        error(pes, "El pes ha de ser entre 1 i 500 kg.");
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
    const volum = document.getElementById("volum").value;
    const pes = document.getElementById("pes").value;
    const quantitat = document.getElementById("quantitat").value;

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    const newSpace = { id, nom, volum, pes, quantitat };
    arrSpaces.push(newSpace);

    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    alert("Espai creat correctament.");
    window.location.assign("../llista/llistatSpace.html");
}