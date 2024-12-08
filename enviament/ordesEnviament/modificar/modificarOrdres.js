window.onload = function () {
    replenaSelectTransportistes();
    replenaSelectClients();
    replenarProductes();
    carregarDadesModificacio();

    // Configurar el evento para el botón de guardar modificaciones
    document.getElementById("btnGuardarModificacions").addEventListener("click", validarFormulari);
};

let idAEditar = null;

function carregarDadesModificacio() {
    const ordreSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));
    const ordresLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    const ordresLine = JSON.parse(localStorage.getItem("orderShipping")) || [];

    if (ordreSeleccionada) {
        const orderLine = ordresLine.find(o => o.id === ordreSeleccionada.id);
        const ordre = ordresLineShipping.find(o => o.id === ordreSeleccionada.id);

        if (ordre && orderLine) {
            document.getElementById("client").value = orderLine.client_id;
            document.getElementById("carrier").value = orderLine.carrier_id;
            document.getElementById("product").value = ordre.product;
            document.getElementById("quantitat").value = ordre.quantity;
            document.getElementById("estado").value = ordre.estado || ""; // Cargar el estado
            document.getElementById("fechaEnvio").value = ordre.fechaEnvio || ""; // Cargar la fecha de envío
        }

        idAEditar = ordreSeleccionada.id;
    }

    localStorage.removeItem("ordreSeleccionada");
}

// Validar formulario antes de guardar
function validarFormulari() {
    esborrarError();

    if (
        validarCamp("client", "Has d'introduir un client") &&
        validarCamp("carrier", "Has d'introduir un transportista") &&
        validarCamp("product", "Has d'indicar un producte") &&
        validarQuantitat() &&
        validarCamp("estado", "Has d'indicar un estat vàlida") &&
        validarCamp("fechaEnvio", "Has d'indicar una data de enviament")
    ) {
        guardarModificacions();
    }
}

// Validar un campo general (client, carrier, product, estado, fechaEnvio)
function validarCamp(id, missatge) {
    const element = document.getElementById(id);
    if (!element.checkValidity() || !element.value) {
        error(element, missatge);
        return false;
    }
    return true;
}

// Validar cantidad
function validarQuantitat() {
    const quantitat = document.getElementById("quantitat");
    if (!quantitat.checkValidity() || quantitat.value <= 0) {
        error(quantitat, "Has d'indicar una quantitat vàlida");
        return false;
    }
    return true;
}

function replenaSelectClients() {
    const clientSeleccionat = document.getElementById("client");
    const clients = JSON.parse(localStorage.getItem("clients")) || [];

    if (clients.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hi ha clients disponibles";
        clientSeleccionat.appendChild(option);
        return;
    }

    clients.forEach(client => {
        const option = document.createElement("option");
        option.value = client.name;
        option.textContent = client.name;
        clientSeleccionat.appendChild(option);
    });
}

// Llenar el select de productos desde localStorage
function replenarProductes() {
    const producteSeleccionat = document.getElementById("product");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        producteSeleccionat.appendChild(option);
    });
}

// Llenar el select de transportistas desde localStorage
function replenaSelectTransportistes() {
    const transportistaSeleccionat = document.getElementById("carrier");
    const carriers = JSON.parse(localStorage.getItem("carriers")) || [];

    carriers.forEach(carrier => {
        const option = document.createElement("option");
        option.value = carrier.name;
        option.textContent = carrier.name;
        transportistaSeleccionat.appendChild(option);
    });
}

// Mostrar error en el campo
function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

// Borrar errores previos
function esborrarError() {
    const formElements = document.forms[0].elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

function guardarModificacions() {
    const ordresLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    const ordresLine = JSON.parse(localStorage.getItem("orderShipping")) || [];

    const indexOrderLine = ordresLine.findIndex(o => o.id === idAEditar);
    const indexOrdreLineShipping = ordresLineShipping.findIndex(o => o.id === idAEditar);

    if (indexOrderLine !== -1 && indexOrdreLineShipping !== -1) {
        ordresLine[indexOrderLine] = {
            ...ordresLine[indexOrderLine],
            client_id: document.getElementById("client").value,
            carrier_id: document.getElementById("carrier").value,
        };

        ordresLineShipping[indexOrdreLineShipping] = {
            ...ordresLineShipping[indexOrdreLineShipping],
            product: document.getElementById("product").value,
            quantity: parseInt(document.getElementById("quantitat").value, 10),
            estado: document.getElementById("estado").value, // Guardar el estado
            fechaEnvio: document.getElementById("fechaEnvio").value, // Guardar la fecha de envío
        };

        // Guardar las modificaciones de nuevo en localStorage
        localStorage.setItem("orderShipping", JSON.stringify(ordresLine));
        localStorage.setItem("orderLineShipping", JSON.stringify(ordresLineShipping));

        alert("Les modificacions s'han guardat correctament!");

        window.location.href = "../llistat/llistatOrdres.html";
    } else {
        alert("No s'ha trobat l'ordre per modificar.");
    }
}
