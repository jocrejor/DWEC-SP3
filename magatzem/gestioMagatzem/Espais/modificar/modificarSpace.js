window.onload = iniciar;

function iniciar() {
    const modSpace = JSON.parse(localStorage.getItem("modSpace"));

    if (modSpace) {
        document.getElementById("id").value = modSpace.id;
        document.getElementById("nom").value = modSpace.nom;
        document.getElementById("producte").value = modSpace.producte;
        document.getElementById("quantitat").value = modSpace.quantitat;
        document.getElementById("volum").value = modSpace.volum;
        document.getElementById("pes").value = modSpace.pes;
        document.getElementById("magatzem").value = modSpace.magatzem;
        document.getElementById("carrer").value = modSpace.carrer;
        document.getElementById("estanteria").value = modSpace.estanteria;
    }

    document.getElementById("btnModificar").addEventListener("click", modificar);
    document.getElementById("btnCancelar").addEventListener("click", cancelar);
}

function modificar() {
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value;
    const producte = document.getElementById("producte").value;
    const quantitat = document.getElementById("quantitat").value;
    const volum = document.getElementById("volum").value;
    const pes = document.getElementById("pes").value;
    const magatzem = document.getElementById("magatzem").value;
    const carrer = document.getElementById("carrer").value;
    const estanteria = document.getElementById("estanteria").value;

    let arrSpaces = JSON.parse(localStorage.getItem("spaces")) || [];

    for (let i = 0; i < arrSpaces.length; i++) {
        if (arrSpaces[i].id == id) {
            arrSpaces[i].nom = nom;
            arrSpaces[i].producte = producte;
            arrSpaces[i].quantitat = quantitat;
            arrSpaces[i].volum = volum;
            arrSpaces[i].pes = pes;
            arrSpaces[i].magatzem = magatzem;
            arrSpaces[i].carrer = carrer;
            arrSpaces[i].estanteria = estanteria;
            break;
        }
    }

    localStorage.setItem("spaces", JSON.stringify(arrSpaces));
    alert("Modificament fet");
    window.location.assign("../llista/llistatSpace.html");
}

function cancelar() {
    window.location.assign("../llista/llistatSpace.html");
}
