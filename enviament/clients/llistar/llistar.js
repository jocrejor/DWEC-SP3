window.onload = main;

function main() {
    // thereIsUser();

    document.getElementById("altaCliente").addEventListener("click", altaCliente);
    cargarClientes();
    actualizarTabla();
}

function altaCliente(){
    window.location.assign("../alta/alta.html");
}

//carga y retorna el objeto clientes
async function cargarClientes(){
    const url = 'http://localhost:5001/';
    const clientes = await getData(url, "Client");
    return clientes;
}

//función para modificar un cliente en específico
async function modificarCliente(index){
    const url = 'http://localhost:5001/';
    const clientes = await getData(url, "Client");
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    localStorage.setItem("idModificar", cliente.id);

    window.location.assign("../modificar/modificar.html");
}

/*función para eliminar el cliente seleccionado
*se le pasa indice para indicarle el cliente en concreto
*/
function eliminarCliente(index){
    const clienteId = clientes[index].id;
    
    // await deleteData(url, "Client", clienteId);
    actualizarTabla();
}

async function visualizarCliente(index){
    const url = 'http://localhost:5001/';
    const clientes = await getData(url, "Client");
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    localStorage.setItem("idModificar", cliente.id);

    window.location.assign("../visualitzar/visualitzar.html");
}

//guarda los clientes en el local storage
function guardarClientes(clientes){
    localStorage.setItem('Client', JSON.stringify(clientes));     //guarda en un objeto el cliente
}

//actualiza toda la tabla con los nuevos clientes
async function actualizarTabla(){
    const tabla = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; //limpia toda la tabla antes de agregar todas las filas

    // const clientes = cargarClientes();      //carga en una constante todos los clientes

    const url = 'http://localhost:5001/';
    const clientes = await getData(url, "Client");
    
    //comprueba si hay clientes para decidir si mostrar la tabla
    if(clientes.length > 0){
        clientes.forEach((cliente, index) => {      //por cada cliente crea una linea
            let tabla = document.getElementById("files");
            let tr = document.createElement("tr");
            //crea el botón para modificar el cliente
            const botonModificar = document.createElement("button");
            const textoModificar = document.createTextNode("Modificar");
            botonModificar.appendChild(textoModificar);
            botonModificar.className = "btn btn-primary btn-lg";
            botonModificar.id =  "modificar";
            botonModificar.addEventListener("click", function() {
                modificarCliente(index);
            });
            let tdModificar = document.createElement("td");
            tdModificar.appendChild(botonModificar);
            tr.appendChild(tdModificar);
            tabla.appendChild(tr);
            
            //crea el botón para eliminar el cliente
            const botonEliminar = document.createElement("button");
            const textoEliminar = document.createTextNode("Esborrar");
            botonEliminar.appendChild(textoEliminar);
            botonEliminar.className = "btn btn-primary btn-lg";
            botonEliminar.onclick = function() {
                eliminarCliente(index);
            };
            let tdEliminar = document.createElement("td");
            tdEliminar.appendChild(botonEliminar);
            tr.appendChild(tdEliminar);
            tabla.appendChild(tr);

            //crea el botón para visualitzar el cliente
            const botonVisualizar = document.createElement("button");
            const textoVisualizar = document.createTextNode("Visualitzar");
            botonVisualizar.appendChild(textoVisualizar);
            botonVisualizar.className = "btn btn-primary btn-lg";
            botonVisualizar.onclick = function() {
                visualizarCliente(index);
            };
            let tdVisualizar = document.createElement("td");
            tdVisualizar.appendChild(botonVisualizar);
            tr.appendChild(tdVisualizar);
            tabla.appendChild(tr);           

            //crea y añade el número de ID
            const textoId = document.createTextNode(cliente.id);
            let tdId = document.createElement("td");
            tdId.appendChild(textoId);
            tr.appendChild(tdId);
            tabla.appendChild(tr);

            //crea y añade el nombre del cliente
            const textoNombre = document.createTextNode(cliente.name);
            let tdNombre = document.createElement("td");
            tdNombre.appendChild(textoNombre);
            tr.appendChild(tdNombre);
            tabla.appendChild(tr);

            //crea y añade el dni del cliente
            const textoDni = document.createTextNode(cliente.nif);
            let tdDni = document.createElement("td");
            tdDni.appendChild(textoDni);
            tr.appendChild(tdDni);
            tabla.appendChild(tr);

            //crea y añade el teléfono del cliente
            const textoTelefono = document.createTextNode(cliente.phone);
            let tdTelefono = document.createElement("td");
            tdTelefono.appendChild(textoTelefono);
            tr.appendChild(tdTelefono);
            tabla.appendChild(tr);

            //crea y añade el correo del cliente
            const textoCorreo = document.createTextNode(cliente.email);
            let tdCorreo = document.createElement("td");
            tdCorreo.appendChild(textoCorreo);
            tr.appendChild(tdCorreo);
            tabla.appendChild(tr);
        });
        document.getElementById('clientesTable').style.display = ''; //muestra la tabla
    }
    else{
        document.getElementById('clientesTable').style.display = 'none'; //oculta la tabla si no hay clientes
    }
}