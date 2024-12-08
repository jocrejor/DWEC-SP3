window.onload = main;

function main() {
  //thereIsUser();

  document.getElementById("nouPost").addEventListener("click", nouPost);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  document.getElementById("filtrarFuncion").addEventListener("click", activarFiltros);
  
  document.getElementById("titol").addEventListener("input", actualizarFiltrosEnTiempoReal);
  obtindrePosts();
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function nouPost() {
  window.location.assign("../alta/altaPost.html");
}

async function obtindrePosts(filtros = null) {
  const llistaPosts = await getData(url, "Post");
  const tbody = document.getElementById("files");

  // Limpiar el contenido de la tabla antes de añadir los posts
  tbody.innerHTML = "";

  // Obtener el título del input de búsqueda
  const titol = document.getElementById("titol").value.trim().toLowerCase();

  // Filtrar los posts por el título si se ha ingresado algo
  const postsFiltrats = filtros ? llistaPosts.filter(filtros) : titol ? llistaPosts.filter(post => post.title.toLowerCase().includes(titol)) : llistaPosts;

  // Llenar los selectores con categorías y usuarios solo de los posts filtrados
  actualizarSelectCategoria(postsFiltrats);
  actualizarSelectUsuari(postsFiltrats);

  postsFiltrats.forEach((post) => {
    const tr = document.createElement("tr");

    // Botón para eliminar el post
    const tdEsborrar = document.createElement("td");
    const btnEsborrar = document.createElement("button");
    btnEsborrar.className = "btn btn-primary btn-lg";
    const esborrarText = document.createTextNode("Esborrar");
    btnEsborrar.appendChild(esborrarText);
    btnEsborrar.onclick = () => esborrar(post.id);
    tdEsborrar.appendChild(btnEsborrar);

    // Botón para modificar el post
    const tdModificar = document.createElement("td");
    const btnModificar = document.createElement("button");
    btnModificar.className = "btn btn-primary btn-lg";
    btnModificar.appendChild(document.createTextNode("Modificar"));
    btnModificar.onclick = () => modificar(post);
    tdModificar.appendChild(btnModificar);

    // Título del post
    const tdTitol = document.createElement("td");
    const titolText = document.createTextNode(post.title);
    tdTitol.appendChild(titolText);

    // Etiqueta del post
    const tdEtiqueta = document.createElement("td");
    const etiquetaText = document.createTextNode(post.tag);
    tdEtiqueta.appendChild(etiquetaText);

    // Usuario del post
    const tdUsuari = document.createElement("td");
    const usuariText = document.createTextNode(post.creator_id);
    tdUsuari.appendChild(usuariText);

    // Añadir elementos a la fila
    tr.appendChild(tdEsborrar);
    tr.appendChild(tdModificar);
    tr.appendChild(tdTitol);
    tr.appendChild(tdEtiqueta);
    tr.appendChild(tdUsuari);
    tbody.appendChild(tr);
  });

  autocompletado(llistaPosts);
}

async function esborrar(id) {
  await deleteData(url, "Post", id);

  // Actualizar la tabla sin recargar la página
  obtindrePosts();
}

function modificar(post) {
  localStorage.setItem("modPost", JSON.stringify(post));
  window.location.assign("../modificar/modificaPost.html");
}

// Filtro que toma en cuenta los valores seleccionados
async function activarFiltros() {
  const titol = document.getElementById("titol").value.trim().toLowerCase();
  const categoriaSeleccionat = document.getElementById("categoria").value.trim();
  const usuariSeleccionat = document.getElementById("creador").value.trim();

  // Crear la función de filtro con los valores proporcionados
  const filtros = crearFiltro(titol, categoriaSeleccionat, usuariSeleccionat);

  // Pasar filtros a obtindrePosts
  obtindrePosts(filtros);
}

function crearFiltro(titol, categoriaSeleccionat, usuariSeleccionat) {
  return (post) => {
    // Validar si el título coincide
    const coincideTitol = !titol || post.title.toLowerCase().includes(titol);

    // Validar si la categoría coincide (si está seleccionada)
    const coincideCategoria =
      categoriaSeleccionat === "Categoria del Post..." || 
      post.tag.toLowerCase() === categoriaSeleccionat.toLowerCase();

    // Validar si el usuario coincide (si está seleccionado)
    const coincideUsuari =
      usuariSeleccionat === "Creador del Post..." || 
      post.creator_id.toLowerCase() === usuariSeleccionat.toLowerCase();

    // Retornar verdadero si todos los filtros coinciden
    return coincideTitol && coincideCategoria && coincideUsuari;
  };
}

function actualizarSelectCategoria(llistaPosts) {
  const selectCategoria = document.getElementById("categoria");

  // Limpiar las opciones existentes
  while (selectCategoria.firstChild) {
    selectCategoria.removeChild(selectCategoria.firstChild);
  }

  // Añadir la opción por defecto
  const opcionPorDefecto = document.createElement("option");
  opcionPorDefecto.selected = true;
  opcionPorDefecto.textContent = "Categoria del Post...";
  selectCategoria.appendChild(opcionPorDefecto);

  // Obtener categorías únicas de los posts filtrados
  const categorias = [...new Set(llistaPosts.map((post) => post.tag))];

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  });
}

function actualizarSelectUsuari(llistaPosts) {
  const selectUsuari = document.getElementById("creador");

  // Limpiar las opciones existentes
  while (selectUsuari.firstChild) {
    selectUsuari.removeChild(selectUsuari.firstChild);
  }

  // Añadir la opción por defecto
  const opcionPorDefecto = document.createElement("option");
  opcionPorDefecto.selected = true;
  opcionPorDefecto.textContent = "Creador del Post...";
  selectUsuari.appendChild(opcionPorDefecto);

  // Obtener usuarios únicos de los posts filtrados
  const usuarios = [...new Set(llistaPosts.map((post) => post.creator_id))];

  usuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario;
    option.textContent = usuario;
    selectUsuari.appendChild(option);
  });
}

// Función que actualiza filtros en tiempo real al escribir en el título
async function actualizarFiltrosEnTiempoReal() {
  const titol = document.getElementById("titol").value.trim().toLowerCase();
  const llistaPosts = await getData(url, "Post");

  // Filtrar los posts por el título ingresado
  const postsFiltrats = llistaPosts.filter(post => post.title.toLowerCase().includes(titol));

  // Llenar los selectores con categorías y usuarios solo de los posts filtrados
  actualizarSelectCategoria(postsFiltrats);
  actualizarSelectUsuari(postsFiltrats);

  // Actualizar la tabla de posts
  obtindrePosts();
}

function autocompletado(llistaPosts) {
  const titols = [...new Set(llistaPosts.map((post) => post.title))];
  $("#titol").autocomplete({
      source: titols,
  });
}

$(document).ready(function () {
  $("#filter").on("click", function () {
      $("#search-group ,#search-button").slideToggle(400);
  });
});
