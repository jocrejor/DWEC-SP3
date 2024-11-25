window.onload = loadStates;

function loadStates() {
    const states = JSON.parse(localStorage.getItem('State')) || [];
    displayStates(states);
}
function validarNom() {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const nom = document.getElementById("newStateName"); 
    
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

function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarNom()) {
        enviarFormulari();
        return true;
    } else {
        return false;
    }
}

function displayStates(states) {
    const stateList = document.getElementById('stateList');
    stateList.innerHTML = ''; 

    states.forEach((state, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${state.name}</td>
            <td>
                <button class="btn btn-warning btn-sm mr-2" onclick="editState(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteState(${index})">Eliminar</button>
            </td>
        `;
        stateList.appendChild(row);
    });
}

function addState() {
    esborrarError(); 

    const stateName = document.getElementById('newStateName').value.trim();

    if (!validarNom()) {
        return; 
    }

    const states = JSON.parse(localStorage.getItem('State')) || [];
    const newState = {
        id: (states.length + 1).toString(),
        name: stateName
    };

    states.push(newState);
    localStorage.setItem('State', JSON.stringify(states));

    document.getElementById('newStateName').value = ''; 
    alert("Has agregat un nou Estat");
    loadStates(); 
}


function editState(index) {
    const states = JSON.parse(localStorage.getItem('State')) || [];
    const newName = prompt('Editar nom del estat:', states[index].name);
    if (newName !== null && newName.trim() !== '') {
        states[index].name = newName.trim();
        localStorage.setItem('State', JSON.stringify(states));
        loadStates();
    }
}

function deleteState(index) {
    if (confirm("Estas segur que vols eliminar l'estat?")) {
        const states = JSON.parse(localStorage.getItem('State')) || [];
        states.splice(index, 1);
        localStorage.setItem('State', JSON.stringify(states));
        loadStates();
    }
}
