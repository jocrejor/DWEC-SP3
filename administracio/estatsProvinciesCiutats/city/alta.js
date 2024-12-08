const ENDPOINT = 'City';  // Endpoint para la tabla de ciudades

document.getElementById('newCityForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    const cityName = document.getElementById('cityName').value;  // Obtener el nombre de la ciudad
    const provinceId = new URLSearchParams(window.location.search).get('provinceId');  // Obtener el ID de la provincia desde los parámetros de la URL

    if (!validarNom(cityName)) {
        error(document.getElementById('cityName'), 'El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
        return;
    }

    const newId = generateUniqueId();  // Generar un ID único para la ciudad

    const newCity = {
        province_id: provinceId,  // Asociamos la ciudad a la provincia
        id: newId,                 // ID único de la ciudad
        name: cityName             // Nombre de la ciudad
    };

    try {
        const result = await postData(url, ENDPOINT, newCity);  // Llamada a la API para crear la ciudad

        if (result) {
            window.location.href = `llistaCiutat.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(cityName)}`;  // Redirigir a la lista de ciudades de la provincia
        }
    } catch (error) {
        console.error('Error al afegir la ciutat:', error);
    }
});

function generateUniqueId() {
    const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;  // Generación de ID único
    return id.toString();  // Retorna el ID como string
}

function validarNom(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;  // Validación del nombre de la ciudad
    return pattern.test(name);
}

function error(input, message) {
    esborrarError();
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.innerText = message;
    input.parentNode.appendChild(errorElement);  // Mostrar mensaje de error
}

function esborrarError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => message.remove());  // Eliminar mensajes de error previos
}
