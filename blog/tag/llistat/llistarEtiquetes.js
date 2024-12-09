window.onload = main;

function main() {
  document.getElementById("novaEtiqueta").addEventListener("click", novaEtiqueta);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  document.getElementById("filtrarFuncion").addEventListener("click", activarFiltros);
  document.getElementById("nom").addEventListener("input", actualizarFiltrosEnTiempoReal);
  obtindreEtiquetes(); // Obtener todas las etiquetas al cargar la página
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function novaEtiqueta() {
  window.location.assign("../alta/altaEtiqueta.html");
}

async function obtindreEtiquetes(filtros = null) {
  const llistaEtiquetes = await getData(url, "Tag");
  const tbody = document.getElementById("files");
  tbody.innerHTML = "";

  const etiquetasFiltradas = filtros ? llistaEtiquetes.filter(filtros) : llistaEtiquetes;

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

    tr.appendChild(tdEsborrar);
    tr.appendChild(tdModificar);
    tr.appendChild(tdNom);

    tbody.appendChild(tr);
  });

  autocompletado(etiquetasFiltradas);
}

async function activarFiltros() {
  const nom = document.getElementById("nom").value.trim().toLowerCase();
  const filtros = crearFiltro(nom);
  await obtindreEtiquetes(filtros);
}

function crearFiltro(nom) {
  return (etiqueta) => {
    return !nom || etiqueta.name.toLowerCase().includes(nom);
  };
}

async function actualizarFiltrosEnTiempoReal() {
  const nom = document.getElementById("nom").value.trim().toLowerCase();
  const filtros = crearFiltro(nom);
  await obtindreEtiquetes(filtros);
}

function esborrar(id, nomEtiqueta) {
  getData(url, "Post").then((llistaPosts) => {
    const etiquetaAsociada = llistaPosts.some((post) => post.tag === nomEtiqueta);

    if (etiquetaAsociada) {
      alert(`No se puede eliminar la etiqueta "${nomEtiqueta}" porque está asociada a uno o más posts.`);
      return;
    }

    deleteData(url, "Tag", id).then(() => {
      obtindreEtiquetes();
    });
  });
}

function modificar(etiqueta) {
  localStorage.setItem("modEtiqueta", JSON.stringify(etiqueta));
  window.location.assign("../modificar/modificaEtiqueta.html");
}

$(document).ready(function () {
  $("#filter").on("click", function () {
    $("#search-group ,#search-button").slideToggle(400);
  });
});

function autocompletado(llistaEtiquetes) {
  const etiquetasNames = llistaEtiquetes.map((etiqueta) => etiqueta.name);
  $("#nom").autocomplete({
    source: etiquetasNames,
  });
}
