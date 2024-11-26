window.onload = main;

function main() {
  thereIsUser();  // Comprovar si l'usuari existeix
  obtindreUsuaris();
  document.getElementById("nouUsuari").addEventListener("click", nouUsuari);
}

function nouUsuari() {
  window.location.assign("../alta/altaUsuaris.html");
}

// Funció per obtenir la llista d'usuaris de la base de dades
async function obtindreUsuaris() {
  try {
    const usersList = await getData(url, "User");

    if (usersList && Array.isArray(usersList)) {
      // Comprova si la llista té usuaris
      if (usersList.length === 0) {
        console.log("No hi ha usuaris disponibles.");
      } else {
        // Crear una fila per a cada usuari
        usersList.forEach((user) => {
          crearFila(user);
        });
      }
    } else {
      console.error("No s'ha obtingut una llista d'usuaris vàlida.");
    }
  } catch (error) {
    console.error("Error en obtenir els usuaris:", error);
  }
}

function crearFila(user) {
  const tableBody = document.getElementById("files"); // Selecciona el tbody per afegir files

  const newRow = document.createElement("tr");
  newRow.setAttribute("id", user.id);
  const tdDeleteButton = document.createElement("td");
  const tdModifyButton = document.createElement("td");

  // Botó per esborrar usuari
  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", () => esborrarUsuari(user.id));
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Esborrar";
  tdDeleteButton.appendChild(deleteButton);

  // Botó per modificar usuari
  const modifyButton = document.createElement("button");
  modifyButton.addEventListener("click", () => modificarUsuari(user));
  modifyButton.classList.add("btn", "btn-warning");
  modifyButton.textContent = "Modificar";
  tdModifyButton.appendChild(modifyButton);

  // Creació dels camps
  const tdEmail = document.createElement("td");
  const tdRol = document.createElement("td");
  tdEmail.textContent = user.email;
  tdRol.textContent = user.rol; // MIRAR AÇOO

  // Afegir les cel·les a la fila
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdRol);

  // Afegir la fila a la taula
  tableBody.appendChild(newRow);
}

// Funció asíncrona per esborrar un usuari
async function esborrarUsuari(id) {
  try {
    await deleteData(url, "users", id); // Eliminació asíncrona de la base de dades

    const rowToDelete = document.getElementById(`${id}`);
    if (rowToDelete) {
      rowToDelete.remove();
    }
  } catch (error) {
    console.error("Error en esborrar l'usuari:", error);
  }
}

function modificarUsuari(user) {
  // Guardar valors al local storage
  localStorage.setItem("modUser", JSON.stringify(user));
  window.location.assign("../modificar/modificarUsuaris.html");
}
