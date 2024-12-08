window.onload = loadCities;

async function loadCities() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const provinceName = urlParams.get('provinceName');

    if (!provinceId || !provinceName) {
        alert("No s'ha proporcionat una provincia válida");
        return;
    }

    document.getElementById('provinceTitle').textContent = `Pobles de la provincia: ${provinceName}`;

    try {
        const cities = await getData(url, 'City'); 
        const citiesOfProvince = cities.filter(city => city.province_id === provinceId);
        displayCities(citiesOfProvince);
    } catch (error) {
        console.error("Error al cargar las ciudades:", error);
    }
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
        editButton.href = `modificar.html?provinceId=${city.province_id}&cityId=${city.id}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteCity(city.id);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(indexCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);

        cityList.appendChild(row);
    });
}

async function deleteCity(cityId) {
    if (confirm('Estas segur que vols eliminar la ciutat?')) {
        try {
            await deleteData(url, 'City', cityId); 
            loadCities(); 
        } catch (error) {
            console.error("Error al eliminar la ciudad:", error);
        }
    }
}
