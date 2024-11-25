window.onload = main;

async function main() {    
    // Recupera el ID del cliente desde localStorage y asegúrate de que sea un número
    const idCliente = parseInt(localStorage.getItem('idModificar'), 10);
    // Busca el cliente en el array Client utilizando el ID
    const url = 'http://localhost:5001/';
    const clientes = await getData(url, "Client");
    // const cliente = clientes.find(c => c.id === idCliente);

    const cliente = clientes[idCliente - 1];

    alert(cliente.name);
    if (cliente) {
        // Asegúrate de que cargarPaises esté bien definida para llenar el select de países
        cargarPaises();
        // Carga el país seleccionado
        var paisSeleccionado = cliente.state_id; // Asumiendo que state_id es el ID del país

        // Define los contenedores para las provincias, ciudades y código postal
        var divContenedor = document.querySelector('.form-group.row:nth-of-type(7)');
        var divContenedorCiudades = document.querySelector('.form-group.row:nth-of-type(8)');
        var divContenedorCodigoPostal = document.querySelector('.form-group.row:nth-of-type(9)');

        var provinciaID = "";
        var ciudadID = "";
        // Crea los selects o inputs dependiendo del país seleccionado
        if (paisSeleccionado == 194) { 
            crearSelectProvincias(divContenedor); 
            crearSelectCiudades(divContenedorCiudades);
            crearInputCodigoPostal(divContenedorCodigoPostal); 
            
            provinciaID = Province.find(variable => variable.name === cliente.province)?.id || "No especificado";
            ciudadID = City.find(variable => variable.name === cliente.city)?.id || "No especificado";
        }
        else{
            // Crear inputs alternativos si no es España
            crearInputProvincia(divContenedor); 
            crearInputCiudades(divContenedorCiudades); 
            crearInputCodigoPostal(divContenedorCodigoPostal); 

            provinciaID = cliente.province;
            ciudadID = cliente.city;
        }
        
        var provinciaSeleccionada = provinciaID;
        var selectCiudad = document.getElementById('city');
        
        // agregar las ciudades correspondientes a la provincia seleccionada
        City.forEach(function(ciudad) {
            if (ciudad.province_id === provinciaSeleccionada) {
                var opcion = document.createElement('option');
                opcion.value = ciudad.id; // asigna el id de la ciudad como valor
                opcion.textContent = ciudad.name; // asigna el nombre de la ciudad como texto
                selectCiudad.appendChild(opcion); // añade la opción al select de ciudades
            }
        }); 

        // Carga los datos en los campos del formulario
        document.getElementById('name').value = cliente.name;
        document.getElementById('address').value = cliente.address;
        document.getElementById('nif').value = cliente.nif;
        document.getElementById('phone').value = cliente.phone;
        document.getElementById('email').value = cliente.email;
        document.getElementById('state_id').value = paisSeleccionado;
        document.getElementById('province').value = provinciaID; 
        document.getElementById('city').value = ciudadID; 
        document.getElementById('cp').value = cliente.cp; 
    }
    else{
        console.log("Cliente no encontrado");
    }
}

//función que carga comunidades autónomas en el select
async function cargarPaises(){
    const url = 'http://localhost:5001/';
    const State = await getData(url, "State");

    var selectPais = document.getElementById('state_id');
    State.forEach(function(pais){
        var opcion = document.createElement('option');
        opcion.value = pais.id;

        var nombreOpcion = document.createTextNode(pais.name);
        opcion.appendChild(nombreOpcion);

        selectPais.appendChild(opcion);
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

    var optionProvincia =  document.createElement('option');   
    var text = document.createTextNode('Selecciona una provincia');
    optionProvincia.appendChild(text);
    selectProvincia.appendChild(optionProvincia);
    

    //Cargar las provincias
    Province.forEach(function(provincia) {
        var opcion = document.createElement('option');
        opcion.value = provincia.id; // Asegúrate de que 'id' esté disponible
        var optionText = document.createTextNode(provincia.name);
        opcion.appendChild(optionText);
        selectProvincia.appendChild(opcion);
    });
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
    inputProvincia.disabled = true;
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
    inputCiudades.disabled = true;
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

    while (selectCiutats.options.length > 0) {
        selectCiutats.remove(0); // Elimina la primera opción hasta que no queden más
    }

    var optionProvincia = document.createElement('option');   
    var text = document.createTextNode('Selecciona una ciutat');
    optionProvincia.appendChild(text);
    selectCiutats.appendChild(optionProvincia);
    var br = document.createElement('br');

    contenedor.appendChild(labelCiutats);
    divInput.appendChild(selectCiutats);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);
}

function crearInputCodigoPostal(contenedor) {
    // Crear la etiqueta
    var label = document.createElement('label');
    label.setAttribute('for', 'cp');
    label.classList.add('col-sm-3', 'col-form-label');
    label.textContent = 'Codi postal:';

    // Crear el contenedor para el input
    var divColSm9 = document.createElement('div');
    divColSm9.classList.add('col-sm-9');

    // Crear el input
    var input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.id = 'cp';
    input.placeholder = '46770';
    input.pattern = '{1,20}$'; // Pattern para un código postal de 5 dígitos
    input.required = true;
    input.disabled = true;

    // Añadir el input al contenedor col-sm-9
    divColSm9.appendChild(input);

    // Añadir la etiqueta y el input al contenedor principal
    contenedor.appendChild(label);
    contenedor.appendChild(divColSm9);
}

//función que vacía todos los campos del formulario
function listarCliente(){
    window.location.assign("../llistar/llistar.html");
}