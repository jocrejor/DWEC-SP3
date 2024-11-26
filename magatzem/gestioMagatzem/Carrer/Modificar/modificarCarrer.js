window.onload = main;

function main() {
    var modifica = JSON.parse(localStorage.getItem("modificaFormulari"));
    console.log("Dades cargades per a modificar:", modifica); 
    if (modifica) {
        document.getElementById("id").value = modifica.id || "";
        document.getElementById("name").value = modifica.name || "";
    } else {
        alert("No s'ha trobat el registre a modificar.");
        window.location.assign("formulariLlista.html");
    }
    document.getElementById("btnGuardar").addEventListener("click", btnGuardar, false);
   
}

function validarId() {
    var idValidar = document.getElementById("id");
    if (!idValidar.checkValidity()) {
        if (idValidar.validity.valueMissing) {
            error(idValidar, "Deus d'introduïr dos números.");
        }
        if (idValidar.validity.patternMismatch) {
            error(idValidar, "El ID ha de tenir exactament 2 números.");
        }
        return false;
    }
    return true;
}

function validarNom() {
    var element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un nom.");
        }
        return false;
    }
    return true;
}

function btnGuardar(e) {
    e.preventDefault();
    const modifica = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value
    };

    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    if (modifica.id) {
        const index = carrers.findIndex(m => m.id === modifica.id);
        if (index !== -1) {
            carrers[index] = modifica; 
            localStorage.setItem("carrers", JSON.stringify(carrers));
            alert("Informació guardada correctament!");
        } else {
            alert("El registre no s'ha trobat.");
        }
    } else {
        alert("L'ID no és buit.");
    }

    window.location.assign("../Llistar/LlistatCarrer.html"); 
}

