document.addEventListener("DOMContentLoaded", () =>{

    document.getElementById("carregar").addEventListener("click", carregar)
});

function carregar () {
    localStorage.setItem("product", JSON.stringify(Product));
    localStorage.setItem("lot", JSON.stringify(lot));

}