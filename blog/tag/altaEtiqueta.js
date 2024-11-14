window.onload = iniciar;

function iniciar() {
  document
    .getElementById("btnGravar")
    .addEventListener("click", validar);
}

function validarNom() {
  var element = document.getElementById("nom");
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error2(element, "Deus d'introduïr un nom.");
    }
    if (element.validity.patternMismatch) {
      error2(element, "El nom ha de tindre entre 2 i 30 caracters, i començar amb majuscula.");
    }
    error(element);
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
  const textError = document.createTextNode(missatge);
  const elementError = document.getElementById("missatgeError");
  elementError.appendChild(textError);
  element.classList.add("error");
  element.focus();
}

function error2(element, missatge) {
    const elementError = document.getElementById("missatgeError");
    elementError.textContent = missatge; // Usa textContent en lugar de innerHTML
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

let idContador = 1;

function enviarFormulari() {
  const nom = document.getElementById("nom").value;
  let etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];
  let idsEliminados = JSON.parse(localStorage.getItem("IdsEliminados")) || [];

  // Verificar si el nombre ya existe
  for (let i = 0; i < etiquetas.length; i++) {
    if (etiquetas[i].nom.toLowerCase() === nom.toLowerCase()) {
      error2(document.getElementById("nom"), "Aquest nom ja existeix.");
      return;
    }
  }

  // Obtener el siguiente ID disponible
  let idNuevo = 1;
  while (etiquetas.some(etiqueta => etiqueta.id === idNuevo) || idsEliminados.includes(idNuevo)) {
    idNuevo++;
  }

  const etiqueta = {
    id: idNuevo,
    nom: nom
  };

  etiquetas.push(etiqueta);
  localStorage.setItem("Etiquetas", JSON.stringify(etiquetas));

  // Limpiar el campo después de guardar
  setTimeout(function () {
    document.getElementById("nom").value = "";
  }, 0);

  // Redirigir a llistatetiquetes.html
  window.location.href = "llistatEtiquetes.html";
}