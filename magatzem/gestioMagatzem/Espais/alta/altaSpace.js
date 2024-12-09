window.onload = iniciar;

function iniciar() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar() {
    window.location.assign("../llista/llistatSpace.html");
}

function validar(e) {
    e.preventDefault();

    if (validarID() && validarNom() && validarProducte() && validarQuantitat() && validarVolum() && validarPes() && validarMagatzem() && validarCarrer() && validarEstanteria()) {
        enviarFormulari();
    }
}

function validarID() {
    const id = document.getElementById("id");
    if (id.value.trim() === "" || isNaN(id.value) || id.value < 1 || id.value > 99) {
        error(id, "L'ID ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;
}

function validarNom() {
    const nom = document.getElementById("name");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "El nom ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validarProducte() {
    const producte = document.getElementById("product_id");
    if (producte.value.trim() === "" || isNaN(producte.value) || producte.value < 1 || producte.value > 1000) {
        error(producte, "La id producte no és correcte.");
        return false;
    }
    return true;
}

function validarQuantitat() {
    const quantitat = document.getElementById("quantity");
    if (quantitat.value.trim() === "" || isNaN(quantitat.value) || quantitat.value < 1 || quantitat.value > 1000) {
        error(quantitat, "La quantitat no és correcte.");
        return false;
    }
    return true;
}

function validarVolum() {
    const volum = document.getElementById("maxVol");
    if (volum.value.trim() === "" || isNaN(volum.value) || volum.value < 1 || volum.value > 1000) {
        error(volum, "El volum no és correcte.");
        return false;
    }
    return true;
}

function validarPes() {
    const pes = document.getElementById("maxWeight");
    if (pes.value.trim() === "" || isNaN(pes.value) || pes.value < 1 || pes.value > 1000) {
        error(pes, "El pes no és correcte.");
        return false;
    }
    return true;
}

function validarMagatzem() {
    const magatzem = document.getElementById("storage_id");
    if (magatzem.value.trim() === "" || isNaN(magatzem.value) || magatzem.value < 1 || magatzem.value > 1000) {
        error(magatzem, "La id magatzem no és correcte.");
        return false;
    }
    return true;
}

function validarCarrer() {
    const carrer = document.getElementById("street_id");
    if (carrer.value.trim() === "" || isNaN(carrer.value) || carrer.value < 1 || carrer.value > 500) {
        error(carrer, "La id del carrer no és correcte.");
        return false;
    }
    return true;
}

function validarEstanteria() {
    const estanteria = document.getElementById("selft_id");
    if (estanteria.value.trim() === "" || isNaN(estanteria.value) || estanteria.value < 1 || estanteria.value > 500) {
        error(estanteria, "La id de l'estanteria no és correcte.");
        return false;
    }
    return true;
}

function error(element, missatge) {
    const elementError = document.getElementById("missatgeError");
    elementError.innerHTML = ""; // Limpiar errores previos
    const textError = document.createTextNode(missatge);
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

async function enviarFormulari() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const producte = document.getElementById("product_id").value;
    const quantitat = document.getElementById("quantity").value;
    const volum = document.getElementById("maxVol").value;
    const pes = document.getElementById("maxWeight").value;
    const magatzem = document.getElementById("storage_id").value;
    const carrer = document.getElementById("street_id").value;
    const estanteria = document.getElementById("selft_id").value;

    const nouEspai = { id, name, producte, quantitat, volum, pes, magatzem, carrer, estanteria };

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    arrSpaces.push(nouEspai);
    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    console.log("Datos guardados en localStorage:", JSON.parse(localStorage.getItem("spaces")));

    await postData(url, 'Space', nouEspai);

    alert("Espai creat correctament.");
    window.location.assign("../llista/llistatSpace.html");
}


