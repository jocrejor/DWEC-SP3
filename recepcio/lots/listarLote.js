window.onload = iniciar;

// Funció principal que inicialitza el script
function iniciar() {
    crearFormulari();
    // Carrega la llista de lots
    llistaLots();
    document.getElementById("alta").addEventListener("click", () => {
        // Redirigeix a la pàgina d'alta de lot
        document.location.href = "altaLote.html";
    });
    document.getElementById("torna").addEventListener("click", () => {
        // Redirigeix a la pàgina de llistat de productes
        document.location.href = "listarProducto.html";
    });
}


// Crear el formulari en DOM
function crearFormulari() {
    // Div principal
    const div = document.createElement("div");
    div.classList.add("container-fluid");
    document.body.appendChild(div);

    // Títol
    const titulo = document.createElement("h2");
    titulo.textContent = "Llistat de lots";
    div.appendChild(titulo);

    // Botó d'alta
    const botonAlta = document.createElement("button");
    botonAlta.id = "alta";
    botonAlta.className = "btn btn-primary my-3";
    botonAlta.textContent = "Nou lot";
    div.appendChild(botonAlta);

    // Botó torna
    const botonTorna = document.createElement("button");
    botonTorna.id = "torna";
    botonTorna.type = "button";
    botonTorna.className = "btn btn-primary my-3";
    botonTorna.textContent = "Torna";
    div.appendChild(botonTorna);

    // Taula principal
    const tabla = document.createElement("table");
    tabla.className = "table";
    div.appendChild(tabla);

    // Capçalera de la taula
    const head = document.createElement("thead");
    head.className = "thead-light";
    tabla.appendChild(head);

    // Fila d'encapçalament
    const fila = document.createElement("tr");
    head.appendChild(fila);

    // Encapçalaments de la taula
    const encabezados = [
        "Modificar", 
        "ID", 
        "Nom del lot", 
        "ID del producte", 
        "ID del proveïdor", 
        "Unitats totals", 
        "Data de producció", 
        "Data d'expiració"
    ];

    encabezados.forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        th.setAttribute("scope", "col");
        fila.appendChild(th);
    });

    // Cos de la taula
    const tablaBody = document.createElement("tbody");
    tablaBody.id = "tablaLot";
    tabla.appendChild(tablaBody);
}


// Carregar el formulari amb la informació d'un lot específic
function llistaLots() {
    let lotes = JSON.parse(localStorage.getItem("lot")) || [];
    let tabla = document.getElementById("tablaLot");

    // Neteja el contingut de la taula
    tabla.innerHTML = "";  

    lotes.forEach(lote => {
        // Crea una nova fila per a cada lot
        let row = tabla.insertRow();

        // Crear botons de modificar
        let cell0 = row.insertCell();
        const botonModificar = document.createElement("button");
        botonModificar.className = "btn btn-primary";
        botonModificar.innerText = "Modificar";
        botonModificar.addEventListener("click", () => {
            // Redirigeix a la pàgina de modificació del lot seleccionat
            modificarLot(lote.id);
        });
        cell0.appendChild(botonModificar);

        // Crear cel·les per a les dades del lot
        let id = document.createTextNode(lote.id);
        let name = document.createTextNode(lote.name);
        let product_id = document.createTextNode(lote.product_id);
        let supplier_id = document.createTextNode(lote.supplier_id);
        let quantity = document.createTextNode(lote.quantity);
        let production_date = document.createTextNode(lote.production_date);
        let expiration_date = document.createTextNode(lote.expiration_date);

        row.insertCell().appendChild(id);
        row.insertCell().appendChild(name);
        row.insertCell().appendChild(product_id);
        row.insertCell().appendChild(supplier_id);
        row.insertCell().appendChild(quantity);
        row.insertCell().appendChild(production_date);
        row.insertCell().appendChild(expiration_date);
    });
}

// Funció per modificar els lots
function modificarLot(id) {
    // Redirigeix a la pàgina de modificació amb l'ID del lot
    window.location.href = "./modificarLote.html?id=" + id;
}

