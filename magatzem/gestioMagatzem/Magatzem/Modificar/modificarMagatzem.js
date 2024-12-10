document.addEventListener("DOMContentLoaded", () => {
    const storageSeleccionat = JSON.parse(localStorage.getItem("modificaMagatzem"));

    if (!storageSeleccionat) {
        alert("No s'ha seleccionat cap magatzem per modificar.");
        window.location.assign("../Llistar/llistaMagatzem.html");
        return;
    }

    console.log("Información del almacén recuperada:", storageSeleccionat);

    if (storageSeleccionat.id === undefined || storageSeleccionat.name === undefined || storageSeleccionat.type === undefined || storageSeleccionat.address === undefined) {
        alert("La información del magatzem no es completa o está mal formateada.");
        return;
    }

    document.getElementById("id").value = storageSeleccionat.id; 
    document.getElementById("nom").value = storageSeleccionat.name;
    document.getElementById("type").value = storageSeleccionat.type;
    document.getElementById("address").value = storageSeleccionat.address;

    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        guardarModificacions(storageSeleccionat.id);
    });

    document.getElementById("btnCancelar").addEventListener("click", () => {
        window.location.assign("../Llistar/LlistaMagatzem.html");
    });
});
