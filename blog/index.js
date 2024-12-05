window.onload = iniciar;


function iniciar() {

    //thereIsUser();
    document.getElementById("login").addEventListener("click", login);
    document.getElementById("gestioUsuaris").addEventListener("click", gestioUsuaris);
    document.getElementById("tancaSessio").addEventListener("click", tancaSessio);

    verifyUser();
    //checkUser();

    //JaviManu
    mostrarEtiquetas();
    mostrarPosts(); // Mostrar los posts al cargar la página
    document.getElementById("btnCrearPost").addEventListener("click", crearPost);
    document.getElementById("btnAfegirEtiqueta").addEventListener("click", crearEtiqueta);
}

function login() {
    window.location.href = 'access/login.html';
}

function gestioUsuaris() {
    window.location.href = 'users/llistat/gestioUsuaris.html';
}

function verifyUser() {
    //Ocultar el botón 
    const gestioUsuarisBtn          = document.getElementById("gestioUsuaris");
    const iniciarSessio             = document.getElementById("login");
    const tancarSessio              = document.getElementById("tancaSessio");
    const btnCrearEtiqueta          = document.getElementById("btnAfegirEtiqueta");
    const btnCrearPost              = document.getElementById("btnCrearPost");
    const btnCrearComentari         = document.querySelectorAll(".afegirComentari");

    //Obtindre usuari actual
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Si no hem iniciat sessió no vorem cap botó, sols el d'iniciar botó
    if (!currentUser) {
        btnCrearComentari.forEach(btn => btn.style.display = "none");
        iniciarSessio.style.display     = "inline-block";
        gestioUsuarisBtn.style.display  = "none";
        tancarSessio.style.display      = "none";
        btnCrearEtiqueta.style.display  = "none";
        btnCrearPost.style.display      = "none";
    }
    else {
        // Si hay un usuario logueado
        btnCrearComentari.forEach(btn => btn.style.display = "inline-block"); // Muestra todos los botones
        iniciarSessio.style.display = "none";
    }
    if (currentUser && currentUser.user_profile === "Administrador") {
        gestioUsuarisBtn.style.display  = "inline-block";
        tancarSessio.style.display      = "inline-block";
        btnCrearEtiqueta.style.display  = "inline-block";
        btnCrearPost.style.display      = "inline-block";
    }
    else if (currentUser && currentUser.user_profile === "Editor") {
        gestioUsuarisBtn.style.display  = "none";
        tancarSessio.style.display      = "inline-block";
        btnCrearEtiqueta.style.display  = "none";
        btnCrearPost.style.display      = "inline-block";
    }
    else if (currentUser && currentUser.user_profile === "Publicador") {
        gestioUsuarisBtn.style.display  = "none";
        tancarSessio.style.display      = "inline-block";
        btnCrearEtiqueta.style.display  = "none";
        btnCrearPost.style.display      = "none";
    }
}

/*function checkUser() {
    var loginBtn = document.getElementById("login");
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        // Crear un nuevo elemento para el nombre del usuario
        const userName = document.createElement("span");
        userName.classList.add("btn", "btn-primary");
        userName.appendChild(document.createTextNode(currentUser.name));

        // Reemplazar el botón de login por el nombre del usuario
        loginBtn.parentNode.replaceChild(userName, loginBtn);
    }
}*/

function tancaSessio() {
    localStorage.removeItem("currentUser");
    verifyUser();
}

//JaviManu
// Función para mostrar las etiquetas almacenadas en localStorage
async function mostrarEtiquetas() {
    const etiquetas = await getData(url, "Tag");
    const etiquetasList = document.getElementById("etiquetasList");
    etiquetasList.innerHTML = ""; 

    // Crear un elemento de lista para cada etiqueta
    etiquetas.forEach(etiqueta => {
        const li = document.createElement("li");
        const textNode = document.createTextNode(etiqueta.name);
        li.appendChild(textNode);
        etiquetasList.appendChild(li);
    });
}

