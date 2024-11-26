window.onload = iniciar;

function iniciar() {
    const shelf = JSON.parse(localStorage.getItem("modShelf")) || {};
    carregarDades(shelf);

    document.getElementById("btnGuardar").addEventListener("click", guardarModificacions, false);
    document.getElementById("btnCancelar").addEventListener("click", () => window.location.assign("../llista/llistatShelf.html"));
}

function carregarDades(shelf) {
    document.getElementById("id").value = shelf.id;
    document.getElementById("nom").value = shelf.nom;
    document.getElementById("id_storage").value = shelf.id_storage;
    document.getElementById("id_carrer").value = shelf.id_carrer;
}

function guardarModificacions(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const id_storage = document.getElementById("id_storage").value;
    const id_carrer = document.getElementById("id_carrer").value;
  

    const estanteries = JSON.parse(localStorage.getItem("shelfs")) || [];
    const index = estanteries.findIndex((e) => e.id === id);

    if (index !== -1) {
        estanteries[index] = { id, nom, id_carrer, adreça, tipus };
        localStorage.setItem("shelfs", JSON.stringify(estanteries));
        alert("Estanteria modificada correctament.");
        window.location.assign("../llista/llistatShelf.html");
    }
}