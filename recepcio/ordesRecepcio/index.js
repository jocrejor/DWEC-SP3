window.onload = main;

function main(){

    document.getElementById("carregar").addEventListener("click", carregar)
    document.getElementById("ordens").addEventListener("click", llistar);
};

function carregar () {
    localStorage.setItem("Supplier", JSON.stringify(Supplier));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("OrderReception_Status", JSON.stringify(OrderReception_Status));
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(OrderLineReception_Status));
    localStorage.setItem("Product", JSON.stringify(Product));
}

function llistar() {
    location.assign("./llistar/llistatOrden.html");
}