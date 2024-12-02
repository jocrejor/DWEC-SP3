document.addEventListener("DOMContentLoaded", function () {
    const formulari = document.getElementById("formulario");

    // Event listener per al submit del formulari
    formulari.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Objecte de prova (no se aon cridar-lo)
        const movimentDeProva = {
            product_id: "2",
            storage_id: "04",
            street_id: "05",
            shelf_id: "01",
            space_id: "01",
            quantity: 11200,
            date: "02-12-2024",
            operator_id: "1",
            origin: "Incident",
            document: "2"
        };

        // Capturar valors del formulari
        const product_id = document.getElementById("product_id").value.trim();
        const storage_id = document.getElementById("storage_id").value.trim();
        const street_id = document.getElementById("street_id").value.trim();
        const shelf_id = document.getElementById("shelf_id").value.trim();
        const space_id = document.getElementById("space_id").value.trim();
        const quantity = parseInt(document.getElementById("quantity").value.trim());
        const date = document.getElementById("date").value.trim();
        const operator_id = document.getElementById("operator_id").value.trim();
        const origin = document.getElementById("origin").value.trim(); 
        const documentValue = document.getElementById("document").value.trim(); 

        // Valida camps 
        if (!product_id || !storage_id || !street_id || !quantity || !date || !operator_id || !origin || !documentValue) {
            mostrarMissatgeError("Tots els camps són obligatoris.");
            return;
        }

        // Valida els objectes
        const nouMoviment = {
            product_id,
            storage_id,
            street_id,
            shelf_id,
            space_id,
            quantity,
            date,
            operator_id,
            origin, 
            document: documentValue // Per evitar conflicte amb "document" es una paraula reservada i abans m'havia rallat
        };

        try {
            const resposta = await postData(url, "Moviment", nouMoviment);

            // Mostrar missatge d'èxit i resposta al servidor
            alert("Nou moviment creat correctament!");
            console.log("Resposta del servidor:", resposta);
            formulari.reset();
        } catch (error) {
            console.error("Error al crear el moviment:", error);
            mostrarMissatgeError("Error al guardar el moviment al servidor.");
        }
    });

    function mostrarMissatgeError(missatge) {
        const missatgeError = document.getElementById("missatgeError");
        missatgeError.textContent = missatge;
    }
});
