const ENDPOINT = 'State';

document.getElementById('newStateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = document.getElementById('newStateForm');
    const stateNameField = document.getElementById('stateName');

    if (!form.checkValidity()) {
        if (!stateNameField.checkValidity()) {
            error(stateNameField, 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        }
        return;
    }

    try {
        const newName = stateNameField.value;

        const newState = {
            name: newName
        };

        const result = await postData(url, ENDPOINT, newState);
        if (result) {
            window.location.href = 'llistaEstat.html'; 
        }
    } catch (error) {
        console.error('Error afegint l\'estat:', error);
    }
});

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
