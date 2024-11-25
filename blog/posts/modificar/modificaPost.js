window.onload = main;

url = 'http://localhost:5002/';

let postSeleccionado;

function main() {
    const postSeleccionado = JSON.parse(localStorage.getItem("modPost"));

    document.getElementById("titol").setAttribute("value", postSeleccionado.title);
    document.getElementById("descripcio").textContent = postSeleccionado.description;
    document.getElementById("foto").setAttribute("value", postSeleccionado.photo);
    cargarEtiquetas(postSeleccionado.tag);
}


async function cargarEtiquetas(etiquetaSeleccionada) {
    const etiquetas = await getData(url, "Tag");
    const selectEtiqueta = document.getElementById("nom-etiqueta");

    selectEtiqueta.innerHTML = '<option value="" disabled selected>Selecciona una etiqueta</option>';

    etiquetas.forEach(etiqueta => {
        const option = document.createElement("option");
        option.value = etiqueta.name;
        option.textContent = etiqueta.name;

        if (etiqueta.name === etiquetaSeleccionada) {
            option.selected = true;
        }

        selectEtiqueta.appendChild(option);
    });
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

async function enviarFormulari() {
    const postSeleccionado = JSON.parse(localStorage.getItem("modPost"));

    const titolModificat = document.getElementById("titol").value;
    const descripcioModificada = document.getElementById("descripcio").value;
    const fotoModificada = document.getElementById("foto").files[0];
    const nomEtiquetaModificada = document.getElementById("nom-etiqueta").value;

    postSeleccionado.title = titolModificat;
    postSeleccionado.description = descripcioModificada;
    postSeleccionado.photo = fotoModificada;
    postSeleccionado.tag = nomEtiquetaModificada;

    await updateId(url, "Post", postSeleccionado.id, postSeleccionado);

    localStorage.removeItem("modPost");

    window.location.href = "../llistat/llistarPosts.html";
}


