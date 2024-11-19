window.onload = main;

const API = "http://localhost:3000/";
const ENDPOINT = "OrderReception";

function main() {
  document.getElementById("nuevaOrden").addEventListener("click", nuevaOrden);
  obtindreOrdens();
}

function nuevaOrden() {
  window.location.assign("../alta/altaOrden.html");
}

function obtindreOrdens() {
  fetch(API + ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((order) => crearLinea(order));
    });
}

function crearLinea(order) {
  const linea = document.createElement("tr");
  linea.setAttribute("id", order.id);

  const esborrarTD = document.createElement("td");
  const buttonEsborrar = document.createElement("button");
  buttonEsborrar.textContent = "Esborrar";
  buttonEsborrar.className = "btn btn-primary btn-lg";
  esborrarTD.appendChild(buttonEsborrar);
  buttonEsborrar.addEventListener("click", () => esborrarOrdre(order.id));

  const modificarTD = document.createElement("td");
  const buttonModificar = document.createElement("button");
  buttonModificar.textContent = "Modificar";
  buttonModificar.className = "btn btn-primary btn-lg";
  buttonModificar.addEventListener("click", () => modificarOrdre(order.id));
  modificarTD.appendChild(buttonModificar);

  const visualizarTD = document.createElement("td");
  const buttonVisualizar = document.createElement("button");
  buttonVisualizar.textContent = "Visualitzar";
  buttonVisualizar.className = "btn btn-primary btn-lg";
  visualizarTD.appendChild(buttonVisualizar);
  buttonVisualizar.addEventListener("click", () => visualizarOrdre(order.id));

  const id = document.createElement("td");
  const textId = document.createTextNode(order.id);
  id.appendChild(textId);

  const proveidor = document.createElement("td");
  const textProveidor = document.createTextNode(order.supplier_id);
  proveidor.appendChild(textProveidor);

  const dataEstimada = document.createElement("td");
  const textDataEstimada = document.createTextNode(
    order.estimated_reception_date
  );
  dataEstimada.appendChild(textDataEstimada);

  linea.appendChild(esborrarTD);
  linea.appendChild(modificarTD);
  linea.appendChild(visualizarTD);
  linea.appendChild(id);
  linea.appendChild(proveidor);
  linea.appendChild(dataEstimada);

  files.appendChild(linea);
}

function esborrarOrdre(id) {
  // fer les comprobacions si l'orden es pot esborrars.
  // esborrar del localstorage
  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  if (
    confirm(
      "¿Estás seguro de que quieres eliminar esta orden y sus productos asociados?"
    )
  ) {
    var arrOrden = JSON.parse(localStorage.getItem("orderRception")) || [];
    var arrLineReception =
      JSON.parse(localStorage.getItem("orderLineReception")) || [];

    arrOrden = arrOrden.filter((orden) => orden.id !== id);

    arrLineReception = arrLineReception.filter(
      (linea) => linea.order_reception_id !== id
    );

    localStorage.setItem("orderRception", JSON.stringify(arrOrden));
    localStorage.setItem(
      "orderLineReception",
      JSON.stringify(arrLineReception)
    );

    const filaOrden = document.querySelector(`tr[id="${id}"]`);
    if (filaOrden) {
      filaOrden.remove();
    }
  }
}

function modificarOrdre(id) {
  fetch(API + ENDPOINT)
    .then((res) => res.json())
    .then((data) => {
      const orderReceptionSelected = data.find((order) => order.id === id);

      // Guardar el objeto seleccionado en el localStorage
      if (orderReceptionSelected) {
        localStorage.setItem(
          "modOrden",
          JSON.stringify(orderReceptionSelected)
        );
        window.location.assign("../modificar/modificar.html");
      }
    });
}

function visualizarOrdre(id) {
  fetch(API + ENDPOINT)
    .then((res) => res.json())
    .then((data) => {
      const ordenSeleccionada = data.find((order) => order.id === id);

      if (ordenSeleccionada) {
        localStorage.setItem(
          "ordenVisualizar",
          JSON.stringify(ordenSeleccionada)
        );
        window.location.assign("../visualitzar/visualizar.html");
      }
    });
}
