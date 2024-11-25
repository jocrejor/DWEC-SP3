window.onload = main;

url = 'http://localhost:5002/';

function main() {
    //thereIsUser();

    document.getElementById("nouComentari").addEventListener("click", nouComentari);
    document.getElementById("mainBlog").addEventListener("click", irAMainBlog); // Añadido
    obtindreComentaris();
}

function nouComentari() {
    window.location.assign("../alta/altaComentari.html");
}

// Nueva función para redirigir a mainBlog.html
function irAMainBlog() {
    window.location.assign("../../index.html");
}

// Obtindre les dades
async function obtindreComentaris() {
    const llistaComentaris = await getData(url, "Comment");
    const tbody = document.getElementById("files");
    
    // Limpiar la tabla antes de mostrar los comentarios
    tbody.innerHTML = "";

    // Recorrer el array y mostrar en pantalla los elementos
    llistaComentaris.forEach(comentari => {
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
        tdTitolPost.appendChild(document.createTextNode(comentari.post_title)); // Mostrar el post_title
        
        // Comentario
        const tdComentari = document.createElement("td");
        tdComentari.appendChild(document.createTextNode(comentari.description)); // Mostrar description
  
        // Añadir elementos a la fila
        tr.appendChild(tdEsborrar);
        tr.appendChild(tdModificar);
        tr.appendChild(tdTitolPost);
        tr.appendChild(tdComentari);
  
        // Añadir la fila a la tabla
        files.appendChild(tr);
    });
}


async function esborrar(id) {
    await deleteData(url, "Comment", id);

    // Actualizar la lista de comentarios
    obtindreComentaris();
}

function modificar(comentari) {
    // Guardar el objeto completo en localStorage
    localStorage.setItem("modComentari", JSON.stringify(comentari));
    window.location.assign("../modificar/modificaComentari.html");
}


