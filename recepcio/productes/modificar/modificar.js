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
        window.location.assign("listaProductos.html");
    }
}

function validarName() {
    let name = document.getElementById("name");
    if (!/^[A-Za-z\s]{2,50}$/.test(name.value)) {
        error(name, "El nombre debe tener entre 2 y 50 caracteres");
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

function validarLote() {
    let lote = document.getElementById("lotorserial");

    if (lote.value == "Empty") {
        error(lote, "Tienes que elegir un lote");
        return false;
    }

    return true;
}

function validarSKU() {
    let sku = document.getElementById("sku");
    if (!/^[A-Z0-9]{8,12}$/.test(sku.value)) {
        error(sku, "El SKU debe tener entre 8 y 12 caracteres");
        return false;
    }
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
            producto.name = document.getElementById("name").value;
            producto.description = document.getElementById("description").value;
            producto.volume = document.getElementById("volume").value;
            producto.weight = document.getElementById("weight").value;
            producto.lotorserial = document.getElementById("lotorserial").value;
            producto.sku = document.getElementById("sku").value;
            producto.image_url = document.getElementById("image_url").value;

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