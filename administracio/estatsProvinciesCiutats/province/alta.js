const ENDPOINT = 'Province'; 

document.getElementById('newProvinceForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const provinceName = document.getElementById('provinceName').value; 
    const stateId = "194"; 

    if (!validarNom(provinceName)) {
        error(document.getElementById('provinceName'), 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        return;
    }

    const newId = generateUniqueId();  

    const newProvince = {
        state_id: stateId, 
        id: newId,         
        name: provinceName 
    };

    try {
        const result = await postData(url, ENDPOINT, newProvince);

        if (result) {
            window.location.href = `llistaProvincia.html?stateId=194`; 
        }
    } catch (error) {
        console.error('Error al afegir la provincia:', error);
    }
});

function generateUniqueId() {
    const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;  
    return id.toString(); 
}

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
