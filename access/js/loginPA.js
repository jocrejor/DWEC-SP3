document.addEventListener("DOMContentLoaded", function() {
    // Comprovar si l'usuari està autenticat
    const loggedIn = localStorage.getItem("loggedIn");

    // Si l'usuari no està autenticat, redirigir-lo al login
    if (loggedIn !== "true") {
        window.location.href = "/access/login.html";  // Redirigir al login
    }
});
