// URL base i endpoint del servidor
const urlBase = "http://localhost:3000/";
const endPoint = "OrderLineReception_Status";

const idElement = document.getElementById("id");
const nameElement = document.getElementById("name");

// Inicialització principal
window.onload = function () {
    carregarDadesEstat();
    document.getElementById("guardar").addEventListener("click", validarNomEstat());
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../Listar/listar.html";
    });
};

// Carrega les dades de l'estat al formulari
function carregarDadesEstat() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));

    fetch(`${urlBase}${endPoint}/${id}`)
        .then((res) => res.json())
        .then((estat) => {
            document.getElementById("id").value = estat.id;
            document.getElementById("name").value = estat.name;
        })
        .catch((error) => {
            console.error("Error carregant l'estat:", error);
            alert("No s'han pogut carregar les dades de l'estat.");
        });
}

// Valida el nom de l'estat
function validarNomEstat() {
    const element = document.getElementById("name");
    const errorElement = document.getElementById("mensajeError");

    // Neteja missatges d'error anteriors
    if (errorElement) errorElement.textContent = "";

    if (!element.checkValidity()) {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");

        if (element.validity.valueMissing) {
            mostrarMissatgeError("El nom és obligatori.");
        } else if (element.validity.patternMismatch || element.value.length < 2) {
            mostrarMissatgeError("El nom ha de tenir entre 2 i 25 caràcters.");
        }
        return false;
    }

    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
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


// Guarda els canvis a l'estat he copiat lo de crespo, perque no se com connectar-ho
async function guardarCanvis(e) {
    e.preventDefault(); 

    if (validarNomEstat()) {
        try {
            const id = parseInt(document.getElementById("id").value);
            const name = document.getElementById("name").value.trim();

            const estatModificat = { id, name };

            const resposta = await fetch(`${urlBase}${endPoint}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(estatModificat),
            });

            if (!resposta.ok) throw new Error("Error en modificar l'estat");

            alert("Estat modificat correctament.");
            document.location.href = "../Listar/listar.html";
        } catch (error) {
            console.error("Error modificant l'estat:", error);
            alert("No s'ha pogut modificar l'estat.");
        }
    }
} // He eliminat coses que no eren necessàries i he fet alguns canvis per fer que el codi funcione mel
