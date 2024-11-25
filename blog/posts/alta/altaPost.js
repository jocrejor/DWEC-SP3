window.onload = iniciar;

url = 'http://localhost:5002/';

function iniciar() {
  //thereIsUser();

    cargarEtiquetas();
    document.getElementById("btnGravar").addEventListener("click", validar);
    document.getElementById("btnTornaArrere").addEventListener("click", tornarArrere);
}

function validarNomPost() {
    var element = document.getElementById("titol");
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error2(element, "Deus d'introduïr un nom del post.");
    }
    if (element.validity.patternMismatch) {
      error2(element, "El nom del post ha de tindre entre 2 i 30 caracters, i començar amb majúscula");
    }
    error(element);
    return false;
  }
  return true;
}

function validarFoto() {
  var element = document.getElementById("foto");
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error2(element, "Deus d'introduïr una foto.");
    }
    if (element.validity.patternMismatch) {
      error2(element, "No es valid el format de foto.");
    }
    error(element);
    return false;
  }
  return true;
}

function validarDescripcio() {
  var element = document.getElementById("descripcio");
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error2(element, "Deus d'introduïr una descripcio.");
    }
    if (element.validity.patternMismatch) {
      error2(element, "La descripcio ha de tindre entre 2 i 200 caracters. I començar en majuscula");
    }
    error(element);
    return false;
  }
  return true;
}

function validarEtiqueta() {
  var element = document.getElementById("nom-etiqueta");
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error2(element, "Deus d'introduïr una etiqueta.");
    }
    error(element);
    return false;
  }
  return true;
}

function validar(e) {
    e.preventDefault();
    esborrarError();
    
    // Validar todos los campos
    if (validarNomPost() && validarFoto() && validarDescripcio() && validarEtiqueta()) {
      enviarFormulari();
      return true;
    } else {
      error2(document.getElementById("titol"), "El post no és vàlid.");
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
  document.getElementById("missatgeError").innerHTML = missatge;
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

async function cargarEtiquetas() {
    let etiquetas = await getData(url, "Tag");
    const selectEtiqueta = document.getElementById("nom-etiqueta");
  
    // Limpiar opciones existentes
    selectEtiqueta.innerHTML = '<option value="" disabled selected>Select an etiqueta</option>';
  
    // Añadir las etiquetas guardadas
    etiquetas.forEach(etiqueta => {
      const option = document.createElement("option");
      option.value = etiqueta.name;
      option.textContent = etiqueta.name;
      selectEtiqueta.appendChild(option);
    });
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  async function enviarFormulari() {
    const nomPost = document.getElementById("titol").value.trim();
    const foto = document.getElementById("foto").value;
    const descripcio = document.getElementById("descripcio").value;
    const etiqueta = document.getElementById("nom-etiqueta").value;
    //const currentUser = localStorage.getItem("currentUser").value;

    const post = {
        id: await getNewId(url, "Post"),
        title: nomPost,
        photo: foto,
        creation_date: formatDate(new Date()),
        //creator_id: currentUser,
        description: descripcio,
        tag: etiqueta
    };

    const resultat = await postData(url, "Post", post);

    // Limpiar los campos después de guardar
    setTimeout(function () {
        document.getElementById("titol").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("descripcio").value = "";
        document.getElementById("nom-etiqueta").value = "";
    }, 0);

    // Redirigir a llistaposts.html
    window.location.href = "../llistat/llistarPosts.html";
}

function tornarArrere() {
    window.location.href = "../llistat/llistarPosts.html";
}