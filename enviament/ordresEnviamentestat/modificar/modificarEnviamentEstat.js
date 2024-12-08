// Inicialització principal
window.onload = function () {
    carregarDadesEstat();
    document.getElementById("guardar").addEventListener("click", guardarCanvis);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../llistar/llistarEnviamentEstat.html";
    });
};

// Carrega les dades de l'estat al formulari
function carregarDadesEstat() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); 

    getData(url, "OrderShipping_Status")  .then((data) => {
            const estat = data.find((item) => item.id === id);
            if (estat) {
                document.getElementById("id").value = estat.id;
                document.getElementById("name").value = estat.name;
            } else {
                alert("Estat no trobat");
            }
        });
}

// Valida el nom de l'estat
function validarNom() {
    const element = document.getElementById("name");
    const errorElement = document.getElementById("mensajeError");

    if (errorElement) errorElement.textContent = ""; 
    if (!element.value.trim()) {
        mostrarError("El nom és obligatori.");
        return false;
    }

    if (element.value.length < 2 || element.value.length > 25) {
        mostrarError("El nom ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true;
}

// Guarda els canvis a l'estat
async function guardarCanvis(e) {
    e.preventDefault();
    if (validarNom()) {
            const id = document.getElementById("id").value.trim(); 
            const name = document.getElementById("name").value.trim();
            const estatModificat = { name };
            const resposta = await updateId(url, "OrderShipping_Status", id, estatModificat);
            if (!resposta) alert("Error en modificar l'estat");

            document.location.href = "../llistar/llistarEnviamentEstat.html";
    }
}

// Mostra un missatge d'error al formulari
function mostrarError(missatge) {
    let errorElement = document.getElementById("mensajeError");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.id = "mensajeError";
        errorElement.className = "text-danger";
        document.getElementById("formulario").appendChild(errorElement);
    }
    errorElement.textContent = missatge;
}