window.onload = iniciar;

async function postData(endPoint, data = {}) {
    try {
      const response = await fetch('http://localhost:5002/'+ endPoint, {
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
  async function getNewId(endPoint) {
    try {
      const response = await fetch('http://localhost:5002/'+ endPoint );  // Reemplaza 'data.json' con la ruta de tu archivo
  
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

  

function iniciar() {
    document.getElementById("signup").addEventListener("click", validar);
    document.getElementById("tornar-arrere").addEventListener("click", tornarArrere);
}


function validarName() {
    var element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir un nom");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom ha de tindre entre 2 i 15 caràcters");
        }
        error(element);
        return false;
    }
    return true;
}

function validarEmail() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir un email");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El cognom ha de tindre el format xxx@xxx.com");
        }
        error(element);
        return false;
    }
    return true;
}

function validarPassword() {
    var element = document.getElementById("password");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduir una contrassenya");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contrassenya ha de tindre entre 8 i 20 caràcters");
        }
        error(element);
        return false;
    }
    return true;
}

function validarRepeatPassword() {
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;

    if (repeatPassword !== password) {
        error2(repeatPassword, "Les contrassenyes no coincideixen");
        return false;
    }
    return true;
}

function validar(e) {
    
    borrarError();

    if (validarName() && validarEmail() && validarPassword() && validarRepeatPassword() && confirm("Confirma si vols enviar el formulari")) {
        enviarFormulari();
        console.log("hola");
      //  window.location.href = '../access/login.html';
        return true;
    } else {
        console.log("Adios");
        e.preventDefault();
        return false;
    }
}

function error(element) {
    document.getElementById("missatgeError").innerHTML = element.validationMessage;
    element.classList.add("error");
    element.focus();
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function borrarError() {
    var formulari = document.forms[0].elements;
    for (var i=0; i < formulari.length; i++) {
        formulari[i].classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function enviarFormulari() {
    var name        = document.getElementById("name").value;
    var email       = document.getElementById("email").value;
    var password    = document.getElementById("password").value;

    var user = {
        id: 0,
        name,
        email,
        password,
        role: "Publicador"
    };


    var storedUsers = localStorage.getItem("users");
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    /*let users = JSON.parse(localStorage.getItem("users")) || [];*/

    console.log(storedUsers);
    console.log(users);
    // Asignar rol de "Administrador" si es el primer usuario
    if (users.length === 0) {
        user.role = "Administrador";
    }

    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = [];
    }
    
    if (users.length > 0) {
        var maxId = 0;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id > maxId) {
                maxId = users[i].id;
            }
        }
        user.id = maxId + 1;
    } else {
        user.id = 1;
    }

    users.push(user);
    console.log(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function tornarArrere() {
    window.location.href = "../access/login.html";
}