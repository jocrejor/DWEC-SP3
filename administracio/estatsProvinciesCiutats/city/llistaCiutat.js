let allCities = [];  

window.onload = function () {
    loadCities();
    setupFilter(); 
};

async function loadCities() {
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('provinceId');
    const provinceName = urlParams.get('provinceName');

    if (!provinceId || !provinceName) {
        alert("No s'ha proporcionat una provincia válida");
        return;
    }

    document.getElementById('provinceTitle').textContent = `Pobles de la provincia: ${provinceName}`;

    const addCityBtn = document.getElementById('addCityBtn');
    if (addCityBtn) {
        addCityBtn.href = `alta.html?provinceId=${provinceId}&provinceName=${encodeURIComponent(provinceName)}`;
    }

    try {
        const cities = await getData(url, 'City'); 
        const citiesOfProvince = cities.filter(city => city.province_id === provinceId);
        allCities = citiesOfProvince;
        displayCities(citiesOfProvince);
    } catch (error) {
        console.error("Error al cargar las ciudades:", error);
    }
}


function displayCities(cities) {
    const cityList = document.getElementById('cityList');
    cityList.innerHTML = ''; 

    if (!cities || cities.length === 0) {
        cityList.innerHTML = '<tr><td colspan="3">No hi ha ciutats disponibles per aquesta provincia.</td></tr>';
        return;
    }

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

function setupFilter() {
    $('#filter-toggle').on('click', function() {
        $('#filter-input').toggleClass('d-none');
    });

    $('#search-btn').on('click', function() {
        const filterText = $('#filter-text').val().toLowerCase();
        const filteredCities = allCities.filter(city => city.name.toLowerCase().includes(filterText));
        displayCities(filteredCities);
    });

    $('#filter-text').autocomplete({
        source: function(request, response) {
            const matches = allCities.filter(city => city.name.toLowerCase().startsWith(request.term.toLowerCase()))
                                      .map(city => city.name);
            response(matches);  
        },
        minLength: 2,  
        delay: 300,    
        autoFocus: true,  
    });
}
