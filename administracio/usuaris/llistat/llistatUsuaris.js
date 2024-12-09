let usersList = [];
let rolesList = [];
$(document).ready(function () {
  thereIsUser(); // Comprovar si l'usuari existeix

  obtindreUsuaris();

  document.getElementById("nouUsuari").addEventListener("click", nouUsuari);

  $("#filtres").hide();
  $("#controlFiltre").click(controlFiltre);
  $("#aplicarFiltre").click(aplicarFiltre);
  $("#mostrarTots").click(mostrarTots); // Per a que es lleve el filtre, ho mostre tot
});

function controlFiltre() {
  if ($("#filtres").css("display") === "none") {
      $("#filtres").fadeIn("slow", function () {
          // Configurar autocompletar
          $("#filtreNom").autocomplete({
              source: usersList.map(user => user.name || "").filter(name => name) // Evitar valors buits
          });
          $("#filtreEmail").autocomplete({
              source: usersList.map(user => user.email)
          });
          $("#filtreRol").autocomplete({
              source: rolesList.map(role => role.name)
          });
      }).show();
  } else {
      $("#filtres").fadeOut("slow").hide();
  }
}

function home() {
  history.back();
}

function aplicarFiltre() {
  const nom = $("#filtreNom").val().toLowerCase();
  const email = $("#filtreEmail").val().toLowerCase();
  const rol = $("#filtreRol").val().toLowerCase();

  const usersFiltered = usersList.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(nom);
      const emailMatch = user.email.toLowerCase().includes(email);
      const roleMatch = getRoleNameById(user.role).toLowerCase().includes(rol);
      return nameMatch && emailMatch && roleMatch;
  });

  refrescarTaula(usersFiltered);
}

// Funció per mostrar tots els usuaris
function mostrarTots() {
  refrescarTaula(usersList);
}

function refrescarTaula(usuaris) {
  const tableBody = document.querySelector("#files");
  tableBody.innerHTML = "";

  if (usuaris.length === 0) {
      const noResultsRow = document.createElement("tr");
      const noResultsCell = document.createElement("td");
      noResultsCell.colSpan = 5; // Amplia la cel·la a tota la taula
      noResultsCell.textContent = "No s'han trobat usuaris.";
      noResultsRow.appendChild(noResultsCell);
      tableBody.appendChild(noResultsRow);
  } else {
      usuaris.forEach(user => crearFila(user));
  }
}

function nouUsuari() {
  window.location.assign("../alta/altaUsuaris.html");
}

// Funció per obtenir la llista d'usuaris
async function obtindreUsuaris() {
  try {
    // 1. Carregar els rols des del servidor
    rolesList = await getData(url, "UserProfile");

    if (!rolesList || !Array.isArray(rolesList)) {
      console.error("Error en obtenir la llista de rols.");
      rolesList = [];
    }

    // 2. Ara carregar els usuaris
    usersList = await getData(url, "User");

    if (usersList && Array.isArray(usersList)) {
      if (usersList.length === 0) {
        console.log("No hi ha usuaris disponibles.");
      } else {
        usersList.forEach(user => crearFila(user));
      }
    } else {
      console.error("No s'ha obtingut una llista d'usuaris vàlida.");
    }
  } catch (error) {
    console.error("Error en obtenir els usuaris o rols:", error);
  }
}

function getRoleNameById(roleId) {
  const role = rolesList.find(r => r.id == roleId);
  return role ? role.name : "Desconegut";
}

// Funció per crear una fila a la taula
function crearFila(user) {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.setAttribute("id", user.id);

  // Botó per esborrar usuari
  const tdDeleteButton = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Esborrar";
  deleteButton.classList.add("btn", "btn-primary", "btn-lg");
  deleteButton.addEventListener("click", () => esborrarUsuari(user.id));
  tdDeleteButton.appendChild(deleteButton);

  // Botó per modificar usuari
  const tdModifyButton = document.createElement("td");
  const modifyButton = document.createElement("button");
  modifyButton.textContent = "Modificar";
  modifyButton.classList.add("btn", "btn-primary", "btn-lg");
  modifyButton.addEventListener("click", () => modificarUsuari(user));
  tdModifyButton.appendChild(modifyButton);

  // Camps d'email, nom i rol
  const tdEmail = document.createElement("td");
  tdEmail.textContent = user.email;

  const tdName = document.createElement("td");
  tdName.textContent = user.name || "Sense Nom";

  const tdRole = document.createElement("td");
  tdRole.textContent = getRoleNameById(user.role); // Utilitza el nom del rol

  // Afegir a la fila
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdName);
  newRow.appendChild(tdRole);

  tableBody.appendChild(newRow);
}

// Funció per esborrar un usuari
async function esborrarUsuari(id) {
  try {
    await deleteData(url, "User", id);

    // Esborrar de la llista de la pàgina HTML
    const rowToDelete = document.getElementById(`${id}`);
    if (rowToDelete) {
      rowToDelete.remove();
    }
  } catch (error) {
    console.error("Error en esborrar l'usuari:", error);
  }
}

// Funció per modificar un usuari
function modificarUsuari(user) {
  localStorage.setItem("modUser", JSON.stringify(user));
  window.location.assign("../modificar/modificarUsuaris.html");
}
