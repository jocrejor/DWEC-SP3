window.onload = main;


function main() { 
  
  thereIsUser();

  obtindreUserProfile();  
 
  document.getElementById("nouProfile").addEventListener("click", nouProfile);
}


function nouProfile() {
  window.location.assign("../alta/altaUserProfile.html");
}

// Obtindre les dades
async function obtindreUserProfile() {

  const profilesList = await getData(url,"UserProfile")
  
  // recorrer l'arrray i mostar en pantalla els elements.
  profilesList.forEach((profile) => {
    crearFila(profile);
  });
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
  const tdRol = document.createElement("td");
  const innerTdEmail = document.createTextNode(profile.id);
  const innerTdRol = document.createTextNode(profile.name);
  tdEmail.appendChild(innerTdEmail);
  tdRol.appendChild(innerTdRol);

  // Afegir a la taula
  newRow.appendChild(tdDeleteButton);
  newRow.appendChild(tdModifyButton);
  newRow.appendChild(tdEmail);
  newRow.appendChild(tdRol);
  tableBody.appendChild(newRow);
}

async function esborrarProfile(id) {


   await deleteData(url,"UserProfile",id);

  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarProfile(profile) {
  //guardar valors al local storage
  localStorage.setItem("modProfile", JSON.stringify(profile));

  window.location.assign("../modificar/modificarUserProfile.html");
}
