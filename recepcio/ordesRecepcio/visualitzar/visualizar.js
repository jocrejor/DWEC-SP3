const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

$(document).ready(function inicio() {
  document.getElementById("btnRegresar").addEventListener("click", () => {
    localStorage.removeItem("ordenVisualizar");
    location.assign("../llistar/llistar.html");
  });
  const orden = JSON.parse(localStorage.getItem("ordenVisualizar"));
  if (orden) {
    mostrarOrden(orden);
    mostrarProductos(orden.id);
  }
});

async function mostrarOrden(orden) {
  const proveidors = await getData(url, "Supplier");
  const provInput = document.getElementById("supplier");
  const dateInput = document.getElementById("estimated_reception_date");

  const proveidor = proveidors.find(
    (proveidor) => proveidor.id === orden.supplier_id.toString()
  ).name;

  provInput.value = proveidor;
  dateInput.value = orden.estimated_reception_date;


}

async function mostrarProductos(ordenId) {
  const productosBody = document.getElementById("productosBody");
  const orderLine = await getData(url, orderLineReceptionEP);
  const productosDeOrden = orderLine.filter(
    (producto) => producto.order_reception_id === ordenId
  );
  const products = await getData(url, "Product");

  productosDeOrden.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.setAttribute("id", producto.id);

    const productName = products.find(
      (product) => product.id === producto.product_id
    ).name;
    const productTD = document.createElement("td");
    const textProducto = document.createTextNode(productName);
    productTD.appendChild(textProducto);
    fila.appendChild(productTD);

    const cantidadTD = document.createElement("td");
    const textCantidad = document.createTextNode(producto.quantity_ordered);
    cantidadTD.appendChild(textCantidad);
    fila.appendChild(cantidadTD);
    const btnIncidenciaTD = document.createElement("td");
    const btnIncidencia = document.createElement("button");
    btnIncidencia.className = "btn btn-primary";
    $(btnIncidencia).click(function () {
      crearIncidencia(producto.id);
    });
    const textBtn = document.createTextNode("Crear Incidencia");
    btnIncidencia.appendChild(textBtn);
    btnIncidenciaTD.appendChild(btnIncidencia);
    fila.appendChild(btnIncidenciaTD);

    productosBody.appendChild(fila);
  });

  async function crearIncidencia(id) {
    const ordreLineRecepcio = await getData(url, orderLineReceptionEP);
    const ordreSeleccionada = ordreLineRecepcio.find((o) => o.id === id);
    if (ordreSeleccionada) {
      localStorage.setItem(
        "ordreLineSeleccionada",
        JSON.stringify(ordreSeleccionada)
      );
      window.location.href =
        "../../../magatzem/Incidents/alta/altaIncidencia.html";
    }
  }
}
