const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

$(document).ready(function inicio() {
    document.getElementById("btnRegresar").addEventListener("click", () => {
        localStorage.removeItem("ordenVisualizar");
        location.assign("../llistar/llistatOrden.html"); 
    });
    const orden = JSON.parse(localStorage.getItem("ordenVisualizar")); 
    if (orden) {
        mostrarOrden(orden);
        mostrarProductos(orden.id);
    }

});

function mostrarOrden(orden) {
    const ordenBody = document.getElementById("ordenBody");

    const fila = document.createElement('tr');
    
    const idTD = document.createElement('td');
    idTD.textContent = orden.id; 
    fila.appendChild(idTD);

    const supplierID = document.createElement('td');
    supplierID.textContent = orden.supplier_id;
    fila.appendChild(supplierID);

    const fechaTD = document.createElement('td');
    fechaTD.textContent = orden.estimated_reception_date; 
    fila.appendChild(fechaTD);

    ordenBody.appendChild(fila);
}

async function mostrarProductos(ordenId) {
    const productosBody = document.getElementById("productosBody");
    const orderLine = await getData(API, orderLineReceptionEP);
    const productosDeOrden = orderLine.filter(producto => producto.order_reception_id === ordenId);
    const products = await getData(API, "Product");

    productosDeOrden.forEach(producto => {
        const fila = document.createElement('tr');

        const productName = products.find(product => Number(product.id) === producto.product_id).name;
        const productTD = document.createElement('td');
        productTD.textContent = productName; 
        fila.appendChild(productTD);

        const cantidadTD = document.createElement('td');
        cantidadTD.textContent = producto.quantity_ordered; 
        fila.appendChild(cantidadTD);

        productosBody.appendChild(fila);
    });
}