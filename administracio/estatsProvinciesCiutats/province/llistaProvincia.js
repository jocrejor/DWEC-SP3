const ENDPOINT = 'Province'; 
let allProvinces = []; 

window.onload = function () {
    loadProvinces();
    setupFilter(); 
};

async function loadProvinces() {
    const stateId = "194";  
    try {
        const provinces = await getData(url, `Province?state_id=${stateId}`);
        allProvinces = provinces; 
        displayProvinces(provinces);
    } catch (error) {
        console.error('Error cargando las provincias:', error);
    }
}

function displayProvinces(provinces) {
    const provinceList = document.getElementById('provinceList');
    provinceList.innerHTML = '';

    if (!provinces || provinces.length === 0) {
        provinceList.innerHTML = '<tr><td colspan="3">No hay provincias disponibles para este estado.</td></tr>';
        return;
    }

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
        editButton.onclick = () => editProvince(province.id);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteProvince(province.id);

        tdActions.appendChild(cityLink);
        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);

        row.appendChild(tdIndex);
        row.appendChild(tdName);
        row.appendChild(tdActions);

        provinceList.appendChild(row);
    });
}

function editProvince(id) {
    window.location.href = `modificar.html?id=${id}`;
}

async function deleteProvince(id) {
    try {
        if (confirm('Estas segur que vols eliminar aquesta provincia?')) {
            await deleteData(url, ENDPOINT, id);
            loadProvinces();  
        }
    } catch (error) {
        console.error('Error al eliminar provincia:', error);
    }
}

function setupFilter() {
    $('#filter-toggle').on('click', function() {
        $('#filter-input').toggleClass('d-none');
    });

    $('#search-btn').on('click', function() {
        const filterText = $('#filter-text').val().toLowerCase();
        const filteredProvinces = allProvinces.filter(province => province.name.toLowerCase().includes(filterText));
        displayProvinces(filteredProvinces);
    });

    $('#filter-text').autocomplete({
        source: function(request, response) {
            const matches = allProvinces.filter(province => province.name.toLowerCase().startsWith(request.term.toLowerCase()))
                                       .map(province => province.name);
            response(matches);
        },
        minLength: 2,  
        delay: 300,  
        autoFocus: true,  
    });
}
