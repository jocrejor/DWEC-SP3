window.onload = main;

function main () {
    crearFormulario();
    document.getElementById("guardar").addEventListener ("click", validar);
    document.getElementById("cancelar").addEventListener("click",()=>{
        document.location.href="../Listar/listar.html";
       });
    document.getElementById("id").value = generarNuevoCodigo();
    
    document.getElementById("id").addEventListener ("blur", validarID, false);
    document.getElementById("name").addEventListener ("blur", validarNombre, false);
    document.getElementById("nif").addEventListener  ("blur", validarNIF, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("phone").addEventListener("blur", validarTel, false);
    
    // Muestra el select de provincias cuando el país seleccionado sea España. En caso contraro muestra un input
    let pais = document.querySelector("#state_id");
    pais.addEventListener("click", () => {
        let indice_seleccionado = pais.value;
        if(indice_seleccionado === "194"){
            crearSelectProvincias();
        } else {
            crearInputProvincia();
        }
    });
}
/**
 * Crea el formulario que recolectará la información del proveedor
 */
function crearFormulario () {
    // DIV
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    document.body.appendChild(div);

    // TITULO
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Crear Proveïdor");
    titulo.appendChild(contenido);
    div.appendChild(titulo);

    // FORMULARIO
    let formulario = document.createElement("form");
    formulario.setAttribute("id", "formulario");
    div.appendChild(formulario);

    // TABLA
    let tabla = document.createElement("table");
    formulario.appendChild(tabla);

    // FILAS
    for(let i = 0; i < 10; i++){
        let fila  = document.createElement("tr");
        let td1   = document.createElement("td");
        let td2   = document.createElement("td");
        let input = document.createElement("input");
        let select;

        if(i === 4){
            input.setAttribute("type", "tel");
        } else if(i === 5) {
            input.setAttribute("type", "email");
        } else if(i === 6){
            select = document.createElement("select");
        }else {
            input.setAttribute("type", "text");
        }
        
        let td1_content;

        switch(i){
            case 0:
                td1_content = document.createTextNode("ID");
                td1.appendChild(td1_content);
                input.setAttribute("id", "id");
                input.setAttribute("minlength", "9");
                input.setAttribute("maxlength", "9");
                input.setAttribute("pattern", "\\d{9}");
                input.setAttribute("required", "required"); 
            break;
            case 1:
                td1_content = document.createTextNode("Nom:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "name");
                input.setAttribute("minlength", "2");
                input.setAttribute("maxlength", "50");
                // Pattern para que también acepte acentos y caracteres especiales
                input.setAttribute("pattern", "[\\p{L}0-9.,;@$&\\s]{2,60}");
                input.setAttribute("required", "required"); 
            break;
            case 2:
                td1_content = document.createTextNode("Adreça:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "address");
                input.setAttribute("minlength", "2");
                input.setAttribute("maxlength", "60");
                input.setAttribute("required", "required"); 
            break;
            case 3:
                td1_content = document.createTextNode("NIF:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "nif");
                input.setAttribute("maxlength", "9");
                input.setAttribute("pattern", "([XYZxyz]\\d{7}[A-Za-Z]) || (\\d{8}[A-Za-z]) || [a-zA-Z]\\d{8}");
                input.setAttribute("required", "required"); 
            break;
            case 4:
                td1_content = document.createTextNode("Telèfon:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "phone");
                input.setAttribute("minlength", "9");
                input.setAttribute("maxlength", "15");
                input.setAttribute("pattern", "(\+\\d{1,3}?)?\\d{9,15}");
                input.setAttribute("required", "required"); 
            break;
            case 5:
                td1_content = document.createTextNode("Correo electrónico:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "email");
                input.setAttribute("name", "email");
                input.setAttribute("maxlength", "20");
                input.setAttribute("required", "required"); 
            break;
            case 6:
                td1_content = document.createTextNode("País:");
                td1.appendChild(td1_content);
                select.setAttribute("name", "state_id");
                select.setAttribute("id", "state_id");
                crearOptionsPaises(select);
            break;
            case 7:
                td1_content = document.createTextNode("Província:");
                td1.appendChild(td1_content);
                td2.setAttribute("id", "celda_provincias");
                input.setAttribute("id", "province");
                input.setAttribute("maxlength", "20");
                input.setAttribute("required", "required");
            break;
            case 8:
                td1_content = document.createTextNode("Ciutat:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "city");
                input.setAttribute("maxlength", "40");
                input.setAttribute("required", "required"); 
            break;
            case 9:
                td1_content = document.createTextNode("Codi postal:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "cp");
                input.setAttribute("maxlength", "20");
                input.setAttribute("required", "required"); 
            break;
        }
        fila.appendChild(td1);
        if(i === 6){
            td2.appendChild(select);
        } else {
            td2.appendChild(input);
        }
        
        fila.appendChild(td2);
        tabla.appendChild(fila);
    }

    let ultimaFila = document.createElement("tr");
    let td1        = document.createElement("td");
    ultimaFila.appendChild(td1);

    let td2        = document.createElement("td");
    let btn_1      = document.createElement("button");
    let btn_1_cont = document.createTextNode("Guardar");
    btn_1.appendChild(btn_1_cont);
    btn_1.setAttribute("type", "button");
    btn_1.setAttribute("id", "guardar");
    btn_1.setAttribute("class", "btn btn-primary");
    
    let btn_2      = document.createElement("button");
    let btn_2_cont = document.createTextNode("Cancel·lar");
    btn_2.appendChild(btn_2_cont);
    btn_2.setAttribute("type", "button");
    btn_2.setAttribute("id", "cancelar");
    btn_2.setAttribute("class", "btn btn-primary");
    td2.appendChild(btn_1);
    td2.appendChild(btn_2);

    ultimaFila.appendChild(td2);
    tabla.appendChild(ultimaFila);

    // PARRAFO DE MENSAJES DE ERROR
    let parrafo = document.createElement("p");
    parrafo.setAttribute("id", "mensajeError");
    parrafo.setAttribute("class", "error");
    div.appendChild(parrafo);
}

/**
 * Crear las opciones del select State
 * @param {*} select recibe el select de State 
 */
function crearOptionsPaises (select) {
    let State               = JSON.parse(localStorage.getItem("State"));
    let default_option      = document.createElement("option");
    let default_option_cont = document.createTextNode("Selecciona un país");
    default_option.setAttribute("value", "");
    default_option.appendChild(default_option_cont);
    select.appendChild(default_option)
    // OPCIONES SELECT

    State.forEach(pais => {
        let option      = document.createElement("option")
        let option_cont = document.createTextNode(pais.name) 
        option.appendChild(option_cont)
        option.setAttribute("value", pais.id);
        select.appendChild(option);
    });
}
/**
 * Crea el select Province de España y sus respectivas opciones
 */
function crearSelectProvincias () {
    let Province = JSON.parse(localStorage.getItem("Province"));
    let celda_provincias = document.querySelector("#celda_provincias");
    celda_provincias.removeChild(celda_provincias.firstElementChild);

    let select = document.createElement("select");
    select.setAttribute("id", "province");
    select.setAttribute("required", "required");

    let default_option      = document.createElement("option");
    let default_option_cont = document.createTextNode("Selecciona una província");
    default_option.setAttribute("value", "");
    default_option.appendChild(default_option_cont);
    select.appendChild(default_option)
    
    Province.forEach(provincia => {
        let option      = document.createElement("option");
        let option_cont = document.createTextNode(provincia.name);
        option.appendChild(option_cont);
        option.setAttribute("value", provincia.id);
        select.appendChild(option);
    })
    celda_provincias.appendChild(select);
}
/**
 * Crea el Input de Province para cualquier opción de State que no sea España
 */
function crearInputProvincia () {
    let celda_provincias = document.querySelector("#celda_provincias");
    celda_provincias.removeChild(celda_provincias.firstChild);

    let input = document.createElement("input");
    input.setAttribute("id", "province");
    input.setAttribute("maxlength", "20");
    input.setAttribute("required", "required");

    celda_provincias.appendChild(input);
}
function inicializaProveedor(){
    let proveedores = JSON.parse(localStorage.getItem("Supplier"));
    if (proveedores === null) {
        proveedores = [];
    }
    // Ordena los proveedores 
    proveedores.sort((a,b) =>{
        return a.id - b.id;
    });
    
    return proveedores;
}
/**
 * Genera un nuevo código con la secuencia 100000000
 * Lo hace de manera automatica para tener un orden
 * @returns {número}
 */
function generarNuevoCodigo() {
    const proveedores     = inicializaProveedor();
    const ultimoProveedor = proveedores.length ? proveedores[proveedores.length - 1] : null;
    let ultimoCodigo      = ultimoProveedor ? parseInt(ultimoProveedor.id) : 100000000;
    if (ultimoCodigo < 100000000) {
        ultimoCodigo = 100000000;
    }
    
    const nuevoCodigo = ultimoCodigo + 1;
    // Verifica que el número de proveedor no esté ocupado al asignar uno nuevo
    while (proveedores.includes(nuevoCodigo)){
        nuevoCodigo++;
    }

    return nuevoCodigo;   
}
/**
 * Guarda el objeto con los datos del formulario en el array de proveedores
 * que se encuentra en localStorage
 * @returns void
 */
function guardarProveedor() {
    const proveedor = obtenerDatosFormulario();
    if (!proveedor) return;
    
    let proveedores  = inicializaProveedor();
    // Sube al nuevo proveedor al array
    proveedores.push(proveedor);
    localStorage.setItem("Supplier", JSON.stringify(proveedores));

    alert("Proveïdor guardat correctament.");
    document.getElementById("formulario").reset();
    
    
    window.location.href="../Listar/listar.html";
}
/**
 * Recoleta todos los datos del formulario creando un objeto para ser guardado en localStorage
 * @returns object
 */
function obtenerDatosFormulario() {
    let id       = document.getElementById("id").value;
    let name     = document.getElementById("name").value.trim();
    let address  = document.getElementById("address").value.trim();
    let nif      = document.getElementById("nif").value.trim();
    let phone    = document.getElementById("phone").value.trim();
    let email    = document.getElementById("email").value.trim();
    let state_id = document.getElementById("state_id").value;
    let tipo     = document.getElementById("province");
    let city     = document.getElementById("city").value.trim();
    let cp       = document.getElementById("cp").value.trim();
    
    let province = tipo.tagName === "SELECT" ? tipo.options[tipo.selectedIndex].text : tipo.value.trim();
    
    console.log(province);
    
    if (!id || !name || !address || !nif || !phone || !email || !state_id || !province || !city || !cp ) {
        alert("Per favor, emplene tots els camps.");
        return null;
    }

    id = parseInt(id);
    return { id, name, address, nif, phone, email, state_id, province, city, cp };
}
/**
 * Al momento de darle el alta al proveedor existe la posibilidad de modificar el ID.
 * Esta función verifica que cumpla con los patrones establecidos ademas de controlar que
 * no se repita el número de ID.
 * @returns boolean
 */
function validarID () {
    let element = document.getElementById("id");
    let valor   = parseInt(element.value);
    
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "El camp ID està buit");
        }
        if (element.validity.patternMismatch || element.value.length > 9 ){
            error2(element, "El ID ha d'estar compost de 9 números");
        }
  
        return false;
    }

    let proveedores = inicializaProveedor()
    let idOcupado   = proveedores.some(p => p.id === valor);
    console.log(idOcupado);

    if(idOcupado){
        error2(element, "Este ID existix per a un altre proveïdor.");
       
        return false;
    }

    valid();
    element.className = "valid"; 
    return true;
}
/**
 * Verifica que el nombre siga el pattern establecido
 * @returns boolean
 */
function validarNombre() {
    let element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Ha d'introduir el nom del proveïdor.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nom ha de tindre entre 2 i 60 caràcters.");
        }

        return false;
    }
    valid();
    element.className = "valid"; 
    return true;
}
/**
 * Verifica que el NIF siga el pattern establecido
 * @returns boolean
 */
function validarNIF() {
    let element = document.getElementById("nif");
    let niePattern = /^[XYZxyz]?\d{7}[A-Za-z]$/;
    let nifPattern = /^\d{8}[A-Za-z]$/;
    let cifPattern = /^[a-zA-Z]\d{8}$/;

    if (!niePattern.test(element.value) && !nifPattern.test(element.value) && !cifPattern.test(element.value)) {
        error2(element, "NIF no válid.");

        return false;
    } 
    valid();
    element.className = "valid"; 
    return true;

}
/**
 * Verifican que el email siga el pattern establecido
 * @returns boolean
 */
function validarEmail () {
    let element = document.getElementById("email");

    if(!element.checkValidity ()){
        if(element.validity.valueMissing) {
            error2(element, "Ha d'introduir un correu electrònic.");
        } else if (element.validity.typeMismatch) {
            error2(element, "El format del correu electrònic no és vàlid.")
        }
      
        return false;
    }
    valid();
    element.className = "valid";
    return true;
}
/**
 * Verifican que el teléfono siga el pattern establecido
 * @returns boolean
 */
function validarTel(){
    var element = document.getElementById("phone");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "Ha d'introduir un número de telèfon.");
        }
        if (element.validity.patternMismatch || element.value.length < 9){
            error2(element, "El telèfon ha de tindre a l'entre 9 i 15 números.");
        }
     
        return false;
    }
    valid();
    element.className = "valid";
    return true;
}
/**
 * En caso de cumplirse las validaciones, se guarda al nuevo proveedor. En caso contrario no se previene el envío del fomulario
 * @param {*} e 
 * @returns boolean
 */
