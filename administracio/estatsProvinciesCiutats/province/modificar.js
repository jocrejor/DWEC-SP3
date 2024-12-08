const ENDPOINT = 'Province';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('id');
    
    if (provinceId) {
        loadProvinceForEditing(provinceId);
    }
};

async function loadProvinceForEditing(id) {
    try {
        const provinces = await getData(url, ENDPOINT);
        const provinceToEdit = provinces.find(p => p.id == id);

        if (provinceToEdit) {
            document.getElementById('provinceName').value = provinceToEdit.name;
        } 
    } catch (error) {
        console.error('Error cargando la provincia:', error);
    }
}

document.getElementById('editForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('id');
    const newName = document.getElementById('provinceName').value;

    if (!validarNombre(newName)) {
        error(document.getElementById('provinceName'), 'El nombre debe tener entre 2 y 25 caracteres y solo permitir letras (con acentos y ñ)');
        return;
    }

    if (provinceId) {
        const updatedProvince = {
            name: newName
        };

        try {
            await updateId(url, ENDPOINT, provinceId, updatedProvince);
            window.location.href = 'llistaProvincia.html';  
        } catch (error) {
            console.error('Error actualizando la provincia:', error);
        }
    }
});

function validarNombre(name) {
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
