window.onload = iniciar;

function iniciar() {
   
    const shelfId = JSON.parse(localStorage.getItem("Estanteria"));

    if (shelfId) {
        carregarDades(shelfId); 
    } else {
        alert("No s'ha trobat cap referència d'estanteria.");
        window.location.assign("../llista/llistatShelf.html");
    }

    document.getElementById("btnGuardar").addEventListener("click", guardarModificacions);
    document.getElementById("btnCancelar").addEventListener("click", () => 
        window.location.assign("../llista/llistatShelf.html")
    );
}

async function carregarDades(shelfId) {
    try {
       
        const estanteries = await getData(url, "Shelf");

      
        const formattedId = String(shelfId).padStart(2, '0');
        const estanteriaSeleccionada = estanteries.find(
            (estanteria) => String(estanteria.id).padStart(2, '0') === formattedId
        );

        if (estanteriaSeleccionada) {
            
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

async function guardarModificacions(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const storage_id = document.getElementById("storage_id").value;
    const steet_id = document.getElementById("steet_id").value;

    if (!id || !name || !storage_id || !steet_id) {
        alert("Tots els camps són obligatoris. Revisa les dades introduïdes.");
        return;
    }

    try {
        
        await updateId(url, "Shelf", id, { id, name, storage_id, steet_id });

        const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
        const index = estanteries.findIndex(
            (estanteria) => String(estanteria.id).padStart(2, '0') === String(id).padStart(2, '0')
        );

        if (index !== -1) {
            estanteries[index] = { id, name, storage_id, steet_id };
            localStorage.setItem("shelfs", JSON.stringify(estanteries));

            alert("Estanteria modificada correctament.");
            window.location.assign("../llista/llistatShelf.html");
        } else {
            alert("No s'ha trobat l'estanteria a modificar.");
        }
    } catch (error) {
        console.error("Error al guardar les modificacions:", error);
        alert("Hi ha hagut un problema. Torna-ho a intentar més tard.");
    }
}
