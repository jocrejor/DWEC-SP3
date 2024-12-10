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
    window.location.href = './access/login.html';
}

function gestioUsuaris() {
    window.location.href = './users/llistat/gestioUsuaris.html';
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
    if (currentUser && currentUser.role === "Administrador") {
        gestioUsuarisBtn.style.display  = "inline-block";
        tancarSessio.style.display      = "inline-block";
        btnCrearEtiqueta.style.display  = "inline-block";
        btnCrearPost.style.display      = "inline-block";
    }
    else if (currentUser && currentUser.role === "Editor") {
        gestioUsuarisBtn.style.display  = "none";
        tancarSessio.style.display      = "inline-block";
        btnCrearEtiqueta.style.display  = "none";
        btnCrearPost.style.display      = "inline-block";
    }
    else if (currentUser && currentUser.role === "Publicador") {
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
    const etiquetaSelect = document.getElementById("etiquetaSelect");
    
    // Limpiar el contenido del select
    etiquetaSelect.innerHTML = ""; 
    
    // Crear una opción predeterminada
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona una etiqueta";
    etiquetaSelect.appendChild(defaultOption);

    // Agregar cada etiqueta como una opción en el select
    etiquetas.forEach(etiqueta => {
        const option = document.createElement("option");
        option.value = etiqueta.name; // El valor es el nombre de la etiqueta
        option.textContent = etiqueta.name; // Muestra el nombre de la etiqueta
        etiquetaSelect.appendChild(option);
    });

    // Agregar un evento para filtrar posts cuando se seleccione una etiqueta
    etiquetaSelect.addEventListener("change", function() {
        const selectedTag = etiquetaSelect.value;
        mostrarPosts(selectedTag); // Filtrar posts por la etiqueta seleccionada
    });
}

async function mostrarPosts(selectedTag = "") {
    const posts = await getData(url, "Post");
    const mostraPostsContainer = document.querySelector(".mostraPosts");
    mostraPostsContainer.innerHTML = "";

    // Filtrar los posts si se seleccionó una etiqueta
    const filteredPosts = selectedTag ? posts.filter(post => post.tag === selectedTag) : posts;

    // Ordenar los posts por fecha de creación (de más reciente a más antiguo)
    filteredPosts.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

    filteredPosts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("postCreat");
        postDiv.style.cssText = "border: 2px solid gray; display: flex; width: 40em; margin-bottom: 1em; padding: 1em; border-radius: 0.5em; background-color: #f0f0f0;";

        const postInfoDiv = document.createElement("div");
        postInfoDiv.style.width = "50%";

        const titulo = document.createElement("p");
        titulo.id = "titol";
        titulo.style.cssText = "font-size: 1.2em; margin: 0; padding: 0.5em; font-weight: bold;";
        titulo.appendChild(document.createTextNode(post.title));

        const fecha = document.createElement("p");
        fecha.id = "fecha";
        fecha.style.cssText = "font-size: 0.9em; padding-left: 0.7em;";
        fecha.appendChild(document.createTextNode(post.creation_date));

        const etiqueta = document.createElement("p");
        etiqueta.id = "etiqueta";
        etiqueta.style.cssText = "font-size: 0.9em; padding-left: 0.7em;";
        etiqueta.appendChild(document.createTextNode(post.tag));

        const descripcion = document.createElement("p");
        descripcion.id = "descripcio";
        descripcion.style.cssText = "padding-left: 0.8em;";
        descripcion.style.fontSize = "0.8em";
        descripcion.appendChild(document.createTextNode(post.description));

        postInfoDiv.appendChild(titulo);
        postInfoDiv.appendChild(fecha);
        postInfoDiv.appendChild(etiqueta);
        postInfoDiv.appendChild(descripcion);

        const btnAfegirComentari = document.createElement("button");
        btnAfegirComentari.appendChild(document.createTextNode("Afegir Comentari"));
        btnAfegirComentari.classList.add("btn", "btn-success", "afegirComentari");
        btnAfegirComentari.style.cssText = "margin-left: 0.6em;";
        btnAfegirComentari.style.marginTop = "0.5em";

        btnAfegirComentari.addEventListener("click", function() {
            sessionStorage.setItem("currentPostID", post.id);
            sessionStorage.setItem("currentPostTitle", post.title);
            window.location.href = "comments/alta/altaComentari.html";
        });

        postInfoDiv.appendChild(btnAfegirComentari);

        const imatgeDiv = document.createElement("div");
        imatgeDiv.classList.add("imatge");
        imatgeDiv.id = "foto";
        imatgeDiv.style.marginLeft = "4em";

        const img = document.createElement("img");
        img.src = post.foto || "https://www.shutterstock.com/image-vector/write-blog-post-icon-blogging-600nw-2417074323.jpg"; 
        img.alt = "imatgePost";
        img.style.width = "14em";

        imatgeDiv.appendChild(img);

        postDiv.appendChild(postInfoDiv);
        postDiv.appendChild(imatgeDiv);

        mostraPostsContainer.appendChild(postDiv);

        const comentariosDiv = document.createElement("div");
        comentariosDiv.classList.add("comentariosPost");
        comentariosDiv.style.cssText = "margin-top: 1em; padding: 1em; border: 2px solid gray;background-color: #f0f0f0; margin-bottom: 1em; border-radius: 0.5em; width: 40em;";

        const comentariosTitle = document.createElement("h4");
        comentariosTitle.appendChild(document.createTextNode("Comentarios"));
        comentariosDiv.appendChild(comentariosTitle);

        mostrarComentariosPorPost(post.id, comentariosDiv);

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
        usuario.appendChild(document.createTextNode(`Usuario: ${comentario.creator_id}`));

        const descripcio = document.createElement("p");
        descripcio.appendChild(document.createTextNode(comentario.description));

        comentarioDiv.appendChild(usuario);
        comentarioDiv.appendChild(descripcio);
        comentariosDiv.appendChild(comentarioDiv);
    });
}

function crearPost() {
    window.location.href = "./posts/llistat/llistarPosts.html";
}

function crearEtiqueta() {
    window.location.href = "./tag/llistat/llistarEtiquetes.html";
}