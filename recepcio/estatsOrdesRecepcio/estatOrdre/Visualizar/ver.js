document.addEventListener("DOMContentLoaded", async function () {
    const urlBase = "http://localhost:5001/"; // URL base del backend
    const endPoint = "OrderReception_Status"; // Endpoint corresponent al CRUD del servidor

    const idElement = document.getElementById("id");
    const nameElement = document.getElementById("name");

    // Obté l'ID de l'estat des de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
        alert("No s'ha trobat cap ID a la URL.");
        window.location.href = "../Listar/listar.html";
        return;
    }

    try {
        // Petició per obtenir l'estat des del backend
        const resposta = await fetch(`${urlBase}${endPoint}/${id}`);
        if (!resposta.ok) {
           console.error("Error obtenint l'estat del servidor.");
        }

        const estat = await resposta.json();

        // Mostrar les dades al formulari
        idElement.value = estat.id;
        nameElement.value = estat.name;
    } catch (error) {
        console.error("Error carregant l'estat:", error);
        alert("No s'han pogut obtenir les dades de l'estat.");
        window.location.href = "../Listar/listar.html";
    }

    // Acció del botó "Tornar"
    document.getElementById("tornar").addEventListener("click", function () {
        window.location.href = "../Listar/listar.html";
    });
});
