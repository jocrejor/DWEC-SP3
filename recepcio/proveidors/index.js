window.onload = main;


function main () {
    crearIndex();
    document.getElementById("cargar").addEventListener("click", cargarDatos);
    document.getElementById("proveedores").addEventListener("click",()=>{
        document.location.href = "Listar/listar.html";
    });
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("Province", JSON.stringify(Province));
}

function cargarDatos () {
    localStorage.setItem("Supplier", JSON.stringify(Supplier));
    
    
    let div         = document.getElementById("mensaje");
    let p           = document.createElement("p");
    p.setAttribute("class", "valid");
    let p_contenido = document.createTextNode("Dades carregades correctament.");
    
    p.appendChild(p_contenido);
    div.appendChild(p);
}

function crearIndex () {
    // DIV EXTERIOR
    let div_ext = document.createElement("div");
    div_ext.setAttribute("class", "container");
    document.body.appendChild(div_ext);
    // TITULO
    let h1           = document.createElement("h1");
    let h1_contenido = document.createTextNode("Gestió de Proveïdors");
    h1.appendChild(h1_contenido);
    div_ext.appendChild(h1);
    // DIV INTERIOR
    let div_int = document.createElement("div");
    div_int.setAttribute("class", "mx-auto");
    div_int.setAttribute("id", "mensaje");
    div_ext.appendChild(div_int);
    // BOTON PROVEEDORES
    let btn_proveedores = document.createElement("button");
    let btn_prov_cont   = document.createTextNode("Proveïdors");
    btn_proveedores.setAttribute("class", "btn btn-primary btn-lg m-4");
    btn_proveedores.setAttribute("id", "proveedores");
    btn_proveedores.appendChild(btn_prov_cont);
    div_int.appendChild(btn_proveedores);
    // BOTON CARGAR
    let btn_cargar      = document.createElement("button");
    let btn_cargar_cont = document.createTextNode("Carregar Dades");
    btn_cargar.setAttribute("id", "cargar");
    btn_cargar.setAttribute("class", "btn btn-primary btn-lg m-4");
    btn_cargar.appendChild(btn_cargar_cont);
    div_int.appendChild(btn_cargar);
}