window.onload = main;

function main () {
    crearFormulario    ();
    cargarDatosEstados ();

    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
    document.getElementById("name").addEventListener("blur", validarNombreEstado, false);
}
/**
* Crea el formulario donde se mostrarán todos los datos del estado de línea de orden de recepción a modificar
*/
function crearFormulario () {
    // DIV
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    document.body.appendChild(div);

    // TITULO
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Modificar Estat");
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
    for(let i = 0; i < 2; i++){
        let fila  = document.createElement("tr");
        let td1   = document.createElement("td");
        let td2   = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("type", "text");
    
        let td1_content;
 
        switch(i){
             case 0:
                 td1_content = document.createTextNode("ID Estat");
                 td1.appendChild(td1_content);
                 input.setAttribute("id", "id");
                 input.setAttribute("required", "required"); 
             break;
             case 1:
                 td1_content = document.createTextNode("Nom:");
                 td1.appendChild(td1_content);
                 input.setAttribute("id", "name");
                 input.setAttribute("minlength", "2");
                 input.setAttribute("maxlength", "25");
                 // Pattern para que también acepte acentos y caracteres especiales
                 input.setAttribute("pattern", "[\p{L}0-9.,;@$&\s]{2,25}");
                 input.setAttribute("required", "required"); 
             break;
        }

        fila.appendChild(td1);
        td2.appendChild(input);
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
    
    let btn_2       = document.createElement("button");
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
 * Carga y retorna la lista de estados de linea de orden recepción almacenada en el localStorage. En caso de no haber datos devuelve un array vacío
 * @returns array de objectos
 */
function inicializarEstados () {
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));
    }
    estados.sort((a,b) =>{
        return a.id - b.id;
    });
    return estados;
}
/**
 * Carga todos los datos del formulario con la información del estado de linea de orden de recepción
 * a modificar antes de su modificación
 */
function cargarDatosEstados () {
    let urlParams = new URLSearchParams(window.location.search);
    let id        = urlParams.get("id");
    id            = parseInt(id);
    console.log(urlParams);

    let estados        = inicializarEstados();
    const indiceEstado = estados.findIndex(estado => estado.id === id);

    console.log(indiceEstado);
    
    const estado = estados[indiceEstado];

    if (estado) {
        document.getElementById('id').value    = id;
        document.getElementById('id').disabled = true;
        document.getElementById('name').value  = estado.name;
    }
}
/**
 * Toma todos los datos nuevos y los guarda en el mismo index en el que se encontraba 
 * el estado de línea de orden de recepción a modificar
 */
function modificarEstado () {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    id = parseInt(id);

    let estados        = inicializarEstados();
    const indiceEstado = estados.findIndex(estado => estado.id === id)

    const eModificado = {
        id:   id,
        name: document.getElementById("name").value.trim(),
    }
    
    if (!eModificado.name) {
        alert("Por favor, rellene todos los campos.");
    }
    estados[indiceEstado] = eModificado;
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));

    alert("Estat modificat correctament.");
    document.location.href = "../Listar/listar.html";

}
/**
 * Verifica que el nombre siga el pattern establecido
 * @returns boolean
 */
function validarNombreEstado () {
    let element = document.getElementById("name");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Ha d'introduir el nom de l'estat.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nom de l'estat ha de tindre entre 2 i 25 caràcters.");
        }
        return false;
    }
    valid();
    element.className = "valid"; 
    return true;
}
/**
 * En caso de cumplirse las validaciones, se guarda al nuevo estado de linea de orden de recepción
 * En caso contrario previene el envío del formulario
 * @param {*} e 
 * @returns boolean
 */
function validar (e) {
    borrarError();
    if (validarNombreEstado () && confirm("Desitja guardar l'estat?")){
        console.log("hola");
        modificarEstado();
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
 * Elimina el mensaje de error mostrado cada vez que no se cumple con las verificaciones
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