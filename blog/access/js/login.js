window.onload = iniciar;

function iniciar() {
    document.getElementById("tornaAlBlog").addEventListener("click", tornaAlBlog);
    document.getElementById("login").addEventListener("click", verificarUser);
    document.getElementById("signup").addEventListener("click", signup);
}

function verificarUser(e) {
    e.preventDefault();

    var email           = document.getElementById("email").value;
    var contrassenya    = document.getElementById("password").value;
    var users           = JSON.parse(localStorage.getItem("users")) || []; // Obtener los usuarios

    if (users.length === 0) {
        alert("Almacenament buit");
        return; // Salir de la función si el almacenamiento está vacío
    }

    for (var i = 0; i < users.length; i++) {
        if (email == "" || contrassenya == "") {
            alert("Es necessari omplir els 2 camps");
            return;
        }

        if (users[i].email === email && users[i].password === contrassenya) {
            localStorage.setItem("currentUser", JSON.stringify(users[i]));
            alert("Login exitoso"); // Mensaje de éxito
            window.location.href = '../../index.html';
            return true;
        }
    }

    alert("Usuari o contrassenya incorrectes");
    setTimeout(cleanFields(), 1000); 
}

function cleanFields() {
    document.getElementById("email").value      = '';
    document.getElementById("password").value   = '';
}

function tornaAlBlog() {
    window.location.href = "../../index.html";
}

function signup() {
    window.location.href = "../../users/altaUsuaris.html";
}