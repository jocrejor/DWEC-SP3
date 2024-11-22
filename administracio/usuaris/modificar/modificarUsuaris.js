window.onload = main;

function main() {
  document.getElementById("home").addEventListener("click", home);
  document
    .getElementById("btnGravar")
    .addEventListener("click", validar, false);

  listTipus();

  // recuperar les dades del localStorage
  const modUser = JSON.parse(localStorage.getItem("modUser"));

  document.getElementById("nom").setAttribute("value", modUser.name);
  document.getElementById("email").setAttribute("value", modUser.email);
  document.getElementById("pw").setAttribute("value", modUser.password);
}

function home() {
  location.assign("../index.html");
}

function listTipus() {
  const user_profile = JSON.parse(
    localStorage.getItem("user_profile") || { userProfile: [] }
  );
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

function validar(e) {
  esborrarError();
  e.preventDefault();
  if (
    validarNom() &&
    validarEmail() &&
    validarPw()
    // validarImatge()
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
function enviarFormulari() {
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const modUser = JSON.parse(localStorage.getItem("modUser")) || {};
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pw").value;
  const select = document.getElementById("rol");
  const rol = select.options[select.selectedIndex] ? select.options[select.selectedIndex].id : "0";

  modUser.name = nom;
  modUser.email = email;
  modUser.password = password;
  modUser.user_profile_id = rol;

  const index = data.users.findIndex((u) => u.id === modUser.id);
  data.users[index] = modUser;

  localStorage.setItem("data", JSON.stringify(data));
  // esborrar el localStorage
  localStorage.removeItem("modUser");

  // tornar al llistat
  window.location.assign("llistatUsuaris.html");
}
