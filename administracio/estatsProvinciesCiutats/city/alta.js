const ENDPOINT = 'City';

window.onload = function () {
    const provinceId = localStorage.getItem('provinceId'); 
    const provinceName = localStorage.getItem('provinceName'); 


    document.getElementById('newCityForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const cityName = document.getElementById('cityName').value.trim();

        if (!validarNom(cityName)) {
            mostrarError('El nom ha de tenir entre 2 i 25 caràcters i només permet lletres (amb accents i ñ)');
            return;
        }

        const newCity = {
            province_id: provinceId,
            name: cityName,
        };

        try {
            const result = await postData(url, ENDPOINT, newCity);

            if (result) {
                window.location.href = `llistaCiutat.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(provinceName)}`;
            }
        } catch (error) {
            console.error("Error al crear la ciutat:", error);
        }
    });
};

function validarNom(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    return pattern.test(name);
}

function mostrarError(message) {
    const form = document.getElementById('newCityForm');
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
