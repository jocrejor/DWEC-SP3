window.onload = iniciar;

function iniciar ( ){
    crearFormulari ( );
    carregaDadesLot ( );

    // Afegir listeners als botons
    document.getElementById("grava").addEventListener("click", validar, false); 
    document.getElementById("torna").addEventListener("click",()=>{
        document.location.href="./listarLote.html";
       });

    // Afegir listeners a les validacions dels camps
    document.getElementById("name").addEventListener("blur", validarNomLot, false);
    document.getElementById("product_id").addEventListener ("blur", validarIdProducte, false);
    document.getElementById("supplier_id").addEventListener("blur", validarIdProveidor, false);
    document.getElementById("quantity").addEventListener("blur", validarUnitats, false);
    document.getElementById("production_date").addEventListener("blur", validarDataProduccio, false);
    document.getElementById("expiration_date").addEventListener("blur", validarDataExpiracio, false);
}


function crearFormulari() {
    // Contenidor principal
    const div = document.createElement("div");
    div.className = "container";
    document.body.appendChild(div);

    // Títol
    const titulo = document.createElement("h2");
    titulo.textContent = "Modifica lot";
    div.appendChild(titulo);

    // Formulari i taula
    const formulari = document.createElement("form");
    formulari.id = "formulari";
    div.appendChild(formulari);

    const tabla = document.createElement("table");
    formulari.appendChild(tabla);

    // Camps del formulari i els seus atributs
    const campos = [
        { label: "id:", id: "id", type: "text", required: true },
        { label: "Nom del lot", id: "name", type: "text", required: true, minlength: 2, maxlength: 40, pattern: "[\\p{L}0-9.,;@$&\\s]{2,40}" },
        { label: "id del producte", id: "product_id", type: "text", required: true, minlength: 2, maxlength: 40 },
        { label: "id del proveïdor", id: "supplier_id", type: "text", required: true, minlength: 2, maxlength: 40 },
        { label: "Unitats totals", id: "quantity", type: "number", required: true, min: 1 },
        { label: "Data de producció", id: "production_date", type: "date", required: true },
        { label: "Data d'expiració", id: "expiration_date", type: "date", required: true }
    ];

    // Crear files per a cada camp
    campos.forEach(campo => {
        const fila = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = campo.label;
        fila.appendChild(td1);

        const td2 = document.createElement("td");
        const input = document.createElement("input");
        input.type = campo.type;
        input.id = campo.id;

        // Aplicar atributs addicionals
        for (let attr in campo) {
            if (attr !== "label" && attr !== "type") {
                input[attr] = campo[attr];
            }
        }
        
        td2.appendChild(input);
        fila.appendChild(td2);
        tabla.appendChild(fila);
    });

    // Fila de botons
    const ultimaFila = document.createElement("tr");
    const tdBotones = document.createElement("td");
    tdBotones.colSpan = 2; // Hacer que la celda ocupe ambas columnas

    // Botó "Grava"
    const botonGrava = document.createElement("button");
    botonGrava.textContent = "Grava";
    botonGrava.type = "button";
    botonGrava.id = "grava";
    botonGrava.className = "btn btn-primary";
    tdBotones.appendChild(botonGrava);

    // Botón "Torna"
    const botonTorna = document.createElement("button");
    botonTorna.textContent = "Torna";
    botonTorna.type = "button";
    botonTorna.id = "torna";
    botonTorna.className = "btn btn-primary";
    tdBotones.appendChild(botonTorna);

    ultimaFila.appendChild(tdBotones);
    tabla.appendChild(ultimaFila);

    // Paràgraf per a missatges d'error
    const parrafoError = document.createElement("p");
    parrafoError.id = "mensajeError";
    parrafoError.className = "error";
    div.appendChild(parrafoError);
}


function carregaDadesLot() {
    const id = parseInt(new URLSearchParams(window.location.search).get("id"));
    console.log(id);

    const lots = JSON.parse(localStorage.getItem("lot")) || [];
    const lot = lots.find(p => p.id === id);

    console.log(lot);

    if (lot) {
        const fields = ["id", "name", "product_id", "supplier_id", "quantity", "production_date", "expiration_date"];
        fields.forEach(field => {
            document.getElementById(field).value = lot[field] || "";
        });
    }
}


// Guarda les dades al mateix lloc del que ho modifica
function modificarLot() {
    const id = parseInt(new URLSearchParams(window.location.search).get("id"));
    const lots = JSON.parse(localStorage.getItem("lot")) || [];

    const indexLot = lots.findIndex(p => p.id === id);

    const campos = ["name", "product_id", "supplier_id", "quantity", "production_date", "expiration_date"];
    const pModificat = { id };

    let camposCompletos = true;
    campos.forEach(campo => {
        const valor = document.getElementById(campo).value.trim();
        if (!valor) camposCompletos = false;
        pModificat[campo] = valor;
    });

    if (!camposCompletos) {
        // Missatge d'error si hi ha camps buits
        alert("Ompli tots els camps");
        return;
    }

    lots[indexLot] = pModificat;
    // Modificar el lot en el localStorage
    localStorage.setItem("lot", JSON.stringify(lots));

    // Confirmació de la modificació
    alert("Lot modificat amb èxit");
    // Tornar a la llista de lots
    window.location.href = "./listarLote.html";
}


// Validacions dels camps del HTML
function validarNomLot() {
    let element = document.getElementById("name");

    // Comprobar si el campo no es válido
    if (!element.checkValidity()) {
        // Comprobar si el campo está vacío
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir un nom del lot");
        }

        // Comprobar si el patrón no coincide o si la longitud es menor que 2
        if (element.validity.patternMismatch) {
            error(element, "El nom del lot ha de tenir entre 2 i 40 caracters");
        }
        return false; 
    }
}

function validarIdProducte() {
    let element = document.getElementById("product_id");

    // Comprobar si el campo no es válido
    if (!element.checkValidity()) {
        // Comprobar si el campo está vacío
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir el id del producte");
        }

        // Comprobar si el patrón no coincide o si la longitud es menor que 2
        if (element.validity.patternMismatch) {
            error(element, "El id del producte ha de tenir entre 2 i 40 caracters");
        }
        return false; 
    }
    return true;
}

function validarIdProveidor() {
    let element = document.getElementById("supplier_id");

    // Comprovar si el camp no és vàlid
    if (!element.checkValidity()) {
        // Comprovar si el camp està buit
        if (element.validity.valueMissing) {
            error(element, "Has d'introduir el id del proveïdor");
        }

        // Comprovar si el patró no coincideix o si la longitud és menor que 2
        if (element.validity.patternMismatch) {
            error(element, "El id del proveïdor ha de tenir entre 2 i 40 caracters");
        }
        return false; 
    }
    return true;
}

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


function validar(e) {
    esborrarError();
    if (validarNomLot() && validarIdProducte() && validarIdProveidor() && validarUnitats() && validarDataProduccio() && validarDataExpiracio() && confirm ("Vols guardar el lot?")){
        modificarLot();
        return true;
    }else{
        e.preventDefault(); // Evita que el formulari s'envie per defecte
        return false;
    }
}


// Ensenya el missatge d'error 
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

function esborrarError() {
    let formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }   
}

