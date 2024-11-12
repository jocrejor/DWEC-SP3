document.addEventListener("DOMContentLoaded", () =>{

    document.getElementById("carregar").addEventListener("click", carregar)
});

function carregar () {
    localStorage.setItem("Supplier", JSON.stringify(Supplier));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("OrderReception_Status", JSON.stringify(OrderReception_Status));
    localStorage.setItem("OrderLineReception_Status", JSON.stringify(OrderLineReception_Status));
    localStorage.setItem("Product", JSON.stringify(Product));
}