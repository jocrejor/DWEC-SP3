window.onload = iniciar;

function iniciar() {
    const modSpace = JSON.parse(localStorage.getItem("modSpace"));

    if (modSpace) {
        document.getElementById("id").value = modSpace.id;
        document.getElementById("nom").value = modSpace.nom;
        document.getElementById("volum").value = modSpace.volum;
        document.getElementById("pes").value = modSpace.pes;
    }

    document.getElementById("btnModificar").addEventListener("click", modificar);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function modificar() {
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const volum = document.getElementById("volum").value;
    const pes = document.getElementById("pes").value;

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];

    for (let i = 0; i < arrSpaces.length; i++) {
        if (arrSpaces[i].id == id) {
            arrSpaces[i].nom = nom;
            arrSpaces[i].volum = volum;
            arrSpaces[i].pes = pes;
            break;
        }
    }

    localStorage.setItem("spaces", JSON.stringify(arrSpaces));
    window.location.assign("../llista/llistatSpace.html");
}

function cancelar() {
    window.location.assign("../llista/llistatSpace.html");
}
