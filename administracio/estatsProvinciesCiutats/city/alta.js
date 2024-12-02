window.onload = function () {
    loadProvinceId(); 
};

function loadProvinceId() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');

    if (!provinceId) {
        alert("No s'ha proporcionat una provincia correcta.");
        window.location.href = 'llistaCiutat.html'; 
        return;
    }

    document.getElementById('provinceId').value = provinceId;
}

function addCity() {
    const cityNameInput = document.getElementById('newCityName');
    const provinceId = document.getElementById('provinceId').value;

    if (!validateCityName(cityNameInput)) {
        return;
    }

    const cityName = cityNameInput.value.trim();

    if (!provinceId) {
        showError('Selecciona una província.');
        return;
    }

    const cities = JSON.parse(localStorage.getItem('City')) || [];
    const newCity = {
        id: (cities.length + 1).toString(),
        name: cityName,
        province_id: provinceId
    };

    cities.push(newCity);
    localStorage.setItem('City', JSON.stringify(cities)); 

    cityNameInput.value = ''; 
    alert('Ciutat afegida correctament!');
    window.location.href = `llistaCiutat.html?provinceId=${provinceId}`;
}

function validateCityName(cityNameInput) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    if (!cityNameInput.value.trim()) {
        showError('El nom de la ciutat és obligatori.');
        return false;
    }

    if (!pattern.test(cityNameInput.value.trim())) {
        showError('El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.');
        return false;
    }

    clearError();
    return true;
}
 
function showError(message) {
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

function clearError() {
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';
}
