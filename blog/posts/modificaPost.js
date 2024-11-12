window.onload = main;

let postSeleccionado;

function main() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    postSeleccionado = JSON.parse(localStorage.getItem("modPost"));

    if (postSeleccionado) {
        // Rellenar los campos del formulario
        document.getElementById("titol").value = postSeleccionado.titol;
        document.getElementById("descripcio").value = postSeleccionado.descripcio;

        // Llamar a cargarEtiquetas con el valor correcto de la etiqueta
        cargarEtiquetas(postSeleccionado.etiqueta); 
    }
}

function cargarEtiquetas(etiquetaSeleccionada) {
    let etiquetas = JSON.parse(localStorage.getItem("Etiquetas")) || [];
    const selectEtiqueta = document.getElementById("nom-etiqueta");

    // Limpiar opciones existentes
    selectEtiqueta.innerHTML = '<option value="" disabled selected>Select an etiqueta</option>';

    // Añadir las etiquetas guardadas
    etiquetas.forEach(etiqueta => {
        const option = document.createElement("option");
        option.value = etiqueta.nom; 

        // Crear un nodo de texto y añadirlo al elemento option
        const optionText = document.createTextNode(etiqueta.nom);
        option.appendChild(optionText);

        selectEtiqueta.appendChild(option);
    });

    // Seleccionar la etiqueta guardada
    if (etiquetaSeleccionada) {
        selectEtiqueta.value = etiquetaSeleccionada; 
    }
}


function validar(e) {
    e.preventDefault();
    esborrarError();

    if (validarTitol()) {
        enviarFormulari();
        return true;
    } else {
        error(document.getElementById("titol"), "El nom del post no és vàlid.");
        return false;
    }
}

function validarTitol() {
    var element = document.getElementById("titol");
    if (!element.checkValidity()) {
        error(element, "El titol ha de tindre entre 2 i 30 caracters.");
        return false;
    }
    return true;
}

function error(element, missatge) {
    document.getElementById("missatgeError").textContent = missatge;
    element.classList.add("error");
    element.focus();
}

function esborrarError() {
    document.getElementById("titol").classList.remove("error");
    document.getElementById("missatgeError").textContent = "";
}

function enviarFormulari() {
    const titolModificat = document.getElementById("titol").value;
    const descripcioModificada = document.getElementById("descripcio").value;
    const fotoModificada = document.getElementById("foto").files[0];
    const nomEtiquetaModificada = document.getElementById("nom-etiqueta").value;

    let posts = JSON.parse(localStorage.getItem("Posts")) || [];

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === postSeleccionado.id) {
            posts[i].titol = titolModificat;
            posts[i].descripcio = descripcioModificada;
            if (fotoModificada) posts[i].foto = URL.createObjectURL(fotoModificada);
            posts[i].etiqueta = nomEtiquetaModificada;
            break;
        }
    }

    localStorage.setItem("Posts", JSON.stringify(posts));
    localStorage.removeItem("modPost");
    window.location.href = "llistatPost.html";
}


