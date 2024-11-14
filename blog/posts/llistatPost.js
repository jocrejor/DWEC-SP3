window.onload = main;

function main() {
  document.getElementById("nouPost").addEventListener("click", nouPost);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  obtindrePosts();
}

function mainBlog() {
  window.location.assign("../blog.html");
}

function nouPost() {
  window.location.assign("altaPost.html");
}

function obtindrePosts() {
  const posts = JSON.parse(localStorage.getItem("Posts")) || [];
  const tbody = document.getElementById("files");
  
  // Limpiar el contenido de la tabla antes de añadir los posts
  tbody.innerHTML = "";

  posts.forEach((post) => {
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
      const modificarText = document.createTextNode("Modificar");
      btnModificar.appendChild(modificarText);
      btnModificar.onclick = () => modificar(post.id, post.titol, post.foto, post.descripcio, post.etiqueta);
      tdModificar.appendChild(btnModificar);

      // Título del post
      const tdTitol = document.createElement("td");
      const titolText = document.createTextNode(post.titol);
      tdTitol.appendChild(titolText);

      // Etiqueta del post
      const tdEtiqueta = document.createElement("td");
      const etiquetaText = document.createTextNode(post.etiqueta); 
      tdEtiqueta.appendChild(etiquetaText);

      // Añadir elementos a la fila
      tr.appendChild(tdEsborrar);
      tr.appendChild(tdModificar);
      tr.appendChild(tdTitol);
      tr.appendChild(tdEtiqueta); 
      tbody.appendChild(tr);
  });
}

  function esborrar(id) {
    let posts = JSON.parse(localStorage.getItem("Posts")) || [];
    let IdsPostsEliminados = JSON.parse(localStorage.getItem("IdsPostsEliminados")) || [];

    // Filtrar posts para eliminar el seleccionado
    posts = posts.filter(post => post.id !== id);

    // Agregar el ID eliminado a la lista de IDs eliminados si aún no está en la lista
    if (!IdsPostsEliminados.includes(id)) {
        IdsPostsEliminados.push(id);
    }
    localStorage.setItem("IdsPostsEliminados", JSON.stringify(IdsPostsEliminados));

    // Guardar el nuevo array de posts en localStorage
    localStorage.setItem("Posts", JSON.stringify(posts));

    // Actualizar la tabla sin recargar la página
    obtindrePosts();
}

function modificar(id, titol, foto, descripcio, etiqueta) {
  const post = { id, titol, foto, descripcio, etiqueta }; 
  localStorage.setItem("modPost", JSON.stringify(post));

  // Redirigir a la página de modificación
  window.location.assign("modificaPost.html");
}


