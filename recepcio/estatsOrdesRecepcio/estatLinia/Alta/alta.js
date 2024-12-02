document.addEventListener("DOMContentLoaded", async function () {

    document.getElementById("cancelar").addEventListener("click", function () {
        window.location.href = "../Listar/listar.html";
    });

    // Validar i guardar dades en fer submit
    document.getElementById("altaForm").addEventListener("submit", async function (e) {
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
            await postData(url, "OrderLineReception_Status", nouEstat);
            alert("Estat guardat correctament!");
            window.location.href="../Listar/listar.html";
        } catch (error) {
            console.error("Error al guardar l'estat:", error);
            missatgeError.textContent = "Error al guardar l'estat al servidor.";
        }
    });
});
