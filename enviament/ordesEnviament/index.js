document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("carregar").addEventListener("click", carregar)
});

function carregar () {
    localStorage.setItem("clients", JSON.stringify(Client));
    localStorage.setItem("products", JSON.stringify(Product));
    localStorage.setItem("carriers", JSON.stringify(Carriers));
    localStorage.setItem("Carriers", JSON.stringify())
}