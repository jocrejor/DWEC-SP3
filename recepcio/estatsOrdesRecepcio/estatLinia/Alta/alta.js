document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD
    // Genera un ID incrementat automáticament al carregar la pàgina
=======
    // Assignar automàticament l'ID
>>>>>>> main
    const idIncrementat = seguentID();
    document.getElementById("id").value = idIncrementat;

    // Botó de cancel·lar que redirigeix a la llista
    document.getElementById("cancelar").addEventListener("click", function() {
        window.location.href = "../Listar/listar.html"; 
    });

<<<<<<< HEAD
    // Validació i guardat del formulari
=======
    // Event listener per al formulari
>>>>>>> main
    document.getElementById("altaForm").addEventListener("submit", validar);
});
/*
    Aquesta funció el que fa es generar un ID incrementat automàticament sempre
*/
function seguentID() {
    // Obtenim els estats existents del localStorage
    const estados = JSON.parse(localStorage.getItem("OrderLineReception_Status")) || [];
    if (estados.length === 0) return 1;
    const ultimID = estados[estados.length - 1].id; 
    return ultimID + 1;
}
/*
    Aquesta funció valida el formulari i si tot està correcte, el guarda a la base de dades
*/
function validar(e) {
<<<<<<< HEAD
    e.preventDefault();
=======
    e.preventDefault(); // Evita que el formulari es tanqui

    // Obtenim els valors dels camps
>>>>>>> main
    const id = document.getElementById("id").value.trim();
    const nom = document.getElementById("name").value.trim();
    const missatgeError = document.getElementById("missatgeError");
    missatgeError.textContent = "";

    // Validació de campos
    if (!nom) {
        missatgeError.textContent = "Tots els camps són obligatoris.";
        return;
    }
<<<<<<< HEAD
    
    // Guardar estat al localStorage
=======

    // Aquí pots afegir la lògica per guardar les dades en localStorage o enviar-les al servidor
>>>>>>> main
    guardarEstat(id, nom);
    document.getElementById("altaForm").reset();
    document.getElementById("id").value = seguentID();  // Genera el següent ID per al seguent registre
}
/*
    Aquesta funció guarda l'estat del formulari a la base de dades
*/ 
function guardarEstat(id, nom) {
    let estados = JSON.parse(localStorage.getItem("OrderLineReception_Status")) || [];

    if (estados.some(estado => estado.id === parseInt(id))) {
        document.getElementById("missatgeError").textContent = "L'ID ja existeix. Introdueix un ID diferent.";
        return;
    }

    estados.push({ id: parseInt(id), name: nom });
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(estados));
    alert("Estat guardat correctament!");
    document.getElementById("altaForm").reset();
}

