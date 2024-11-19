window.onload = loadStates;

function loadStates() {
    let states = JSON.parse(localStorage.getItem('State')) || [];
    displayStates(states);
}

function displayStates(states) {
    const stateList = document.getElementById('stateList');
    stateList.innerHTML = ''; 

    states.forEach((state, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${state.name} 
            <button onclick="editState(${index})">Editar</button>
            <button onclick="deleteState(${index})">Eliminar</button>
        `;
        stateList.appendChild(listItem);
    });
}

function addState() {
    const stateName = document.getElementById('newStateName').value.trim();
    if (stateName === '') {
        alert('Por favor, ingresa un nombre de estado.');
        return;
    }

    let states = JSON.parse(localStorage.getItem('State')) || [];
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
    let states = JSON.parse(localStorage.getItem('State')) || [];
    const newName = prompt('Editar nombre del estado:', states[index].name);
    if (newName !== null && newName.trim() !== '') {
        states[index].name = newName.trim();
        localStorage.setItem('State', JSON.stringify(states));
        loadStates();
    }
}

function deleteState(index) {
    if (confirm('Estás seguro de que deseas eliminar este estado?')) {
        let states = JSON.parse(localStorage.getItem('State')) || [];
        states.splice(index, 1);
        localStorage.setItem('State', JSON.stringify(states));
        loadStates(); 
    }
}

