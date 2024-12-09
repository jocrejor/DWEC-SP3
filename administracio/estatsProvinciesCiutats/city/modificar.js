const ENDPOINT = 'City';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cityId = urlParams.get('cityId');
    const provinceId = localStorage.getItem('provinceId');
    
    if (!cityId || !provinceId) {
        alert("No s'han proporcionat dades vàlides.");
        window.location.href = `llistaCiutat.html`; // Redirige a la lista si falta algún parámetro
        return;
    }

    // Establecemos el enlace de cancelación para regresar a la lista de ciudades
    document.getElementById('cancelLink').href = `llistaCiutat.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(localStorage.getItem('provinceName'))}`;

    loadCityForEditing(cityId);
};

async function loadCityForEditing(cityId) {
    try {
        const cities = await getData(url, ENDPOINT);
        const cityToEdit = cities.find(city => city.id == cityId);

        if (cityToEdit) {
            document.getElementById('cityName').value = cityToEdit.name;
        } else {
            alert("Ciutat no trobada.");
            window.location.href = `llistaCiutat.html`;
        }
    } catch (error) {
        console.error('Error carregant la ciutat:', error);
    }
}

async function modifyCity(event) {
    event.preventDefault();

    const cityId = new URLSearchParams(window.location.search).get('cityId');
    const newName = document.getElementById('cityName').value.trim();

    if (!validarNom(newName)) {
        mostrarError('El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        return;
    }

    const updatedCity = { name: newName };

    try {
        await updateId(url, ENDPOINT, cityId, updatedCity); 
        
        const provinceId = localStorage.getItem('provinceId');
        window.location.href = `llistaCiutat.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(localStorage.getItem('provinceName'))}`;
    } catch (error) {
        console.error("Error actualitzant la ciutat:", error);
    }
}

function validarNom(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    return pattern.test(name);
}

function mostrarError(message) {
    const form = document.getElementById('editCityForm');
    esborrarError();

    const errorElement = document.createElement('div');
    errorElement.classList.add('text-danger', 'mt-2');
    errorElement.innerText = message;

    form.appendChild(errorElement);
}

function esborrarError() {
    const errors = document.querySelectorAll('.text-danger');
    errors.forEach(error => error.remove());
}
