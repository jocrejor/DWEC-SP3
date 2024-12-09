//let url = 'http://node.daw.iesevalorpego.es:3001/';


window.addEventListener("load", main);



async function main() {
    document.getElementById("nouTransportista").addEventListener("click", nouTransportista);
    arrCarriers = await getData(url, 'Carriers'); // Cargar datos iniciales
    if (arrCarriers) {
        actualizarTabla(); // Renderizar todos los transportistas
        configurarFiltros(); // Configurar eventos de filtros
    } else {
        console.error("Error al cargar transportistas.");
    }
}


$(document).ready(function () {
    $('#filterIcon').on('click', function () {
        $('.filterSection').slideToggle();
        const $filterSection = $('.filterSection');
        
        if ($filterSection.css('display') != 'none') {
            $filterSection.css('display', 'flex');
        } else {
            $filterSection.css('display', 'none');
        }
    });

    $('#applyFilter').on('click', function () {
        const filterNombre = $('#nombreFilter').val().toLowerCase();
        const filterDni = $('#dniFilter').val().toLowerCase();
        const filterTelefono = $('#telefonoFilter').val().toLowerCase();
        const filterCorreu = $('#correuFilter').val().toLowerCase();

        actualizarTabla(filterNombre, filterDni, filterTelefono, filterCorreu);
    });
});


async function nouTransportista() {
    // Redirigir a la pàgina d'alta de transportistes
    window.location.assign("../alta/altaTransportistes.html");
}

function configurarFiltros() {
    document.getElementById("applyFilter").addEventListener("click", () => {
        const filterNombre = document.getElementById("nombreFilter").value.toLowerCase();
        const filterDni = document.getElementById("dniFilter").value.toLowerCase();
        const filterTelefono = document.getElementById("telefonoFilter").value.toLowerCase();
        const filterCorreo = document.getElementById("correoFilter").value.toLowerCase();

        actualizarTabla(filterNombre, filterDni, filterTelefono, filterCorreo);
    });
}

function actualizarTabla(filterNombre = '', filterDni = '', filterTelefono = '', filterCorreo = '') {
    let url = 'http://node.daw.iesevalorpego.es:3001/';
    const tabla = document.getElementById("files");
    tabla.innerHTML = ''; // Limpia la tabla antes de agregar las nuevas filas

    const transportistasFiltrados = arrCarriers.filter(carrier => {
        return (
            (filterNombre === '' || carrier.name.toLowerCase().includes(filterNombre)) &&
            (filterDni === '' || carrier.nif.toLowerCase().includes(filterDni)) &&
            (filterTelefono === '' || carrier.phone.toLowerCase().includes(filterTelefono)) &&
            (filterCorreo === '' || carrier.email.toLowerCase().includes(filterCorreo))
        );
    });

    if (transportistasFiltrados.length > 0) {
        transportistasFiltrados.forEach(carrier => {
            const tr = document.createElement("tr");

            // Botó "Esborrar"
            const tdEsborrar = document.createElement("td");
            const btnEsborrar = document.createElement("button");
            btnEsborrar.className = "btn btn-danger btn-log";
            btnEsborrar.textContent = "Esborrar";
            btnEsborrar.onclick = function () { esborrar(carrier.id); };
            tdEsborrar.appendChild(btnEsborrar);
            tr.appendChild(tdEsborrar);

            // Botó "Visualitzar"
            const tdVisualitzar = document.createElement("td");
            const btnVisualitzar = document.createElement("button");
            btnVisualitzar.className = "btn btn-warning btn-log";
            btnVisualitzar.textContent = "Visualitzar";
            btnVisualitzar.onclick = function () { visualitzar(carrier); };
            tdVisualitzar.appendChild(btnVisualitzar);
            tr.appendChild(tdVisualitzar);

            // Botó "Modificar"
            const tdModificar = document.createElement("td");
            const btnModificar = document.createElement("button");
            btnModificar.className = "btn btn-warning btn-log";
            btnModificar.textContent = "Modificar";
            btnModificar.onclick = function () { modificar(carrier); };
            tdModificar.appendChild(btnModificar);
            tr.appendChild(tdModificar);

            // Datos
            tr.appendChild(crearTd(carrier.name));
            tr.appendChild(crearTd(carrier.id));
            tr.appendChild(crearTd(carrier.nif));
            tr.appendChild(crearTd(carrier.phone));
            tr.appendChild(crearTd(carrier.email));
            tr.appendChild(crearTd(carrier.address, true));
            tr.appendChild(crearTd(carrier.state, true));
            tr.appendChild(crearTd(carrier.province, true));
            tr.appendChild(crearTd(carrier.city, true));
            tr.appendChild(crearTd(carrier.cp, true));

            tabla.appendChild(tr);
        });
    } else {
        const noResultRow = document.createElement("tr");
        const noResultCell = document.createElement("td");
        noResultCell.colSpan = 13;
        noResultCell.textContent = "No s'han trobat transportistes";
        noResultCell.className = "text-center";
        noResultRow.appendChild(noResultCell);
        tabla.appendChild(noResultRow);
    }
}





function crearTd(text, ocult = false) {
  const td = document.createElement("td");
  td.textContent = text;
  if (ocult) {
      td.classList.add("ocult");
  }
  return td;
}


async function esborrar(id) {
    try {
        await deleteData(url, 'Carriers', id); // Eliminar transportista
        actualizarTabla(); // Refrescar tabla
    } catch (error) {
        console.error("Error al esborrar el transportista:", error);
    }
}



async function modificar(carrier) {
    // Guardar els valors del transportista seleccionat al localStorage
    localStorage.setItem("modTransportista", JSON.stringify(carrier));
    window.location.assign("../modificar/modificarTransportistes.html"); // Redirigir a la pàgina de modificació
}

async function visualitzar(carrier) {
    localStorage.setItem("modTransportista", JSON.stringify(carrier));
    window.location.assign("../visualitzar/visualitzarTransportistes.html");
}