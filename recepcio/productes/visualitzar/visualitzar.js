window.onload = iniciar;

function iniciar() {
    document.getElementById('btnTornar').addEventListener("click", tornarArrere);
    mostrarProductes();
}

function mostrarProductes() {
    const producto = JSON.parse(localStorage.getItem('producteVisualitzar'));

    if (producto) {
        // Asignar valores a los nodos de texto de cada campo
        const skuNode = document.createTextNode(producto.sku || "Sin SKU");
        document.getElementById("sku").appendChild(skuNode);

        const nameNode = document.createTextNode(producto.name || "Sin nombre");
        document.getElementById("name").appendChild(nameNode);

        const descriptionNode = document.createTextNode(producto.description || "Sin descripción");
        document.getElementById("description").appendChild(descriptionNode);

        const volumeNode = document.createTextNode(producto.volume || "Sin volumen");
        document.getElementById("volume").appendChild(volumeNode);

        const weightNode = document.createTextNode(producto.weight || "Sin peso");
        document.getElementById("weight").appendChild(weightNode);

        const lotNode = document.createTextNode(producto.lotorserial || "Sin lot/serial");
        document.getElementById("lotorserial").appendChild(lotNode);

        const imageUrlNode = document.createTextNode(producto.image_url || "Sin URL de imagen");
        document.getElementById("image_url").appendChild(imageUrlNode);
    } else {
        console.error("Producto no encontrado en localStorage.");
        alert("Producto no encontrado. Redirigiendo a la lista de productos.");
        window.location.assign("../productes.html");
    }
}

function tornarArrere() {
    window.location.href = "../llistar/llistar.html";
    console.log("Navegando a la página anterior...");
}