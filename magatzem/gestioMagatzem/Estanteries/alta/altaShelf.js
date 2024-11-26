window.onload = iniciar;

function iniciar() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar() {
    window.location.assign("../llista/llistatShelf.html");
}

function validar(e) {
    e.preventDefault();

    if (validarID() && validarNom() && validarCarrer() && validarStorage()) {
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
    const nom = document.getElementById("nom");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "El nom ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validarCarrer() {
    const id_carrer = document.getElementById("id_carrer");
    if (id_carrer.value.trim() === "" || isNaN(id_carrer.value) || id_carrer.value < 1 || id_carrer.value > 99) {
        error(id_carrer, "L'ID del carrer ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;
}

function validarStorage() {
    const id_storage = document.getElementById("id_storage");
    if (id_storage.value.trim() === "" || isNaN(id_storage.value) || id_storage.value < 1 || id_storage.value > 99) {
        error(id_storage, "L'ID del storage ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;
}



function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function enviarFormulari() {
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const id_carrer = document.getElementById("id_carrer").value;
    const id_storage = document.getElementById("id_storage").value;
    

    const novaEstanteria = { id, nom, id_carrer, id_storage };

    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];
    arrShelfs.push(novaEstanteria);
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    alert("Estanteria gravada correctament.");
    window.location.assign("../llista/llistatShelf.html");
}