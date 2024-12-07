window.onload = iniciar;

function iniciar() {
    // Obtener la referencia del espacio desde localStorage.
    const spaceId = JSON.parse(localStorage.getItem("modSpace"));

    if (spaceId) {
        carregarDades(spaceId); // Cargar datos del espacio seleccionado.
    } else {
        alert("No s'ha trobat cap referència d'espai.");
        window.location.assign("../llista/llistatSpace.html"); // Redirigir si no hay datos.
    }

    // Añadir eventos a los botones.
    document.getElementById("btnGuardar").addEventListener("click", guardarModificacions);
    document.getElementById("btnCancelar").addEventListener("click", () =>
        window.location.assign("../llista/llistatSpace.html")
    );
}

async function carregarDades(spaceId) {
    try {
        // Obtener los datos de los espacios.
        const spaces = await getData(url, "Space");

        // Asegurarnos de comparar el ID como cadena con ceros iniciales.
        const formattedId = String(spaceId).padStart(2, '0');
        const spaceSeleccionado = spaces.find(
            (space) => String(space.id).padStart(2, '0') === formattedId
        );

        if (spaceSeleccionado) {
            // Rellenar los campos del formulario con los datos del espacio seleccionado.
            document.getElementById("id").value = spaceSeleccionado.id || "";
            document.getElementById("name").value = spaceSeleccionado.name || "";
            document.getElementById("product_id ").value = spaceSeleccionado.product_id || "";
            document.getElementById("quantity ").value = spaceSeleccionado.quantity || "";
            document.getElementById("maxVol ").value = spaceSeleccionado.maxVol || "";
            document.getElementById("maxWeight ").value = spaceSeleccionado.maxWeight || "";
            document.getElementById("storage_id ").value = spaceSeleccionado.storage_id || "";
            document.getElementById("street_id ").value = spaceSeleccionado.street_id || "";
            document.getElementById("selft_id ").value = spaceSeleccionado.selft_id || "";
        } else {
            alert("No s'ha trobat l'espai amb l'ID proporcionat.");
            window.location.assign("../llista/llistatSpace.html");
        }
    } catch (error) {
        console.error("Error carregant les dades de l'espai:", error);
        alert("Hi ha hagut un problema carregant les dades. Torna-ho a intentar més tard.");
    }
}

async function guardarModificacions(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const product_id = document.getElementById("product_id").value;
    const quantity = document.getElementById("quantity ").value;
    const maxVol = document.getElementById("maxVol ").value;
    const maxWeight = document.getElementById("maxWeight ").value;
    const storage_id = document.getElementById("storage_id ").value;
    const street_id = document.getElementById("street_id ").value;
    const selft_id = document.getElementById("selft_id ").value;

    if (!id || !name || !product_id || !quantity || !maxVol || !maxWeight || !storage_id || !street_id || !selft_id) {
        alert("Tots els camps són obligatoris. Revisa les dades introduïdes.");
        return;
    }

    try {
        // Actualizar en el servidor
        await updateId(url, "Space", id, { id, name, product_id, quantity, maxVol, maxWeight, storage_id, street_id, selft_id });

        // Actualizar en el localStorage
        const spaces = JSON.parse(localStorage.getItem("spaces")) || [];
        const index = spaces.findIndex(
            (space) => String(space.id).padStart(2, '0') === String(id).padStart(2, '0')
        );

        if (index !== -1) {
            spaces[index] = { id, name, product_id, quantity, maxVol, maxWeight, storage_id, street_id, selft_id };
            localStorage.setItem("spaces", JSON.stringify(spaces));

            alert("Espai modificat correctament.");
            window.location.assign("../llista/llistatSpace.html");
        } else {
            alert("No s'ha trobat l'espai a modificar.");
        }
    } catch (error) {
        console.error("Error al guardar les modificacions:", error);
        alert("Hi ha hagut un problema. Torna-ho a intentar més tard.");
    }
}
