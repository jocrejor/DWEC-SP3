let url = 'http://node.daw.iesevalorpego.es:3001/';

let state = [];
let province= [];
let city= [];

window.onload = iniciar;



async function iniciar() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    carregarPaisos();
    document.getElementById("state").addEventListener("change", manejarState);
    state = await getData(url, "state");
    province = await getData(url, "province");
    city = await getData(url, "city");

}

async function carregarPaisos() {
    const stateData = await getData(url, "state");
    console.log("Datos de países recibidos:", stateData);
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

    if (stateId === "194"){
        carregarProvincies(stateId);
    }else{
        convertirProvinciaCiudadEnInput();
    }
    
}

async function carregarProvincies(stateId) {
    const provinceSelect = document.getElementById("province").parentElement;
    const provinceData = await getData(url, `provinces?state_id=${stateId}`);

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
    const provinceContainer = document.getElementById("provinceContainer");
    const cityContainer = document.getElementById("cityContainer");

    provinceContainer.innerHTML = '<input type="text" id="province" name="province" placeholder="Introduce la provincia">';
    cityContainer.innerHTML = '<input type="text" id="city" name="city" placeholder="Introduce la ciudad">';
}

async function carregarCiutats() {
    const provinceId = document.getElementById("province").value;
    const citySelect = document.getElementById("city");
    const cityData = await getData(url, `cities?province_id=${provinceId}`);

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
    const nouId = await getNewId(url, "getTransportistaId");
    const nouTransportista = {
        id: nouId,
        name: document.getElementById("name").value,
        nif: document.getElementById("nif").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        state: document.getElementById("state").value,
        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        cp: document.getElementById("cp").value
    };

    try {
        await postData(url, "saveTransportista", nouTransportista);
        alert("Transportista guardado con éxito.");
        location.href = "../llistar/llistatTransportistes.html";
    } catch (error) {
        console.error("Error al guardar el transportista:", error);
        alert("Ocurrió un error al guardar el transportista.");
    }
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