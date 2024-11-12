document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("listarClient").addEventListener("click", listarClient);
    document.getElementById("carregarDades").addEventListener("click", carregar);
});

function listarClient(){
    window.location.assign("listar.html");
}

function carregar () {
    localStorage.setItem("client", JSON.stringify(Client));
    localStorage.setItem("state", JSON.stringify(State));
    localStorage.setItem("province", JSON.stringify(Province));
    localStorage.setItem("city", JSON.stringify(City));

    let ultimoId = Client[Client.length - 1].id;
    localStorage.setItem("ultimoIdCliente", ultimoId);
}