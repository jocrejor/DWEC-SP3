window.onload = loadProvinces;

const url = 'http://node.daw.iesevalorpego.es:3001/';  

async function loadProvinces() {
    try {
        const provinces = await getData(url, 'provinces');  
        const stateIdSpain = "194"; 
        const provincesOfSpain = provinces.filter(province => province.state_id === stateIdSpain);

        if (provincesOfSpain.length === 0) {
            alert("No se encontraron provincias de España");
        }

        displayProvinces(provincesOfSpain);
    } catch (error) {
        console.error('Error al cargar provincias:', error);
    }
}

function displayProvinces(provinces) {
    const provinceList = document.getElementById('provinceList');
    provinceList.innerHTML = ''; 

    if (provinces.length === 0) {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '3');
        td.textContent = 'No hay provincias disponibles';
        row.appendChild(td);
        provinceList.appendChild(row);
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
            await deleteData(url, 'provinces', id);
            loadProvinces();  
        }
    } catch (error) {
        console.error('Error al eliminar provincia:', error);
    }
}
