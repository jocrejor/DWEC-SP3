// Recuperar dades de localStorage o inicialitzar un array buit
let arrayProducte = JSON.parse(localStorage.getItem('product')) || [ ];

// Funció principal que inicialitza el script
window.onload = function() {
    crearFormulari();
    mostrarProducte();
    document.getElementById("visualitza").addEventListener("click", visualitza);  
};

// Crear formulari
function crearFormulari(){
    let div = document.createElement("div");
    div.setAttribute("class", "container-fluid");
    document.body.appendChild(div);

    // Títol
    let titulo = document.createElement("h2");
    let contenido = document.createTextNode("Llistat de productes");
    titulo.appendChild(contenido);
    div.appendChild(titulo);

    // Taula principal
    let tabla = document.createElement("table");
    tabla.setAttribute("class", "table");
    div.appendChild(tabla);

    // Capçalera de la taula
    let head = document.createElement("thead");
    head.setAttribute("class", "thead-light");
    tabla.appendChild(head);

    // Fila d'encapçalament
    let fila = document.createElement("tr");
    head.appendChild(fila);

    const encabezados = [
        "Visualitza", 
        "ID", 
        "Sku", 
        "Nom", 
        "Lot / Serie"
    ];

    // Crear encapçalaments
    encabezados.forEach(texto => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(texto));
        th.setAttribute("scope", "col");
        fila.appendChild(th);
    });

    // Cos de la taula
    let tabla_body = document.createElement("tbody");
    tabla_body.setAttribute("id", "tablaLot");
    tabla.appendChild(tabla_body);
    }

// Mostra els productes a la taula
function mostrarProducte() {
    let tabla = document.getElementById("tablaLot");
    
    // Neteja la taula abans de mostrar els nous productes
    tabla.innerHTML = ""; 

    // Genera una fila per a cada producte
    arrayProducte.forEach(product => {
        let row = document.createElement("tr");
        tabla.appendChild(row);

        // Creem les cel·les
        let celda1 = document.createElement ("td");
        let celda2 = document.createElement ("td");
        let celda3 = document.createElement ("td");
        let celda4 = document.createElement ("td");
        let celda5 = document.createElement ("td");

        row.appendChild (celda1);
        row.appendChild (celda2);
        row.appendChild (celda3);
        row.appendChild (celda4);
        row.appendChild (celda5);

        // Crear el botó de la taula
        let boton = document.createElement ("button");
        boton.setAttribute ("id", "visualitza");
        boton.setAttribute ("class", "btn btn-primary btn-lg");
        let contenido = document.createTextNode ("Visualitza");
        boton.addEventListener("click", () => {visualitzaProducte (product.id)})
        boton.appendChild(contenido);

        // Assignem la cel·la 1 al botó
        celda1.appendChild(boton);

        // Creem els nodes de text per a les dades del producte
        let id = document.createTextNode(product.id);
        let sku = document.createTextNode(product.sku);  
        let name = document.createTextNode(product.name);
        let lotorserial = document.createTextNode(product.lotorserial);

        // Afegim les dades a les cel·les corresponents
        celda2.appendChild(id);
        celda3.appendChild(sku);
        celda4.appendChild(name);
        celda5.appendChild(lotorserial);
    });  
}


// Funció per visualitzar un producte en concret
function visualitzaProducte (id){
    window.location.href = "listarLote.html?id=" + id;
}


// Elimina un lote del array y de localStorage
/*function borrarLote(index) {
    // Elimina el lote del array
    arrayLotes.splice(index, 1);
    // Guarda el array actualizado en localStorage
    localStorage.setItem("Lot", JSON.stringify(arrayLotes));
    // Vuelve a mostrar los lotes para actualizar la tabla
    mostrarLotes();
}

// Función para modificar un lote
function modificarLote(index) {
    window.location.assign("modificarLote.html");
    /*alert(`Modificar lote con ID: ${arrayLotes[index].product_id}`);*/
//}
