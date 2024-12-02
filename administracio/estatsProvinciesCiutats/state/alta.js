document.getElementById('addForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto
    esborrarError();

    const newStateName = document.getElementById('newStateName');
    const stateNameValue = newStateName.value.trim();

    if (!validarNom(stateNameValue)) {
        error(newStateName, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    addState(stateNameValue); 
    window.location.href = "./llistaEstat.html"; 
});

function validarNom(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    return pattern.test(name);
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

function addState(stateName) {
    const states = JSON.parse(localStorage.getItem('State')) || [];
    const newState = {
        id: (states.length + 1).toString(),
        name: stateName,
    };

    states.push(newState);
    localStorage.setItem('State', JSON.stringify(states));
}
