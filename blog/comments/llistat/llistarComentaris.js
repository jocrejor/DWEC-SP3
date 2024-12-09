window.onload = main;

function main() {
    document.getElementById("nouComentari").addEventListener("click", nouComentari);
    document.getElementById("mainBlog").addEventListener("click", irAMainBlog);
    document.getElementById("filtrarFuncion").addEventListener("click", activarFiltros);

    document.getElementById("titol").addEventListener("input", actualizarFiltrosEnTiempoReal);
    obtindreComentaris();
}

function nouComentari() {
    window.location.assign("../alta/altaComentari.html");
}

function irAMainBlog() {
    window.location.assign("../../index.html");
}

async function obtindreComentaris(filtros = null) {
    const llistaComentaris = await getData(url, "Comment");
    const tbody = document.getElementById("files");

    // Limpiar la tabla antes de mostrar los comentarios
    tbody.innerHTML = "";

    // Aplicar los filtros si están definidos, de lo contrario mostrar todos los comentarios
    const comentarisFiltrats = filtros ? llistaComentaris.filter(filtros) : llistaComentaris;

    // Actualizar el selector con los comentarios filtrados
    actualizarSelectComentario(comentarisFiltrats);

    // Recorrer los comentarios filtrados y agregarlos a la tabla
    comentarisFiltrats.forEach(comentari => {
        const tr = document.createElement("tr");

        // Botón para eliminar el comentario
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.className = "btn btn-primary btn-lg";
        btnEsborrar.appendChild(document.createTextNode("Esborrar"));
        btnEsborrar.onclick = () => esborrar(comentari.id);
        tdEsborrar.appendChild(btnEsborrar);

        // Botón para modificar el comentario
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.className = "btn btn-primary btn-lg";
        btnModificar.appendChild(document.createTextNode("Modificar"));
        btnModificar.onclick = () => modificar(comentari);
        tdModificar.appendChild(btnModificar);

        // Título del post
        const tdTitolPost = document.createElement("td");
        tdTitolPost.appendChild(document.createTextNode(comentari.post_title));

        // Comentario
        const tdComentari = document.createElement("td");
        tdComentari.appendChild(document.createTextNode(comentari.description));

        // Añadir elementos a la fila
        tr.appendChild(tdEsborrar);
        tr.appendChild(tdModificar);
        tr.appendChild(tdTitolPost);
        tr.appendChild(tdComentari);

        // Añadir la fila a la tabla
        tbody.appendChild(tr);
    });
    autocompletado(llistaComentaris);
}




async function esborrar(id) {
    await deleteData(url, "Comment", id);
    obtindreComentaris();
}

function modificar(comentari) {
    localStorage.setItem("modComentari", JSON.stringify(comentari));
    window.location.assign("../modificar/modificaComentari.html");
}

// Función que activa los filtros aplicados
async function activarFiltros() {
    const titol = document.getElementById("titol").value.trim().toLowerCase();
    const comentariSeleccionat = document.getElementById("comentari").value.trim();
  
    // Crear una función de filtro basada en los valores
    const filtros = crearFiltro(titol, comentariSeleccionat);
  
    // Obtener y filtrar comentarios
    await obtindreComentaris(filtros);
}
  
// Función que genera un filtro combinado
function crearFiltro(titol, comentariSeleccionat) {
    return (comentari) => {
        // Validar título si está ingresado
        const coincideTitol = !titol || comentari.post_title.toLowerCase().includes(titol);
      
        // Validar comentario seleccionado si no es la opción por defecto
        const coincideComentari = comentariSeleccionat === "Categoria del Post..." || 
            comentari.description.toLowerCase() === comentariSeleccionat.toLowerCase();
      
        // Retorna verdadero si ambos filtros coinciden
        return coincideTitol && coincideComentari;
    };
}

  function actualizarSelectComentario(llistaComentaris) {
    const selectComentario = document.getElementById("comentari");
  
    // Limpiar las opciones existentes
    while (selectComentario.firstChild) {
        selectComentario.removeChild(selectComentario.firstChild);
    }
  
    // Añadir la opción por defecto
    const opcionPorDefecto = document.createElement("option");
    opcionPorDefecto.selected = true;
    opcionPorDefecto.textContent = "Categoria del Post...";
    selectComentario.appendChild(opcionPorDefecto);
  
    // Obtener categorías únicas de los posts filtrados
    const comentaris = [...new Set(llistaComentaris.map((comentari) => comentari.description))];
  
    comentaris.forEach((comentari) => {
      const option = document.createElement("option");
      option.value = comentari;
      option.textContent = comentari;
      selectComentario.appendChild(option);
    });
    autocompletado(llistaComentaris);
  }

// Actualización en tiempo real del filtro al escribir en el título
async function actualizarFiltrosEnTiempoReal() {
    const titol = document.getElementById("titol").value.trim().toLowerCase();
    const comentariSeleccionat = document.getElementById("comentari").value.trim();

    // Crear la función de filtro basada en el título ingresado
    const filtros = crearFiltro(titol, comentariSeleccionat);

    // Aplicar filtros
    await obtindreComentaris(filtros);
}

  function autocompletado(llistaComentaris) {
    const titols = [...new Set(llistaComentaris.map((comentari) => comentari.post_title))];
    $("#titol").autocomplete({
        source: titols,
    });
  }

$(document).ready(function () {
    $("#filter").on("click", function () {
        $("#search-group ,#search-button").slideToggle(400);
    });
});
