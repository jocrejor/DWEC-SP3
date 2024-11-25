window.onload = iniciar;

function iniciar() {
  thereIsUser(); // Comprova si hi ha un usuari actiu

  document.getElementById("home").addEventListener("click", home);
  document.getElementById("btnGravar").addEventListener("click", validar);
  listTipus();
}

class User {
  constructor(id, nom, correu, pw, rol, imatge) {
    this.id = id;
    this.name = nom;
    this.email = correu;
    this.password = pw;
    this.role = rol;
    this.image = imatge;
  }
}

function home() {
  location.assign("../index.html");
}

// Comprovar si hi ha un usuari en localStorage
function thereIsUser() {
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  if (!currentUserId) {
    alert("No hi ha cap usuari actiu.");
    return;
  }
}

// Funció per llistar els tipus d'usuaris des del localStorage
function listTipus() {
  const user_profile = JSON.parse(localStorage.getItem("user_profile")) || { userProfile: [] };
  const select = document.querySelector("select");

  user_profile.userProfile.forEach((tipus) => {
    if (tipus.id != 1) {
      let newOption = document.createElement("option");
      newOption.setAttribute("id", `${tipus.id}`);
      let innerOption = document.createTextNode(`${tipus.name}`);
      newOption.appendChild(innerOption);
      select.appendChild(newOption);
    }
  });
}

// Funció per validar el nom
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

// Funció per validar l'email
function validarEmail() {
  const pattern = RegExp(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/);
  const email = document.getElementById("email");

  if (!email.checkValidity()) {
    if (email.validity.valueMissing) error(email, "Ompli el camp!");
    if (email.validity.patternMismatch)
      error(
        email,
        "El correu electrònic ha de seguir el format: exemple@domini.com i pot contenir lletres, números i els caràcters . _ % + -"
      );
  } else if (pattern.test(email.value)) {
    return true;
  }

  return false;
}

// Funció de validació principal
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

// Funció per mostrar errors
function error(element, missatge) {
  const textError = document.createTextNode(missatge);
  const elementError = document.getElementById("missatgeError");
  elementError.appendChild(textError);
  element.classList.add("error");
  element.focus();
}

// Funció per esborrar errors de validació
function esborrarError() {
  let formulari = document.forms[0].elements;
  for (let ele of formulari) {
    ele.classList.remove("error");
  }
  document.getElementById("missatgeError").replaceChildren();
}

// Funció asíncrona per enviar el formulari
async function enviarFormulari() {
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const pw = document.getElementById("pw").value;
  const select = document.getElementById("rol");
  const rol = select.options[select.selectedIndex] ? select.options[select.selectedIndex].id : "0";
  const imatge = "img/face.png";

  // Obtenir un nou ID de forma asíncrona
  const newId = await getNewId(url, "users");

  const newUser = new User(newId, nom, email, pw, rol, imatge);

  const resultat = await postData(url, "users", newUser);

  // Reset del formulari després de guardar
  setTimeout(function () {
    let formulari = document.forms[0].elements;
    for (let ele of formulari) {
      ele.value = "";
    }
  }, 1000);

  location.assign("llistatUsuaris.html");
}
