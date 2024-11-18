window.onload = iniciar;

function iniciar() {
    crearFormulari ();
    document.getElementById("grava").addEventListener("click", validar, false); 
    document.getElementById("torna").addEventListener("click",()=>{
        document.location.href="./listarLote.html";
       });

    // Afegim events de validació per als camps específics
    document.getElementById("name").addEventListener("blur", validarNomLot, false);
    document.getElementById("product_id").addEventListener ("blur", validarIdProducte, false);
    document.getElementById("supplier_id").addEventListener("blur", validarIdProveidor, false);
    document.getElementById("quantity").addEventListener("blur", validarUnitats, false);
    document.getElementById("production_date").addEventListener("blur", validarDataProduccio, false);
    document.getElementById("expiration_date").addEventListener("blur", validarDataExpiracio, false);
}


// Creem el formulari amb el DOM
function crearFormulari() {
    // Crear contenidor principal
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    document.body.appendChild(divContainer);

    // Títol
    const titulo = document.createElement("h2");
    titulo.textContent = "Alta lot";
    divContainer.appendChild(titulo);

    // Formulari i taula
    const form = document.createElement("form");
    form.id = "formulari";
    divContainer.appendChild(form);

    const table = document.createElement("table");
    form.appendChild(table);

    // Definició dels camps del formulari
    const campos = [
        { label: "id:", id: "id", type: "text", required: true },
        { label: "Nom del lot", id: "name", type: "text", required: true, minlength: 2, maxlength: 40, pattern: "[\\p{L}0-9.,;@$&\\s]{2,40}" },
        { label: "id del producte", id: "product_id", type: "text", required: true, minlength: 2, maxlength: 40 },
        { label: "id del proveïdor", id: "supplier_id", type: "text", required: true, minlength: 2, maxlength: 40 },
        { label: "Unitats totals", id: "quantity", type: "number", required: true, min: 1 },
        { label: "Data de producció", id: "production_date", type: "date", required: true },
        { label: "Data d'expiració", id: "expiration_date", type: "date", required: true },
    ];

    // Crear files de la taula per a cada camp
    campos.forEach(campo => {
        const row = document.createElement("tr");
        
        // Columna d'etiqueta
        const tdLabel = document.createElement("td");
        tdLabel.textContent = campo.label;
        row.appendChild(tdLabel);
        
        // Columna d'entrada
        const tdInput = document.createElement("td");
        const input = document.createElement("input");
        Object.keys(campo).forEach(attr => input.setAttribute(attr, campo[attr]));
        tdInput.appendChild(input);
        
        row.appendChild(tdInput);
        table.appendChild(row);
    });

    // Fila per als botons
    const rowButtons = document.createElement("tr");

    // Columna buida
    rowButtons.appendChild(document.createElement("td"));

    // Columna de botons
    const tdButtons = document.createElement("td");
    ["Grava", "Torna"].forEach((text, index) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.type = "button";
        button.id = text.toLowerCase();
        button.classList.add("btn", "btn-primary");
        tdButtons.appendChild(button);
    });
    rowButtons.appendChild(tdButtons);
    table.appendChild(rowButtons);

    // Paràgraf per a missatges d'error
    const errorParagraph = document.createElement("p");
    errorParagraph.id = "mensajeError";
    errorParagraph.classList.add("error");
    divContainer.appendChild(errorParagraph);
}


// Guarda el lot en localStorage
function altaLote() {
    const lote = obtindreDadesFormulari();
    if (!lote) return;

    // Aconseguim la informació dels lots i la convertim en un array
    let lotes = JSON.parse(localStorage.getItem("lot")) || [];

    // Afegim el nou lot a l'array
    lotes.push(lote);

    // Tornem a convertir l'array a JSON i guardem en localStorage
    localStorage.setItem("lot", JSON.stringify(lotes));
    alert("Lot guardat amb èxit");
    
    // Esborrem els camps del formulari
    document.getElementById("formulari").reset();

     // Redirigeix a la pàgina de llistat de lots
    window.location.href = "listarLote.html";
}


