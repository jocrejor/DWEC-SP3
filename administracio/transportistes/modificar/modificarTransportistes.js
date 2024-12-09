window.onload = main;


function main() {
    const btnGravar = document.getElementById("btnGravar");
    if (btnGravar) {
        btnGravar.addEventListener("click", validar, false);
    } else {
        console.error("El botó 'btnGravar' no s'ha trobat.");
        return;
    }

    window.state = JSON.parse(localStorage.getItem("State")) || [];
    window.province = JSON.parse(localStorage.getItem("Province")) || [];
    window.city = JSON.parse(localStorage.getItem("City")) || [];

    carregarPaisos();

    var carrier = JSON.parse(localStorage.getItem("modTransportista"));
    if (carrier) {
        document.getElementById("name").value = carrier.name || '';
        document.getElementById("id").value = carrier.id || '';
        document.getElementById("nif").value = carrier.nif || '';
        document.getElementById("phone").value = carrier.phone || '';
        document.getElementById("email").value = carrier.email || '';

        document.getElementById("state").value = carrier.state || '';
        carregarProvincies(carrier.state);
        document.getElementById("province").value = carrier.province || '';
        carregarCiutats(carrier.province);
        document.getElementById("city").value = carrier.city || '';
        carregarCiutats(carrier.city);
        document.getElementById("address").value = carrier.address || '';
        document.getElementById("cp").value = carrier.cp || '';
    } else {
        window.location.assign("../llistar/llistatTransportistes.html");
    }
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
    const provinceContainer = document.getElementById("province").parentElement;
    const cityContainer = document.getElementById("city").parentElement;

    if (stateId === "194") {
        provinceContainer.innerHTML = `
            <select id="province" class="form-control" onchange="carregarCiutats()" required>
                <option value="">Selecciona una província</option>
            </select>`;
        cityContainer.innerHTML = `
            <select id="city" class="form-control" required>
                <option value="">Selecciona una ciutat</option>
            </select>`;

        const provinceSelect = document.getElementById("province");
        const provinceData = JSON.parse(localStorage.getItem("Province")) || [];
        provinceData.forEach(province => {
            if (province.state_id === stateId){
                const option = document.createElement("option");
                option.value = province.id;
                option.textContent = province.name;
                provinceSelect.appendChild(option);

            }
        });
        carregarCiutats();
    }else {
        provinceContainer.innerHTML = `
            <input type="text" id="province" class="form-control" placeholder="Escriu la província" required>`;
        cityContainer.innerHTML = `
            <input type="text" id="city" class="form-control" placeholder="Escriu la ciutat" required>`;
    }
    
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

function validarID() {
    var elementID = document.getElementById("id");
    var idPattern = /^\d{4}$/;
    if (!elementID.checkValidity()) {
        if (elementID.validity.valueMissing) {
            error(elementID, "Deus introduïr un ID.");
            return false;
        } else if (!idPattern.test(elementID.value)) {
            error(elementID, "Deus introduïr un ID vàlid de 4 caràcters numèrics.");
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
    let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    if (valor.charAt(8) !== letras[parseInt(valor.substring(0, 8)) % 23]) {
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

async function validar(e) {
    esborrarError();
    e.preventDefault();
    let errors = [];

    if (!validarNom()) errors.push("Nom incorrecte.");
    if (!validarID()) errors.push("ID incorrecte.");
    if (!validarNIF()) errors.push("NIF incorrecte.");
    if (!validarNum()) errors.push("Número de telèfon incorrecte.");
    if (!validarEmail()) errors.push("Email incorrecte.");
    if (!validarState()) errors.push("Estat no seleccionat.");
    if (!validarProvince()) errors.push("Província no seleccionada.");
    if (!validarCity()) errors.push("Ciutat no seleccionada.");
    if (!validarDireccio()) errors.push("Direcció incorrecta.");

    if (errors.length > 0) {
        error(document.getElementById("missatgeError"), errors.join(" "));
        return false;
    } else {
        await enviarFormulari();
        return true;
    }
}

function error(element, missatge) {
    const elementError = document.getElementById("missatgeError");
    elementError.textContent = missatge;
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

async function enviarFormulari() {
    const carrierData = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        nif: document.getElementById("nif").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        state: document.getElementById("state").value,
        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        cp: document.getElementById("cp").value
    };

    try {
        const response = await fetch('http://node.daw.iesevalorpego.es:3001/Carriers/' + carrierData.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrierData)
        });

        if (!response.ok) {
            throw new Error('Error al modificar el transportista.');
        }

        const result = await response.json();
        console.log('Transportista modificado:', result);
        window.location.assign("../llistar/llistatTransportistes.html"); // Redirigir después de éxito
    } catch (error) {
        console.error('Error al modificar el transportista:', error);
        error(document.getElementById("missatgeError"), "Error al modificar el transportista. Intenta de nou.");
    }
}