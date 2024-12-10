window.onload = main;

function main() {
    var modifica = JSON.parse(localStorage.getItem("modificaCarrer"));
    
    if (modifica) {
        document.getElementById("id").value = modifica.id || "";
        document.getElementById("name").value = modifica.name || "";
    } else {
        console.error("No s'ha trobat informació per a la modificació");
        window.location.assign("../Llistar/LlistatCarrer.html");
    }

    document.getElementById("btnGuardar").addEventListener("click", btnGuardar, false);
}

function btnGuardar(e) {
    e.preventDefault();
    const modifica = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value
    };

    let carrers = JSON.parse(localStorage.getItem("carrers")) || [];
    if (modifica.id) {
        const index = carrers.findIndex(carrer => carrer.id == modifica.id);
        if (index > -1) {
            carrers[index] = modifica;
            localStorage.setItem("carrers", JSON.stringify(carrers));
            // Redirigeix a la pàgina de llistat després de guardar
            window.location.assign("../Llistar/LlistatCarrer.html");
        } else {
            console.error("El registre no s'ha trobat per a actualitzar");
            window.location.assign("../Llistar/LlistatCarrer.html");
        }
    } else {
        console.error("L'ID no pot ser buit");
        window.location.assign("../Llistar/LlistatCarrer.html");
    }
}
