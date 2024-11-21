window.onload = iniciar;
/////
/////
/////
// Local
let url = 'http://localhost:5001/'
// Servidor
//let url = 'http://10.2.218.254:5001/'

async function postData(url,endPoint, data = {}) {
  try {
    const response = await fetch(url + endPoint, {
      method: 'POST',  // Método HTTP
      headers: {
        'Content-Type': 'application/json'  // Tipo de contenido
      },
      body: JSON.stringify(data)  // Datos JSON a enviar
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud POST');
    }

    const result = await response.json();  // Espera la conversión de la respuesta a JSON
    console.log(result);  // Trabaja con la respuesta

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

// Acces a les dades
async function getNewId(url,endPoint) {
  try {
    const response = await fetch(url + endPoint );

    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }

    const data =  await response.json();
    const maxId = data.reduce((max, ele) => 
      (ele.id > max.id ? ele: max), data[0]);
    const newId= ++ maxId.id;
    return newId + '' ;

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

////
////
////


function iniciar() {
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
  location.assign("/index.html");
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
  // Grabar al localStorage
  //let user_profile = JSON.parse(localStorage.getItem("user_profile")) || { userProfile: [] };
  //const profilesLength = user_profile.userProfile.length;
 // const lastId = profilesLength > 0 ? user_profile.userProfile[profilesLength - 1].id : 0;
  const nom = document.getElementById("nom").value;

  const newProfile = new Profile( await  getNewId("UserProfile"), nom);

  console.log(newProfile)
 
  //user_profile.userProfile.push(newProfile);
  //localStorage.setItem("user_profile", JSON.stringify(user_profile));
   const resultat = await  postData("UserProfile",newProfile);


  setTimeout(function () {
    let formulari = document.forms[0].elements;
    for (let ele of formulari) {
      ele.value = "";
    }
  }, 1000);

  location.assign("llistatUserProfile.html");
}
