window.onload = loadCities;

function loadCities() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const provinceName = urlParams.get('provinceName');

    if (!provinceId || !provinceName) {
        alert("No s'ha proporcionat una provincia válida");
        return;
    }

    document.getElementById('provinceTitle').textContent = `Pobles de la provincia: ${provinceName}`;

    const cities = JSON.parse(localStorage.getItem('City')) || [];
    const citiesOfProvince = cities.filter(city => city.province_id === provinceId);
    displayCities(citiesOfProvince);
}

function displayCities(cities) {
    const cityList = document.getElementById('cityList');
    cityList.innerHTML = ''; 

    cities.forEach((city, index) => {
        const row = document.createElement('tr');

        const indexCell = document.createElement('td');
        indexCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.textContent = city.name;

        const actionCell = document.createElement('td');

        const editButton = document.createElement('a');
        editButton.className = 'btn btn-warning btn-sm mr-2';
        editButton.textContent = 'Editar';
        editButton.href = `modificar.html?provinceId=${city.province_id}&index=${index}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteCity(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(indexCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);

        cityList.appendChild(row);
    });
}

function addCity() {
    const cityNameInput = document.getElementById('newCityName');

    if (!validateInput(cityNameInput)) {
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const cityName = cityNameInput.value.trim();

    const cities = JSON.parse(localStorage.getItem('City')) || [];
    const newCity = {
        id: (cities.length + 1).toString(),
        name: cityName,
        province_id: provinceId
    };

    cities.push(newCity);
    localStorage.setItem('City', JSON.stringify(cities));
    cityNameInput.value = '';
    loadCities();
}

function deleteCity(index) {
    if (confirm('Estas segur que vols eliminar la ciutat?')) {
        const urlParams = new URLSearchParams(window.location.search);
        const provinceId = urlParams.get('provinceId');
        const cities = JSON.parse(localStorage.getItem('City')) || [];
        const citiesOfProvince = cities.filter(city => city.province_id === provinceId);

        const updatedCities = cities.filter(city => city.id !== citiesOfProvince[index].id);
        localStorage.setItem('City', JSON.stringify(updatedCities));
        loadCities();
    }
}

function validateInput(input) {
    if (!input.value.trim()) {
        input.setCustomValidity("Ompli el camp!");
        showValidationMessage(input, input.validationMessage);
        return false;
    }

    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    if (!pattern.test(input.value.trim())) {
        input.setCustomValidity("El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        showValidationMessage(input, input.validationMessage);
        return false;
    }

    input.setCustomValidity("");
    clearValidationMessage(input);
    return true;
}

function showValidationMessage(input, message) {
    clearValidationMessage(input); 

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger mt-2';
    errorElement.textContent = message;

    input.parentNode.appendChild(errorElement);
}

function clearValidationMessage(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}
