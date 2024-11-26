window.onload = function () {
    loadProvinceData();
    document.getElementById("editProvinceForm").addEventListener("submit", modifyProvince); // El id del formulario debe coincidir
};

function loadProvinceData() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"), 10);

    if (isNaN(index)) {
        window.location.href = "./llistaProvincia.html";
        return;
    }

    const provinces = JSON.parse(localStorage.getItem("Province")) || [];
    const stateIdSpain = "194";
    const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

    if (!provincesOfSpain[index]) {
        window.location.href = "./llistaProvincia.html";
        return;
    }

    const province = provincesOfSpain[index];
    document.getElementById("provinceName").value = province.name;
    localStorage.setItem("selectedProvinceIndex", index);
}

function validarNom(nom) {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const nomInput = document.getElementById("provinceName");

    esborrarError(); 

    if (!nom) {
        error(nomInput, "Ompli el camp!");
        return false;
    }

    if (!pattern.test(nom)) {
        error(nomInput, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true;
}

function error(input, message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-danger', 'mt-2');
    errorElement.innerText = message;
    input.parentNode.appendChild(errorElement);
}

function esborrarError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => message.remove());
}

function modifyProvince(e) {
    e.preventDefault();

    const newName = document.getElementById("provinceName").value.trim();
    if (!validarNom(newName)) {
        return;
    }

    const provinces = JSON.parse(localStorage.getItem("Province")) || [];
    const stateIdSpain = "194";
    const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

    const index = parseInt(localStorage.getItem("selectedProvinceIndex"), 10);

    if (isNaN(index) || !provincesOfSpain[index]) {
        window.location.href = "./llistaProvincia.html";
        return;
    }

    provincesOfSpain[index].name = newName;

    const updatedProvinces = provinces.map(province =>
        province.id === provincesOfSpain[index].id ? provincesOfSpain[index] : province
    );

    localStorage.setItem("Province", JSON.stringify(updatedProvinces));
    window.location.href = "./llistaProvincia.html"; 
}
