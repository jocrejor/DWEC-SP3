window.onload = iniciar;

function iniciar () {
    let storage = {
        storage: {
            id: "01",
            name: "Magatzem Principal",
            type: "Massiu"
        }
    };
    localStorage.setItem("storage", JSON.stringify(storage));

    let street = {
        street: {
            id: "01",
            name: "Carrer 1"
        }
    };
    localStorage.setItem("street", JSON.stringify(street));
}