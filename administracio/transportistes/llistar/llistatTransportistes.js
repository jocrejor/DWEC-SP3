window.addEventListener("load", main);

/////
/////
/////
// Local
let url = 'http://localhost:5001/'
// Servidor
//let url = 'http://10.2.218.254:5001/'

async function postData(url,endPoint, data = {}) {
  try {
    const response = await fetch(url + endPoint, {
      method: 'POST',  // Método HTTP
      headers: {
        'Content-Type': 'application/json'  // Tipo de contenido
      },
      body: JSON.stringify(data)  // Datos JSON a enviar
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud POST');
    }

    const result = await response.json();  // Espera la conversión de la respuesta a JSON
    console.log(result);  // Trabaja con la respuesta

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

// Acces a les dades
async function getNewId(url,endPoint) {
  try {
    const response = await fetch(url + endPoint );  // Reemplaza 'data.json' con la ruta de tu archivo

    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }

    const data =  await response.json();
    const maxId = data.reduce((max, ele) => 
      (ele.id > max.id ? ele: max), data[0]);
    const newId= ++ maxId.id;
    return newId + '' ;

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

////
////
////


function main() {
    // Afegir un event listener al botó "nouTransportista"
    document.getElementById("nouTransportista").addEventListener("click", nouTransportista);
    
    // Obtenir la llista de transportistes
    obtindreTransportistes();
}

function nouTransportista() {
    // Redirigir a la pàgina d'alta de transportistes
    window.location.assign("../alta/altaTransportistes.html");
}

function obtindreTransportistes() {
    // Recuperar la llista de transportistes del localStorage
    const arrCarriers = JSON.parse(localStorage.getItem("Carriers")) || [];
    const llistat = document.getElementById("files");
    llistat.innerHTML = ""; // Netejar la taula anterior

    arrCarriers.forEach(function (carrier) {
        const tr = document.createElement("tr");

        // Botó "Esborrar"
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.className = "btn btn-danger btn-log";
        btnEsborrar.textContent = "Esborrar";
        btnEsborrar.onclick = function() { esborrar(carrier.id); };
        tdEsborrar.appendChild(btnEsborrar);
        tr.appendChild(tdEsborrar);

        // Botó "Visualitzar"
        const tdVisualitzar = document.createElement("td");
        const btnVisualitzar = document.createElement("button");
        btnVisualitzar.className = "btn btn-warning btn-log";
        btnVisualitzar.textContent = "Visualitzar";
        btnVisualitzar.onclick = function() { visualitzar(carrier); };
        tdVisualitzar.appendChild(btnVisualitzar);
        tr.appendChild(tdVisualitzar);

        // Botó "Modificar"
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.className = "btn btn-warning btn-log";
        btnModificar.textContent = "Modificar";
        btnModificar.onclick = function() {
            modificar(carrier);
            
        };
        tdModificar.appendChild(btnModificar);
        tr.appendChild(tdModificar);

        tr.appendChild(crearTd(carrier.name));
        tr.appendChild(crearTd(carrier.id));
        tr.appendChild(crearTd(carrier.nif));
        tr.appendChild(crearTd(carrier.phone));
        tr.appendChild(crearTd(carrier.email));
        tr.appendChild(crearTd(carrier.state,true));
        tr.appendChild(crearTd(carrier.province,true));
        tr.appendChild(crearTd(carrier.city,true));
        tr.appendChild(crearTd(carrier.address,true));

        llistat.appendChild(tr);
    });
}

function crearTd(text, ocult = false) {
  const td = document.createElement("td");
  td.textContent = text;
  if (ocult) {
      td.classList.add("ocult");
  }
  return td;
}


function esborrar(id) {
    // Recuperar la llista de transportistes
    const arrCarriers = JSON.parse(localStorage.getItem("Carriers")) || [];
    const index = arrCarriers.findIndex(carrier => carrier.id === id);
    if (index > -1) {
        arrCarriers.splice(index, 1); // Esborrar el transportista trobat
        localStorage.setItem("Carriers", JSON.stringify(arrCarriers)); // Actualitzar el localStorage
        obtindreTransportistes(); // Actualitzar la llista mostrada
    }
}

function modificar(carrier) {
    // Guardar els valors del transportista seleccionat al localStorage
    localStorage.setItem("modTransportista", JSON.stringify(carrier));
    window.location.assign("../modificar/modificarTransportistes.html"); // Redirigir a la pàgina de modificació
}

function visualitzar(carrier) {
    localStorage.setItem("modTransportista", JSON.stringify(carrier));
    window.location.assign("../visualitzar/visualitzarTransportistes.html");
}