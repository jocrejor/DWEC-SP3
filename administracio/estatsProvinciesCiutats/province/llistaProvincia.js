window.onload = loadProvinces;

function loadProvinces() {
    const provinces = JSON.parse(localStorage.getItem('Province')) || [];
    const stateIdSpain = "194"; 
    const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

    displayProvinces(provincesOfSpain); 
}

function displayProvinces(provinces) {
    const provinceList = document.getElementById('provinceList');
    provinceList.innerHTML = ''; 
    provinces.forEach((province, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${province.name}</td>
            <td>
                <a href="../city/llistaCiutat.html?provinceId=${province.id}&provinceName=${encodeURIComponent(province.name)}" 
                   class="btn btn-info btn-sm mr-2">Llista Ciutats</a>
                <button class="btn btn-warning btn-sm mr-2" onclick="editProvince(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProvince(${index})">Eliminar</button>
            </td>
        `;
        provinceList.appendChild(row); 
    });
}

function validarNom() {
    const pattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,25}$/;
    const nom = document.getElementById("newProvinceName");

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

function addProvince() {
    const provinceName = document.getElementById('newProvinceName').value.trim();

    if (!validarNom()) {
        return;
    }

    if (provinceName === '') {
        alert('Per favor, ingresa una provincia');
        return;
    }

    const provinces = JSON.parse(localStorage.getItem('Province')) || [];
    const newProvince = {
        id: (provinces.length + 1).toString(), 
        name: provinceName,
        state_id: "194"
    };
    provinces.push(newProvince);
    localStorage.setItem('Province', JSON.stringify(provinces)); 
    document.getElementById('newProvinceName').value = ''; 
    loadProvinces(); 
}

function editProvince(index) {
    window.location.href = `modificar.html?index=${index}`;
}

function deleteProvince(index) {
    if (confirm('Estas segur que vols eliminar esta provincia?')) {
        const provinces = JSON.parse(localStorage.getItem('Province')) || [];
        const stateIdSpain = "194";
        const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

        const updatedProvinces = provinces.filter(province => province.id !== provincesOfSpain[index].id);
        localStorage.setItem('Province', JSON.stringify(updatedProvinces));
        loadProvinces(); 
    }
}
