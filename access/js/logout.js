// Quan es carrega la pàgina de logout, eliminem la sessió
window.onload = function() {

    document.getElementById("enviar").addEventListener("click",  () =>{
        // Eliminem el "loggedIn" de localStorage per tancar la sessió
        localStorage.removeItem("currentUser");
        // Redirigir a la pàgina d'inici
        window.location.href = "login.html";  // O la pàgina que vulguis com a pàgina inicial
    })

}
