// Inicialització principal
window.onload = function () {
    carregarDadesEstat();

    document.getElementById("tornar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
};

// Carrega les dades de l'estat al formulari
function carregarDadesEstat() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); 
    console.log("ID obtingut de la URL:", id);

    getData(url, "OrderLineReception_Status")
        .then((data) => {
            console.log("Datos recibidos:", data); 
            const estat = data.find((item) => item.id === id);
            if (estat) {
                document.getElementById("id").value = estat.id;
                document.getElementById("name").value = estat.name;
            } else {
                throw new Error("Estat no trobat.");
            }
        })
        .catch((error) => {
            console.error("Error carregant l'estat:", error);
        });
}

