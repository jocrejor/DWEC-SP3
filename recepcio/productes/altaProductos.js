let ultimoId = localStorage.getItem("ultimoId") ? parseInt(localStorage.getItem("ultimoId")) : 0;

window.onload = iniciar;

function iniciar() {
    document.getElementById("btnAñadir").addEventListener("click", validar, false);
}

function validarSKU() {
    let sku = document.getElementById("sku");
    if (!sku.checkValidity()) {
        if (sku.validity.valueMissing) {
            error2(sku, "Ha d'introduir el nom del SKU.");
        }
        else if (sku.validity.patternMismatch) {
            error2(sku, "El SKU té que ser en majúscules i tindre entre 6 i 12 caràcters");
        }
        sku.classList.add("error");
        return false;
    }
    sku.classList.remove("error");
    sku.classList.add("valid");
    return true;
}

function validarName() {
    let name = document.getElementById("name");
    if (!name.checkValidity()) {
        if (name.validity.valueMissing) {
            error2(name, "Ha d'introduir el nom del SKU.");
        }
        else if (name.validity.patternMismatch) {
            error2(name, "El SKU té que ser en majúscules i tindre entre 6 i 12 caràcters");
        }
        name.classList.add("error");
        return false;
    }
    name.classList.remove("error");
    name.classList.add("valid");
    return true;
}

function validarVol() {
    let volume = document.getElementById("volume");
    if (!volume.checkValidity()) {
        if (volume.validity.valueMissing) {
            error2(volume, "Ha d'introduir el nom del SKU.");
        }
        else if (volume.validity.patternMismatch) {
            error2(volume, "El SKU té que ser en majúscules i tindre entre 6 i 12 caràcters");
        }
        volume.classList.add("error");
        return false;
    }
    volume.classList.remove("error");
    volume.classList.add("valid");
    return true;
}

function validarWeight() {
    let weight = document.getElementById("weight");
    if (!weight.checkValidity()) {
        if (weight.validity.valueMissing) {
            error2(weight, "Ha d'introduir el nom del SKU.");
        }
        else if (weight.validity.patternMismatch) {
            error2(weight, "El SKU té que ser en majúscules i tindre entre 6 i 12 caràcters");
        }
        weight.classList.add("error");
        return false;
    }
    weight.classList.remove("error");
    weight.classList.add("valid");
    return true;
}



function validarImage() {
    let image_url = document.getElementById("image_url");
    if (!/^(http(s)?:\/\/)?(www\.)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(\?[\w\-~&=]*)?(#[\w\-~]*)?$/.test(image_url.value)) {
        error(image_url, "La URL no es correcta");
        return false;
    }
    return true;
}

function validar(e) {
    borrarError();
    e.preventDefault();

    if (validarSKU() && validarName() && validarVol() && validarWeight() && validarImage) {
        enviarFormulario();
        return true;
    } else {
        return false;
    }
}

function error2(element, mensaje) {
    const textError = document.createTextNode(mensaje);
    const elementError = document.getElementById("mensajeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function borrarError() {
    let formulario = document.forms[0].elements;
    for (let ele of formulario) {
        ele.classList.remove("error");
    }
    document.getElementById("mensajeError").replaceChildren();
}

function enviarFormulario() {
    
    ultimoId++;
    localStorage.setItem("ultimoId", ultimoId);

    let product = {
        id: ultimoId,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        volume: document.getElementById("volume").value,
        weight: document.getElementById("weight").value,
        lotorserial: document.getElementById("lotorserial").value,
        sku: document.getElementById("sku").value,
        image_url: document.getElementById("image_url").value
    };

    let arrProductos = JSON.parse(localStorage.getItem("products")) || [];
    arrProductos.push(product);
    localStorage.setItem("products", JSON.stringify(arrProductos));
    
    setTimeout(function (){
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("volume").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("lotorserial").value = "";
        document.getElementById("sku").value = "";
        document.getElementById("image_url").value = "";
    }, 1000);

    
    window.location.assign("listaProductos.html");
}