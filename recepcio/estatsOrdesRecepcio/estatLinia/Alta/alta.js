document.addEventListener("DOMContentLoaded", async function () {
    

    // Incrementa ID
    const idElement = document.getElementById("id");
    const idIncrementat = await getNewId(url, "OrderLineReception_Status");
    idElement.value = idIncrementat;

    document.getElementById("cancelar").addEventListener("click", function () {
        window.location.href = "../Listar/listar.html";
    });

    // Validar i guardar dades en fer submit
    document.getElementById("altaForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = parseInt(idElement.value.trim());
        const nom = document.getElementById("name").value.trim();
        const missatgeError = document.getElementById("missatgeError");
        missatgeError.textContent = "";

        // Validar el formulari
        if (!nom) {
            missatgeError.textContent = "Tots els camps són obligatoris.";
            return;
        }

        // Crear l'objecte nou 
        const nouEstat = { id:id.toString(), name: nom };

        try {
            await postData(url, "OrderLineReception_Status", nouEstat);
            alert("Estat guardat correctament!");
            document.getElementById("altaForm").reset();
            idElement.value = await getNewId(url, "OrderLineReception_Status");
        } catch (error) {
            console.error("Error al guardar l'estat:", error);
            missatgeError.textContent = "Error al guardar l'estat al servidor.";
        }
    });
});
