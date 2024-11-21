$(document).ready(function() {
    carregarMagatzem();

    document.getElementById("btnGenerar").addEventListener("click", generarInventari, false);
});

function carregarMagatzem() {
    const storages = JSON.parse(localStorage.getItem("Storage")) || [];
    const storageSelect = document.getElementById("storage");

    storages.forEach(storage => {
        const option = document.createElement("option");
        option.value = storage.id; 
        option.text = storage.name;
        storageSelect.appendChild(option);
    });
}

function generarInventari() {
    const storageSelect = $("#storage").val();
    if (storageSelect) {
        localStorage.setItem("storageSelectedID", storageSelect);
        window.location.href = "alta/altaGeneral.html";
    }
}