async function mostrarPosts() {
    const posts = await getData(url, "Post");
    const mostraPostsContainer = document.querySelector(".mostraPosts");
    mostraPostsContainer.innerHTML = "";

    posts.forEach(post => {
        // Crear un contenedor visual para cada post
        const postDiv = document.createElement("div");
        postDiv.classList.add("postCreat");
        postDiv.style.cssText = "border: 2px solid gray; display: flex; width: 40em; margin-bottom: 1em; padding: 1em; border-radius: 0.5em; background-color: #f0f0f0;";

        // Contenedor para el título, etiqueta y descripción
        const postInfoDiv = document.createElement("div");
        postInfoDiv.style.width = "50%";

        // Título del post
        const titulo = document.createElement("p");
        titulo.id = "titol";
        titulo.style.cssText = "font-size: 1.2em; margin: 0; padding: 0.5em; font-weight: bold;";
        titulo.appendChild(document.createTextNode(post.title));

        // Etiqueta del post
        const etiqueta = document.createElement("p");
        etiqueta.id = "etiqueta";
        etiqueta.style.cssText = "font-size: 0.9em; padding-left: 0.7em;";
        etiqueta.appendChild(document.createTextNode(post.tag));

        // Descripción del post
        const descripcion = document.createElement("p");
        descripcion.id = "descripcio";
        descripcion.style.cssText = "padding-left: 0.8em;";
        descripcion.style.fontSize = "0.8em";
        descripcion.appendChild(document.createTextNode(post.description));

        // Agregar título, etiqueta y descripción al contenedor de información
        postInfoDiv.appendChild(titulo);
        postInfoDiv.appendChild(etiqueta);
        postInfoDiv.appendChild(descripcion);

        // Botón "Afegir Comentari"
        const btnAfegirComentari = document.createElement("button");
        btnAfegirComentari.appendChild(document.createTextNode("Afegir Comentari"));
        btnAfegirComentari.classList.add("btn", "btn-success", "afegirComentari");
        //Proves
        btnAfegirComentari.style.cssText = "margin-left: 0.6em;";
        btnAfegirComentari.style.marginTop = "0.5em";

        // Agregar evento al botón "Afegir Comentari"
        btnAfegirComentari.addEventListener("click", function() {
            sessionStorage.setItem("currentPostID", post.id);
            sessionStorage.setItem("currentPostTitle", post.title);
            window.location.href = "comments/alta/altaComentari.html";
        });

        // Agregar el botón al contenedor de información
        postInfoDiv.appendChild(btnAfegirComentari);

        // Contenedor para la imagen
        const imatgeDiv = document.createElement("div");
        imatgeDiv.classList.add("imatge");
        imatgeDiv.id = "foto";
        imatgeDiv.style.marginLeft = "4em";

        const img = document.createElement("img");
        img.src = post.foto || "default-image-url.jpg"; 
        img.alt = "imatgePost";
        img.style.width = "14em";

        imatgeDiv.appendChild(img);

        // Agregar la información del post y la imagen al contenedor del post
        postDiv.appendChild(postInfoDiv);
        postDiv.appendChild(imatgeDiv);

        // Agregar el post completo al contenedor principal
        mostraPostsContainer.appendChild(postDiv);

        // Crear un contenedor aparte para los comentarios, justo debajo de cada post
        const comentariosDiv = document.createElement("div");
        comentariosDiv.classList.add("comentariosPost");
        comentariosDiv.style.cssText = "margin-top: 1em; padding: 1em; border: 2px solid gray;background-color: #f0f0f0; margin-bottom: 1em; border-radius: 0.5em; width: 40em;";

        const comentariosTitle = document.createElement("h4");
        comentariosTitle.appendChild(document.createTextNode("Comentarios"));
        comentariosDiv.appendChild(comentariosTitle);

        // Mostrar los comentarios asociados al post
        mostrarComentariosPorPost(post.id, comentariosDiv);

        // Agregar el contenedor de comentarios después del postDiv
        mostraPostsContainer.appendChild(comentariosDiv);
    });
}


// Función para mostrar los comentarios relacionados con un post específico
async function mostrarComentariosPorPost(postID, comentariosDiv) {
    const comentaris = await getData(url, "Comment");
    const user = JSON.parse(localStorage.getItem("currentUser")) || [];

    // Filtrar los comentarios que coinciden con el postID
    const comentariosRelacionados = comentaris.filter(comentari => comentari.post_id === postID.toString());

    // Agregar cada comentario al contenedor de comentarios
    comentariosRelacionados.forEach(comentario => {
        const comentarioDiv = document.createElement("div");
        comentarioDiv.classList.add("comentario");
        comentarioDiv.style.border = "1px solid gray";
        comentarioDiv.style.padding = "0.5em";
        comentarioDiv.style.marginBottom = "0.5em";

        const usuario = document.createElement("p");
        usuario.style.fontWeight = "bold";
        usuario.appendChild(document.createTextNode(`Usuario: ${comentario.user || user.name}`));

        const descripcio = document.createElement("p");
        descripcio.appendChild(document.createTextNode(comentario.description));

        comentarioDiv.appendChild(usuario);
        comentarioDiv.appendChild(descripcio);
        comentariosDiv.appendChild(comentarioDiv);
    });
}

function crearPost() {
    window.location.href = "posts/alta/altaPost.html";
}

function crearEtiqueta() {
    window.location.href = "tag/alta/altaEtiqueta.html";
}