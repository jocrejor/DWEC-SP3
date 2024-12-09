const ENDPOINT = 'City';  

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const provinceName = urlParams.get('provinceName');


    if (!provinceId || !provinceName) {
        alert("No es pot determinar la provincia. Torna enrere i selecciona una provincia.");
        window.location.href = '../province/llistaProvincia.html'; 
        return;
    }

    document.getElementById('provinceTitle').textContent = `Nova ciutat per a la provincia: ${provinceName}`;

    // Configurar el formulario
    document.getElementById('newCityForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const cityName = document.getElementById('cityName').value.trim();

        // Validar el nombre de la ciudad
        if (!validarNom(cityName)) {
            mostrarError(document.getElementById('cityName'), 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ).');
            return;
        }

        try {
            const cities = await getData(url, ENDPOINT); 
            const newId = generarNuevoId(cities); 

            const newCity = {
                province_id: provinceId,
                id: newId,
                name: cityName
            };

            const result = await postData(url, ENDPOINT, newCity);

            if (result) {
                window.location.href = `llistaCiutat.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(provinceName)}`;
            }
        } catch (error) {
            console.error('Error al afegir la ciutat:', error);
            mostrarError(document.getElementById('cityName'), 'Error al afegir la ciutat. Torna-ho a intentar.');
        }
    });
});

function generarNuevoId(cities) {
    const ids = cities.map(city => parseInt(city.id, 10));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return (maxId + 1).toString();
}

function validarNom(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    return pattern.test(name);
}


function mostrarError(input, message) {
    esborrarError();
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.innerText = message;
    input.parentNode.appendChild(errorElement);
}

function esborrarError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}
