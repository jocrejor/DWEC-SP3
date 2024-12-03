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
  const estats = await getData(url, "OrderReception_Status");
  const linea = document.createElement("tr");
  linea.setAttribute("id", order.id);

  const checkTD = document.createElement("td");
  checkTD.className = "checkBoxth";
  checkTD.setAttribute("data-no-colon", "true");
  const check = document.createElement("input");
  check.type = "checkbox";
  checkTD.appendChild(check);

  const id = document.createElement("td");
  const textId = document.createTextNode(order.id);
  id.appendChild(textId);

  const proveidorTD = document.createElement("td");
  const proveidor = proveidors.find(
    (proveidor) => proveidor.id === order.supplier_id.toString()
  ).name;
  const textProveidor = document.createTextNode(proveidor);
  proveidorTD.appendChild(textProveidor);

  const dataEstimada = document.createElement("td");
  const textDataEstimada = document.createTextNode(
    order.estimated_reception_date
  );
  dataEstimada.appendChild(textDataEstimada);

  const estatTD = document.createElement("td");
  const estat = estats.find(
    (estat) => estat.id === order.orderreception_status_id.toString()
  ).name;
  const textEstat = document.createTextNode(estat);
  estatTD.appendChild(textEstat);

  const accionsTD = document.createElement("td");
  accionsTD.setAttribute("data-no-colon", "true");
  const divAccions = document.createElement("div");
  divAccions.className = "divAccions";
  const modificar = document.createElement("a");
  modificar.addEventListener("click", () => modificarOrdre(order.id));
  const modIcon = document.createElement("i");
  modIcon.className = "fa-regular fa-pen-to-square";
  modificar.appendChild(modIcon);

  const visualitzar = document.createElement("a");
  visualitzar.addEventListener("click", () => visualizarOrdre(order.id));
  const visIcon = document.createElement("i");
  visIcon.className = "fa-regular fa-eye";
  visualitzar.appendChild(visIcon);

  const esborrar = document.createElement("a");
  esborrar.addEventListener("click", () => esborrarOrdre(order.id));
  const esbIcon = document.createElement("i");
  esbIcon.className = "fa-regular fa-trash-can";
  esborrar.appendChild(esbIcon);

  divAccions.appendChild(modificar);
  divAccions.appendChild(visualitzar);
  divAccions.appendChild(esborrar);
  accionsTD.appendChild(divAccions);

  linea.appendChild(checkTD);
  linea.appendChild(id);
  linea.appendChild(proveidorTD);
  linea.appendChild(dataEstimada);
  linea.appendChild(estatTD);
  linea.appendChild(accionsTD);

  files.appendChild(linea);
}

async function activarFiltros() {
  const proveidors = await getData(url, "Supplier");
  const availableTags = [];
  proveidors.forEach((proveidor) => availableTags.push(proveidor.name));

  $("#search").autocomplete({
    source: availableTags,
  });
  $("#search").on("input", filtraProveidor);

  $("#fromDate").on("input", filtraFromDate);
  $("#toDate").on("input", filtraToDate);

  $("#filter").click(function () {
    $("#filter-group").slideToggle(300);
  });
}

function filtraProveidor() {
  const filtro = $("#search").val().toLowerCase();
  $("#files tr").filter(function () {
    $(this).toggle($(this).find("td:nth-child(3)").text().toLowerCase().indexOf(filtro) > -1);
  });
}

function filtraFromDate() {
  const filtro = new Date($("#fromDate").val());

  if(!isNaN(filtro)){
    $("#files tr").each(function() {
      const fecha = new Date($(this).find("td:nth-child(4)").text());
      if(fecha < filtro) {
        $(this).hide();
      }
    });
  }
}

function filtraToDate() {
  const filtro = new Date($("#toDate").val());

  if(!isNaN(filtro)){
    $("#files tr").each(function() {
      const fecha = new Date($(this).find("td:nth-child(4)").text());
      if(fecha > filtro) {
        $(this).hide();
      }
    });
  }
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
      const lineToDelete = orderLineReception.filter(
        (product) => product.order_reception_id === id
      );
      lineToDelete.forEach(
        async (product) =>
          await deleteData(url, orderLineReceptionEP, product.id)
      );
      $(`#${id}`).remove();
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

async function modificarOrdre(id) {
  try {
    const data = await getData(url, orderReceptionEP);
    const orderReceptionSelected = data.find((order) => order.id === id);

    // Guardar el objeto seleccionado en el localStorage
    if (orderReceptionSelected) {
      localStorage.setItem("modOrden", JSON.stringify(orderReceptionSelected));
      window.location.assign("../modificar/modificar.html");
    }
  } catch (e) {
    console.error("ERROR: ", e);
  }
}

async function visualizarOrdre(id) {
  try {
    const data = await getData(url, orderReceptionEP);
    const ordenSeleccionada = data.find((order) => order.id === id);

    if (ordenSeleccionada) {
      localStorage.setItem(
        "ordenVisualizar",
        JSON.stringify(ordenSeleccionada)
      );
      window.location.assign("../visualitzar/visualizar.html");
    }
  } catch (e) {
    console.error("ERROR: ", e);
  }
}
