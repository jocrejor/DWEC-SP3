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
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        
        const tdName = document.createElement('td');
        tdName.textContent = province.name;

        const tdActions = document.createElement('td');
        const cityLink = document.createElement('a');
        cityLink.href = `../city/llistaCiutat.html?provinceId=${province.id}&provinceName=${encodeURIComponent(province.name)}`;
        cityLink.classList.add('btn', 'btn-info', 'btn-sm', 'mr-2');
        cityLink.textContent = 'Llista Ciutats';
        
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editProvince(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteProvince(index);

        tdActions.appendChild(cityLink);
        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);

        row.appendChild(tdIndex);
        row.appendChild(tdName);
        row.appendChild(tdActions);

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
