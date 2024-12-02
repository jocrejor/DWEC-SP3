document.getElementById('addProvinceForm').addEventListener('submit', function (event) {
    event.preventDefault();
    esborrarError();

    const provinceName = document.getElementById('provinceName');
    const provinceNameValue = provinceName.value.trim();

    if (!validarNom(provinceNameValue)) {
        error(provinceName, "El nom no pot contenir números ni caràcters especials, ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    addProvince(provinceNameValue); 
    window.location.href = "./llistaProvincia.html"; 
});

function validarNom(name) {
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

function addProvince(provinceName) {
    const provinces = JSON.parse(localStorage.getItem('Province')) || [];
    
    const newId = provinces.length > 0 ? Math.max(...provinces.map(p => parseInt(p.id))) + 1 : 1;

    const newProvince = {
        id: newId.toString(),
        name: provinceName,
        state_id: "194" 
    };

    provinces.push(newProvince);
    localStorage.setItem('Province', JSON.stringify(provinces));
}
