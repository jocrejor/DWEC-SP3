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
    const name = document.getElementById("name");
    if (name.value.trim() === "" || !name.checkValidity()) {
        error(name, "El nom ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validarCarrer() {
    const steet_id = document.getElementById("steet_id");
    if (steet_id.value.trim() === "" || isNaN(steet_id.value) || steet_id.value < 1 || steet_id.value > 99) {
        error(steet_id, "L'ID del carrer ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;
}

function validarStorage() {
    const storage_id = document.getElementById("storage_id");
    if (storage_id.value.trim() === "" || isNaN(storage_id.value) || storage_id.value < 1 || storage_id.value > 99) {
        error(storage_id, "L'ID del storage ha de ser un número entre 1 i 99.");
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
async function enviarFormulari() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const steet_id = document.getElementById("steet_id").value;
    const storage_id = document.getElementById("storage_id").value;
    
    const novaEstanteria = { id, name, steet_id, storage_id };

    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];
    arrShelfs.push(novaEstanteria);
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    // Verificar que los datos están en localStorage
    console.log("Datos guardados en localStorage:", JSON.parse(localStorage.getItem("shelfs")));

    await postData(url, 'Shelf', novaEstanteria);

    alert("Estanteria gravada correctament.");
    window.location.assign("../../llista/llistatShelf.html");
}

