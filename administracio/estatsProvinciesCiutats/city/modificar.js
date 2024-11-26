window.onload = function () {
    loadCityData();
    document.getElementById("editCityForm").addEventListener("submit", modifyCity);
    configureCancelButton();
};

function loadCityData() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"), 10);

    if (isNaN(index)) {
        window.location.href = "./llistaCiutat.html"; 
        return;
    }

    const cities = JSON.parse(localStorage.getItem("City")) || [];
    const provinceId = urlParams.get("provinceId");
    const citiesOfProvince = cities.filter(city => city.province_id === provinceId);

    if (!citiesOfProvince[index]) {
        window.location.href = "./llistaCiutat.html"; 
        return;
    }

    const city = citiesOfProvince[index];
    document.getElementById("cityName").value = city.name;

    localStorage.setItem("selectedCityIndex", index);
}

function configureCancelButton() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get("provinceId");
    const index = urlParams.get("index");

    const cancelLink = document.getElementById("cancelLink");
    cancelLink.href = `llistaCiutat.html?provinceId=${provinceId}&index=${index}`;
}

function modifyCity(e) {
    e.preventDefault();

    const newName = document.getElementById("cityName").value.trim();
    if (!validateCityName(newName)) {
        return;
    }

    const cities = JSON.parse(localStorage.getItem("City")) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get("provinceId");
    const index = parseInt(urlParams.get("index"), 10);

    const citiesOfProvince = cities.filter(city => city.province_id === provinceId);

    if (!citiesOfProvince[index]) {
        window.location.href = "./llistaCiutat.html";
        return;
    }

    citiesOfProvince[index].name = newName;

    const updatedCities = cities.map(city =>
        city.id === citiesOfProvince[index].id ? citiesOfProvince[index] : city
    );

    localStorage.setItem("City", JSON.stringify(updatedCities));
    window.location.href = `llistaCiutat.html?provinceId=${provinceId}`;
}

function validateCityName(name) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const cityInput = document.getElementById("cityName");

    clearError(); 
    if (!name) {
        showError(cityInput, "Ompli el camp!");
        return false;
    }

    if (!pattern.test(name)) {
        showError(cityInput, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true;
}

function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.innerText = message;
    input.parentNode.appendChild(errorElement);
}

function clearError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => message.remove());
}

