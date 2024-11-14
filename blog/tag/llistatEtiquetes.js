window.onload = main;

function main() {
  document.getElementById("novaEtiqueta").addEventListener("click", novaEtiqueta);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  obtindreEtiquetes();
}

function mainBlog() {
  window.location.assign("../blog.html");
}


function novaEtiqueta() {
  window.location.assign("altaEtiqueta.html");
}

// Función para obtener y mostrar etiquetas almacenadas en localStorage
function obtindreEtiquetes() {
  const etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];
  const tbody = document.getElementById("files");

  // Limpiar el contenido de la tabla antes de añadir las etiquetas
  tbody.innerHTML = "";

  etiquetas.forEach((etiqueta) => {
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
    btnModificar.onclick = () => modificar(etiqueta.id, etiqueta.nom);
    tdModificar.appendChild(btnModificar);

    // Nombre de la etiqueta
    const tdNom = document.createElement("td");
    tdNom.appendChild(document.createTextNode(etiqueta.nom));

    // Añadir elementos a la fila
    tr.appendChild(tdEsborrar);
    tr.appendChild(tdModificar);
    tr.appendChild(tdNom);
    tbody.appendChild(tr);
  });
}



function esborrar(id) {
    let etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];
    let idsEliminados = JSON.parse(localStorage.getItem("IdsEliminados")) || [];
  
    // Filtrar etiquetas para eliminar la seleccionada
    etiquetas = etiquetas.filter(etiqueta => etiqueta.id !== id);
  
    // Agregar el ID eliminado a la lista de IDs eliminados
    idsEliminados.push(id);
    localStorage.setItem("IdsEliminados", JSON.stringify(idsEliminados));
  
    // Guardar el nuevo array de etiquetas en localStorage
    localStorage.setItem("Etiquetas", JSON.stringify(etiquetas));
  
    // Actualizar la tabla sin recargar la página
    obtindreEtiquetes();
  }

// Función para modificar una etiqueta
function modificar(id, nom) {
  // Guardar la etiqueta seleccionada en localStorage para acceder a ella en modificaEtiqueta.html
  const etiqueta = { id, nom };
  localStorage.setItem("modEtiqueta", JSON.stringify(etiqueta));

  // Redirigir a la página de modificación
  window.location.assign("modificaEtiqueta.html");
}
