$(document).ready(function () {
    revisarOrdre();
});

function revisarOrdre(){
    const ordresRecepcio = JSON.parse(localStorage.getItem("OrderReception")) || [];
    const ordreSeleccionada = JSON.parse(localStorage.getItem("ordreSeleccionada"));
    
    if(ordreSeleccionada){
        const ordreRevisar = ordresRecepcio.find(o => o.id === ordreSeleccionada.id);
        if(ordreRevisar){
            document.getElementById("supplier").value = ordreRevisar.supplier_id;
        }
    }
}
