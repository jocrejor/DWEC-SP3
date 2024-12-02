window.onload = main;

function main() {
  // Llamada a las funciones necesarias al cargar la página
  document.getElementById("novaEtiqueta").addEventListener("click", novaEtiqueta);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  document.getElementById("filtrarFuncion").addEventListener("click", filtrarEtiquetes);  // Agregar el evento de filtrado
  obtindreEtiquetes();  // Obtener las etiquetas al cargar la página
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function novaEtiqueta() {
  window.location.assign("../alta/altaEtiqueta.html");
}

async function obtindreEtiquetes(filtro = "") {
  // Obtiene las etiquetas del backend o localStorage
  const llistaEtiquetes = await getData(url, "Tag");
  const tbody = document.getElementById("files");

  // Limpiar el contenido de la tabla antes de añadir nuevas filas
  tbody.innerHTML = "";

  // Filtrar las etiquetas si es necesario
  const etiquetasFiltradas = llistaEtiquetes.filter(etiqueta => etiqueta.name.toLowerCase().includes(filtro.toLowerCase()));

  // Recorrer las etiquetas filtradas y agregarlas a la tabla
  etiquetasFiltradas.forEach((etiqueta) => {
    const tr = document.createElement("tr");

    // Botón para eliminar la etiqueta
    const tdEsborrar = document.createElement("td");
    const btnEsborrar = document.createElement("button");
    btnEsborrar.className = "btn btn-primary btn-lg";
    btnEsborrar.appendChild(document.createTextNode("Esborrar"));
    btnEsborrar.onclick = () => esborrar(etiqueta.id);
    tdEsborrar.appendChild(btnEsborrar);

    // Botón para modificar la etiqueta
    const tdModificar = document.createElement("td");
    const btnModificar = document.createElement("button");
    btnModificar.className = "btn btn-primary btn-lg";
    btnModificar.appendChild(document.createTextNode("Modificar"));
    btnModificar.onclick = () => modificar(etiqueta);
    tdModificar.appendChild(btnModificar);

    // Nombre de la etiqueta
    const tdNom = document.createElement("td");
    tdNom.appendChild(document.createTextNode(etiqueta.name));

    // Añadir elementos a la fila
    tr.appendChild(tdEsborrar);
    tr.appendChild(tdModificar);
    tr.appendChild(tdNom);

    // Añadir la fila a la tabla
    tbody.appendChild(tr);
  });

  autocompletado(etiquetasFiltradas);
}

// Función para filtrar las etiquetas
function filtrarEtiquetes() {
  const filtro = document.getElementById("nom").value;  // Obtener el texto del campo de búsqueda
  obtindreEtiquetes(filtro);  // Volver a obtener las etiquetas con el filtro aplicado
}

async function esborrar(id) {
  // Llamar a la función deleteData para eliminar la etiqueta del backend
  await deleteData(url, "Tag", id);

  // Actualizar la tabla sin recargar la página
  obtindreEtiquetes();
}

function modificar(etiqueta) {
  // Guardar la etiqueta seleccionada en localStorage para acceder a ella en modificaEtiqueta.html
  localStorage.setItem("modEtiqueta", JSON.stringify(etiqueta));

  // Redirigir a la página de modificación
  window.location.assign("../modificar/modificaEtiqueta.html");
}

$(document).ready(function () {
  $("#filter").on("click", function () {
    $("#search-group ,#search-button").slideToggle(400);
  });
});

function autocompletado(llistaEtiquetes) {
  // Autocompletado Filtro
  const etiquetasNames = llistaEtiquetes.map(etiqueta => etiqueta.name);
  $("#nom").autocomplete({
    source: etiquetasNames
  });
}
