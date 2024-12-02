document.addEventListener("DOMContentLoaded", async function () {

    document.getElementById("tornar").addEventListener("click", function () {
        window.location.href = "./moviments.html";
    });

    // Validar i guardar dades en fer submit
    document.getElementById("formulario").addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const nom = document.getElementById("name").value.trim();
        const missatgeError = document.getElementById("missatgeError");
        missatgeError.textContent = "";

        // Validar el formulari
        if (!nom) {
            missatgeError.textContent = "Tots els camps són obligatoris.";
            return;
        }

        // Crear l'objecte nou 
        const nouEstat = { name: nom };

        try {
            await postData(url, "Moviment", nouEstat);
            alert("Estat guardat correctament!");
            window.location.href="./moviments.html";
        } catch (error) {
            console.error("Error al guardar l'estat:", error);
            missatgeError.textContent = "Error al guardar l'estat al servidor.";
        }
    });
});
