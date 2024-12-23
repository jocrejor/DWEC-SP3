const API = "http://localhost:3000/";
const orderReceptionEP = "OrderReception/";
const orderLineReceptionEP = "OrderLineReception/";

$(document).ready(function() {
  document.getElementById("nuevaOrden").addEventListener("click", nuevaOrden);
  obtindreOrdens();
});

function nuevaOrden() {
  window.location.assign("../alta/altaOrden.html");
}

function obtindreOrdens() {
  fetch(API + orderReceptionEP)
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
  buttonEsborrar.className = "botoRoig text-blanc";
  esborrarTD.appendChild(buttonEsborrar);
  buttonEsborrar.addEventListener("click", () => esborrarOrdre(order.id));

  const modificarTD = document.createElement("td");
  const buttonModificar = document.createElement("button");
  buttonModificar.textContent = "Modificar";
  buttonModificar.className = "botoBlau text-blanc";
  buttonModificar.addEventListener("click", () => modificarOrdre(order.id));
  modificarTD.appendChild(buttonModificar);

  const visualizarTD = document.createElement("td");
  const buttonVisualizar = document.createElement("button");
  buttonVisualizar.textContent = "Visualitzar";
  buttonVisualizar.className = "botoBlau text-blanc";
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

async function esborrarOrdre(id) {
  // fer les comprobacions si l'orden es pot esborrars.
  // esborrar del localstorage
  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  try {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar esta orden y sus productos asociados?"
      )
    ) {
      const [response1, response2] = await Promise.all([
        fetch(API + orderReceptionEP),
        fetch(API + orderLineReceptionEP),
      ]);
      if (!response1.ok) {
        throw new Error("Error fetch 1");
      }
      if (!response2.ok) {
        throw new Error("Error fetch 2");
      }

      let arrOrden = await response1.json();
      let arrLineReception = await response2.json();
      arrOrden = arrOrden.filter((orden) => orden.id !== id);
      arrLineReception = arrLineReception.filter(
        (linea) => linea.order_reception_id !== id
      );

      await fetch(`${API}${orderReceptionEP}${id}`, {
        method: "DELETE"
      });

      await fetch(`${API}${orderLineReceptionEP}${id}`, {
        method: "DELETE"
      });

      const filaOrden = document.querySelector(`tr[id="${id}"]`);
      if (filaOrden) {
        filaOrden.remove();
      }

    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

function modificarOrdre(id) {
  fetch(API + orderReceptionEP)
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
  fetch(API + orderReceptionEP)
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
