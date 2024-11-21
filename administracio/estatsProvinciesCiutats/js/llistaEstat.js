window.onload = loadStates;

function loadStates() {
    const states = JSON.parse(localStorage.getItem('State')) || [];
    displayStates(states);
}

function displayStates(states) {
    const stateList = document.getElementById('stateList');
    stateList.innerHTML = ''; 

    states.forEach((state, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${state.name}</td>
            <td>
                <button class="btn btn-warning btn-sm mr-2" onclick="editState(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteState(${index})">Eliminar</button>
            </td>
        `;
        stateList.appendChild(row);
    });
}

function addState() {
    const stateName = document.getElementById('newStateName').value.trim();
    if (stateName === '') {
        alert('Per favor, ingresa un nom de estat.');
        return;
    }

    const states = JSON.parse(localStorage.getItem('State')) || [];
    const newState = {
        id: (states.length + 1).toString(),
        name: stateName
    };
    states.push(newState);
    localStorage.setItem('State', JSON.stringify(states));
    document.getElementById('newStateName').value = ''; 
    loadStates();
}

function editState(index) {
    const states = JSON.parse(localStorage.getItem('State')) || [];
    const newName = prompt('Editar nom del estat:', states[index].name);
    if (newName !== null && newName.trim() !== '') {
        states[index].name = newName.trim();
        localStorage.setItem('State', JSON.stringify(states));
        loadStates();
    }
}

function deleteState(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este estado?')) {
        const states = JSON.parse(localStorage.getItem('State')) || [];
        states.splice(index, 1);
        localStorage.setItem('State', JSON.stringify(states));
        loadStates();
    }
}
