//let url = 'http://node.daw.iesevalorpego.es:3001/';



window.onload = iniciar;



async function iniciar() {
    let url = 'http://node.daw.iesevalorpego.es:3001/';
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    carregarPaisos();
    document.getElementById("state").addEventListener("change", manejarState);
    state = await getData(url, "State");
    province = await getData(url, "Province");
    city = await getData(url, "City");

}

async function carregarPaisos() {
    
    const stateData = await getData(url, "State");
    //console.log("Datos de países recibidos:", stateData);
    const stateSelect = document.getElementById("state");
    stateData.forEach(state => {
        const option = document.createElement("option");
        option.value = state.id;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });
}

async function manejarState() {
    const stateId = document.getElementById("state").value;

    if (stateId) {
        // Verificar si el estado seleccionado es España
        const stateData = await getData(url, `State/${stateId}`);
        if (stateData && stateData.name !== "Spain") {
            convertirProvinciaCiudadEnInput();
        } else {
            await carregarProvincies(stateId);
        }
    } else {
        convertirProvinciaCiudadEnInput();
    }
}


async function carregarProvincies(stateId) {
    const provinceSelect = document.getElementById("Province");
    const provinceData = await getData(url, `Province?state_id=${stateId}`);

    provinceSelect.innerHTML = '<option value="">Selecciona una província</option>';
    provinceData.forEach(province => {
        const option = document.createElement("option");
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });

    provinceSelect.addEventListener("change", carregarCiutats);
    
}

function convertirProvinciaCiudadEnInput() {
    const provinceContainer = document.getElementById("province").parentNode; // Obteniendo el contenedor del select
    const cityContainer = document.getElementById("city").parentNode; // Obteniendo el contenedor del select

    provinceContainer.innerHTML = '<input type="text" class="form-control" id="province" placeholder="Introduce la provincia">';
    cityContainer.innerHTML = '<input type="text" class="form-control" id="city" placeholder="Introduce la ciudad">';
}


async function carregarCiutats() {
    const provinceId = document.getElementById("Province").value;
    const citySelect = document.getElementById("City");
    const cityData = await getData(url, `City?province_id=${provinceId}`);

    citySelect.innerHTML = '<option value="">Selecciona una ciutat</option>';
    cityData.forEach(city => {
        const option = document.createElement("option");
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
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
    let element = document.getElementById("phone");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus introduïr un número.");
        } else if (element.validity.patternMismatch) {
            error(element, "Deus introduïr un número vàlid de 9 dígits.");
        }
        return false;
    }
    return true;
}


function validarEmail() {
    let element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "El correu electrònic és obligatori.");
        } else if (element.validity.patternMismatch) {
            error(element, "El correu electrònic no és vàlid.");
        }
        return false;
    }
    return true;
}

function validarDireccio() {
    var elementNom = document.getElementById("address");
    if (!elementNom.checkValidity()) {
        if (elementNom.validity.valueMissing) {
            error(elementNom, "Deus introduïr una Direcció.");
            return false;
        } else if (elementNom.validity.patternMismatch) {
            error(elementNom, "La direcció es incorrecta");
            return false;
        }
    }
    return true; // Tot correcte
}

function validarState() {
    var elementState = document.getElementById("state");
    if (elementState.value === "") {
        error(elementState, "Deus introduïr un estat.");
        return false;
    }
    return true;
}

function validarProvince() {
    var elementProvince = document.getElementById("province");
    if (elementProvince.value === "") {
        error(elementProvince, "Deus introduïr una província.");
        return false;
    }
    return true;
}

function validarCity() {
    var elementCity = document.getElementById("city");
    if (elementCity.value === "") {
        error(elementCity, "Deus introduïr una ciutat.");
        return false;
    }
    return true;
}

function validarCP() {
    var element = document.getElementById("cp");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus introduïr un codi postal.");
            return false;
        } else if (element.validity.patternMismatch) {
            error(element, "El codi postal es incorrecte.");
            return false;
        }
    }
    return true; // Tot correcte
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarNom() && validarDireccio() && validarNIF() && validarNum() && validarEmail() &&
        validarState() && validarProvince() && validarCity() && validarCP()) {
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
    const nouTransportista = {
        id: await getNewId(url, "getTransportistaId"), // Obtener un nuevo ID
        name: document.getElementById("name").value,
        nif: document.getElementById("nif").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        state: document.getElementById("state").value,
        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        cp: document.getElementById("cp").value // Asegúrate de que este campo exista en tu HTML
    };

    try {
        const response = await postData(url, "Carriers", nouTransportista);
        
        if (!response.ok) {
            throw new Error('Error al guardar el transportista'); // Manejo de errores
        }

        alert("Transportista guardado con éxito.");
        location.href = "../llistar/llistatTransportistes.html"; // Redirigir después de guardar
    } catch (error) {
        console.error("Error al guardar el transportista:", error);
        alert("Ocurrió un error al guardar el transportista.");
    }
}

// Función para hacer la solicitud POST
async function postData(url, endpoint, data) {
    const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response; // Retorna la respuesta para que pueda ser manejada
}



function limpiarFormulari() {
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