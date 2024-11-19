window.onload = iniciar;

function iniciar () {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function cancelar () {
    window.location.assign("llistatShelf.html");
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

function validarCarrer() {
    const id = document.getElementById("id_carrer");

    if (id.value.trim() === "" || isNaN(id.value) || id.value < 1 || id.value > 99) {
        error(id, "L'ID del carrer ha de ser un número entre 1 i 99.");
        return false;
    }
    return true;

}

function validarAdreça() {
    const nom = document.getElementById("adreça");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "La adreça ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validarTIpus() {
    const nom = document.getElementById("adreça");
    if (nom.value.trim() === "" || !nom.checkValidity()) {
        error(nom, "La adreça ha de tindre entre 2 i 30 caràcters.");
        return false;
    }
    return true;
}

function validar (e) {
    esborrarError();
    e.preventDefault();

    if (validarNom() && validarID() && validarCarrer() && validarAdreça() && validarTIpus())  {
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
    const nom = document.getElementById("nom").value;
    const id = document.getElementById("id").value;
    const id_carrer = document.getElementById("id_carrer").value;
    const adreça = document.getElementById("adreça").value;
    const tipus = document.getElementById("tipus").value;

    const novaEstanteria = { id: id, nom: nom ,id_carrer: id_carrer, adreça: adreça, tipus: tipus};

    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];
    arrShelfs.push(novaEstanteria);

    // Guardar en localStorage
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    setTimeout(function () {
        document.getElementById("nom").value = "";
        document.getElementById("id").value = "";
        document.getElementById("id_carrer").value = "";
        document.getElementById("adreça").value = "";
        document.getElementById("tipus").value = "";
    }, 1000);

    alert("Estanteria gravada correctament.");
    window.location.assign("llistatShelf.html");
}
