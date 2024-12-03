const ENDPOINT = 'State';

document.getElementById('newStateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const newName = document.getElementById('stateName').value;

    if (!validarNom(newName)) {
        error(document.getElementById('stateName'), 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        return;
    }

    try {
        const states = await getData(url, ENDPOINT);

        const maxId = states.reduce((max, state) => (state.id > max ? state.id : max), 0);

        const newId = maxId + 1;

        const newState = {
            id: newId,  
            name: newName
        };

        await postData(url, ENDPOINT, newState);

        alert('Estat afegit correctament');
        window.location.href = 'llistaEstat.html'; 
    } catch (error) {
        console.error('Error afegint l\'estat:', error);
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
