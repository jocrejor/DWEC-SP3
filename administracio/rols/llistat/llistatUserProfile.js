let profilesList = [];
let filteredProfilesList = [];  // Llista de perfils filtrats

$(document).ready(function() {

  thereIsUser();

  obtindreUserProfile();  
  
  document.getElementById("nouProfile").addEventListener("click", nouProfile);

  $("#filtres").hide();
  $("#controlFiltre").click(controlFiltre);

  // Afegir event listeners per al filtre i mostrar tots
  $("#filtrarBtn").click(aplicarFiltre);
  $("#mostrarTotsBtn").click(mostrarTots);
});

function controlFiltre() {
  console.log($("#filtres").css("display"));
  if ($("#filtres").css("display") === "none") {
    $( "#filtres" ).fadeIn("slow", function() {
      $( "#filtreNom" ).autocomplete({
        source: profilesList.map(profile => profile.name)  // Usar només els noms per a l'autocompletat
      });
    }).show();
  } else {
    $( "#filtres" ).fadeOut("slow", function() {}).hide();
  }
}

// Funció per aplicar el filtre
function aplicarFiltre() {
  const filtreNom = $("#filtreNom").val().toLowerCase();

  // Filtrar els perfils que coincideixen amb el nom introduït
  filteredProfilesList = profilesList.filter(profile => 
    profile.name.toLowerCase().includes(filtreNom)
  );

  // Actualitzar la taula amb els perfils filtrats
  actualitzarTaula(filteredProfilesList);
}

// Funció per mostrar tots els perfils
function mostrarTots() {
  // Reposar la llista filtrada amb la llista original
  filteredProfilesList = profilesList;

  // Actualitzar la taula per mostrar tots els perfils
  actualitzarTaula(filteredProfilesList);
}

// Funció per actualitzar la taula amb la llista de perfils
function actualitzarTaula(perfiles) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";  // Netejar la taula abans de tornar a omplir-la

  perfiles.forEach((profile) => {
    crearFila(profile);
  });
}

function nouProfile() {
  window.location.assign("../alta/altaUserProfile.html");
}

// Obtindre les dades
async function obtindreUserProfile() {
  profilesList = await getData(url,"UserProfile");

  // Inicialitzar la llista filtrada amb tots els perfils
  filteredProfilesList = profilesList;

  // Mostrar els perfils a la taula
  actualitzarTaula(filteredProfilesList);
}

function crearFila(profile) {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.setAttribute("id", profile.id);

  const tdDeleteButton = document.createElement("td");
  const tdModifyButton = document.createElement("td");

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", () => esborrarProfile(profile.id));
  deleteButton.setAttribute("id", "esborrar");
  deleteButton.classList.add("btn", "btn-primary", "btn-lg");
  const innerDeleteButton = document.createTextNode("Esborrar");
  deleteButton.appendChild(innerDeleteButton);
  tdDeleteButton.appendChild(deleteButton);

  const modifyButton = document.createElement("button");
  modifyButton.addEventListener("click", () => modificarProfile(profile));
  modifyButton.setAttribute("id", "modificar");
  modifyButton.classList.add("btn", "btn-primary", "btn-lg");
  const innerModifyButton = document.createTextNode("Modificar");
  modifyButton.appendChild(innerModifyButton);
  tdModifyButton.appendChild(modifyButton);

  // Creació camps
  const tdEmail = document.createElement("td");
  const tdRole = document.createElement("td");
  const innerTdEmail = document.createTextNode(profile.id);
  const innerTdRole = document.createTextNode(profile.name);
  tdEmail.appendChild(innerTdEmail);
  tdRole.appendChild(innerTdRole);

  // Afegir a la taula
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdRole);
  tableBody.appendChild(newRow);
}

async function esborrarProfile(id) {
  await deleteData(url,"UserProfile",id);

  // Esborrar de la llista de la pàgina html (mai recargar la pàgina)
  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarProfile(profile) {
  //guardar valors al local storage
  localStorage.setItem("modProfile", JSON.stringify(profile));

  window.location.assign("../modificar/modificarUserProfile.html");
}
