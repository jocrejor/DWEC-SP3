document.addEventListener("DOMContentLoaded", () =>{

    document.getElementById("carregar").addEventListener("click", carregar)
});

function carregar () {
    localStorage.setItem("State", JSON.stringify(State));
    localStorage.setItem("Province", JSON.stringify(Province));
    localStorage.setItem("City", JSON.stringify(City));
}