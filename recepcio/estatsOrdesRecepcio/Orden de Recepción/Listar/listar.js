window.onload = main;


function main() {
    crearTabla();
    listarEstados();
    document.getElementById("crear").addEventListener("click",()=>{
        document.location.href = "../Alta/alta.html";
    });
    document.getElementById("volver").addEventListener("click", () => {
        document.location.href = "../index.html";
    })
}
/**
 * Crea la tabla donde se mostrarán todos los estados de ordenes de recepción existentes
 */
function crearTabla() {
    // Div
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    document.body.appendChild(div);
    // Titulo
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Estats d'Ordes de Recepció");
    titulo.appendChild(contenido);
    div.appendChild(titulo);
    // BUTTON ALTA
    let btn_crear = document.createElement("button");
    let btn_cont = document.createTextNode("Crear estat");
    btn_crear.setAttribute("id", "crear");
    btn_crear.setAttribute("class", " btn btn-primary my-3");
    btn_crear.appendChild(btn_cont);
    div.appendChild(btn_crear);
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

    for (let i = 0; i < 5; i++) {
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
                fila_th_content = document.createTextNode("ID Estat");
                break;
            case 4:
                fila_th_content = document.createTextNode("Nom");
                break;
        }
        fila_th.appendChild(fila_th_content);
        fila_th.setAttribute("scope", "col");
        fila_encabezado.appendChild(fila_th);
    }
    let tabla_tbody = document.createElement("tbody");
    tabla_tbody.setAttribute("id", "tablaEstadoOrdenes");
    tabla.appendChild(tabla_tbody);

}
/**
 * Carga, ordena y devuelve la lista de estados de ordenes de recepción almacenadas en el localStorage
 * En caso contrario devuelve un array vacío
 * @returns 
 */
function inicializarEstado () {
    let estados = JSON.parse(localStorage.getItem("OrderReception_Status"));
    if (!estados) {
        estados = [];
        localStorage.setItem("OrderReception_Status", JSON.stringify(estados));
    }
    estados.sort((a,b) =>{
        return a.id - b.id;
    });
    return estados;
}
/**
 * Crea las filas de las tablas con los estados de ordenes de recepción existentes en el localStorage
 */
function listarEstados () {
    let estados = inicializarEstado();

    let tabla   = document.getElementById("tablaEstadoOrdenes");
    let limpiar = document.createTextNode("");
    tabla.appendChild(limpiar);
    
    
    estados.forEach(estado => {
        let row   = document.createElement("tr");
        tabla.appendChild(row);
        let cell0 = document.createElement("td");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");

        row.appendChild(cell0);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        let btnEliminar      = document.createElement('button');
        let btnEliminar_cont = document.createTextNode('Esborrar'); 
        btnEliminar.appendChild(btnEliminar_cont);
        btnEliminar.addEventListener ("click", () => {
            eliminarEstado(estado.id);
        });

        let btnModificar = document.createElement('button');
        btnModificar.innerHTML = 'Modificar';
        btnModificar.addEventListener ("click", () => { 
            modificarEstado(estado.id)
        });
        
        let btnVer = document.createElement('button');
        btnVer.innerHTML = 'Visualitzar';
        btnVer.addEventListener("click",   () => {
               verEstado(estado.id)
        });

        btnEliminar.className = "btn btn-primary";
        btnModificar.className = "btn btn-primary";
        btnVer.className = "btn btn-primary";
        
        cell0.appendChild(btnEliminar);
        cell1.appendChild(btnModificar);
        cell2.appendChild(btnVer);
        
        let idEstado = document.createTextNode(estado.id);
        let nombre   = document.createTextNode(estado.name)

        cell3.appendChild(idEstado);
        cell4.appendChild(nombre);
        
    });
    
}
/**
 * Esta función redirige la página a visualizar estado de orden de recepción enviando el id por URL
 * @param {*} id recibe el id del proveedor
 */
function verEstado(id) {
    //console.log("Visualizar/ver.html?id=" + id)proveedor
    window.location.href = "../Visualizar/ver.html?id=" + id;
}
/**
 * Esta función redirige la página a modificar estado de recepción enviando el id por URL
 * @param {*} id recibe el id del proveedor
 */
function modificarEstado (id){
    //console.log("Modificar/modificar.html?id=" + id)

    window.location.href = "../Modificar/modificar.html?id=" + id;
}
/**
 * Esta función elimina el estado de recepción seleccionado
 * @param {*} id recibe el id del proveedor
 */
function eliminarEstado(id) {
    let estados = inicializarEstado();
    if (confirm('Està segur que desitja eliminar este estat?')) {
        let indice = estados.findIndex(estado => estado.id === id);
        estados.splice(indice, 1);
        localStorage.setItem('OrderReception_Status', JSON.stringify(estados));
        window.location.href = "listar.html";
    }
}