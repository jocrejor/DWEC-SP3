window.onload = main;

function main() {
    crearTabla();
    listarProveedores();
    document.getElementById("alta").addEventListener("click", () => {
        document.location.href = "../Alta/alta.html";
    });

    document.getElementById("volver").addEventListener("click", () => {
        document.location.href = "../index.html";
    })
}
/**
 * Crea la tabla donde se mostrarán los datos cargados en el localStorage
 */
function crearTabla() {
    // Div
    let div = document.createElement("div");
    div.setAttribute("class", "container-fluid");
    document.body.appendChild(div);
    // Titulo
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Llistat de Proveïdors");
    titulo.appendChild(contenido);
    div.appendChild(titulo);
    // BUTTON ALTA
    let btn_alta = document.createElement("button");
    let btn_cont = document.createTextNode("Crear Proveïdor");
    btn_alta.setAttribute("id", "alta");
    btn_alta.setAttribute("class", " btn btn-primary my-3");
    btn_alta.appendChild(btn_cont);
    div.appendChild(btn_alta);
    // BUTTON VOLVER
    let btn_volver      = document.createElement("button");
    let btn_volver_cont = document.createTextNode("Tornar");
    btn_volver.setAttribute("id", "volver");
    btn_volver.setAttribute("class", "btn btn-primary my-3");
    btn_volver.appendChild(btn_volver_cont);
    div.appendChild(btn_volver);
    // TABLA EXTERIOR
    let tabla = document.createElement("table");
    tabla.setAttribute("class", "table");
    div.appendChild(tabla);
    // T HEAD
    let tabla_head = document.createElement("thead");
    tabla_head.setAttribute("class", "thead-light");
    tabla.appendChild(tabla_head);
    // TR - TH
    let fila_encabezado = document.createElement("tr");
    tabla_head.appendChild(fila_encabezado);

    for (let i = 0; i < 13; i++) {
        let fila_th = document.createElement("th");
        let fila_th_content;
        switch (i) {
            case 0:
                fila_th_content = document.createTextNode("Esborrar");
                break;
            case 1:
                fila_th_content = document.createTextNode("Modificar");
                break;
            case 2:
                fila_th_content = document.createTextNode("Visualitzar");
                break;
            case 3:
                fila_th_content = document.createTextNode("ID");
                break;
            case 4:
                fila_th_content = document.createTextNode("Nom");
                break;
            case 5:
                fila_th_content = document.createTextNode("Adreça");
                break;
            case 6:
                fila_th_content = document.createTextNode("NIF");
                break;
            case 7:
                fila_th_content = document.createTextNode("Telèfon");
                break;
            case 8:
                fila_th_content = document.createTextNode("Email");
                break;
            case 9:
                fila_th_content = document.createTextNode("País");
                break;
            case 10:
                fila_th_content = document.createTextNode("Província");
                break;
            case 11:
                fila_th_content = document.createTextNode("Ciutat");
                break;
            case 12:
                fila_th_content = document.createTextNode("Codi Postal");
                break;
        }
        fila_th.appendChild(fila_th_content);
        fila_th.setAttribute("scope", "col");
        fila_encabezado.appendChild(fila_th);
    }
    // T BODY
    let tabla_tbody = document.createElement("tbody");
    tabla_tbody.setAttribute("id", "tablaProveedores");
    tabla.appendChild(tabla_tbody);
}
/**
 * Crea las filas de la tabla y recorre el localStorage para carga los datos de los proveedores
 */
function listarProveedores() {
    let proveedores = JSON.parse(localStorage.getItem("Supplier")) ?? [];
    
    let tabla = document.getElementById("tablaProveedores");
    let limpiar = document.createTextNode("");
    tabla.appendChild(limpiar);  // Limpia la tabla

    proveedores.forEach(proveedor => {
        let row = document.createElement("tr");
        tabla.appendChild(row);
        let cell0 = document.createElement("td");
        let cell00 = document.createElement("td");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let cell5 = document.createElement("td");
        let cell6 = document.createElement("td");
        let cell7 = document.createElement("td");
        let cell8 = document.createElement("td");
        let cell9 = document.createElement("td");
        let cell10 = document.createElement("td");
        let cell11 = document.createElement("td");

        row.appendChild(cell0);
        row.appendChild(cell00);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        row.appendChild(cell10);
        row.appendChild(cell11);

        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = 'Esborrar';
        btnEliminar.addEventListener("click", () => {
            eliminarProveedor(proveedor.id);
        });

        const btnModificar = document.createElement('button');
        btnModificar.innerHTML = 'Modificar';
        btnModificar.addEventListener("click", () => {
            modificarProveedor(proveedor.id)
        });

        const btnVer = document.createElement('button');
        btnVer.innerHTML = 'Visualitzar';
        btnVer.addEventListener("click",   () => {
               verProveedor(proveedor.id)
        });
        
        btnEliminar.className = "btn btn-primary";
        btnModificar.className = "btn btn-primary";
        btnVer.className = "btn btn-primary";
        

        cell0.appendChild(btnEliminar);
        cell00.appendChild(btnModificar);
        cell1.appendChild(btnVer);

        let id       = document.createTextNode(proveedor.id);
        let name     = document.createTextNode(proveedor.name);
        let address  = document.createTextNode(proveedor.address);
        let nif      = document.createTextNode(proveedor.nif);
        let phone    = document.createTextNode(proveedor.phone);
        let email    = document.createTextNode(proveedor.email);
        // Código para mostrar el nombre del país y no el ID
        let State    = JSON.parse(localStorage.getItem("State"));
        let state_id = proveedor.state_id;
        let pais     = State.find(pais => pais.id === state_id);
        state_id     = document.createTextNode(pais.name);
        
        let province = document.createTextNode(proveedor.province);
        let city     = document.createTextNode(proveedor.city);
        let cp       = document.createTextNode(proveedor.cp);
        
        cell2.appendChild(id);
        cell3.appendChild(name);
        cell4.appendChild(address);
        cell5.appendChild(nif);
        cell6.appendChild(phone);
        cell7.appendChild(email);
        cell8.appendChild(state_id);
        cell9.appendChild(province);
        cell10.appendChild(city);
        cell11.appendChild(cp);
    });

}
/**
 * Esta función redirige la página a visualizar proveedor enviando el id por URL
 * @param {*} id recibe el id del proveedor
 */
function verProveedor(id) {
    //console.log("Visualizar/ver.html?id=" + id)
    window.location.href = "../Visualizar/ver.html?id=" + id;
}
/**
 * Esta función redirige la página a modificar proveedor enviando el id del proveedor por URL
 * @param {*} id recibe el id del proveedor
 */
function modificarProveedor(id) {
   //console.log("Modificar/modificar.html?id=" + id)
    window.location.href = "../Modificar/modificar.html?id=" + id;
}
/**
 * Esta función elimina el proveedor seleccionado
 * @param {*} id recibe el id del proveedor
 */
function eliminarProveedor(id) {
    let proveedores = JSON.parse(localStorage.getItem('Supplier'));

    if (confirm('¿Està segur que desitja eliminar este proveïdor?')) {
        let indice = proveedores.findIndex(p => p.id === id);
        proveedores.splice(indice, 1);
        localStorage.setItem('Supplier', JSON.stringify(proveedores));
        window.location.href = "listar.html";

    }
}
