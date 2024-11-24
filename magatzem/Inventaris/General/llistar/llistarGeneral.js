$(document).ready(function() {
    document.getElementById("nouInventari").addEventListener("click", nouInventari);
    obtindreInventaris();
});

function nouInventari() {
    window.location.assign("../indexGeneral.html");
}

function obtindreInventaris() {
    var arrInventari = JSON.parse(localStorage.getItem('inventoryGeneral')) || [];
    var files = document.getElementById('files');

    arrInventari.forEach(inventari => {
        var linea = document.createElement('tr');
        linea.setAttribute('id', inventari.id);

        var esborrarTD = document.createElement('td');
        var buttonEsborrar = document.createElement ('button');
        buttonEsborrar.textContent = 'Esborrar';
        buttonEsborrar.className = "btn btn-primary btn-lg";
        esborrarTD.appendChild(buttonEsborrar);
        //buttonEsborrar.addEventListener("click", () => esborrarOrdre(order.id));

        var modificarTD = document.createElement('td');
        var buttonModificar = document.createElement ('button');
        buttonModificar.textContent = 'Modificar';
        buttonModificar.className = "btn btn-primary btn-lg";
        buttonModificar.addEventListener("click", () => modificarinventari(inventari.id));
        modificarTD.appendChild(buttonModificar);

        var visualizarTD = document.createElement('td');
        var buttonVisualizar = document.createElement ('button');
        buttonVisualizar.textContent = 'Visualitzar';
        buttonVisualizar.className = "btn btn-primary btn-lg";
        visualizarTD.appendChild(buttonVisualizar);
        //buttonVisualizar.addEventListener("click", () => visualizarOrdre(order.id));

        var id = document.createElement('td');
        var textId = document.createTextNode(inventari.id);
        id.appendChild(textId);

        var dataInventari = document.createElement('td');
        var textDataInventari = document.createTextNode(inventari.date);
        dataInventari.appendChild(textDataInventari);

        var estatInventari = document.createElement('td');
        var textEstatInventari = document.createTextNode(inventari.inventory_status);
        estatInventari.appendChild(textEstatInventari);

        var storage = document.createElement('td');
        var textStorage = document.createTextNode(inventari.storage);
        storage.appendChild(textStorage);

        linea.appendChild(esborrarTD);
        linea.appendChild(modificarTD);
        linea.appendChild(visualizarTD);
        linea.appendChild(id);
        linea.appendChild(dataInventari);
        linea.appendChild(estatInventari);
        linea.appendChild(storage);

        files.appendChild(linea);
    });

}

/*function esborrarOrdre(id) {
    // fer les comprobacions si l'orden es pot esborrars. 
    // esborrar del localstorage
    //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
    if (confirm("¿Estás seguro de que quieres eliminar esta orden y sus productos asociados?")) {
        var arrOrden = JSON.parse(localStorage.getItem('orderRception')) || [];
        var arrLineReception = JSON.parse(localStorage.getItem('orderLineReception')) || [];

        arrOrden = arrOrden.filter(orden => orden.id !== id);
        
        arrLineReception = arrLineReception.filter(linea => linea.order_reception_id !== id);

        localStorage.setItem('orderRception', JSON.stringify(arrOrden));
        localStorage.setItem('orderLineReception', JSON.stringify(arrLineReception));

        const filaOrden = document.querySelector(`tr[id="${id}"]`);
        if (filaOrden) {
            filaOrden.remove();
        }
    }
}*/

function modificarinventari(id) {
    const inventory = JSON.parse(localStorage.getItem("inventoryGeneral")) || []; 
    const inventorySelected = inventory.find(inventory => inventory.id === id);
        
    // Guardar el objeto seleccionado en el localStorage
    if (inventorySelected) {
        localStorage.setItem("modInventory", JSON.stringify(inventorySelected));
        window.location.assign("../modificar/modificarGeneral.html");
    }   
}

/*function visualizarOrdre(id) {
    const arrOrden = JSON.parse(localStorage.getItem("orderRception")) || []; 
    const ordenSeleccionada = arrOrden.find(order => order.id === id);

    if (ordenSeleccionada) {
        localStorage.setItem("ordenVisualizar", JSON.stringify(ordenSeleccionada));
        window.location.assign("../visualitzar/visualizar.html"); 
    }
}*/
