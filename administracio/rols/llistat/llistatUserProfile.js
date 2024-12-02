let profilesList = [];
$(document).ready( async function() {

  thereIsUser();


  profilesList = await getData(url,"UserProfile")
  // recorrer l'arrray i mostar en pantalla els elements.
   profilesList.forEach((profile) => {
    crearFila(profile);
  });
  document.getElementById("nouProfile").addEventListener("click", nouProfile);

  $( "#filtres" ).hide();
  $("#controlFiltre").click(controlFiltre);
  $("#filtreNom").on("keyup",filtrarRol);
  
})


function controlFiltre () {
    if ($("#filtres").css("display") === "none"){
    $( "#filtres" ).fadeIn( "slow", function() {
      const  arrFilterRol =[];
      profilesList.forEach(rol => arrFilterRol.push(rol.name)) 
      $( "#filtreNom" ).autocomplete({   
        source: arrFilterRol 
      });
      
    }).show();
    }else{
      $( "#filtres" ).fadeOut( "slow", function() {
      }).hide();
    }
}

function filtrarRol(){
 
  $( "tr" ).remove();
  const filteredData = profilesList.filter(item => item.name.includes($("#filtreNom").val()));
  filteredData.forEach((profile) => {
    
    crearFila(profile);
  });
    
}

function nouProfile() {
  window.location.assign("../alta/altaUserProfile.html");
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

  //Esborrar de la llista de la pàgina html ( mai recargar la pàgina)
  const rowToDelete = document.getElementById(`${id}`);
  rowToDelete.remove();
}

function modificarProfile(profile) {
  //guardar valors al local storage
  localStorage.setItem("modProfile", JSON.stringify(profile));

  window.location.assign("../modificar/modificarUserProfile.html");
}
