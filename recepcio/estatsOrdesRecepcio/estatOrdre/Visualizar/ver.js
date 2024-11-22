window.onload = main;

function main () {
    crearFormulario    ();
    cargarDatosEstados ();

    document.getElementById("volver").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";

    })
}
/**
 * Crea el formulario donde se visualizarán todos los datos del estado de orden de recepción seleccionado
 */
function crearFormulario () {
    // DIV
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    document.body.appendChild(div);

    // TITULO
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Visualitzar Estat");
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
    let btn_volver      = document.createElement("button");
    let btn_volver_cont = document.createTextNode("Tornar");
    btn_volver.setAttribute("type", "button");
    btn_volver.setAttribute("id", "volver");
    btn_volver.setAttribute("class", "btn btn-primary");
    btn_volver.appendChild(btn_volver_cont);
    div.appendChild(btn_volver);
}
/**
 * Carga y retorna la lista de estados de recepción almacenada en el localStorage. En caso de no haber datos devuelve un array vacío
 * @returns array de objectos / arrary vacío
 */
function inicializarEstados () {
    let estados = JSON.parse(localStorage.getItem("OrderReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderReception_Status", JSON.stringify(estados));
    }
    
    return estados;
}
/**
 * Carga el formulario con los datos del estado de orden de recepción indicado en la
 * URL por el id
 */
function cargarDatosEstados () {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    id = parseInt(id);
 
    let estados = inicializarEstados ();
    let indiceEstado = estados.findIndex(estado => estado.id === id);
    
    const estado = estados[indiceEstado];
    console.log(indiceEstado);

    const formulario = document.getElementById("formulario");

    if (estado) {
        document.getElementById('id').value    = id;
        document.getElementById('id').disabled = true;
        document.getElementById('name').value  = estado.name;
    }

    // Deshabilita la opción de escribir en los campos de texto
    Array.from(formulario.elements).forEach(element => element.disabled = true);
}