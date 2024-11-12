window.onload = iniciar;

function iniciar() {
  document.getElementById("home").addEventListener("click", home);
  document.getElementById("btnGravar").addEventListener("click", validar);
  listTipus();
}

function home() {
  location.assign("../index.html");
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

function validarRepEmail() {
  const email = document.getElementById("email");
  const repEmail = document.getElementById("repEmail");

  if (!repEmail.value == email.value) {
    if (repEmail.validity.valueMissing) error(repEmail, "Ompli el camp!");
    else error(repEmail, "El correo no és lo mateix que el primer");
  } else {
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

function validarRepPw() {
  const pw = document.getElementById("pw");
  const repPw = document.getElementById("repPw");

  if (!repPw.value == pw.value) {
    if (repPw.validity.valueMissing) error(repPw, "Ompli el camp!");
    else error(repPw, "El correo no és lo mateix que el primer");
  } else {
    return true;
  }

  return false;
}

function validarRol() {
  const rol = document.getElementById("rol");

  if (!rol.checkValidity()) {
    if (rol.validity.valueMissing) error(rol, "Tria un' opció!");

    return false;
  }

  return true;
}

// function validarImatge() {
//   const imatgeInput = document.getElementById("imatge");
//   const imatge = imatgeInput.files[0];
//   const validTypes = ["image/jpeg", "image/png"];

//   if (!imatge) {
//     error(imatgeInput, "Per favor, tria un'imatge");
//     return false;
//   }

//   if (!validTypes.includes(imatge.type)) {
//     error(imatgeInput, "Per favor, tria un'imatge amb un format  .jpeg o .png");
//     return false;
//   }

//   return true;
// }

function validar(e) {
  esborrarError();
  e.preventDefault();
  if (
    validarNom() &&
    validarEmail() &&
    validarRepEmail() &&
    validarPw() &&
    validarRepPw() &&
    validarRol()
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
  // Grabar al localStorage
  let data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const usersLength = data.users.length;
  const lastId = usersLength > 0 ? data.users[usersLength - 1].id : 0;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const pw = document.getElementById("pw").value;
  const select = document.getElementById("rol");
  const rol = select.options[select.selectedIndex].id;
  const imatge = "img/face.png";

  const newUser = new User(lastId + 1, nom, email, pw, rol, imatge);

  data.users.push(newUser);

  localStorage.setItem("data", JSON.stringify(data));

  setTimeout(function () {
    let formulari = document.forms[0].elements;
    for (let ele of formulari) {
      ele.value = "";
    }
  }, 1000);

  location.assign("llistatUsuaris.html");
}
