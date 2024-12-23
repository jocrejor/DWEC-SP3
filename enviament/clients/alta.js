window.onload = iniciar;

function iniciar() {
    document.getElementById("botonAlta").addEventListener("click", validar, false);
    cargarPaises();
    cargarProvincias();
    vaciarCampos();
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if(
        validarNombre()     && 
        validarDomicilio()  && 
        validarDNI()        && 
        validarTelefono()   && 
        validarCorreo()     &&
        validarPais()       &&
        validarProvincia()  &&
        validarCiudad()     &&
        validarCP()){

        enviarFormulari();
        return true;
    }
    else{
        return false;
    }
}

function obtenerNuevoIdCliente() {
    // Obtener el último ID almacenado en localStorage
    let ultimoId = parseInt(localStorage.getItem("ultimoIdCliente"), 10) || 0;

    // Incrementar el ID para el nuevo cliente
    const nuevoId = ultimoId + 1;

    // Guardar el nuevo último ID en localStorage
    localStorage.setItem("ultimoIdCliente", nuevoId);

    return nuevoId;
}


//valida el nombre o razon social
function validarNombre(){
    const usernameField = document.getElementById('name');

    if(!usernameField.checkValidity()){
        if(usernameField.validity.valueMissing){
            error(usernameField, "El nom es obligatori.");
        }
        else if(usernameField.validity.patternMismatch){
            error(usernameField, "El nom ha de tindre entre 1 y 60 caracters, començar per majúscula y sols poden ser lletres.");
        }
        return false;
    }
    else{   
        return true;
    }
}
//valida el domicilio
function validarDomicilio(){
    const domicilioField = document.getElementById('address');

    if(!domicilioField.checkValidity()){
        if(domicilioField.validity.valueMissing){
            error(domicilioField, "El domicili es obligatori.");
        }
        else if(domicilioField.validity.patternMismatch){
            error(domicilioField, "El domicili no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el DNI
function validarDNI(){
    const dniField = document.getElementById('nif');

    if(!dniField.checkValidity()){
        if(dniField.validity.valueMissing){
            error(dniField,"El dni es obligatori.");
        }
        else if(dniField.validity.patternMismatch){
            error(dniField,"El dni no es válid.");
        }
        return false;
    }
    else{   
        return true;
    }
}
//valida el teléfono
function validarTelefono(){
    const telefonoField = document.getElementById('phone');

    if(!telefonoField.checkValidity()){
        if(telefonoField.validity.valueMissing){
            error(telefonoField,"El teléfon es obligatori.");
        }
        else if(telefonoField.validity.patternMismatch){
            error(telefonoField,"El teléfon no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el correo
function validarCorreo(){
    const correoField = document.getElementById('email');

    if(!correoField.checkValidity()){
        if(correoField.validity.valueMissing){
            error(correoField,"El correu es obligatori.");
        }
        else if(correoField.validity.patternMismatch){
            error(correoField,"El correu no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el pais
function validarPais(){
    const paisField = document.getElementById('state_id');

    if(!paisField.checkValidity()){
        if(paisField.validity.valueMissing){
            error(paisField,"El pais es obligatori.");
        }
        else if(paisField.validity.patternMismatch){
            error(paisField,"El pais no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida la provincia
function validarProvincia(){
    const provinciaField = document.getElementById('province');

    if(!provinciaField.checkValidity()){
        if(provinciaField.validity.valueMissing){
            error(provinciaField,"La provincia es obligatoria.");
        }
        else if(provinciaField.validity.patternMismatch){
            error(provinciaField,"La provincia no es válida.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida la ciudad
function validarCiudad(){
    const ciudadField = document.getElementById('city');

    if(!ciudadField.checkValidity()){
        if(ciudadField.validity.valueMissing){
            error(ciudadField,"La ciutat es obligatoria.");
        }
        else if(ciudadField.validity.patternMismatch){
            error(ciudadField,"La ciutat no es válida.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el codigo postal
function validarCP(){
    const cpField = document.getElementById('cp');

    if(!cpField.checkValidity()){
        if(cpField.validity.valueMissing){
            error(cpField,"El codi postal es obligatori.");
        }
        else if(cpField.validity.patternMismatch){
            error(cpField,"El codi postal no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add( "error" )
    element.focus();
}

function esborrarError() {
    let formulari = document.forms[0].elements;
        for (let ele of formulari) {
            ele.classList.remove("error")
        }    
    document.getElementById("missatgeError").replaceChildren();
}

// enviar dades
function enviarFormulari() {
    // Grabar al localStorage
    const nombre = document.getElementById('name').value;
    const domicilio = document.getElementById('address').value;
    const dni = document.getElementById('nif').value;
    const telefono = document.getElementById('phone').value;
    const correo = document.getElementById('email').value;
    var pais = document.getElementById('state_id').value;
    var provincia = document.getElementById('province').value;
    var ciudad = document.getElementById('city').value;
    const cp = document.getElementById('cp').value;

    const clientes = JSON.parse(localStorage.getItem('client')) || [];

    //inicializa la variable para el mensaje de error
    let mensajeError = "";

    //verifica si ya existe un cliente con el mismo DNI
    const dniExistente = clientes.some(cliente => cliente.nif === dni);
    if(dniExistente) {
        mensajeError += "Ya existeix un client amb el mateix DNI.\n";
    }

    //verifica si ya existe un cliente con el mismo teléfono
    const telefonoExistente = clientes.some(cliente => cliente.phone === telefono);
    if(telefonoExistente) {
        mensajeError += "Ya existeix un client amb el mateix teléfono.\n";
    }

    //verifica si ya existe un cliente con el mismo correo
    const correoExistente = clientes.some(cliente => cliente.email === correo);
    if(correoExistente) {
        mensajeError += "Ya existeix un client amb el mateix correo.\n";
    }

    //si hay algún error, muestra el mensaje y evita que se guarde el cliente
    if(mensajeError) {
        alert(mensajeError);
        return;  //detiene la función si hay algun duplicado
    }

    if(parseInt(pais) === 194){
        const provinciaNombre = Province.find(variable => variable.id === provincia)?.name || "No especificado";
        const ciudadNombre = City.find(variable => variable.id === ciudad)?.name || "No especificado";
    
        provincia = provinciaNombre;
        ciudad = ciudadNombre;
    }

    const cliente = { 
        id:obtenerNuevoIdCliente(),
        name:nombre, 
        address:domicilio, 
        nif:dni, 
        phone:telefono, 
        email:correo,
        state_id:pais,
        province:provincia,
        city:ciudad,
        cp:cp
    };

    clientes.push(cliente);                                         //agrega un nuevo cliente al array
    localStorage.setItem('client', JSON.stringify(clientes));     //guarda en localStorage
    
    setTimeout(function (){
        vaciarCampos();
    },1000);
}

//carga y retorna el objeto clientes
function cargarClientes(){
    const clientes = JSON.parse(localStorage.getItem('client')) || [];    //coge los clientes almacenados en el local storage y los devuelve
    return clientes;
}

//función que vacía todos los campos del formulario
function vaciarCampos(){        
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('nif').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('state_id').value = '';
    document.getElementById('province').value = '';
    document.getElementById('city').value = '';
    document.getElementById('cp').value = '';
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

function cargarProvincias() {
    var paisSeleccionado = document.getElementById('state_id').value;
    var divContenedor = document.querySelector('.form-group.row:nth-of-type(7)');
    var divContenedorCiudades = document.querySelector('.form-group.row:nth-of-type(8)');
    var divContenedorCodigoPostal = document.querySelector('.form-group.row:nth-of-type(9)');

    // Limpiar contenido de los contenedores de provincias, ciudades y código postal
    while (divContenedor.firstChild) {
        divContenedor.removeChild(divContenedor.firstChild);
    }

    while (divContenedorCiudades.firstChild) {
        divContenedorCiudades.removeChild(divContenedorCiudades.firstChild);
    }

    while (divContenedorCodigoPostal.firstChild) {
        divContenedorCodigoPostal.removeChild(divContenedorCodigoPostal.firstChild);
    }

    if (paisSeleccionado == 194) { // Si se selecciona España
        crearSelectProvincias(divContenedor); // Crear el select de provincias
        crearSelectCiudades(divContenedorCiudades); // Crear el select de ciudades
        crearInputCodigoPostal(divContenedorCodigoPostal);
    } else if (paisSeleccionado && paisSeleccionado != 194) {
        // Crear inputs alternativos si no es España
        crearInputProvincia(divContenedor);
        crearInputCiudades(divContenedorCiudades);
        crearInputCodigoPostal(divContenedorCodigoPostal);
    }
}


function cargarCiudades() {
    var provinciaSeleccionada = document.getElementById('province').value;
    var selectCiudad = document.getElementById('city');
    // limpiar el select de ciudades, manteniendo solo la opción inicial
    while (selectCiudad.options.length > 1) {
        selectCiudad.remove(1);
    }
    
    // agregar las ciudades correspondientes a la provincia seleccionada
    City.forEach(function(ciudad) {
        if (ciudad.province_id === provinciaSeleccionada) {
            var opcion = document.createElement('option');
            opcion.value = ciudad.id; // asigna el id de la ciudad como valor
            opcion.textContent = ciudad.name; // asigna el nombre de la ciudad como texto
            selectCiudad.appendChild(opcion); // añade la opción al select de ciudades
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

    // Añadir el input al contenedor col-sm-9
    divColSm9.appendChild(input);

    // Añadir la etiqueta y el input al contenedor principal
    contenedor.appendChild(label);
    contenedor.appendChild(divColSm9);
}