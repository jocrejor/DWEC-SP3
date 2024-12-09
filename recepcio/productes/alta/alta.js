window.onload = iniciar;

function iniciar() {
    document.getElementById("btnAfegir").addEventListener("click", validar, false);
    cargarOpcionesLotorserial();
}

function cargarOpcionesLotorserial() {
    const opciones = [
        { value: "Empty",   text: "" },
        { value: "Non",     text: "Non" },
        { value: "Lote",    text: "Lot" },
        { value: "Serial",  text: "Serial" }
    ];

    const selectLotorserial = document.getElementById("lotorserial");

    opciones.forEach(opcion => {
        const optionElement = document.createElement("option");
        optionElement.value = opcion.value;
        optionElement.textContent = opcion.text;
        selectLotorserial.appendChild(optionElement);
    });
}

function validarSKU() {
    let sku = document.getElementById("sku");
    if (!sku.checkValidity()) {
        if (sku.validity.valueMissing) {
            error2(sku, "Ha d'introduir el SKU.");
        }
        else if (sku.validity.patternMismatch) {
            error2(sku, "El SKU té que ser en majúscules i tindre entre 6 i 12 caràcters");         
        }
        sku.classList.remove("valid");
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
            error2(name, "Ha d'introduir el nom.");
        }
        else if (name.validity.patternMismatch) {
            error2(name, "El nom ha de tindre entre 2 i 50 caràcters");
        }
        name.classList.add("error");
        name.classList.remove("valid");
        return false;
    }
    name.classList.remove("error");
    name.classList.add("valid");
    return true;
}

function validarVol() {
    let vol = document.getElementById("volume");
    let value = vol.value;

    // Verificar si el campo está vacío
    if (vol.validity.valueMissing) {
        error2(vol, "Ha d'introduir un volumen.");
        return false;
    }

    // Verificar si el valor tiene más de 2 decimales
    if (value.split('.')[1] && value.split('.')[1].length > 2) {
        error2(vol, "El volumen ha de tindre 2 decimals com a màxim");
        vol.classList.remove("valid");
        vol.classList.add("error");
        return false;
    }

    // Si todo es válido
    vol.classList.remove("error");
    vol.classList.add("valid");
    return true;
}

function validarWeight() {
    let weight = document.getElementById("weight");
    let value = weight.value;

    // Verificar si el campo está vacío
    if (weight.validity.valueMissing) {
        error2(weight, "Ha d'introduir un pes.");
        weight.classList.remove("valid");
        weight.classList.add("error");
        return false;
    }

    // Verificar si el valor tiene más de 2 decimales
    if (value.split('.')[1] && value.split('.')[1].length > 2) {
        error2(weight, "El pes ha de tindre 2 decimals com a màxim");
        weight.classList.remove("valid");
        weight.classList.add("error");
        return false;
    }

    // Si todo es válido
    weight.classList.remove("error");
    weight.classList.add("valid");
    return true;
}

function validarLote() {
    let lote = document.getElementById("lotorserial");

    if (lote.value == "Empty") {
        error2(lote, "Tens que elegir un lot");
        lote.classList.remove("valid");
        lote.classList.add("error");
        return false;
    }

    lote.classList.remove("error");
    lote.classList.add("valid");
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

async function validar(e) {
    borrarError();
    e.preventDefault();

    // Verificar si todos los campos son válidos
    if (validarSKU() && validarName() && validarVol() && validarWeight() && validarLote()) {
        // Crear el objeto producto
        let product = {
            name:           document.getElementById("name").value,
            description:    document.getElementById("description").value,
            volume:         document.getElementById("volume").value,
            weight:         document.getElementById("weight").value,
            lotorserial:    document.getElementById("lotorserial").value,
            sku:            document.getElementById("sku").value,
            image_url:      document.getElementById("image_url").value
        };

        // Obtindre el nou ID per al producto
        try {
            // Utilitzem postData per enviar el producte al server
            await postData(url, 'Product', product);

            // Netegem els camps
            setTimeout(function (){
                document.getElementById("name").value = "";
                document.getElementById("description").value = "";
                document.getElementById("volume").value = "";
                document.getElementById("weight").value = "";
                document.getElementById("lotorserial").value = "";
                document.getElementById("sku").value = "";
                document.getElementById("image_url").value = "";
            }, 1000);

            // Redirigir a la página de llistat de productes
            window.location.href = '../llistar/llistar.html';
        } catch (error) {
            console.error('Error al obtener el nuevo ID:', error);
        }
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