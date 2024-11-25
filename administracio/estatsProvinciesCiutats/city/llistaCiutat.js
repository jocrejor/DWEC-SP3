window.onload = loadCities;

function loadCities() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const provinceName = urlParams.get('provinceName');

    if (!provinceId || !provinceName) {
        alert('No se ha proporcionado una provincia válida.');
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
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${city.name}</td>
            <td>
                <button class="btn btn-warning btn-sm mr-2" onclick="editCity(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCity(${index})">Eliminar</button>
            </td>
        `;
        cityList.appendChild(row);
    });
}

function validarNom() {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const nom = document.getElementById("newCityName");

    if (!nom.value) {
        error(nom, "Ompli el camp!"); 
        return false;
    }

    if (!pattern.test(nom.value)) {
        error(nom, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true; 
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

function addCity() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const cityName = document.getElementById('newCityName').value.trim();

    if (!validarNom()) {
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
    document.getElementById('newCityName').value = '';
    alert("Has agregat un nou poble");
    loadCities();
}

function editCity(index) {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const cities = JSON.parse(localStorage.getItem('City')) || [];
    const citiesOfProvince = cities.filter(city => city.province_id === provinceId);

    const newName = prompt('Editar nom de la ciutat:', citiesOfProvince[index].name);
    if (newName !== null && newName.trim() !== '') {
        citiesOfProvince[index].name = newName.trim();

        const updatedCities = cities.map(city =>
            city.id === citiesOfProvince[index].id ? citiesOfProvince[index] : city
        );
        localStorage.setItem('City', JSON.stringify(updatedCities));
        loadCities();
    }
}

function deleteCity(index) {
    if (confirm('Seguro que vols eliminar la ciutat?')) {
        const urlParams = new URLSearchParams(window.location.search);
        const provinceId = urlParams.get('provinceId');
        const cities = JSON.parse(localStorage.getItem('City')) || [];
        const citiesOfProvince = cities.filter(city => city.province_id === provinceId);

        const updatedCities = cities.filter(city => city.id !== citiesOfProvince[index].id);
        localStorage.setItem('City', JSON.stringify(updatedCities));
        loadCities();
    }
}
