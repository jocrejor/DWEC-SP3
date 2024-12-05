window.onload = main;

function main() {
  // Llamada a las funciones necesarias al cargar la página
  document.getElementById("novaEtiqueta").addEventListener("click", novaEtiqueta);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  document.getElementById("filtrarFuncion").addEventListener("click", activarFiltros);  // Cambiar a activarFiltros
  obtindreEtiquetes();  // Obtener todas las etiquetas al cargar la página
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function novaEtiqueta() {
  window.location.assign("../alta/altaEtiqueta.html");
}

async function obtindreEtiquetes(filtro = null) {
  // Obtiene las etiquetas del backend o localStorage
  const llistaEtiquetes = await getData(url, "Tag");
  const tbody = document.getElementById("files");

  // Limpiar el contenido de la tabla antes de añadir nuevas filas
  tbody.innerHTML = "";

  // Si se pasa un filtro, aplicar, si no, mostrar todas las etiquetas
  const etiquetasFiltradas = filtro 
    ? llistaEtiquetes.filter(filtro) 
    : llistaEtiquetes;  // Si no hay filtro, no se filtra nada

  // Recorrer las etiquetas filtradas y agregarlas a la tabla
  etiquetasFiltradas.forEach((etiqueta) => {
    const tr = document.createElement("tr");

    // Botón para eliminar la etiqueta
    const tdEsborrar = document.createElement("td");
    const btnEsborrar = document.createElement("button");
    btnEsborrar.className = "btn btn-primary btn-lg";
    btnEsborrar.appendChild(document.createTextNode("Esborrar"));
    btnEsborrar.onclick = () => esborrar(etiqueta.id, etiqueta.name);
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

// Función para activar los filtros y pasarlos a la función de obtención
function activarFiltros() {
  const filtro = document.getElementById("nom").value;  
  const filtroFunc = filtroEspecifico(filtro);  // Crear la función de filtro específica
  obtindreEtiquetes(filtroFunc);  // Pasar la función de filtro a obtindreEtiquetes
}

// Función para crear un filtro específico según el criterio
function filtroEspecifico(filtro) {
  return (etiqueta) => etiqueta.name.toLowerCase().includes(filtro.toLowerCase());
}

function esborrar(id, nomEtiqueta) {
  // Obtener los posts para verificar si la etiqueta está referenciada
  getData(url, "Post").then(llistaPosts => {
    // Buscar si algún post tiene el nombre de la etiqueta referenciado
    const etiquetaAsociada = llistaPosts.some(post => post.tag === nomEtiqueta); 

    if (etiquetaAsociada) {
      // Mostrar un mensaje al usuario indicando que la etiqueta no puede ser eliminada
      alert(`No se puede eliminar la etiqueta "${nomEtiqueta}" porque está asociada a uno o más posts.`);
      return; 
    }

    // Llamar a la función deleteData para eliminar la etiqueta del backend
    deleteData(url, "Tag", id).then(() => {
      // Actualizar la tabla sin recargar la página
      obtindreEtiquetes();
    });
  });
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
