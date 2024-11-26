document.addEventListener("DOMContentLoaded", async function () {
    const urlBase = "http://localhost:5001/";  // URL base del backend
    const endPoint = "OrderLineReception_Status"; // Endpoint corresponent al CRUD del servidor

    // Obtenir i mostrar el següent ID al carregar la pàgina
    const idElement = document.getElementById("id");
    const idIncrementat = await getNewId(urlBase, endPoint);
    idElement.value = idIncrementat;

    // Configurar el botó de cancel·lar
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
            await postData(urlBase, endPoint, nouEstat);
            alert("Estat guardat correctament!");
            document.getElementById("altaForm").reset();
            idElement.value = await getNewId(urlBase, endPoint);
        } catch (error) {
            console.error("Error al guardar l'estat:", error);
            missatgeError.textContent = "Error al guardar l'estat al servidor.";
        }
    });
});
