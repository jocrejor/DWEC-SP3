// Quan es carrega la pàgina de logout, eliminem la sessió
window.onload = function() {
    // Eliminem el "loggedIn" de localStorage per tancar la sessió
    localStorage.removeItem("loggedIn");

    // Opcional: Mostrar un missatge d'alerta
    alert("Has tancat sessió correctament.");

    // Redirigir a la pàgina d'inici
    window.location.href = "/index.html";  // O la pàgina que vulguis com a pàgina inicial
}
