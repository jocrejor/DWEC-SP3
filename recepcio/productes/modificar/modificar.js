window.onload = main;

function main() {
    document.getElementById("btnModificar").addEventListener("click", validar, false);

    cargarOpcionesLotorserial();
    comprobacionProductoLocalStorage();
}

function cargarOpcionesLotorserial() {
    const opciones = [
        { value: "Empty", text: "" },
        { value: "Non", text: "Non" },
        { value: "Lote", text: "Lot" },
        { value: "Serial", text: "Serial" }
    ];

    const selectLotorserial = document.getElementById("lotorserial");

    opciones.forEach(opcion => {
        const optionElement = document.createElement("option");
        optionElement.value = opcion.value;
        optionElement.textContent = opcion.text;
        selectLotorserial.appendChild(optionElement);
    });
}

function comprobacionProductoLocalStorage() {
    let producto = JSON.parse(localStorage.getItem("producteModificat"));

    if (producto) {
        document.getElementById("name").value = producto.name;
        document.getElementById("description").value = producto.description;
        document.getElementById("volume").value = producto.volume;
        document.getElementById("weight").value = producto.weight;
        document.getElementById("lotorserial").value = producto.lotorserial;
        document.getElementById("sku").value = producto.sku;
        document.getElementById("image_url").value = producto.image_url;
    } else {
        console.error("Producto no encontrado en localStorage.");
        alert("Producto no encontrado. Redirigiendo a la lista de productos.");
        window.location.assign("../productes.html");
    }
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

function validarImage_url() {
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

    if (validarName() && validarVol() && validarWeight() && validarLote() && validarSKU()) {

        // Modifiquem el objecte
        let producto = JSON.parse(localStorage.getItem("producteModificat")); 

        // Si existeix el producte, actualitzem les seues dades amb els valors del formulari
        if (producto) {
            producto.name           = document.getElementById("name").value;
            producto.description    = document.getElementById("description").value;
            producto.volume         = document.getElementById("volume").value;
            producto.weight         = document.getElementById("weight").value;
            producto.lotorserial    = document.getElementById("lotorserial").value;
            producto.sku            = document.getElementById("sku").value;
            producto.image_url      = document.getElementById("image_url").value;

            try {
                // Enviem el producte actualitzat al servidor utilitzant updateId
                await updateId(url, 'Product', producto.id, producto);

                // Netegem els camps
                setTimeout(function () {
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
                console.error('Error al actualizar el producto:', error);
            }
        }
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