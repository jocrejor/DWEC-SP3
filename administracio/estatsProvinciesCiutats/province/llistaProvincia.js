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
                <button class="btn btn-warning btn-sm mr-2" onclick="editProvince(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProvince(${index})">Eliminar</button>
            </td>
        `;
        provinceList.appendChild(row); 
    });
}

function addProvince() {
    const provinceName = document.getElementById('newProvinceName').value.trim();
    if (provinceName === '') {
        alert('Por favor, ingresa un nombre de provincia.');
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
    const provinces = JSON.parse(localStorage.getItem('Province')) || [];
    const stateIdSpain = "194";
    const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

    const newName = prompt('Editar nombre de la provincia:', provincesOfSpain[index].name);
    if (newName !== null && newName.trim() !== '') {
        provincesOfSpain[index].name = newName.trim();

        const updatedProvinces = provinces.map(province =>
            province.id === provincesOfSpain[index].id ? provincesOfSpain[index] : province
        );
        localStorage.setItem('Province', JSON.stringify(updatedProvinces));
        loadProvinces(); 
    }
}

function deleteProvince(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta provincia?')) {
        const provinces = JSON.parse(localStorage.getItem('Province')) || [];
        const stateIdSpain = "194";
        const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

        const updatedProvinces = provinces.filter(province => province.id !== provincesOfSpain[index].id);
        localStorage.setItem('Province', JSON.stringify(updatedProvinces));
        loadProvinces(); 
    }
}
