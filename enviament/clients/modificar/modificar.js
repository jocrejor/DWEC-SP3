window.onload = main;

let Client;
let State;
let Province;
let City;

async function main() {
    document.getElementById("botonModificar").addEventListener("click", validar, false);
    Client = await getData(url, "Client");
    State = await getData(url, "State");
    Province = await getData(url, "Province");
    City = await getData(url, "City");
    // Recupera el ID del cliente desde localStorage y asegúrate de que sea un número
    let cliente;
    const idModificar = parseInt(localStorage.getItem('idModificar'), 10);
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
        const noHayProvincias = Province.some(variable => variable.state_id === paisSeleccionado);

        if (!noHayProvincias) {
            crearSelectProvincias(divContenedor);
            crearSelectCiudades(divContenedorCiudades);
            
            provinciaID = Province.find(variable => variable.name === cliente.province)?.id || "No especificado";
            ciudadID = City.find(variable => variable.name === cliente.city)?.id || "No especificado";
        } else {
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

        cargarProvincias();
        document.getElementById('province').value = provinciaID;
        cargarCiudades();
        document.getElementById('city').value = ciudadID;

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
    
    const noHayProvincias = Province.find(variable => variable.state_id === paisSeleccionado);

    if (noHayProvincias) {
        crearSelectProvincias(divContenedor);
        crearSelectCiudades(divContenedorCiudades);
        
        cargarProvincias();
    } else {
        crearInputProvincia(divContenedor);
        crearInputCiudades(divContenedorCiudades);
    }
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

// enviar dades
async function enviarFormulari() {
    const idModificar = parseInt(localStorage.getItem('idModificar'), 10);

    //inicializa la variable para el mensaje de error
    let mensajeError = "";

    const dni = document.getElementById('nif').value;
    const telefono = document.getElementById('phone').value;
    const correo = document.getElementById('email').value;

    //verifica si ya existe un cliente con el mismo DNI
    const dniExistente = Client.some(client => client.nif === dni && idModificar != client.id);
    if(dniExistente) {
        mensajeError += "Ya existeix un client amb el mateix DNI.\n";
    }
    
    //verifica si ya existe un cliente con el mismo teléfono
    const telefonoExistente = Client.some(client => client.phone === telefono && idModificar != client.id);
    if(telefonoExistente) {
        mensajeError += "Ya existeix un client amb el mateix teléfono.\n";
    }

    //verifica si ya existe un cliente con el mismo correo
    const correoExistente = Client.some(client => client.email === correo && idModificar != client.id);
    if(correoExistente) {
        mensajeError += "Ya existeix un client amb el mateix correo.\n";
    }

    //si hay algún error, muestra el mensaje y evita que se guarde el cliente
    if(mensajeError) {
        alert(mensajeError);
        return;  //detiene la función si hay algun duplicado
    }
    
    var paisSeleccionado = parseInt(document.getElementById("state_id").value, 10);
    var provinciaId, ciudadId;
    provinciaId = document.getElementById('province').value;
    ciudadId = document.getElementById('city').value;
    let noHayProvincias = Province.some(variable => variable.state_id === paisSeleccionado);

    if (!noHayProvincias) {
        //busca el nombre de la provincia y la ciudad usando los IDs de `cliente`
        const provinciaNombre = Province.find(variable => variable.id === provinciaId)?.name || "No especificado";
        const ciudadNombre = City.find(variable => variable.id === ciudadId)?.name || "No especificado";
    
        provinciaId = provinciaNombre;      //convierte el id de la provincia a nombre
        ciudadId = ciudadNombre;
    }

    let clienteModificar = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        nif: document.getElementById('nif').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        state_id: paisSeleccionado,
        province: provinciaId,
        city: ciudadId,
        cp: document.getElementById('cp').value
    };

    await updateId(url, "Client", idModificar, clienteModificar);

    setTimeout(function (){
        listarCliente();
    },1000);
}

//función que vacía todos los campos del formulario
function listarCliente(){
    window.location.assign("../llistar/llistar.html");
}