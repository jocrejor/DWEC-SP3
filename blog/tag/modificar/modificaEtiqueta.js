window.onload = main;

url = 'http://localhost:5002/';

let etiquetaSeleccionada;

function main() {
    //thereIsUser();
    document.getElementById("btnGravar").addEventListener("click", validar, false);

    // Recuperar la etiqueta seleccionada desde localStorage
    const etiquetaSeleccionada = JSON.parse(localStorage.getItem("modEtiqueta"));

    // Mostrar el nombre de la etiqueta en el campo de texto
    document.getElementById("nom").setAttribute("value", etiquetaSeleccionada.name);
}

function validarNom() {
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        error(element, "El nom ha de tindre entre 2 i 30 caracters, i començar amb majúscula");
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    esborrarError();

    if (validarNom()) {
        enviarFormulari();
        return true;
    } else {
        error(document.getElementById("nom"), "El nom de l'etiqueta no és vàlid.");
        return false;
    }
}

function error(element, missatge) {
    document.getElementById("missatgeError").textContent = missatge;
    element.classList.add("error");
    element.focus();
}

function esborrarError() {
    document.getElementById("nom").classList.remove("error");
    document.getElementById("missatgeError").textContent = "";
}

async function enviarFormulari() {
    const etiquetaSeleccionada = JSON.parse(localStorage.getItem("modEtiqueta"));
    const nom = document.getElementById("nom").value;
    etiquetaSeleccionada.name = nom;

    await updateId(url, "Tag", etiquetaSeleccionada.id, etiquetaSeleccionada);

    localStorage.removeItem("modEtiqueta");

    // Tornar a la pàgina de llistat
    window.location.assign("../llistat/llistarEtiquetes.html");
}
  
  
