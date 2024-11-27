document.addEventListener("DOMContentLoaded", async function () {
    const urlBase = "http://localhost:5001/";
    const endPoint = "OrderLineReception_Status"; 

    const id = document.getElementById("id");
    const nom = document.getElementById("name");

    // Obtindre el paràmetre `id` de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const obtindreID = urlParams.get("id");

    if (!obtindreID) {
        alert("No s'ha trobat cap ID a la URL.");
        window.location.href = "../Listar/listar.html";
        return;
    }

    try {
        const recordData = await getData(urlBase, `${endPoint}/${obtindreID}`);

        if (recordData) {
            id.value = recordData.id;
            nom.value = recordData.name;
        } else {
            console.error("Error obtenint l'estat del servidor.");
        }
    } catch (error) {
        console.error("Error carregant l'estat:", error);
        alert("No s'han pogut obtenir les dades de l'estat.");
        window.location.href = "../Listar/listar.html";
    }

    // Acción del botón "Tornar"
    document.getElementById("tornar").addEventListener("click", function () {
        window.location.href = "../Listar/listar.html";
    });
});
