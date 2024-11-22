window.onload = iniciar;

function iniciar () {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);

    // Recuperar les dades del localStorage
    const hueco = JSON.parse(localStorage.getItem("modSpace"));
    
    if (hueco) {
        document.getElementById("id").value        = hueco.id;
        document.getElementById("nom").value       = hueco.nom;
        document.getElementById("maxVol").value    = hueco.volum;
        document.getElementById("maxPes").value    = hueco.pes;
    }
    console.log("ID:", id);
    console.log("Nom:", nom);
    console.log("Volum:", maxVol);
    console.log("Pes:", maxPes);
}

function cancelar () {
    window.location.assign("llistatSpace.html");
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
    const id    = document.getElementById("id").value;
    const nom   = document.getElementById("nom").value;
    const volum = document.getElementById("maxVol").value;
    const pes   = document.getElementById("maxPes").value;

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];

    const index = arrSpaces.findIndex(space => space.id === id.toString());

    arrSpaces[index].nom   = nom;
    arrSpaces[index].volum = volum;
    arrSpaces[index].pes   = pes;

    // Guardar en localStorage
    localStorage.setItem("spaces", JSON.stringify(arrSpaces));

    alert("Hueco modificat correctament.");
    window.location.assign("llistatSpace.html");
}
