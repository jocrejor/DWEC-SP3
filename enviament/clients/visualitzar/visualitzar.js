window.onload = main;

let Client;
let State;
let Province;
let City;

async function main() {
    Client = await getData(url, "Client");
    State = await getData(url, "State");
    Province = await getData(url, "Province");
    City = await getData(url, "City");
    // Recupera el ID del cliente desde localStorage y asegúrate de que sea un número
    let cliente;
    const idModificar = localStorage.getItem('idModificar');
    for(let i = 0; i < Client.length; i++){
        if(idModificar == Client[i].id){
            cliente = Client[i];
        }
    }

    if (cliente) {
        cargarPaises();
        
        const paisSeleccionado = cliente.state_id;

        const divContenedor = document.querySelector('.form-group.row:nth-of-type(7)');
        const divContenedorCiudades = document.querySelector('.form-group.row:nth-of-type(8)');

        // Limpiar contenido de los contenedores de provincias, ciudades y código postal
        while (divContenedor.firstChild) {
            divContenedor.removeChild(divContenedor.firstChild);
        }

        while (divContenedorCiudades.firstChild) {
            divContenedorCiudades.removeChild(divContenedorCiudades.firstChild);
        }
        
        let provinciaID, ciudadID;
        const hayProvincias = Province.some(variable => variable.state_id === String(paisSeleccionado));

        if (hayProvincias) {
            console.log("Hay provincias");
            crearSelectProvincias(divContenedor);
            crearSelectCiudades(divContenedorCiudades);
            
            provinciaID = Province.find(variable => variable.name === cliente.province)?.id || "No especificado";
            ciudadID = City.find(variable => variable.name === cliente.city)?.id || "No especificado";
        } else {
            console.log("No hay provincias");
            crearInputProvincia(divContenedor);
            crearInputCiudades(divContenedorCiudades);

            provinciaID = cliente.province;
            ciudadID = cliente.city;
        }

        // Carga los datos en los campos del formulario
        document.getElementById('name').value = cliente.name;
        document.getElementById('address').value = cliente.address;
        document.getElementById('nif').value = cliente.nif;
        document.getElementById('phone').value = cliente.phone;
        document.getElementById('email').value = cliente.email;
        document.getElementById('state_id').value = paisSeleccionado;
        document.getElementById('cp').value = cliente.cp;

        if(hayProvincias){cargarProvincias();}
        document.getElementById('province').value = provinciaID;
        if(hayProvincias){cargarCiudades();}
        document.getElementById('city').value = ciudadID;

        console.log(paisSeleccionado);
        console.log(provinciaID);
        console.log(ciudadID);
    }
    else{
        console.log("Cliente no encontrado");
    }
}

// Nueva función para configurar los campos dinámicos
function crearContenedores() {
    // const paisSeleccionado = cliente.state_id;
    let paisSeleccionado = document.getElementById("state_id").value;

    const divContenedor = document.querySelector('.form-group.row:nth-of-type(7)');
    const divContenedorCiudades = document.querySelector('.form-group.row:nth-of-type(8)');

    // Limpiar contenido de los contenedores de provincias, ciudades y código postal
    while (divContenedor.firstChild) {
        divContenedor.removeChild(divContenedor.firstChild);
    }

    while (divContenedorCiudades.firstChild) {
        divContenedorCiudades.removeChild(divContenedorCiudades.firstChild);
    }
    
    const hayProvincias = Province.find(variable => variable.state_id === String(paisSeleccionado));

    if (hayProvincias) {
        crearSelectProvincias(divContenedor);
        crearSelectCiudades(divContenedorCiudades);
        
        cargarProvincias();
    } else {
        crearInputProvincia(divContenedor);
        crearInputCiudades(divContenedorCiudades);
    }
}

//función que carga comunidades autónomas en el select
function cargarPaises(){
    var selectPais = document.getElementById('state_id');
    State.forEach(function(pais){
        var opcion = document.createElement('option');
        opcion.value = pais.id;

        var nombreOpcion = document.createTextNode(pais.name);
        opcion.appendChild(nombreOpcion);

        selectPais.appendChild(opcion);
    });
}

function cargarProvincias(){
    var selectProvincia = document.getElementById('province');
    var paisSeleccionado = document.getElementById("state_id").value;

    var opcion = document.createElement('option');
    opcion.value = 0;
    var nombreOpcion = document.createTextNode('Seleccione una provincia');
    opcion.appendChild(nombreOpcion);
    selectProvincia.appendChild(opcion);

    while (selectProvincia.options.length > 1) {
        selectProvincia.remove(1);
    }

    Province.forEach(function(provincia){
        if (provincia.state_id === paisSeleccionado) {
            var opcion = document.createElement('option');
            opcion.value = provincia.id;
    
            var nombreOpcion = document.createTextNode(provincia.name);
            opcion.appendChild(nombreOpcion);
    
            selectProvincia.appendChild(opcion);
        }
    });
}

