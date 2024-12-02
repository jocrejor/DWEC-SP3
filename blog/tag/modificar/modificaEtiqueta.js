window.onload = main;


let etiquetaSeleccionada;

function main() {
    //thereIsUser();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnTornar").addEventListener("click", tornar, false);

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

/**
 * Function validarDuplicado
 * Esta función nos servirá para verificar si el nombre de la etiqueta ya existe en la base de datos
 */

async function validarDuplicado(nom) {

    const etiquetas = await getData(url, "Tag"); 
    const etiquetaExistente = etiquetas.find(etiqueta => etiqueta.name.toLowerCase() === nom.toLowerCase()); 

    if (etiquetaExistente) {
      return true; 
    }
    return false; 
} 


async function validar(e) {
  e.preventDefault(); 
  esborrarError(); 

  const nom = document.getElementById("nom").value;

  // Validación de nombre
  if (!validarNom()) {
    error(document.getElementById("nom"), "El nom de l'etiqueta no és vàlid. Ha de tindre com a màxim 30 caràcters i començar amb majúscula.");
    return false;
  }
  // Validación de duplicados
  const nombreDuplicado = await validarDuplicado(nom);
  if (nombreDuplicado) {
    error(document.getElementById("nom"), "Ja existeix una etiqueta amb aquest nom.");
    return false; 
  }

  // Si todo está bien, proceder con el envío del formulario
  enviarFormulari();
  return true;
}

function error(element, missatge) {
    document.getElementById("missatgeError").textContent = missatge;
    elementError.textContent = "";
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

function tornar(e) {
    e.preventDefault();
    window.location.assign("../llistat/llistarEtiquetes.html");
}
  
  
