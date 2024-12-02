window.onload = function () {
    replenaSelectTransportistes();
    replenaSelectClients();
    replenarProductes();
    carregarDadesModificacio();

    document.getElementById("btnGuardarModificacions").addEventListener("click", validarFormulari);
};

let idAEditar = null;

// Cargar datos de la orden seleccionada para modificar
function carregarDadesModificacio() {
    let ordreSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));
    let ordresLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    let ordresLine = JSON.parse(localStorage.getItem("orderShipping")) || [];

    if (ordreSeleccionada) {
        let orderLine = ordresLine.find(o => o.id === ordreSeleccionada.id);
        let ordre = ordresLineShipping.find(o => o.id === ordreSeleccionada.id);

        if (orderLine && ordre) {
            document.getElementById("client").value = orderLine.client_id || "";
            document.getElementById("carrier").value = orderLine.carrier_id || "";
            document.getElementById("product").value = ordre.product || "";
            document.getElementById("quantitat").value = ordre.quantity || "";

            const estadoMap = {
                "pendiente": "Pendent",
                "preparandose": "Preparant-se",
                "preparada": "Preparada",
                "envio": "Enviament"
            };

            console.log("Estado recuperado:", ordre.estado); // Verificar estado recuperado
            document.getElementById("estado").value = estadoMap[ordre.estado] || "";

            if (ordre.fechaEnvio) {
                let fecha = new Date(ordre.fechaEnvio);
                let fechaFormateada = fecha.toISOString().slice(0, 10); 
                document.getElementById("fechaEnvio").value = fechaFormateada;
            } else {
                document.getElementById("fechaEnvio").value = "";
            }
        }
        idAEditar = ordreSeleccionada.id;
    }

    localStorage.removeItem("ordreSeleccionada");
}


// Validar el formulario antes de guardar las modificaciones
function validarFormulari() {
    esborrarError();
    if (
        validarCamp("client", "Has d'introduir un client") &&
        validarCamp("carrier", "Has d'introduir un transportista") &&
        validarCamp("product", "Has d'indicar un producte") &&
        validarQuantitat() &&
        validarCamp("estado", "Has d'indicar un estat vàlid") &&
        validarCamp("fechaEnvio", "Has d'indicar una data d'enviament vàlida")
    ) {
        guardarModificacions();
    }
}

// Validar un campo específico del formulario
function validarCamp(id, missatge) {
    let element = document.getElementById(id);
    if (!element.checkValidity() || !element.value) {
        error(element, missatge);
        return false;
    }
    return true;
}

// Validar el campo cantidad
function validarQuantitat() {
    let quantitat = document.getElementById("quantitat");
    if (!quantitat.checkValidity() || quantitat.value <= 0) {
        error(quantitat, "Has d'indicar una quantitat vàlida");
        return false;
    }
    return true;
}

function replenaSelectClients () {
    var clientSeleccionat = document.getElementById("client");
    
    Client.forEach(clients => {
        var option   = document.createElement("option");
        var text     = document.createTextNode(clients.name);
        option.value = clients.name;
        option.appendChild(text);
        clientSeleccionat.appendChild(option);       
    });
}

/* replenarProductes: Funció que replena el input de productes */
function replenarProductes () {
    var producteSeleccionat = document.getElementById("product");

    Product.forEach(products => {
        var option   = document.createElement("option");
        var text     = document.createTextNode(products.name);

        option.value = products.name;
        option.appendChild(text);
        producteSeleccionat.appendChild(option);       
    });

}

/** replenaSelectTransportistes: Funció que replena el select dels transportistes a partir del JSON
*/
function replenaSelectTransportistes () {
    var transportistaSeleccionat = document.getElementById("carrier");

    Carriers.forEach(carrier => {    
        var option   = document.createElement("option");
        var text     = document.createTextNode(carrier.name);

        option.value = carrier.name;
        option.appendChild(text);
        transportistaSeleccionat.appendChild(option);
    });
}

// Mostrar mensaje de error en el formulario
function error(element, missatge) {
    let textError = document.createTextNode(missatge);
    let elementError = document.getElementById("missatgeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

// Limpiar errores del formulario
function esborrarError() {
    const formElements = document.forms[0].elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].classList.remove("error");
    }
    document.getElementById("missatgeError").replaceChildren();
}

// Guardar las modificaciones en el localStorage
function guardarModificacions() {
    let ordresLineShipping = JSON.parse(localStorage.getItem("orderLineShipping")) || [];
    let ordresLine = JSON.parse(localStorage.getItem("orderShipping")) || [];

    let indexOrderLine = ordresLine.findIndex(o => o.id === idAEditar);
    let indexOrdreLineShipping = ordresLineShipping.findIndex(o => o.id === idAEditar);

    if (indexOrderLine !== -1 && indexOrdreLineShipping !== -1) {
        ordresLine[indexOrderLine] = {
            ...ordresLine[indexOrderLine],
            client_id: document.getElementById("client").value,
            carrier_id: document.getElementById("carrier").value,
            ordershipping_status: document.getElementById("estado").value,
            shipping_date: document.getElementById("fechaEnvio").value 
        };

        ordresLineShipping[indexOrdreLineShipping] = {
            ...ordresLineShipping[indexOrdreLineShipping],
            product: document.getElementById("product").value,
            quantity: parseInt(document.getElementById("quantitat").value, 10),
            estado: document.getElementById("estado").value,
            fechaEnvio: document.getElementById("fechaEnvio").value
        };

        localStorage.setItem("orderShipping", JSON.stringify(ordresLine));
        localStorage.setItem("orderLineShipping", JSON.stringify(ordresLineShipping));
        alert("Les modificacions s'han guardat correctament!");
        window.location.href = "../llistat/llistatOrdres.html";
    } else {
        alert("No s'ha trobat l'ordre per modificar.");
    }
}