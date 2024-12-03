const ENDPOINT = 'State';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const stateId = urlParams.get('id');
    
    if (stateId) {
        loadStateForEditing(stateId);
    }
};

async function loadStateForEditing(id) {
    try {
        const states = await getData(url, ENDPOINT);
        const stateToEdit = states.find(s => s.id == id);

        if (stateToEdit) {
            document.getElementById('stateName').value = stateToEdit.name;
        } 
    } catch (error) {
        console.error('Error carregant l\'estat:', error);
    }
}

document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const stateId = urlParams.get('id');
    const newName = document.getElementById('stateName').value;

    if (!validarNom(newName)) {
        error(document.getElementById('stateName'), 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        return;
    }

    if (stateId) {
        const updatedState = {
            name: newName
        };

        try {
            await updateId(url, ENDPOINT, stateId, updatedState);
            window.location.href = 'llistaEstat.html';  
        } catch (error) {
            console.error('Error actualitzant l\'estat:', error);
        }
    }
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
