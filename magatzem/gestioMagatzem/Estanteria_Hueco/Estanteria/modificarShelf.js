window.onload = iniciar;

function iniciar () {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);

    // Recuperar les dades del localStorage
    const estanteria = JSON.parse(localStorage.getItem("modShelf"));
    
    if (estanteria) {
        document.getElementById("id").value  = estanteria.id;
        document.getElementById("nom").value = estanteria.nom;
    }
}

function cancelar () {
    window.location.assign("llistatShelf.html");
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

    if (validarNom()) {
        enviarFormulari();
        return true;
    }
    
    else
        return false;
}

function error (element, missatge) {
    const textError    = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");

    elementError.appendChild(textError);
    element.classList.add( "error" );
    element.focus();
}

function esborrarError () {
    let formulari = document.forms[0].elements;

    for (let ele of formulari) {
        ele.classList.remove("error")
    }

    document.getElementById("missatgeError").replaceChildren(); 
}


// Enviar dades
function enviarFormulari() {
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;

    let arrShelfs = JSON.parse(localStorage.getItem("shelfs")) || [];

    const index = arrShelfs.findIndex(shelf => shelf.id === id.toString());

    arrShelfs[index].nom = nom;

    // Guardar en localStorage
    localStorage.setItem("shelfs", JSON.stringify(arrShelfs));

    alert("Estanteria modificada correctament.");
    window.location.assign("llistatShelf.html");
}
