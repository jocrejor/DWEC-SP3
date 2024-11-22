window.onload = main;

function main() {
    document.getElementById("cargar").addEventListener("click", cargarDatos);
    document.getElementById("estados").addEventListener("click", () => {
        document.location.href = "Listar/listar.html";
    });
}

function cargarDatos() {
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(OrderLineReception_Status));

    let div = document.getElementById("mensaje");
    let p = document.createElement("p");
    p.setAttribute("class", "valid");
    p.appendChild(document.createTextNode("Dades carregades correctament."));
    div.appendChild(p);
}
