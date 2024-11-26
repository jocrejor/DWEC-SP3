const API = "http://localhost:3000/";
const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

let orderRception;
let orderLineReception;
let arrTemp = [];

var productID = 0;
var idorderRception;
var idOrderLineReception;

$(document).ready(function () {
  cargarProveidor();
  cargarProductos();

  orderRception = JSON.parse(localStorage.getItem("orderRception"));
  if (orderRception === null) {
    orderRception = [];
  }

  document
    .getElementById("btnAfegir")
    .addEventListener("click", validar, false);
  document
    .getElementById("btnGravar")
    .addEventListener("click", gravarOrden, false);
  document
    .getElementById("btnGuardar")
    .addEventListener("click", guardarModificacion, false);
  document
    .getElementById("llistatOrden")
    .addEventListener("click", llistarOrden, false);
});

async function cargarProductos() {
  const productEP = "Product";
  const productSelect = document.getElementById("product");

  try {
    const products = await getData(API, productEP);

    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.name;
      option.text = product.name;
      option.setAttribute("id", product.id);
      productSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function cargarProveidor() {
  const supplierSelect = document.getElementById("supplier");
  const supplierEP = "Supplier";

  try {
    const suppliers = await getData(API, supplierEP);

    suppliers.forEach((supplier) => {
      const option = document.createElement("option");
      option.value = supplier.id;
      option.text = supplier.name;
      option.setAttribute("id", supplier.id);
      supplierSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function llistarOrden() {
  window.location.assign("../llistar/llistatOrden.html");
}

function afegirProducte() {
  const producto = document.getElementById("product").value;
  const cantidadPedida = document.getElementById("quantity_ordered").value;

  let idObj = Number(productID);

  let productoObj = {
    id: idObj,
    product: producto,
    quantity_ordered: cantidadPedida,
  };

  arrTemp.push(productoObj);

  document.getElementById("product").value = "";
  document.getElementById("quantity_ordered").value = "";
  afegirLinea(productoObj);
}

function afegirLinea(productObj) {
  var files = document.getElementById("files");

  var linea = document.createElement("tr");
  linea.setAttribute("id", `fila-${productObj.id}`);

  var productoTD = document.createElement("td");
  var textProducto = document.createTextNode(productObj.product);
  productoTD.appendChild(textProducto);

  var cantidadOrdenadaTD = document.createElement("td");
  var textCantidadOrdenada = document.createTextNode(
    productObj.quantity_ordered
  );
  cantidadOrdenadaTD.appendChild(textCantidadOrdenada);

  var esborrarTD = document.createElement("td");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  esborrarTD.appendChild(checkbox);

  var modificarTD = document.createElement("td");
  var buttonModificar = document.createElement("button");
  buttonModificar.textContent = "Modificar";
  buttonModificar.className = "btn btn-primary btn-lg";
  buttonModificar.addEventListener("click", () =>
    modificarLineReception(
      productObj.id,
      productObj.product,
      productObj.quantity_ordered
    )
  );
  modificarTD.appendChild(buttonModificar);

  linea.appendChild(productoTD);
  linea.appendChild(cantidadOrdenadaTD);
  linea.appendChild(esborrarTD);
  productID;
  linea.appendChild(modificarTD);

  files.appendChild(linea);
}

function borrarLineReception(productId) {
  arrTemp = arrTemp.filter((producto) => producto.id !== productId);

  var fila = document.getElementById(`fila-${productId}`);
  if (fila) {
    fila.remove();
  }
}

var productoEditadoID = null;
function modificarLineReception(productID, product, quantity_ordered) {
  productoEditadoID = productID;

  document.getElementById("btnGuardar").style.display = "inline-block";
  document.getElementById("btnAfegir").style.display = "none";
  document.getElementById("btnGravar").style.display = "none";
  document.getElementById("llistatOrden").style.display = "none";

  document.getElementById("product").value = product;
  document.getElementById("quantity_ordered").value = quantity_ordered;
}

function guardarModificacion() {
  const nuevoProducto = document.getElementById("product").value;
  const nuevaCantidad = document.getElementById("quantity_ordered").value;

  const productObj = arrTemp.find(
    (product) => product.id === productoEditadoID
  );
  if (productObj) {
    productObj.product = nuevoProducto;
    productObj.quantity_ordered = nuevaCantidad;
  }

  const fila = document.getElementById(`fila-${productoEditadoID}`);

  if (fila && fila.children.length > 1) {
    fila.children[0].textContent = nuevoProducto;
    fila.children[1].textContent = nuevaCantidad;
  }

  document.getElementById("product").value = "";
  document.getElementById("quantity_ordered").value = "";

  document.getElementById("btnGuardar").style.display = "none";
  document.getElementById("btnGravar").style.display = "block";
  document.getElementById("llistatOrden").style.display = "inline-block";
  document.getElementById("btnAfegir").style.display = "inline-block";

  productoEditadoID = null;
}

async function gravarOrden(e) {
  if(e) {
    e.preventDefault();
  }

  try {
    let idorderRception;
    let idOrderLineReception;

    let orderReception = await getData(API, orderReceptionEP);
    let orderLineReception = await getData(API, orderLineReceptionEP);

    if (orderReception.length == 0) {
      idorderRception = 1;
    } else {
      idorderRception = await getNewId(API, orderReceptionEP);
    }
    
    var supplier = Number(document.getElementById("supplier").value);
    var dataEstimada = document.getElementById(
      "estimated_reception_date"
    ).value;

    let order = {
      id: idorderRception,
      supplier_id: supplier,
      estimated_reception_date: dataEstimada,
      created_by: 1,
      orderreception_status_id: 1,
    };
    
    await postData(API, orderReceptionEP, order);
    

    if (orderLineReception.length == 0) {
      idOrderLineReception = 1;
    } else {
      idOrderLineReception = await getNewId(API, orderLineReceptionEP);
    }

    if (arrTemp) {
      arrTemp.forEach((product) => {
        product.id = idOrderLineReception;
        product.order_reception_id = idorderRception;
        orderLineReception.push(product);
      });
    }

    await postData(API, orderLineReceptionEP, orderLineReception);

    alert("Guardado correctamente");
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

function validarProveidor() {
  var proveidor = document.getElementById("supplier");
  if (!proveidor.checkValidity()) {
    if (proveidor.validity.valueMissing) {
      error(proveidor, "Selecciona un proveedor");
    }
    return false;
  }
  return true;
}

function validarDataEstima() {
  var dataEstimada = document.getElementById("estimated_reception_date");
  if (!dataEstimada.checkValidity()) {
    if (dataEstimada.validity.valueMissing) {
      error(dataEstimada, "Selecciona una data esperada de recepción");
    }
    return false;
  }
  return true;
}

function validarProducto() {
  var proveidor = document.getElementById("product");
  if (!proveidor.checkValidity()) {
    if (proveidor.validity.valueMissing) {
      error(proveidor, "Selecciona un producto");
    }
    return false;
  }
  return true;
}

function validarCantidadPedida() {
  var cantidadPedida = document.getElementById("quantity_ordered");
  if (!cantidadPedida.checkValidity()) {
    if (cantidadPedida.validity.valueMissing) {
      error(cantidadPedida, "Introduce la cantidad pedida");
    } else if (cantidadPedida.validity.patternMismatch) {
      error(cantidadPedida, "Introduce solo numeros");
    }
    return false;
  }
  return true;
}

function validar(e) {
  esborrarError();
  e.preventDefault();

  if (
    validarProveidor() &&
    validarDataEstima() &&
    validarProducto() &&
    validarCantidadPedida()
  ) {
    afegirProducte();
    return true;
  } else {
    return false;
  }
}

function error(element, missatge) {
  const textError = document.createTextNode(missatge);
  const elementError = document.getElementById("missatgeError");
  elementError.appendChild(textError);
  element.classList.add("error");
  element.focus();
}

function esborrarError() {
  let formulari = document.forms[0].elements;
  for (let ele of formulari) {
    ele.classList.remove("error");
  }
  document.getElementById("missatgeError").replaceChildren();
}
