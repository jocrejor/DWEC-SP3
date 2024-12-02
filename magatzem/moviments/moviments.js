// Variables globals
let arrayMoviments = [];
let arrayProduct = [];
let arrayUser = [];

// Carregar dades inicials 
window.onload = async function () {
  try {
    await carregarDades();
    construirTaula(); 

    // Temporal per a creaer Moviments de prova 
    document.getElementById("crearMovProva").addEventListener("click", async ()=>{
      // Objecte de prova (no se aon cridar-lo)
      const prova = {
        product_id: "3",
        storage_id: "03",
        street_id: "04",
        shelf_id: "02",
        space_id: "01",
        quantity: 9,
        operator_id: "2",
        origin: "OrderReception",
        document: "erft"
    };


     newMoviment(prova.storage_id,prova.street_id,prova.shelf_id,prova.space_id,prova.product_id,prova.quantity,prova.operator_id,prova.origin,prova.document);
     await carregarDades();
     construirTaula(); 
    })

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
    fila.appendChild(creaCela(mov.id));

    // Nom del producte
    fila.appendChild(creaCela(obtenirNomProducte(mov.product_id)));

    // Magatzem
    fila.appendChild(creaCela(mov.storage_id));

    // Carrer
    fila.appendChild(creaCela(mov.street_id));
    
    // Estanteria
    fila.appendChild(creaCela(mov.shelf_id));
    
    // Espai
    fila.appendChild(creaCela(mov.space_id));

    // Quantitat
    fila.appendChild(creaCela(mov.quantity));

    // Data
    fila.appendChild(creaCela(mov.date));

    // Operari
    fila.appendChild(creaCela(mov.operator_id));

    // Origen
    fila.appendChild(creaCela(mov.orgin)); // el pobre Crespo s'ha enganyat amb origin mal escrit

    // Document
    fila.appendChild(creaCela(mov.document));


    // Botó "Visualitzar"
    const accionsCela = document.createElement("td");
    const visualitzarButton = document.createElement("button");
    visualitzarButton.textContent = "Visualitzar";
    visualitzarButton.className = "btn btn-info";
    visualitzarButton.addEventListener("click", () => visualitzarMoviment(mov.id));
    accionsCela.appendChild(visualitzarButton);
    fila.appendChild(accionsCela);

    tablaContenido.appendChild(fila);
  });
}

/**
 * Crea una cel·la de taula amb un text donat.
 */
function creaCela(text) {
  const celda = document.createElement("td");
  celda.textContent = text;
  return celda;
}

/**
 * Obté el nom d'un producte a partir del seu ID.
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

/* 
* Redirigeix a la pàgina de visualització per a un moviment
*/
function visualitzarMoviment(id) {
  window.location.href = `./visualitzar/ver.html?id=${id}`;
}