function cargarCiudades(){
    var selectCiudad = document.getElementById("city");
    var provinciaSeleccionada = document.getElementById("province").value;

    var opcion = document.createElement('option');
    opcion.value = 0;
    var nombreOpcion = document.createTextNode("Seleccione una ciudad");
    opcion.appendChild(nombreOpcion);
    selectCiudad.appendChild(opcion);

    while (selectCiudad.options.length > 1) {
        selectCiudad.remove(1);
    }

    City.forEach(function(ciudad){
        if (ciudad.province_id === provinciaSeleccionada) {
            var opcion = document.createElement('option');
            opcion.value = ciudad.id;

            var nombreOpcion = document.createTextNode(ciudad.name);
            opcion.appendChild(nombreOpcion);

            selectCiudad.appendChild(opcion);
        }
    });
}

// Función para crear el select de provincias
function crearSelectProvincias(contenedor){
    // Crear el label para el input de provincia
    var labelProvincia = document.createElement('label');
    labelProvincia.setAttribute('for', 'province'); // Asegúrate de que el 'for' coincida con el ID del input
    labelProvincia.className = 'col-sm-3 col-form-label'; // Clase del label
    labelProvincia.textContent = 'Selecciona una provincia:'; // Texto del label

    var divInput = document.createElement('div');
    divInput.className = 'col-sm-9';

    //Crear el select
    var selectProvincia = document.createElement('select');
    selectProvincia.className = 'form-control';
    selectProvincia.name = 'province'; // Cambia el nombre si es necesario
    selectProvincia.id = 'province';
    selectProvincia.required = true;
    selectProvincia.setAttribute('onchange', 'cargarCiudades()');
    selectProvincia.disabled = true;

    while (selectProvincia.options.length > 0) {
        selectProvincia.remove(0); // Elimina la primera opción hasta que no queden más
    }

    var br = document.createElement('br');

    contenedor.appendChild(labelProvincia);
    divInput.appendChild(selectProvincia);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);
}

function crearInputProvincia(contenedor) {
    // Crear el label para el input de provincia
    var labelProvincia = document.createElement('label');
    labelProvincia.setAttribute('for', 'province'); // Asegúrate de que el 'for' coincida con el ID del input
    labelProvincia.className = 'col-sm-3 col-form-label'; // Clase del label
    var text = document.createTextNode ('Selecciona una provincia:');
    labelProvincia.appendChild(text);

    var divInput = document.createElement('div');
    divInput.className = 'col-sm-9';

    // Crear el input de provincia
    var inputProvincia = document.createElement('input');
    inputProvincia.type = 'text';
    inputProvincia.className = 'form-control'; // Clase del input
    inputProvincia.id = 'province'; // Cambiado para que sea único
    inputProvincia.placeholder = 'Teruel'; // Placeholder
    inputProvincia.pattern = '[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]{0,19}'; // Patrón de validación
    inputProvincia.required = true; // Campo requerido
    var br = document.createElement('br');

    // Agregar el label y el input al div de provincia
    contenedor.appendChild(labelProvincia);
    divInput.appendChild(inputProvincia);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);
}

function crearInputCiudades(contenedor) {
    // Crear el label para el input de provincia
    var labelCiudades = document.createElement('label');
    labelCiudades.setAttribute('for', 'city'); // Asegúrate de que el 'for' coincida con el ID del input
    labelCiudades.className = 'col-sm-3 col-form-label'; // Clase del label
    var text = document.createTextNode ('Selecciona una ciutat:');
    labelCiudades.appendChild(text);

    var divInput = document.createElement('div');
    divInput.className = 'col-sm-9';

    // Crear el input de provincia
    var inputCiudades = document.createElement('input');
    inputCiudades.type = 'text';
    inputCiudades.className = 'form-control'; // Clase del input
    inputCiudades.id = 'city'; // Cambiado para que sea único
    inputCiudades.placeholder = 'Gandia'; // Placeholder
    inputCiudades.pattern = '[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]{0,39}'; // Patrón de validación
    inputCiudades.required = true; // Campo requerido
    var br = document.createElement('br');

    // Agregar el label y el input al div de provincia
    contenedor.appendChild(labelCiudades);
    divInput.appendChild(inputCiudades);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);
}

// Función para crear el select de provincias
function crearSelectCiudades(contenedor){
    // Crear el label para el input de provincia
    var labelCiutats = document.createElement('label');
    labelCiutats.setAttribute('for', 'city'); // Asegúrate de que el 'for' coincida con el ID del input
    labelCiutats.className = 'col-sm-3 col-form-label'; // Clase del label
    labelCiutats.textContent = 'Selecciona una ciutat:'; // Texto del label

    var divInput = document.createElement('div');
    divInput.className = 'col-sm-9';

    //Crear el select
    var selectCiutats = document.createElement('select');
    selectCiutats.className = 'form-control';
    selectCiutats.name = 'city'; // Cambia el nombre si es necesario
    selectCiutats.id = 'city';
    selectCiutats.required = true;
    selectCiutats.disabled = true;

    while (selectCiutats.options.length > 1) {
        selectCiutats.remove(1); // Elimina la primera opción hasta que no queden más
    }

    // cargarCiudades(selectCiutats);
    var br = document.createElement('br');

    contenedor.appendChild(labelCiutats);
    divInput.appendChild(selectCiutats);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);

    cargarCiudades();
}