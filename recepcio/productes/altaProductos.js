let ultimoId = localStorage.getItem("ultimoId") ? parseInt(localStorage.getItem("ultimoId")) : 0;

window.onload = iniciar;

function iniciar() {
    document.getElementById("btnAñadir").addEventListener("click", validar, false);
}

function validarSKU() {
    let sku = document.getElementById("sku");
    if (!/^[A-Z0-9]{8,12}$/.test(sku.value)) {
        error(sku, "El SKU debe tener entre 8 y 12 caracteres");
        return false;
    }
    return true;
}

function validarName() {
    let name = document.getElementById("name");
    if (!/^[A-Za-z\s]{2,50}$/.test(name.value)) {
        error(name, "El nombre debe tener entre 2 y 30 caracteres");
        return false;
    }
    return true;
}

function validarVol() {
    let volume = document.getElementById("volume");
    if (!/^\d+(\.\d{1,2})?$/.test(volume.value)) {
        error(volume, "Volumen no válido");
        return false;
    }
    return true;
}

function validarWeight() {
    let weight = document.getElementById("weight");
    if (!/^\d+(\.\d{1,2})?$/.test(weight.value)) {
        error(weight, "Peso no válido");
        return false;
    }
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

function error(element, mensaje) {
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