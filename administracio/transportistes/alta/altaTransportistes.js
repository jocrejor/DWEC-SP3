

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
    const response = await fetch(url + endPoint );  // Reemplaza 'data.json' con la ruta de tu archivo

    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }

    const data =  await response.json();
    const maxId = data.reduce((max, ele) => 
      (ele.id > max.id ? ele: max), {});
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
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    carregarPaisos();
}

function carregarPaisos() {
    const stateData = JSON.parse(localStorage.getItem("State")) || [];
    const stateSelect = document.getElementById("state");
    stateData.forEach(state => {
        const option = document.createElement("option");
        option.value = state.id;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });
}

function carregarProvincies() {
    const stateId = document.getElementById("state").value;
    const provinceSelect = document.getElementById("province");
    provinceSelect.innerHTML = '<option value="">Selecciona una província</option>';

    const provinceData = JSON.parse(localStorage.getItem("Province")) || [];
    provinceData.forEach(province => {
        if (province.state_id === stateId) {
            const option = document.createElement("option");
            option.value = province.id;
            option.textContent = province.name;
            provinceSelect.appendChild(option);
        }
    });
    carregarCiutats();
}

function carregarCiutats() {
    const provinceId = document.getElementById("province").value;
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = '<option value="">Selecciona una ciutat</option>';

    const cityData = JSON.parse(localStorage.getItem("City")) || [];
    cityData.forEach(city => {
        if (city.province_id === provinceId) {
            const option = document.createElement("option");
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        }
    });
}

function validarNom() {
    var elementNom = document.getElementById("name");
    if (!elementNom.checkValidity()) {
        if (elementNom.validity.valueMissing) {
            error(elementNom, "Deus introduïr un nom.");
            return false;
        } else if (elementNom.validity.patternMismatch) {
            error(elementNom, "Deus introduïr un nom entre 2 i 30 caracters, només lletres.");
            return false;
        }
    }
    return true; // Tot correcte
}



function validarNIF() {
    let element = document.getElementById("nif");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "El NIF és obligatori.");
        } else if (element.validity.patternMismatch) {
            error(element, "El NIF deu tindre 8 dígits seguits d'una lletra vàlida.");
        }
        return false;
    }

    let valor = element.value;
    let lletres = ['T', 'R', 'W ', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    if (valor.charAt(8) !== lletres[parseInt(valor.substring(0, 8)) % 23]) {
        error(element, "La lletra del NIF no coincideix amb els dígits.");
        return false;
    }

    return true;
}

function validarNum() {
    var elementNum = document.getElementById("phone");
    var numPattern = /^\d{9}$/;

    if (!elementNum.checkValidity()) {
        if (elementNum.validity.valueMissing) {
            error(elementNum, "Deus introduïr un número.");
            return false;
        } else if (!numPattern.test(elementNum.value)) {
            error(elementNum, "Deus introduïr un número vàlid.");
            return false;
        }
    }
    return true; // Tot correcte
}

function validarEmail() {
    var elementEmail = document.getElementById("email");
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!elementEmail.checkValidity()) {
        if (elementEmail.validity.valueMissing) {
            error(elementEmail, "Deus introduïr un correu electrònic.");
            return false;
        } else if (!emailPattern.test(elementEmail.value)) {
            error(elementEmail, "Deus introduïr un correu electrònic vàlid.");
            return false;
        }
    }
    return true;
}

function validarDireccio() {
    var elementaddress = document.getElementById("address");
    var addressPattern = /^(?=\S*\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d)[a-zA-Z\d\s',.#/-]*$/;

    if (!elementaddress.checkValidity()) {
        if (elementaddress.validity.valueMissing) {
            error(elementaddress, "Deus introduïr una direcció.");
            return false;
        } else if (!addressPattern.test(elementaddress.value)) {
            error(elementaddress, "Deus introduïr una direcció.");
            return false;
        }
    }
    return true;
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarNom() && 
    validarDireccio() &&
    validarNIF() && 
    validarNum()&& 
    validarEmail()) {
        enviarFormulari();
        return true;
    } else {
        return false;
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add( "error" )
    element.focus();
}

function esborrarError() {
    let formulari = document.forms[0].elements;
        for (let ele of formulari) {
            ele.classList.remove("error")
        }    
    document.getElementById("missatgeError").replaceChildren(); 
}



async function enviarFormulari() {
    const nouId = await getNewId(url, "getTransportistaId");

    const nouTransportista = {
            id: nouId,
            name: document.getElementById("name").value,
            nif: document.getElementById("nif").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            state: document.getElementById("state").value,
            province: document.getElementById("province").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value
    };

    await postData(url, "saveTransportista", nouTransportista);

    const carriers = JSON.parse(localStorage.getItem("Carriers")) || [];
    carriers.push(nouTransportista);
    localStorage.setItem("Carriers", JSON.stringify(carriers));

    limpiarFormulari();

    setTimeout(() => {
        window.location.assign("../llistar/llistatTransportistes.html");
    }, 100);
    console.log("Transportista gravat correctament:", nouTransportista);

}

function limpiarFormulari() {
    // Esborrar camps
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("nif").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("state").value = "";
    document.getElementById("province").value = "";
    document.getElementById("city").value = "";
    document.getElementById("address").value = "";
}