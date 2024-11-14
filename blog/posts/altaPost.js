window.onload = iniciar;

function iniciar() {
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

function cargarEtiquetas() {
    let etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];
    const selectEtiqueta = document.getElementById("nom-etiqueta");
  
    // Limpiar opciones existentes
    selectEtiqueta.innerHTML = '<option value="" disabled selected>Select an etiqueta</option>';
  
    // Añadir las etiquetas guardadas
    etiquetas.forEach(etiqueta => {
      const option = document.createElement("option");
      option.value = etiqueta.nom;
      option.textContent = etiqueta.nom;
      selectEtiqueta.appendChild(option);
    });
  }
  
  function enviarFormulari() {
    const nomPost = document.getElementById("titol").value.trim();
    const foto = document.getElementById("foto").value;
    const descripcio = document.getElementById("descripcio").value;
    const etiqueta = document.getElementById("nom-etiqueta").value;

    let posts = JSON.parse(localStorage.getItem("Posts")) || [];
    let IdsPostsEliminados = JSON.parse(localStorage.getItem("IdsPostsEliminados")) || [];

    // Verificar si el nombre del post ya existe (ignorando mayúsculas y espacios)
    if (posts.some(post => post.titol.toLowerCase() === nomPost.toLowerCase())) {
        error2(document.getElementById("titol"), "Aquest nom del post ja existeix.");
        return;
    }

    // Obtener el siguiente ID disponible
    let idNuevo = 1;
    while (posts.some(post => post.id === idNuevo) || IdsPostsEliminados.includes(idNuevo)) {
        idNuevo++;
    }

    const post = {
        id: idNuevo,
        titol: nomPost,
        foto: foto,
        descripcio: descripcio,
        etiqueta: etiqueta
    };

    posts.push(post);
    localStorage.setItem("Posts", JSON.stringify(posts));

    // Limpiar los campos después de guardar
    setTimeout(function () {
        document.getElementById("titol").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("descripcio").value = "";
        document.getElementById("nom-etiqueta").value = "";
    }, 0);

    // Redirigir a llistaposts.html
    window.location.href = "llistatPost.html";
}

function tornarArrere() {
    window.location.href = "llistatPost.html";
}