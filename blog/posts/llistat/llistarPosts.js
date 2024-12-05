window.onload = main;

function main() {

  //thereIsUser();

  document.getElementById("nouPost").addEventListener("click", nouPost);
  document.getElementById("mainBlog").addEventListener("click", mainBlog);
  obtindrePosts();
}

function mainBlog() {
  window.location.assign("../../index.html");
}

function nouPost() {
  window.location.assign("../alta/altaPost.html");
}

async function obtindrePosts() {
  const llistaPosts = await getData(url, "Post");
  const tbody = document.getElementById("files");
  
  // Limpiar el contenido de la tabla antes de añadir los posts
  tbody.innerHTML = "";

  llistaPosts.forEach((post) => {
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

      // Añadir elementos a la fila
      tr.appendChild(tdEsborrar);
      tr.appendChild(tdModificar);
      tr.appendChild(tdTitol);
      tr.appendChild(tdEtiqueta); 
      tbody.appendChild(tr);
  });
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
