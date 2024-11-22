window.onload = main;

/////
/////
/////
// Local
let url = 'http://localhost:5001/'
// Servidor
//let url = 'http://10.2.218.254:5001/'
// Acces a les dades
async function getData(url, endPoint) {
  try {
    const response = await fetch(url + endPoint );  // Reemplaza 'data.json' con la ruta de tu archivo

    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }

    return  await response.json();

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

// Esborrar per ID
async function deleteData(url, endPoint, id) {
  try {
    const response = await fetch(url + endPoint + '/' + id, {
      method: 'DELETE'  // Configuramos el método HTTP como DELETE
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud DELETE');
    }

    const result = await response.json();  // Si el servidor devuelve JSON en la respuesta
    console.log('Recurso eliminado:', result);

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

//////
//////
//////



async function main() {
  document.getElementById("home").addEventListener("click", home);
  
  obtindreUserProfile();
  

   
  //const data = JSON.parse(localStorage.getItem("data")) ||  [] ;
  const data = await getData("User");
  console.log(data)


    document.getElementById("nouProfile").addEventListener("click", nouProfile);

}

function home() {
  location.assign("../index.html");
}

function nouProfile() {
  window.location.assign("altaUserProfile.html");
}

// Obtindre les dades
async function obtindreUserProfile() {

  //const user_profile = JSON.parse(localStorage.getItem("user_profile")) || { userProfile: [] };
  //const profilesList = user_profile.userProfile;
  const profilesList = await getData("UserProfile")
  

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

  /*
  const user_profile = JSON.parse(localStorage.getItem("user_profile")) || { usersProfile: [] };
  let indexToDelete;
  user_profile.userProfile.forEach((profile, index) => {
    // fer les comprobacions si l'autor es pot esborrars.

    if (profile.id == id && profile.id != 1) {
      indexToDelete = index;
    }
  });

  // esborrar del localstorage
  user_profile.userProfile.splice(indexToDelete, 1);
  localStorage.setItem("user_profile", JSON.stringify(user_profile));
  */

   await deleteData("UserProfile",id);

  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarProfile(profile) {
  //guardar valors al local storage
  localStorage.setItem("modProfile", JSON.stringify(profile));

  window.location.assign("modificarUserProfile.html");
}
