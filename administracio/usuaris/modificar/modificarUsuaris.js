window.onload = main;

function main() {
  thereIsUser(); // Verifica si hi ha un usuari actiu
  document.getElementById("home").addEventListener("click", home);
  document.getElementById("btnGravar").addEventListener("click", validar, false);

  // Recuperar les dades de l'usuari des del localStorage
  const modUser = JSON.parse(localStorage.getItem("modUser"));

  // Omplir el formulari amb les dades recuperades
  document.getElementById("nom").setAttribute("value", modUser.name);
  document.getElementById("email").setAttribute("value", modUser.email);
  document.getElementById("pw").setAttribute("value", modUser.password);

  // Carregar els rols i seleccionar el rol actual
  carregarRols();
}


function home() {
  history.back();
}

// Validació del nom
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

async function carregarRols() {
  try {
    // Obtenir els rols des del servidor utilitzant getData
    const roles = await getData(url, "UserProfile");

    if (!roles || !Array.isArray(roles)) {
      throw new Error("Error en obtenir els rols de la base de dades");
    }

    // Recuperar l'usuari a modificar des del localStorage
    const modUser = JSON.parse(localStorage.getItem("modUser"));

    const select = document.getElementById("role");
    select.innerHTML = ""; // Netejar el select abans d'afegir noves opcions

    // Afegir opcions al select i marcar el rol actual com a seleccionat
    roles.forEach((rol) => {
      const newOption = document.createElement("option");
      newOption.setAttribute("id", rol.id);
      newOption.textContent = rol.name;

      // Marcar el rol actual com a seleccionat
      if (modUser.user_profile_id === rol.id) {
        newOption.selected = true;
      }

      select.appendChild(newOption);
    });
  } catch (error) {
    console.error("Error en carregar els rols:", error);
  }
}


// Funció de validació principal
function validar(e) {
  esborrarError();
  e.preventDefault();
  if (
    validarNom() &&
    validarEmail() &&
    validarPw()
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

// Validació de la contrasenya
function validarPw() {
  const pattern = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  );
  const pw = document.getElementById("pw");

  if (!pw.checkValidity()) {
    if (pw.validity.valueMissing) error(pw, "Ompli el camp!");
    if (pw.validity.patternMismatch)
      error(
        pw,
        "La contrasenya ha de tenir entre 8 i 20 caràcters, incloent una lletra minúscula, una lletra majúscula, un dígit i un caràcter especial (!@#$%^&*)."
      );
  } else if (pattern.test(pw.value)) {
    return true;
  }

  return false;
}

// Enviar dades
async function enviarFormulari() {
  const modUser = JSON.parse(localStorage.getItem("modUser"));

  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pw").value;
  const select = document.getElementById("role");
  const role = select.options[select.selectedIndex] ? select.options[select.selectedIndex].id : "0";

  // Actualitzar el perfil de l'usuari amb les noves dades
  modUser.name = nom;
  modUser.email = email;
  modUser.password = password;
  modUser.user_profile_id = role;

  await updateId(url, "users", modUser.id, modUser);

  // Actualitzar les dades al localStorage
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const index = data.users.findIndex((u) => u.id === modUser.id);
  if (index !== -1) {
    data.users[index] = modUser;
    localStorage.setItem("data", JSON.stringify(data));
  }

  // Eliminar les dades temporals del localStorage
  localStorage.removeItem("modUser");

  // Redirigir al llistat d'usuaris
  window.location.assign("../llistat/llistatUsuaris.html");
}
