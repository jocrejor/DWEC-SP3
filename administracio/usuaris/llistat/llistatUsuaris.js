window.onload = main;

function main() {
  thereIsUser();  // Comprovar si l'usuari existeix
  obtindreUsuaris();
  document.getElementById("nouUsuari").addEventListener("click", nouUsuari);
}

function nouUsuari() {
  window.location.assign("../alta/altaUsuaris.html");
}

function thereIsUser() {
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  if (!currentUserId) {
    alert("No hi ha cap usuari actiu.");
    return;
  }
}

async function obtindreUsuaris() {
  const data = JSON.parse(localStorage.getItem("data")) || { users: [] };
  const usersList = await getData(url, "users"); // Obtenció asíncrona

  usersList.forEach((user) => {
    crearFila(user);
  });
}

function crearFila(user) {
  const tableBody = document.querySelector("tbody");

  const newRow = document.createElement("tr");
  newRow.setAttribute("id", user.id);
  const tdDeleteButton = document.createElement("td");
  const tdModifyButton = document.createElement("td");

  // Botó per esborrar usuari
  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", () => esborrarUsuari(user.id));
  deleteButton.setAttribute("id", "esborrar");
  deleteButton.classList.add("btn", "btn-primary", "btn-lg");
  const innerDeleteButton = document.createTextNode("Esborrar");
  deleteButton.appendChild(innerDeleteButton);
  tdDeleteButton.appendChild(deleteButton);

  // Botó per modificar usuari
  const modifyButton = document.createElement("button");
  modifyButton.addEventListener("click", () => modificarUsuari(user));
  modifyButton.setAttribute("id", "modificar");
  modifyButton.classList.add("btn", "btn-primary", "btn-lg");
  const innerModifyButton = document.createTextNode("Modificar");
  modifyButton.appendChild(innerModifyButton);
  tdModifyButton.appendChild(modifyButton);

  // Creació dels camps
  const tdEmail = document.createElement("td");
  const tdName = document.createElement("td");
  const innerTdEmail = document.createTextNode(user.email);
  const innerTdName = document.createTextNode(user.name); // Afegit el nom
  tdEmail.appendChild(innerTdEmail);
  tdName.appendChild(innerTdName);

  // Afegir a la taula
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdName); // Afegit el nom a la fila
  tableBody.appendChild(newRow);
}

// Funció asíncrona per esborrar un usuari
async function esborrarUsuari(id) {
  await deleteData(url, "users", id); // Eliminació asíncrona

  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarUsuari(user) {
  // Guardar valors al local storage
  localStorage.setItem("modUser", JSON.stringify(user));
  window.location.assign("../modificar/modificarUsuaris.html");
}
