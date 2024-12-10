window.onload = iniciar;

function iniciar() {

  thereIsUser()

  document.getElementById("home").addEventListener("click", home);
  document.getElementById("btnGravar").addEventListener("click", validar);
}

class Profile {
  constructor(id, nom) {
    this.id = id;
    this.name = nom;
  }
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
  const nom = document.getElementById("nom").value;

  const newProfile = {"name": nom};

  try {
    const resultat = await postData(url, "UserProfile", newProfile);

    if (resultat) {
      console.log('Perfil creat correctament:', resultat);

      setTimeout(function () {
        let formulari = document.forms[0].elements;
        for (let ele of formulari) {
          ele.value = "";
        }
      }, 1000);

      // Redirigir a la llista de perfils
      location.assign("../llistat/llistatUserProfile.html");
    } else {
      console.error('No s\'ha pogut crear el perfil. Resposta incorrecta de l\'API.');
    }
  } catch (error) {
    console.error('Error en crear el perfil:', error);
  }
}
