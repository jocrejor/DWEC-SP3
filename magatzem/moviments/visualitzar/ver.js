// Inicialització principal
window.onload = function () {
    carregarDadesEstat();

    document.getElementById("tornar").addEventListener("click", () => {
        window.location.href = "../moviments.html"
    });
};

// Carrega les dades de l'estat al formulari
function carregarDadesEstat() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); 
    console.log("ID obtingut de la URL:", id);

    getData(url,"Moviment")
        .then((data) => {
            console.log("Datos recibidos:", data); 
            const estat = data.find((item) => item.id === id);
            if (estat) {
                document.getElementById("id").value = estat.id;
                document.getElementById("product_id").value = estat.product_id;
                document.getElementById("storage_id").value = estat.storage_id;
                document.getElementById("street_id").value = estat.street_id;
                document.getElementById("shelf_id").value = estat.shelf_id;
                document.getElementById("space_id").value = estat.space_id;
                document.getElementById("quantity").value = estat.quantity;
                document.getElementById("date").value = estat.date;
                document.getElementById("operator_id").value = estat.operator_id;
                document.getElementById("origin").value = estat.origin;
                document.getElementById("document").value = estat.document;
            } else {
                throw new Error("Estat no trobat.");
            }
        })
        .catch((error) => {
            console.error("Error carregant l'estat:", error);
        });
}

