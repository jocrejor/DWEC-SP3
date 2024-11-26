const API = "http://localhost:3000/";
const orderReceptionEP = "OrderReception";
const orderLineReceptionEP = "OrderLineReception";

let arrTemp = [];
let productoEditadoID = null;
let orderLineReception;

$(document).ready(async function () {
  cargarProductos();
  cargarProveidor();

  let ordenMod = JSON.parse(localStorage.getItem("modOrden"));
  orderLineReception = await getData(API, orderLineReceptionEP);

  if (ordenMod) {
    document.getElementById("supplier").value = ordenMod.supplier_id;
    document.getElementById("estimated_reception_date").value =
      ordenMod.estimated_reception_date;
    arrTemp = orderLineReception.filter(
      (line) => line.order_reception_id === ordenMod.id
    );
    arrTemp.forEach(afegirLinea);
  }

  document
    .getElementById("btnAfegir")
    .addEventListener("click", validar, false);
  document
    .getElementById("btnGuardarCambios")
    .addEventListener("click", guardarCambios, false);
  document
    .getElementById("btnGuardar")
    .addEventListener("click", guardarModificacion, false);
  document.getElementById("btnCancelar").addEventListener("click", () => {
    window.location.assign("../llistar/llistatOrden.html");
  });
});

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

function afegirProducte() {
  var producto = document.getElementById("product").value;
  var cantidadPedida = document.getElementById("quantity_ordered").value;
  var idObj;

  if (orderLineReception.length == 0) {
    idObj = 0;
  } else {
    const maxObj = orderLineReception.reduce(
      (max, obj) => (obj.id > max.id ? obj : max),
      orderLineReception[0]
    );
    idObj = maxObj.id;
  }

  const productoObj = {
    id: ++idObj,
    product: producto,
    quantity_ordered: cantidadPedida,
  };

  arrTemp.push(productoObj);
  afegirLinea(productoObj);

  document.getElementById("product").value = "";
  document.getElementById("quantity_ordered").value = "";
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
  checkbox.value = "opcio";
  checkbox.addEventListener("click", () => borrarLineReception(productObj.id));
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

function modificarLineReception(productID, product, quantity_ordered) {
  productoEditadoID = productID;

  document.getElementById("btnGuardar").style.display = "inline-block";
  document.getElementById("btnAfegir").style.display = "none";
  document.getElementById("btnGuardarCambios").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";

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
  document.getElementById("btnGuardarCambios").style.display = "block";
  document.getElementById("btnCancelar").style.display = "inline-block";
  document.getElementById("btnAfegir").style.display = "inline-block";

  productoEditadoID = null;
}

async function guardarCambios() {
  let ordenMod = JSON.parse(localStorage.getItem("modOrden"));

  if (ordenMod) {
    ordenMod.supplier = document.getElementById("supplier").value;
    ordenMod.estimated_reception_date = document.getElementById(
      "estimated_reception_date"
    ).value;

    let orderReception = await getData(API, orderReceptionEP);
    if (orderReception.length > 0) {
      orderReception = orderReception.map((order) =>
        order.id === ordenMod.id ? ordenMod : order
      );
    }

    let orderLineReception = await getData(API, orderLineReceptionEP);
    orderLineReception = orderLineReception.filter(
      (line) => line.order_reception_id !== ordenMod.id
    );

    arrTemp.forEach((product) => {
      product.order_reception_id = ordenMod.id;
      orderLineReception.push(product);
    });

    if (orderReception.length > 0) {
      await postData(API, orderReceptionEP, ordenMod);
    }
    await postData(API, orderLineReceptionEP, orderLineReception);
    localStorage.removeItem("modOrden");

    alert("Cambios guardados correctamente");
    window.location.assign("../llistar/llistatOrden.html");
  }
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

  if (validarProducto() && validarCantidadPedida()) {
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
