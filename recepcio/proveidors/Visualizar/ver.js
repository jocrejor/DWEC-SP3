window.onload = main;

function main () {
    crearFormulario();
    cargarFormulario();
    document.getElementById("volver").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";

    })
}
/**
 * Crea el formulario donde se visualizarán todos los datos del proveedor seleccionado
 */
function crearFormulario () {
    // DIV
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    document.body.appendChild(div);

    // TITULO
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Visualitzar Proveïdor");
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

        if(i === 4){
            input.setAttribute("type", "tel");
        } else if(i === 5) {
            input.setAttribute("type", "email");
        }else {
            input.setAttribute("type", "text");
        }
    
        let td1_content;

        switch(i){
            case 0:
                td1_content = document.createTextNode("ID");
                td1.appendChild(td1_content);
                input.setAttribute("id", "id");
            break;
            case 1:
                td1_content = document.createTextNode("Nom:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "name");
            break;
            case 2:
                td1_content = document.createTextNode("Adreça:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "address");
            break;
            case 3:
                td1_content = document.createTextNode("NIF:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "nif");
            break;
            case 4:
                td1_content = document.createTextNode("Telèfon:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "phone");
            break;
            case 5:
                td1_content = document.createTextNode("Email:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "email");
            break;
            case 6:
                td1_content = document.createTextNode("País:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "state_id");
            break;
            case 7:
                td1_content = document.createTextNode("Província:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "province");
            break;
            case 8:
                td1_content = document.createTextNode("Ciutat:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "city");
            break;
            case 9:
                td1_content = document.createTextNode("Codi postal:");
                td1.appendChild(td1_content);
                input.setAttribute("id", "cp");
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
 * Carga el formulario con los datos del proveedor indicado en la
 * URL por el id
 */
function cargarFormulario () {
    // Toma el id del proveedor desde la URL
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    id = parseInt(id);
    console.log (id);

    let proveedores = JSON.parse(localStorage.getItem('Supplier'));
    if (proveedores === null){
        proveedores = [];
    }
    const formulario = document.getElementById("formulario");

    const proveedor = proveedores.find( p => p.id === id);
    console.log (proveedor);
    if (proveedor){

        document.getElementById("id").value       = proveedor.id;
        document.getElementById("name").value     = proveedor.name;
        document.getElementById("address").value  = proveedor.address;
        document.getElementById("nif").value      = proveedor.nif;
        document.getElementById("phone").value    = proveedor.phone;
        document.getElementById("email").value    = proveedor.email;

        let State    = JSON.parse(localStorage.getItem("State"));
        let state_id = proveedor.state_id;
        let pais     = State.find(pais => pais.id === state_id);
        state_id     = pais.name;
        document.getElementById("state_id").value = state_id;

        document.getElementById("province").value = proveedor.province;
        document.getElementById("city").value     = proveedor.city;
        document.getElementById("cp").value       = proveedor.cp;
    
    }

    // Deshabilita la opción de escribir en los campos de texto
    Array.from(formulario.elements).forEach(element => element.disabled = true);
}