const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

$(document).ready(function inicio() {
    const orden = JSON.parse(localStorage.getItem("ordenVisualizar")); 
    if (orden) {
        mostrarOrden(orden);
        mostrarProductos(orden.id);
    }

    document.getElementById("btnRegresar").addEventListener("click", () => {
        localStorage.removeItem("ordenVisualizar");
        window.location.assign("../llistar/llistatOrden.html"); 
    });
});

function mostrarOrden(orden) {
    const ordenBody = document.getElementById("ordenBody");

    const fila = document.createElement('tr');
    
    const idTD = document.createElement('td');
    idTD.textContent = orden.id; 
    fila.appendChild(idTD);

    const supplierID = document.createElement('td');
    supplierID.textContent = orden.supplier;
    fila.appendChild(supplierID);

    const fechaTD = document.createElement('td');
    fechaTD.textContent = orden.estimated_reception_date; 
    fila.appendChild(fechaTD);

    ordenBody.appendChild(fila);
}

function mostrarProductos(ordenId) {
    const productosBody = document.getElementById("productosBody");
    const productos = getData(API, orderLineReceptionEP);
    const productosDeOrden = productos.filter(producto => producto.order_reception_id === ordenId);

    productosDeOrden.forEach(producto => {
        const fila = document.createElement('tr');

        const productTD = document.createElement('td');
        productTD.textContent = producto.product; 
        fila.appendChild(productTD);

        const cantidadTD = document.createElement('td');
        cantidadTD.textContent = producto.quantity_ordered; 
        fila.appendChild(cantidadTD);

        productosBody.appendChild(fila);
    });
}