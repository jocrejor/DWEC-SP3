window.onload = iniciar;

function iniciar() {
    // Obtener la referencia de la estantería desde localStorage.
    const shelfId = JSON.parse(localStorage.getItem("Estanteria"));

    if (shelfId) {
        carregarDades(shelfId); // Cargar datos de la estantería seleccionada.
    } else {
        alert("No s'ha trobat cap referència d'estanteria.");
        window.location.assign("../llista/llistatShelf.html"); // Redirigir si no hay datos.
    }

    // Añadir eventos a los botones.
    document.getElementById("btnGuardar").addEventListener("click", guardarModificacions);
    document.getElementById("btnCancelar").addEventListener("click", () => 
        window.location.assign("../llista/llistatShelf.html")
    );
}

async function carregarDades(shelfId) {
    try {
        // Obtener los datos de las estanterías.
        const estanteries = await getData(url, "Shelf");

        // Asegurarnos de comparar el ID como cadena con ceros iniciales.
        const formattedId = String(shelfId).padStart(2, '0');
        const estanteriaSeleccionada = estanteries.find(
            (estanteria) => String(estanteria.id).padStart(2, '0') === formattedId
        );

        if (estanteriaSeleccionada) {
            // Rellenar los campos del formulario con los datos de la estantería seleccionada.
            document.getElementById("id").value = estanteriaSeleccionada.id || "";
            document.getElementById("name").value = estanteriaSeleccionada.name || "";
            document.getElementById("storage_id").value = estanteriaSeleccionada.storage_id || "";
            document.getElementById("steet_id").value = estanteriaSeleccionada.steet_id || "";
        } else {
            alert("No s'ha trobat l'estanteria amb l'ID proporcionat.");
            window.location.assign("../llista/llistatShelf.html");
        }
    } catch (error) {
        console.error("Error carregant les dades de l'estanteria:", error);
        alert("Hi ha hagut un problema carregant les dades. Torna-ho a intentar més tard.");
    }
}

function guardarModificacions(event) {
    event.preventDefault();

    // Obtener valores del formulario.
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const storage_id = document.getElementById("storage_id").value;
    const steet_id = document.getElementById("steet_id").value;

    // Validar los datos del formulario.
    if (!id || !name || !storage_id || !steet_id) {
        alert("Tots els camps són obligatoris. Revisa les dades introduïdes.");
        return;
    }

    // Obtener estanterías desde localStorage.
    const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];

    // Buscar y actualizar la estantería en la lista.
    const index = estanteries.findIndex((estanteria) => estanteria.id === id);

    if (index !== -1) {
        estanteries[index] = { id, name, storage_id, steet_id };
        localStorage.setItem("shelfs", JSON.stringify(estanteries));

        alert("Estanteria modificada correctament.");
        window.location.assign("../llista/llistatShelf.html");
    } else {
        alert("No s'ha trobat l'estanteria a modificar.");
    }
}
