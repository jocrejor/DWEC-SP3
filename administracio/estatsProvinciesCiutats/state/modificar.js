window.onload = function () {
    loadStateData();
    document.getElementById("modifyForm").addEventListener("submit", modificarEstat);
};

function loadStateData() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"), 10);

    if (isNaN(index)) {
        window.location.href = "./llistaEstat.html";
        return;
    }

    const states = JSON.parse(localStorage.getItem("State")) || [];

    if (!states[index]) {
        window.location.href = "./llistaEstat.html";
        return;
    }

    const state = states[index];
    document.getElementById("stateName").value = state.name;
    localStorage.setItem("selectedStateIndex", index); 
}

function validarNom() {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const nom = document.getElementById("stateName");

    if (!nom.value) {
        error(nom, "Ompli el camp!");
        return false;
    }

    if (!pattern.test(nom.value)) {
        error(nom, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true;
}

function error(input, message) {
    esborrarError();
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.innerText = message;
    input.parentNode.appendChild(errorElement);
}

function esborrarError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => message.remove());
}

function modificarEstat(e) {
    e.preventDefault();

    const newName = document.getElementById("stateName").value.trim();
    if (!validarNom(newName)) {
        return;
    }

    const states = JSON.parse(localStorage.getItem("State")) || [];
    const index = parseInt(localStorage.getItem("selectedStateIndex"), 10);

    if (isNaN(index) || !states[index]) {
        window.location.href = "./llistaEstat.html";
        return;
    }

    states[index].name = newName;

    localStorage.setItem("State", JSON.stringify(states));
    window.location.href = "./llistaEstat.html";
}
