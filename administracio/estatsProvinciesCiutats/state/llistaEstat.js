const ENDPOINT = 'State';

window.onload = function () {
    loadStates();
};

async function loadStates() {
    try {
        const states = await getData(url, ENDPOINT); 
        displayStates(states);
    } catch (error) {
        console.error('Error cargando los estados:', error);
    }
}

function displayStates(states) {
    const stateList = document.getElementById('stateList');
    stateList.innerHTML = '';

    states.forEach((state, index) => {
        const row = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;

        const tdName = document.createElement('td');
        tdName.textContent = state.name;

        const tdActions = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
        editButton.textContent = 'Editar';

        editButton.addEventListener('click', function() {
            window.location.href = `modificar.html?id=${state.id}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteState(state.id);

        const provincesButton = document.createElement('button');
        provincesButton.classList.add('btn', 'btn-info', 'btn-sm');
        provincesButton.textContent = 'Mostrar Provincias';

        provincesButton.addEventListener('click', function() {
            window.location.href = `../province/llistaProvincia.html?stateId=${state.id}`;
        });

        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);
        tdActions.appendChild(provincesButton); 
        row.appendChild(tdIndex);
        row.appendChild(tdName);
        row.appendChild(tdActions);

        stateList.appendChild(row);
    });
}

async function deleteState(id) {
    if (confirm("Estás seguro de que vols eliminar este estat?")) {
        try {
            const validId = String(id); 

            await deleteData(url, ENDPOINT, validId);
            loadStates();
        } catch (error) {
            console.error('Error al eliminar el estado:', error);
        }
    }
}

