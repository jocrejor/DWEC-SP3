document.addEventListener("DOMContentLoaded", function () {
    // Assignar automàticament l'ID
    const idIncrementat = seguentID();
    document.getElementById("id").value = idIncrementat;

    // Event listener per al botó de "Cancelar"
    document.getElementById("cancelar").addEventListener("click", function() {
        window.location.href = "../Listar/listar.html"; 
    });

    // Event listener per al formulari
    document.getElementById("altaForm").addEventListener("submit", validar);
});

// Funció per obtenir el següent ID
function seguentID() {
    // Obtenim els estats existents del localStorage
    const estados = JSON.parse(localStorage.getItem("OrderLineReception_Status")) || [];
    
    // Si no hi ha estats, comencem amb 1
    if (estados.length === 0) {
        return 1;
    }

    // Trobar l'últim ID i augmentar-lo en 1
    const ultimID = estados[estados.length - 1].id; 
    return ultimID + 1;
}

function validar(e) {
    e.preventDefault(); // Evita que el formulari es tanqui

    // Obtenim els valors dels camps
    const id = document.getElementById("id").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const missatgeError = document.getElementById("missatgeError");

    // Netejar missatges d'error
    missatgeError.textContent = "";

    // Validació simple
    if (!id || !nom) {
        missatgeError.textContent = "Tots els camps són obligatoris.";
        return;
    }

    // Aquí pots afegir la lògica per guardar les dades en localStorage o enviar-les al servidor
    guardarEstat(id, nom);

    // Reiniciar el formulari
    document.getElementById("altaForm").reset();
}

function guardarEstat(id, nom) {
    // Obtenim els estats existents del localStorage
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status")) || [];

    // Comprovem si l'ID ja existeix
    if (estados.some(estado => estado.id === parseInt(id))) {
        document.getElementById("missatgeError").textContent = "L'ID ja existeix. Introdueix un ID diferent.";
        return;
    }

    // Afegim el nou estat
    estados.push({ id: parseInt(id), nom: nom });
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));

    alert("Estat guardat correctament!");
    document.getElementById("altaForm").reset();
}