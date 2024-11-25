window.onload = main;

url = 'http://localhost:5002/';

function main() {
  //thereIsUser();

  document.getElementById("novaEtiqueta").addEventListener("click", novaEtiqueta);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  obtindreEtiquetes();
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function novaEtiqueta() {
  window.location.assign("../alta/altaEtiqueta.html");
}

// Función para obtener y mostrar etiquetas almacenadas en localStorage
async function obtindreEtiquetes() {

    const llistaEtiquetes = await getData(url, "Tag");
    const tbody = document.getElementById("files");

    // Limpiar el contenido de la tabla antes de añadir nuevas filas
    tbody.innerHTML = "";

    llistaEtiquetes.forEach((etiqueta) => {
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
  }


  async function esborrar(id) {
      // Llamar a la función deleteData para eliminar la etiqueta del backend
      await deleteData(url, "Tag", id);
  
      // Actualizar la tabla sin recargar la página
      obtindreEtiquetes();
  }
  

// Función para modificar una etiqueta
function modificar(etiqueta) {
  // Guardar la etiqueta seleccionada en localStorage para acceder a ella en modificaEtiqueta.html
  localStorage.setItem("modEtiqueta", JSON.stringify(etiqueta));

  // Redirigir a la página de modificación
  window.location.assign("../modificar/modificaEtiqueta.html");
}
