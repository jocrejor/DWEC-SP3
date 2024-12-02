window.onload = iniciar;

function iniciar() {
    const shelf = JSON.parse(localStorage.getItem("Estanteria"));
    carregarDades(shelf);

    document.getElementById("btnGuardar").addEventListener("click", guardarModificacions, false);
    document.getElementById("btnCancelar").addEventListener("click", () =>   window.location.assign("../llista/llistatShelf.html"));
}

async function carregarDades(shelf) {
    const estanteria = await getData(url,"Shelf");
    const estanteriaTriada = estanteria.filter(o => o.id === shelf);
    document.getElementById("id").value = estanteriaTriada.id;
    alert("hola");
    document.getElementById("name").value = estanteriaTriada.name;
    document.getElementById("storage_id").value = estanteriaTriada.storage_id;
    document.getElementById("steet_id").value = estanteriaTriada.steet_id;
     
}

function guardarModificacions(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nom = document.getElementById("name").value;
    const id_magatzem = document.getElementById("sotrgae_id").value;
    const id_carrer = document.getElementById("steet_Id").value;

    const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
    const index = estanteries.findIndex((e) => e.id === id);

    if (index !== -1) {
        
        estanteries[index] = { id, nom, id_magatzem, id_carrer };
        localStorage.setItem("shelfs", JSON.stringify(estanteries));
        alert("Estanteria modificada correctament.");
        window.location.assign("../llista/llistatShelf.html");
    } else {
        alert("No s'ha trobat l'estanteria a modificar.");
    }
}
