window.onload = main;

function main() {
  document.getElementById("home").addEventListener("click", home);
  obtindreUsuaris();
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  const newUserButton = document.getElementById("nouUsuari");

  const currentUser = data.users.find((u) => u.id == currentUserId);
  if (currentUser.role != 1) {
    newUserButton.style.display = "none";
  } else {
    document.getElementById("nouUsuari").addEventListener("click", nouUsuari);
  }
}

function home() {
  location.assign("../index.html");
}

function nouUsuari() {
  window.location.assign("altaUsuaris.html");
}

// Obtindre les dades
function obtindreUsuaris() {
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const users = data.users;

  // recorrer l'arrray i mostar en pantalla els elements.
  users.forEach((user) => {
    crearFila(user);
  });
}

function crearFila(user) {
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  const tableBody = document.querySelector("tbody");

  const newRow = document.createElement("tr");
  newRow.setAttribute("id", user.id);
  const tdDeleteButton = document.createElement("td");
  const tdModifyButton = document.createElement("td");

  const currentUser = data.users.find((u) => u.id == currentUserId);
  // Creació botons
  if (currentUser.role == 1 && user.id != 1) {
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => esborrarUsuari(user.id));
    deleteButton.setAttribute("id", "esborrar");
    deleteButton.classList.add("btn", "btn-primary", "btn-lg");
    const innerDeleteButton = document.createTextNode("Esborrar");
    deleteButton.appendChild(innerDeleteButton);
    tdDeleteButton.appendChild(deleteButton);
    const modifyButton = document.createElement("button");
    modifyButton.addEventListener("click", () => modificarUsuari(user));
    modifyButton.setAttribute("id", "modificar");
    modifyButton.classList.add("btn", "btn-primary", "btn-lg");
    const innerModifyButton = document.createTextNode("Modificar");
    modifyButton.appendChild(innerModifyButton);
    tdModifyButton.appendChild(modifyButton);
  }

  // Creació camps
  const tdEmail = document.createElement("td");
  const tdRole = document.createElement("td");
  const innerTdEmail = document.createTextNode(user.email);
  const innerTdRole = document.createTextNode(user.role);
  tdEmail.appendChild(innerTdEmail);
  tdRole.appendChild(innerTdRole);

  // Afegir a la taula
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdRole);
  tableBody.appendChild(newRow);
}

function esborrarUsuari(id) {
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  let indexToDelete;

  data.users.forEach((user, index) => {
    // fer les comprobacions si l'autor es pot esborrars.

    if (user.id == id && user.role != 1) {
      indexToDelete = index;
    }
  });

  // esborrar del localstorage
  data.users.splice(indexToDelete, 1);
  localStorage.setItem("data", JSON.stringify(data));

  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarUsuari(user) {
  //guardar valors al local storage
  localStorage.setItem("modUser", JSON.stringify(user));

  window.location.assign("modificarUsuaris.html");
}
