window.onload = main;

function main() {
    document.getElementById("nouComentari").addEventListener("click", nouComentari);
    document.getElementById("mainBlog").addEventListener("click", irAMainBlog);
    document.getElementById("filtrarFuncion").addEventListener("click", activarFiltros); 
    document.getElementById("titol").addEventListener("input", actualizarSelectComentarios);
    obtindreComentaris();
}

function nouComentari() {
    window.location.assign("../alta/altaComentari.html");
}

function irAMainBlog() {
    window.location.assign("../../index.html");
}

async function obtindreComentaris(filtros = null) {
    const llistaComentaris = await getData(url, "Comment");
    const tbody = document.getElementById("files");

    // Limpiar la tabla antes de mostrar los comentarios
    tbody.innerHTML = "";

    // Aplicar filtros si se han definido
    const comentarisFiltrats = filtros ? llistaComentaris.filter(filtros) : llistaComentaris;

    actualizarSelectComentarios();
    // Recorrer el array y mostrar en pantalla los elementos
    comentarisFiltrats.forEach(comentari => {
        const tr = document.createElement("tr");

        // Botón para eliminar el comentario
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.className = "btn btn-primary btn-lg";
        btnEsborrar.appendChild(document.createTextNode("Esborrar"));
        btnEsborrar.onclick = () => esborrar(comentari.id);
        tdEsborrar.appendChild(btnEsborrar);

        // Botón para modificar el comentario
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.className = "btn btn-primary btn-lg";
        btnModificar.appendChild(document.createTextNode("Modificar"));
        btnModificar.onclick = () => modificar(comentari);
        tdModificar.appendChild(btnModificar);

        // Título del post
        const tdTitolPost = document.createElement("td");
        tdTitolPost.appendChild(document.createTextNode(comentari.post_title));

        // Comentario
        const tdComentari = document.createElement("td");
        tdComentari.appendChild(document.createTextNode(comentari.description));

        // Añadir elementos a la fila
        tr.appendChild(tdEsborrar);
        tr.appendChild(tdModificar);
        tr.appendChild(tdTitolPost);
        tr.appendChild(tdComentari);

        // Añadir la fila a la tabla
        tbody.appendChild(tr);
    });

    autocompletado(llistaComentaris); 
}

function activarFiltros() {
    const titol = document.getElementById("titol").value.trim().toLowerCase();
    const comentariSeleccionat = document.getElementById("inputGroupSelect01").value.trim();

    // Crear la función de filtro con los valores proporcionados
    const filtros = crearFiltro(titol, comentariSeleccionat);

    // Pasar filtros a obtindreComentaris
    obtindreComentaris(filtros);
}

function crearFiltro(titol, comentariSeleccionat) {
    return (comentari) => {
        // Validar si el título coincide
        const coincideTitol = !titol || comentari.post_title.toLowerCase().includes(titol);

        // Validar si el comentario coincide (si está seleccionado)
        const coincideComentari =
            comentariSeleccionat === "Comentari del Post..." ||
            comentari.description.toLowerCase() === comentariSeleccionat.toLowerCase();

        // Retornar verdadero si ambos filtros coinciden
        return coincideTitol && coincideComentari;
    };
}

function actualizarSelectComentarios() {
    const titol = document.getElementById("titol").value;

    getData(url, "Comment").then((comentarios) => {
        const select = document.getElementById("inputGroupSelect01");
        select.innerHTML = '<option selected>Comentari del Post...</option>';

        // Filtrar comentarios por título y añadirlos como opciones
        const comentariosFiltrados = comentarios.filter((comentari) =>
            comentari.post_title.toLowerCase().includes(titol.toLowerCase())
        );

        comentariosFiltrados.forEach((comentari) => {
            const option = document.createElement("option");
            option.value = comentari.description;
            option.textContent = comentari.description;
            select.appendChild(option);
        });
    });
}

function autocompletado(llistaComentaris) {
    const titols = [...new Set(llistaComentaris.map((comentari) => comentari.post_title))];
    $("#titol").autocomplete({
        source: titols,
    });
}

async function esborrar(id) {
    await deleteData(url, "Comment", id);
    obtindreComentaris();
}

function modificar(comentari) {
    localStorage.setItem("modComentari", JSON.stringify(comentari));
    window.location.assign("../modificar/modificaComentari.html");
}

$(document).ready(function () {
    $("#filter").on("click", function () {
        $("#search-group ,#search-button").slideToggle(400);
    });
});
