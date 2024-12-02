// Variables globals
let arrayMoviments = [];
let arrayProduct = [];
let arrayUser = [];

// Carregar dades inicials 
window.onload = async function () {
  try {
    await carregarDades();
    inicialitzarEsdeveniments(); 
    construirTaula(); 
  } catch (error) {
    console.error("Error inicialitzant l'aplicació:", error);
  }
};

/**
 * Carrega les dades inicials des de l'API.
 */
async function carregarDades() {
  try {
    arrayMoviments = await getData(url, "Moviment");
    arrayProduct = await getData(url, "Product");
    arrayUser = await getData(url, "User");
  } catch (error) {
    console.error("Error carregant les dades:", error);
  }
}

/**
 * Configura els esdeveniments dels botons i altres elements interactius.
 */
function inicialitzarEsdeveniments() {
  const botoCrear = document.getElementById("crear");
  if (botoCrear) {
    botoCrear.addEventListener("click", () => {
      window.location.href = "./alta/alta.html";
    });
  }
}

/**
 * Construeix i mostra la taula amb els moviments carregats.
 */
function construirTaula() {
  const tablaContenido = document.getElementById("tablaContenido");
  if (!tablaContenido) {
    console.error("No s'ha trobat l'element amb id 'tablaContenido'");
    return;
  }
  tablaContenido.innerHTML = "";

  arrayMoviments.forEach((mov) => {
    const fila = document.createElement("tr");

    // ID
    fila.appendChild(crearCelda(mov.id));

    // Nom del producte
    fila.appendChild(crearCelda(obtenirNomProducte(mov.product_id)));

    // Magatzem
    fila.appendChild(crearCelda(mov.storage_id));

    // Carrer
    fila.appendChild(crearCelda(mov.street_id));
    
    // Estanteria
    fila.appendChild(crearCelda(mov.shelf_id));
    
    // Espai
    fila.appendChild(crearCelda(mov.space_id));

    // Quantitat
    fila.appendChild(crearCelda(mov.quantity));

    // Data
    fila.appendChild(crearCelda(mov.date));

    // Operari
    fila.appendChild(crearCelda(mov.operator_id));

    // Origen
    fila.appendChild(crearCelda(mov.orgin)); // el pobre Crespo enganyant-se amb origin mal escrit

    // Document
    fila.appendChild(crearCelda(mov.document));


    // Botó "Visualitzar"
    const actionsCell = document.createElement("td");
    const visualitzarButton = document.createElement("button");
    visualitzarButton.textContent = "Visualitzar";
    visualitzarButton.className = "btn btn-info";
    visualitzarButton.addEventListener("click", () => visualitzarMoviment(mov.id));
    actionsCell.appendChild(visualitzarButton);
    fila.appendChild(actionsCell);

    tablaContenido.appendChild(fila);
  });
}

/**
 * Crea una cel·la de taula amb un text donat.
 * @param {string} text - Text a inserir.
 * @returns {HTMLTableCellElement} La cel·la creada.
 */
function crearCelda(text) {
  const celda = document.createElement("td");
  celda.textContent = text;
  return celda;
}

/**
 * Obté el nom d'un producte a partir del seu ID.
 * @param {number} id - ID del producte.
 * @returns {string} Nom del producte.
 */
function obtenirNomProducte(id) {
  const producte = arrayProduct.find((prod) => prod.id === id);
  return producte ? producte.name : "Desconegut";
}

/**
 * Esborra un moviment i actualitza la taula.
 * @param {number} id - ID del moviment a esborrar.
 *
async function esborrarMoviment(id) {
  if (confirm("Vols esborrar aquest moviment?")) {
    try {
      await deleteData(url, "Moviment", id);
      arrayMoviments = arrayMoviments.filter((mov) => mov.id !== id);
      construirTaula();
    } catch (error) {
      console.error("Error esborrant el moviment:", error);
    }
  }
}
/
/**
 * Redirigeix a la pàgina de visualització per a un moviment.
 * @param {number} id - ID del moviment a visualitzar.
 */

function visualitzarMoviment(id) {
  window.location.href = `./visualitzar/ver.html?id=${id}`;
}