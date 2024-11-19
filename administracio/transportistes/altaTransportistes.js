window.onload = iniciar;

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
function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarNom() && 
    validarID() && 
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

function enviarFormulari() {
    // Gravar al localStorage
    var carriers = JSON.parse(localStorage.getItem("Carriers")) || [];
    var nouTransportista = {
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            nif: document.getElementById("nif").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            state: document.getElementById("state").value,
            province: document.getElementById("province").value,
            city: document.getElementById("city").value
    };

    carriers.push(nouTransportista);
    localStorage.setItem("Carriers", JSON.stringify(carriers));

    // Esborrar camps
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("nif").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("state").value = "";
    document.getElementById("province").value = "";
    document.getElementById("city").value = "";

    setTimeout(function () {
        window.location.assign("llistatTransportistes.html");
    }, 100);
}