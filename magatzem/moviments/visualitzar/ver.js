document.addEventListener("DOMContentLoaded", async function () {
    // Llegir l'ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const obtindreID = urlParams.get("id");

    if (!obtindreID) {
        alert("No s'ha trobat cap ID a la URL.");
        window.location.href = "../moviments.html";
        return;
    }

    try {
        // Obtenir el moviment específic
        const mov = await getData(url, "Moviment",obtindreID);
        if (!mov) {
            alert("No s'ha trobat el moviment especificat.");
            window.location.href = "../moviments.html";
            return;
        }
        if (recordData) {
            id.value = recordData.id;
            producte.value = recordData.name;
            magatzem.value= recordData.magatzem;
            
        } else {
            console.error("Error obtenint l'estat del servidor.");
        }
       
    } catch (error) {
        console.error("Error carregant el moviment:", error);
        alert("Hi ha hagut un problema carregant les dades.");
        window.location.href = "../moviments.html";
    }

    // Botó "Tornar"
    document.getElementById("tornar").addEventListener("click", function () {
        window.location.href = "../moviments.html";
    });
});
