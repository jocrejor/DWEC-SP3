// Inicialització principal
window.onload = function () {
    carregarDadesEstat();
    document.getElementById("guardar").addEventListener("click", guardarCanvis);
    document.getElementById("cancelar").addEventListener("click", () => {
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


// Valida el nom de l'estat
function validarNomEstat() {
    const element = document.getElementById("name");
    const errorElement = document.getElementById("mensajeError");

    if (errorElement) errorElement.textContent = ""; 
    if (!element.value.trim()) {
        mostrarMissatgeError("El nom és obligatori.");
        return false;
    }

    if (element.value.length < 2 || element.value.length > 25) {
        mostrarMissatgeError("El nom ha de tenir entre 2 i 25 caràcters.");
        return false;
    }

    return true;
}

// Guarda els canvis a l'estat
async function guardarCanvis(e) {
    e.preventDefault();

    if (validarNomEstat()) {
        try {
            const id = document.getElementById("id").value.trim(); 
            const name = document.getElementById("name").value.trim();

            const estatModificat = { name };

            const resposta = await updateId(url, "OrderLineReception_Status", id, estatModificat);

            if (!resposta) throw new Error("Error en modificar l'estat");

            document.location.href = "../Listar/listar.html";
        } catch (error) {
            console.error("Error modificant l'estat:", error);
        }
    }
}

// Mostra un missatge d'error al formulari
function mostrarMissatgeError(missatge) {
    let errorElement = document.getElementById("mensajeError");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.id = "mensajeError";
        errorElement.className = "text-danger";
        document.getElementById("formulario").appendChild(errorElement);
    }
    errorElement.textContent = missatge;
}
