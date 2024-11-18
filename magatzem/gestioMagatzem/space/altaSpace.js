window.onload = iniciar;

function iniciar () {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar () {
    window.location.assign("llistatSpace.html");
}

function validarID () {
    const id = document.getElementById("id");

    if (id.value.trim() === "" || isNaN(id.value) || id.value < 1 || id.value > 99) {
        error(id, "L'ID ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;
}

function validarNom () {
    const nom = document.getElementById("nom");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "El nom ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validar (e) {
    esborrarError();
    e.preventDefault();

    if (validarNom() && validarID()) {
        enviarFormulari();
        return true;
    }
    
    else
        return false;
}

function error (element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");

    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function esborrarError () {
    let formulari = document.forms[0].elements;

    for (let ele of formulari) {
        ele.classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function enviarFormulari () {
    const nom       = document.getElementById("nom").value;
    const id        = document.getElementById("id").value;
    const quantitat = document.getElementById("quantitat").value;
    const volum     = document.getElementById("volum").value;
    const pes       = document.getElementById("pes").value;

    const nouHueco = { id: id, nom: nom, quantitat: quantitat, volum: volum, pes: pes };

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];
    arrSpaces.push(nouHueco);

    // Guardar en localStorage
    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    setTimeout(function () {
        document.getElementById("id").value = "";
        document.getElementById("nom").value = "";
        document.getElementById("quantitat").value = "";
        document.getElementById("volum").value = "";
        document.getElementById("pes").value = "";
    }, 1000);

    alert("Hueco gravat correctament.");
    window.location.assign("llistatSpace.html");
}
