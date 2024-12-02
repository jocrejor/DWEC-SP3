$(document).ready(function () {
    main();

    // Mostrar/ocultar la sección de filtros
    $('#filterIcon').on('click', function () {
        $('.filterSection').slideToggle();
        const $filterSection = $('.filterSection');
        
        if ($filterSection.css('display') != 'none') {
            $filterSection.css('display', 'flex'); // Muestra como flex
        } else {
            $filterSection.css('display', 'none'); // Oculta
        }
    });

    //evento para los filtros
    $('#applyFilter').on('click', function() {
        const filterNombre = $('#nombreFilter').val().toLowerCase();
        const filterDni = $('#dniFilter').val().toLowerCase();
        const filterTelefono = $('#telefonoFilter').val().toLowerCase();
        const filterCorreu = $('#correuFilter').val().toLowerCase();
        
        
        actualizarTabla(filterNombre, filterDni, filterTelefono, filterCorreu); // Pasamos el valor del filtro directamente a actualizarTabla
    });
});

let clientes = [];

async function main() {
    // thereIsUser();
    document.getElementById("altaCliente").addEventListener("click", altaCliente);
    clientes = await getData(url, "Client");
    if(clientes){
        actualizarTabla();
        autocompletarFiltros();
    }
    else {
        console.error("No se han encontrado clientes.");
    }
}

function autocompletarFiltros() {
    if (clientes.length > 0) {
        var clienteNames = clientes.map(cliente => cliente.name); // Obtener solo los nombres de los clientes
        $('#nombreFilter').autocomplete({
            source: clienteNames
        });

        var clienteDnis = clientes.map(cliente => cliente.nif); // Obtener solo los nombres de los clientes
        $('#dniFilter').autocomplete({
            source: clienteDnis
        });

        var clienteTelefonos = clientes.map(cliente => cliente.phone); // Obtener solo los nombres de los clientes
        $('#telefonoFilter').autocomplete({
            source: clienteTelefonos
        });

        var clienteCorreos = clientes.map(cliente => cliente.email); // Obtener solo los nombres de los clientes
        $('#correuFilter').autocomplete({
            source: clienteCorreos
        });
    }
    else {
        console.error('No se han cargado los clientes');
    }
}

function altaCliente(){
    window.location.assign("../alta/alta.html");
}

//función para modificar un cliente en específico
async function modificarCliente(index){
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    // localStorage.setItem("cliente", JSON.stringify(cliente));
    localStorage.setItem("idModificar", cliente.id);

    window.location.assign("../modificar/modificar.html");
}

/*función para eliminar el cliente seleccionado
*se le pasa indice para indicarle el cliente en concreto
*/
async function eliminarCliente(index){
    const cliente = clientes[index];        //obtiene el cliente seleccionado
    await deleteData(url, "Client", cliente.id);
    actualizarTabla();
}

async function visualizarCliente(index){
    const cliente = clientes[index];        //obtiene el cliente seleccionado
    // localStorage.setItem("cliente", JSON.stringify(cliente));
    localStorage.setItem("idModificar", cliente.id);
    window.location.assign("../visualitzar/visualitzar.html");
}

function actualizarTabla(filterNombre = '', filterDni = '', filterTelefono = '', filterCorreu = '') {
    const tabla = $('#clientesTable').find('tbody');
    tabla.empty(); //limpia la tabla

    // Filtra los clientes según los filtros proporcionados
    const clientesFiltrados = clientes.filter(cliente => {
        return (
            (filterNombre === '' || cliente.name.toLowerCase().includes(filterNombre)) &&
            (filterDni === '' || cliente.nif.toLowerCase().includes(filterDni)) &&
            (filterTelefono === '' || cliente.phone.toLowerCase().includes(filterTelefono)) &&
            (filterCorreu === '' || cliente.email.toLowerCase().includes(filterCorreu))
        );
    });

    // Comprueba si hay clientes filtrados para decidir si mostrar la tabla
    if (clientesFiltrados.length > 0) {
        clientesFiltrados.forEach((cliente, index) => {
            let tr = $('<tr></tr>'); // Crear una nueva fila usando jQuery

            // Crear el botón para modificar el cliente
            let botonModificar = $('<button class="btn btn-primary btn-lg">Modificar</button>');
            botonModificar.on('click', function() {
                modificarCliente(index);
            });
            tr.append($('<td></td>').append(botonModificar)); // Agregar la celda a la fila

            // Crear el botón para eliminar el cliente
            let botonEliminar = $('<button class="btn btn-primary btn-lg">Esborrar</button>');
            botonEliminar.on('click', function() {
                eliminarCliente(index);
            });
            tr.append($('<td></td>').append(botonEliminar)); // Agregar la celda a la fila

            // Crear el botón para visualizar el cliente
            let botonVisualizar = $('<button class="btn btn-primary btn-lg">Visualitzar</button>');
            botonVisualizar.on('click', function() {
                visualizarCliente(index);
            });
            tr.append($('<td></td>').append(botonVisualizar)); // Agregar la celda a la fila

            // Crear y agregar el ID del cliente
            tr.append($('<td></td>').text(cliente.id));

            // Crear y agregar el nombre del cliente
            tr.append($('<td></td>').text(cliente.name));

            // Crear y agregar el DNI/NIF del cliente
            tr.append($('<td></td>').text(cliente.nif));

            // Crear y agregar el teléfono del cliente
            tr.append($('<td></td>').text(cliente.phone));

            // Crear y agregar el correo del cliente
            tr.append($('<td></td>').text(cliente.email));

            // Agregar la fila al cuerpo de la tabla
            tabla.append(tr);
        });

        // Mostrar la tabla con una animación suave (fadeIn)
        $('#clientesTable').fadeIn();
        $('#noClientesMessage').fadeOut();
    } else {
        // Ocultar la tabla si no hay clientes filtrados (fadeOut)
        $('#clientesTable').fadeOut();
        $('#noClientesMessage').fadeIn();
    }
}