// Obtenim totes les dades del formulari
function obtindreDadesFormulari() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value.trim();
    const product_id = document.getElementById("product_id").value.trim();
    const supplier_id = document.getElementById("supplier_id").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const production_date = document.getElementById("production_date").value.trim();
    const expiration_date = document.getElementById("expiration_date").value.trim();

    // Verifiquem si falta alguna dada
    if (!id || !name || !product_id || !supplier_id || !quantity || !production_date || !expiration_date) {
        alert("Has d'omplir tots els camps");
        return null;
    }

    return {
        id,
        name,
        product_id,
        supplier_id,
        quantity,
        production_date,
        expiration_date
    };
}

// Validacions del HTML
// Validació del nom del lot
function validarNomLot() {
    let element = document.getElementById("name");

    // Comprovar si el camp no és vàlid
    if (!element.checkValidity()) {
        // Comprovar si el camp està buit
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un nom del lot");
        }

        // Comprovar si el patró no coincideix o si la longitud és menor de 2
        if (element.validity.patternMismatch) {
            error(element, "El nom del lot ha de tenir entre 2 i 40 caracters");
        }
        return false; 
    }
    element.className = "valid";
    return true;
}


// Validació de l'id del producte
function validarIdProducte() {
    let element = document.getElementById("product_id");

    // Comprobar si el campo no es válido
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir el id del producte");
        }

        if (element.validity.patternMismatch) {
            error(element, "El id del producte ha de tenir entre 2 i 40 caracters");
        }
        return false; 
    }
    return true;
}


// Validació de l'id del proveïdor
function validarIdProveidor() {
    let element = document.getElementById("supplier_id");

    // Comprobar si el campo no es válido
    if (!element.checkValidity()) {
        // Comprobar si el campo está vacío
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir el id del proveïdor");
        }

        // Comprobar si el patrón no coincide o si la longitud es menor que 2
        if (element.validity.patternMismatch) {
            error(element, "El id del proveïdor ha de tenir entre 2 i 40 caracters");
        }

        return false; 
    }
    return true;
}


// Validació de la quantitat d'unitats
function validarUnitats() {
    let unit = document.getElementById('quantity');

    if (!unit.checkValidity()) {
        if (unit.validity.valueMissing) {
            error(unit, "Has d'introduir una quantitat");
            console.log(unit.validity.valueMissing);
        } else if (unit.validity.rangeUnderflow || unit.validity.rangeOverflow) {
            error(unit, "El valor ha d'estar entre 1 i 30");
        }
        return false;
    }
    return true;
}


// Validació de la data de producció
function validarDataProduccio() {
    let dataProduccio = document.getElementById('production_date');

    if (!dataProduccio.checkValidity()) {
        if (dataProduccio.validity.valueMissing) {
            error(dataProduccio, "Has d'introduïr la data de producció");
        }
        return false;
    }
    return true;
}


// Validació de la data d'expiració
function validarDataExpiracio() {
    let dataExpiracio = document.getElementById('expiration_date');
    let dataProduccio = document.getElementById('production_date');

    if (!dataExpiracio.checkValidity()) {
        if (dataExpiracio.validity.valueMissing) {
            error(dataExpiracio, "Has d'introduïr una data d'expiració");
        }
        return false;
    }

    // Verifiquem que la data d'expiració siga posterior a la de producció
    if (new Date(dataExpiracio.value) <= new Date(dataProduccio.value)) {
        error(dataExpiracio, "La data d'expiració ha de ser posterior a la de producció");
        return false;
    }
    return true;
}


// Funció principal de validació abans de guardar
function validar(e) {
    esborrarError();
    if (validarIdProducte() && validarNomLot() && validarIdProducte()&& validarIdProveidor() && validarUnitats() && validarDataProduccio() && validarDataExpiracio() && confirm ("Vols guardar el lot?")){
        altaLote();
        return true;
    }else{
        e.preventDefault(); // Evita que el formulari s'envie per defecte
        return false;
    }
}


// Funció per mostrar un missatge d'error
function error (element, mensaje) {
    alert("error");
    let formulari = document.getElementById("formulari");
    let p = document.getElementById("mensajeError");

    if (!p) {
        p = document.createElement("p");
        p.setAttribute("id", "mensajeError");
        p.setAttribute("class", "error");
        formulari.appendChild(p);
    }
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
    let mensaje_mostrar = document.createTextNode(mensaje);
    p.appendChild(mensaje_mostrar);

    element.className = "mensajeError";
    element.focus();
}


// Funció per esborrar l'error
function esborrarError( ) {
    let formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }   
}