function validar (e) {
    borrarError();
    if (validarID() && validarNombre () && validarNIF() && validarTel() && validarEmail () && confirm("Desitja guardar proveïdor?")){
        guardarProveedor();
        return true;
    } else {
        e.preventDefault ();
        return false;
    }
}
/**
 * Muestra un mensaje de error si no se cumple con la validación
 * @param {*} element --> elemento en el cual se encuentra el error
 * @param {*} mensaje --> mensaje que mostrará
 */
function error2 (element, mensaje) {
    let formulario = document.getElementById("formulario");
    let p = document.getElementById("mensajeError");

    if (!p) {
        p = document.createElement("p");
        p.setAttribute("id", "mensajeError");
        p.setAttribute("class", "error");
        formulario.appendChild(p);
    }
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
    let mensaje_mostrar = document.createTextNode(mensaje);
    p.appendChild(mensaje_mostrar);

    element.className = "mensajeError";
    element.focus();
}
/**
 * Elimina el mensaje de error
 */
function valid () {
    let valid  = document.getElementById("mensajeError");
    if(valid){
        while(valid.firstChild){
            valid.removeChild(valid.firstChild);
        }
    }
}
/**
 * Elimina todos los CSS de error de todos los elementos del formulario
 */
function borrarError ()  {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++){
        formulario.elements[i].className = "";
    }

}