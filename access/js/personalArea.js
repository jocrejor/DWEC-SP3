document.addEventListener("DOMContentLoaded", function() {
    thereIsUser(); // Verifiquem si hi ha un usuari autenticat

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("userName").textContent = currentUser.name;
        document.getElementById("inputNom").value = currentUser.name;
    }

    document.getElementById("updateForm").addEventListener("submit", function(e) {
        e.preventDefault();
        actualitzarDadesUsuari();
    });
});

// Funció per actualitzar el nom i la contrasenya
async function actualitzarDadesUsuari() {
    const nom = document.getElementById("inputNom").value;
    const novaContrasenya = document.getElementById("inputContrasenya").value;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (novaContrasenya.length < 6) {
        alert("La contrasenya ha de tenir almenys 6 caràcters.");
        return;
    }

    currentUser.name = nom;
    if (novaContrasenya) {
        currentUser.password = novaContrasenya;
    }

    // Actualitzar en localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Actualitzar en el servidor
    try {
        await updateId(url, "User", currentUser.id, currentUser);
        alert("Les dades s'han actualitzat correctament.");
    } catch (error) {
        console.error("Error en l'actualització:", error);
        alert("S'ha produït un error en l'actualització.");
    }
}