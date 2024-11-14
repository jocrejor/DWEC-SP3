window.onload = main;

let etiquetaSeleccionada;

function main() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);

    // Recuperar la etiqueta seleccionada desde localStorage
    etiquetaSeleccionada = JSON.parse(localStorage.getItem("modEtiqueta"));

    // Mostrar el nombre de la etiqueta en el campo de texto
    document.getElementById("nom").value = etiquetaSeleccionada.nom;
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

function enviarFormulari() {
    const nomModificat = document.getElementById("nom").value;
    
    // Obtener todas las etiquetas del localStorage
    let etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];

    // Buscar y actualizar la etiqueta correspondiente por ID
    for (let i = 0; i < etiquetas.length; i++) {
        if (etiquetas[i].id === etiquetaSeleccionada.id) {
            etiquetas[i].nom = nomModificat;
            break;
        }
    }

    // Guardar los cambios en localStorage
    localStorage.setItem("Etiquetas", JSON.stringify(etiquetas));
    
    // Eliminar el marcador de modificación en localStorage
    localStorage.removeItem("modEtiqueta");

    // Redirigir de nuevo al listado
    window.location.href = "index.html";
}
