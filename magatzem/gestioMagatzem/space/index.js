window.onload = iniciar;

function iniciar () {
    let storage = {
        storage: {
            id: "03",
            name: "Magatzem Principal",
            type: "General"
        }
    };
    localStorage.setItem("storage", JSON.stringify(storage));

    let street = {
        street: {
            id: "01",
            name: "Carrer 01"
        }
    };
    localStorage.setItem("street", JSON.stringify(street));

    let shelf = {
        shelf: {
            id: "01",
            name: "Estanteria 01",
        }
    };
    localStorage.setItem("shelf", JSON.stringify(shelf));
}