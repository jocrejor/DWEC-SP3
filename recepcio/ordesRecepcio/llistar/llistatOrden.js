const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

$(document).ready(async function () {
  document.getElementById("nuevaOrden").addEventListener("click", nuevaOrden);
  obtindreOrdens();
  activarFiltros();
});

function nuevaOrden() {
  window.location.assign("../alta/altaOrden.html");
}

async function obtindreOrdens() {
  try {
    const data = await getData(url, orderReceptionEP);
    $("#files").empty();
    data.forEach((order) => crearLinea(order));
  } catch (error) {
    console.log("Error:", error);
  }
}

async function crearLinea(order) {
  const proveidors = await getData(url, "Supplier");
  const linea = document.createElement("tr");
  linea.setAttribute("id", order.id);

  const esborrarTD = document.createElement("td");
  const buttonEsborrar = document.createElement("button");
  buttonEsborrar.textContent = "Esborrar";
  buttonEsborrar.className = "btn btn-danger";
  esborrarTD.appendChild(buttonEsborrar);
  buttonEsborrar.addEventListener("click", () => esborrarOrdre(order.id));

  const modificarTD = document.createElement("td");
  const buttonModificar = document.createElement("button");
  buttonModificar.textContent = "Modificar";
  buttonModificar.className = "btn btn-primary";
  buttonModificar.addEventListener("click", () => modificarOrdre(order.id));
  modificarTD.appendChild(buttonModificar);

  const visualizarTD = document.createElement("td");
  const buttonVisualizar = document.createElement("button");
  buttonVisualizar.textContent = "Visualitzar";
  buttonVisualizar.className = "btn btn-primary";
  visualizarTD.appendChild(buttonVisualizar);
  buttonVisualizar.addEventListener("click", () => visualizarOrdre(order.id));

  const id = document.createElement("td");
  const textId = document.createTextNode(order.id);
  id.appendChild(textId);

  const proveidorTD = document.createElement("td");
  const proveidor = proveidors.find(proveidor => proveidor.id === order.supplier_id.toString()).name;
  
  const textProveidor = document.createTextNode(proveidor);
  proveidorTD.appendChild(textProveidor);

  const dataEstimada = document.createElement("td");
  const textDataEstimada = document.createTextNode(
    order.estimated_reception_date
  );
  dataEstimada.appendChild(textDataEstimada);

  linea.appendChild(esborrarTD);
  linea.appendChild(modificarTD);
  linea.appendChild(visualizarTD);
  linea.appendChild(id);
  linea.appendChild(proveidorTD);
  linea.appendChild(dataEstimada);

  files.appendChild(linea);
}

async function activarFiltros() {
  const proveidors = await getData(url, "Supplier");
  const availableTags = [];
  proveidors.forEach(proveidor => availableTags.push(proveidor.name));
  

  $("#search").autocomplete({
    source: availableTags,
  });

  $("#filter").click(function() {
    $("#search-group").fadeToggle(300);
  });
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
      await deleteData(url, orderReceptionEP, id);
      const orderLineReception = await getData(url, orderLineReceptionEP);
      const lineToDelete = orderLineReception.filter(product => product.order_reception_id === id);
      lineToDelete.forEach(async product => await deleteData(url, orderLineReceptionEP, product.id));
      obtindreOrdens();
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

function modificarOrdre(id) {
  fetch(url + orderReceptionEP)
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
  fetch(url + orderReceptionEP)
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
