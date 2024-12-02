window.onload = main;

function main() {
  thereIsUser();
  document.getElementById("home").addEventListener("click", home);
  document
    .getElementById("btnGravar")
    .addEventListener("click", validar, false);

  // recuperar les dades del locastorage
  const modProfile = JSON.parse(localStorage.getItem("modProfile"));

  document.getElementById("nom").setAttribute("value", modProfile.name);
}


function home() {
  history.back();
}

function validarNom() {
  const pattern = RegExp(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/);
  const nom = document.getElementById("nom");

  if (!nom.checkValidity()) {
    if (nom.validity.valueMissing) error(nom, "Ompli el camp!");
    if (nom.validity.patternMismatch)
      error(
        nom,
        "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters."
      );
  } else if (pattern.test(nom.value)) {
    return true;
  }

  return false;
}

function validar(e) {
  esborrarError();
  e.preventDefault();
  if (
    validarNom()
  ) {
    enviarFormulari();
    return true;
  } else {
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

function esborrarError() {
  let formulari = document.forms[0].elements;
  for (let ele of formulari) {
    ele.classList.remove("error");
  }
  document.getElementById("missatgeError").replaceChildren();
}

// enviar dades
async function enviarFormulari() {
  const modProfile = JSON.parse(localStorage.getItem("modProfile"));

  const nom = document.getElementById("nom").value;
  modProfile.name = nom;



  await updateId(url, "UserProfile", modProfile.id, modProfile)


  localStorage.removeItem("modProfile");

  // tornar al llistat
  window.location.assign("../listat/llistatUserProfile.html");
}
