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
    this.rol = rol;
    this.image = imatge;
  }
}

function home() {
  location.assign("../llistat/llistatUsuaris.html");
}

// Funció per llistar els tipus d'usuaris des del servidor
async function listTipus() {
  try {
    // Carregar els rols des del servidor
    const userProfileData = await getData(url, "UserProfile");

    const select = document.getElementById("rol");
    select.innerHTML = "";

    // Opció per defecte
    const defaultOption = document.createElement("option");
    defaultOption.text = "Seleccioneu un rol";
    defaultOption.value = "0";
    select.appendChild(defaultOption);

    userProfileData.forEach((tipus) => {
      if (tipus.id != 1) {
        let newOption = document.createElement("option");
        newOption.value = `${tipus.id}`;
        newOption.textContent = `${tipus.name}`;
        select.appendChild(newOption);
      }
    });
  } catch (error) {
    console.error('Error al carregar els rols:', error);
  }
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

  location.assign("../llistat/llistatUsuaris.html");
}
