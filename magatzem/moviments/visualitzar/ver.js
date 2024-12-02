/**document.addEventListener("DOMContentLoaded", async function () {
    const endPoint = "OrderReception_Status"; 

    const inputId = document.getElementById("id");
    const inputName = document.getElementById("name");

    // Obtindre el paràmetre `id` de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const obtindreID = urlParams.get("id");

    if (!obtindreID) {
        alert("No s'ha trobat cap ID a la URL.");
        window.location.href = "../moviments.html";
        return;
    }

    try {
        const recordData = await getData(urlBase, `${endPoint}/${obtindreID}`);

        if (recordData) {
            inputId.value = recordData.id;
            inputName.value = recordData.name;
        } else {
            console.error("Error obtenint l'estat del servidor.");
        }
    } catch (error) {
        console.error("Error carregant l'estat:", error);
        alert("No s'han pogut obtenir les dades de l'estat.");
        window.location.href = "../moviments.html";
    }

    // Acción del botón "Tornar"
    document.getElementById("tornar").addEventListener("click", function () {
        window.location.href = "../moviments.html";
    });
});
