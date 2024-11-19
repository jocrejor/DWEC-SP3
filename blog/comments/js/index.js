window.onload = main;

function main() {
    document.getElementById("nouComentari").addEventListener("click", nouComentari);
    document.getElementById("mainBlog").addEventListener("click", irAMainBlog); // Añadido
    obtindreComentaris();
}

function nouComentari() {
    window.location.assign("altaComentari.html");
}

// Nueva función para redirigir a mainBlog.html
function irAMainBlog() {
    window.location.assign("../index.html");
}

// Obtindre les dades
function obtindreComentaris() {
    const arrComentaris = JSON.parse(localStorage.getItem("Comentaris")) || [];
    const files = document.getElementById("files");
    
    // Limpiar la tabla antes de mostrar los comentarios
    files.innerHTML = "";

    // Recorrer el array y mostrar en pantalla los elementos
    arrComentaris.forEach(comentari => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td><button class="btn btn-primary my-3" onclick="esborrar(${comentari.id})">Esborrar</button></td>
            <td><button class="btn btn-primary my-3" onclick="modificar(${comentari.id}, '${comentari.postTitle}', '${comentari.descripcio}')">Modificar</button></td>
            <td>${comentari.postTitle}</td>
            <td>${comentari.descripcio}</td>
        `;
        
        files.appendChild(tr);
    });
}

function esborrar(id) {
    // Obtener los comentarios existentes
    let comentaris = JSON.parse(localStorage.getItem("Comentaris")) || [];
    
    // Filtrar el comentario a borrar
    comentaris = comentaris.filter(comentari => comentari.id !== id);
    
    // Guardar el nuevo array de comentarios en localStorage
    localStorage.setItem("Comentaris", JSON.stringify(comentaris));

    // Actualizar la lista de comentarios
    obtindreComentaris();
}

function modificar(id, nomPost, descripcio) {
    // Guardar valores en el local storage
    const comentari = {
        id: id,
        postTitle: nomPost,
        descripcio: descripcio
    };
    
    localStorage.setItem("modComentari", JSON.stringify(comentari));
    window.location.assign("modificaComentari.html");
}
