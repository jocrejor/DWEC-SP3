let arrayMoviments = [];
let arrayProduct = [];
let arrayUser = [];

window.onload = async function () {
  try {
    await carregarDades();
    construirTaula();
    await autocompleta();

    $("#filtre").on("click", function () {
      $("#divFiltres").fadeToggle(300);
    });
    document.getElementById("crearMovProva").addEventListener("click", async () => {
      const prova = {
        product_id: "2",
        storage_id: "01",
        street_id: "04",
        shelf_id: "02",
        space_id: "01",
        quantity: 9,
        operator_id: "2",
        origin: "OrderReception",
        document: "1"
      };

      newMoviment(prova.storage_id, prova.street_id, prova.shelf_id, prova.space_id, prova.product_id, prova.quantity, prova.operator_id, prova.origin, prova.document);
      await carregarDades();
      construirTaula();
    });

    document.getElementById("filtrar").addEventListener("click", filtrar);
  } catch (error) {
    console.error("Error inicialitzant l'aplicació:", error);
  }
};

/**
 * Carrega les dades inicials des de l'API (merci crud).
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
function construirTaula(moviments = arrayMoviments) {
  const taulaContingut = document.getElementById("taulaContingut");
  if (!taulaContingut) {
    console.error("No s'ha trobat l'element amb id 'taulaContingut'");
    return;
  }
  taulaContingut.innerHTML = "";

  moviments.forEach((mov) => {
    const fila = document.createElement("tr");

    // Afegir les columnes a la fila
    fila.appendChild(creaCela(mov.id));
    fila.appendChild(creaCela(obtenirNomProducte(mov.product_id)));
    fila.appendChild(creaCela(mov.storage_id));
    fila.appendChild(creaCela(mov.street_id));
    fila.appendChild(creaCela(mov.shelf_id));
    fila.appendChild(creaCela(mov.space_id));
    fila.appendChild(creaCela(mov.quantity));
    fila.appendChild(creaCela(mov.date));
    fila.appendChild(creaCela(mov.operator_id));
    fila.appendChild(creaCela(mov.orgin)); //Crespo ha de canviar això, orgin per "origin"
    fila.appendChild(creaCela(mov.document));


    // Botó Visualitzar
    const accionsCela = document.createElement("td");
    const visualitzarButton = document.createElement("button");
    visualitzarButton.textContent = "Visualitzar";
    visualitzarButton.className = "btn btn-info";
    visualitzarButton.addEventListener("click", () => visualitzarMoviment(mov.id));
    accionsCela.appendChild(visualitzarButton);
    fila.appendChild(accionsCela);

    taulaContingut.appendChild(fila);
  });
}

/**
 * Crea una cel·la de taula amb un text donat.
 */
function creaCela(text) {
  const cela = document.createElement("td");
  cela.textContent = text;
  return cela;
}

/**
 * Obté el nom d'un producte a partir del seu ID.
 */
function obtenirNomProducte(id) {
  const producte = arrayProduct.find((prod) => prod.id === id);
  return producte ? producte.name : "Desconegut";
}

/**
 * Redirigeix a la pàgina de visualització per a un moviment.
 * @param {number} id - ID del moviment a visualitzar.
 */
function visualitzarMoviment(id) {
  window.location.href = `./visualitzar/ver.html?id=${id}`;
}

async function autocompleta() {
  // Autocompletear per nom de producte
  const prod = await getData(url, "Product");
  let arrayProduct = [];

  prod.forEach(p => arrayProduct.push(p.name));

  $("#buscaProducte").autocomplete({
    source: arrayProduct,
  });

  // Autocompletar per id de magatzem
  const mag = await getData(url, "Storage");
  let arrayMaga = [];

  mag.forEach(p => arrayMaga.push(p.id));

  $("#buscaMagatzem").autocomplete({
    source: arrayMaga,
  });

  // Autocompletar per id de carrer
  let arrayCarrer = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

  $("#buscaCarrer").autocomplete({
    source: arrayCarrer,
  });

  // Autocompletar per id de estanteria
  let arrayEstanteria = ["01", "02", "03", "04", "05", "06"];

  $("#buscaEstanteria").autocomplete({
    source: arrayEstanteria,
  });

  // Autocompletar per id de espai
  const espai = await getData(url, "Space");
  let arrayEspai = [];

  espai.forEach(p => arrayEspai.push(p.id));

  $("#buscaEspai").autocomplete({
    source: arrayEspai,
  });

  // Autocompletar per data
  const desde = await getData(url, "Moviment");
  let arrayDesde = [];

  desde.forEach(p => arrayDesde.push(p.date));

  $("#data").autocomplete({
    source: arrayDesde,
  });

  // Autocompletar per operari
  const op = await getData(url, "User");
  let arrayOperaris = [];

  op.forEach(p => arrayOperaris.push(p.id));

  $("#buscaOperari").autocomplete({
    source: arrayOperaris,
  });

  // Autocompletar per origen
  let arrayOrigin = ["Incident", "Reception", "Inventary", "OrderReception"];

  $("#buscaOrigen").autocomplete({
    source: arrayOrigin,
  });
}

/**
 * Filtra i reconstrueix la taula basant-se en els criteris seleccionats.
 * No faig el filtra document, per que si filtre per Origen el Document pertany al Origen
 */
function filtrar() {

  // Obtenir els valors dels camps 
  const buscaProducte = document.getElementById("buscaProducte").value.trim().toLowerCase();
  const buscaMagatzem = document.getElementById("buscaMagatzem").value.trim();
  const buscaCarrer = document.getElementById("buscaCarrer").value.trim();
  const buscaEstanteria = document.getElementById("buscaEstanteria").value.trim();
  const buscaEspai = document.getElementById("buscaEspai").value.trim();
  const dataInici = document.getElementById("dataInici").value.trim();
  const dataFinal = document.getElementById("dataFinal").value.trim();
  const dataIniciObj = dataInici ? new Date(dataInici) : null;
  const dataFinalObj = dataFinal ? new Date(dataFinal) : null;
  const buscaOperari = document.getElementById("buscaOperari").value.trim();
  const buscaOrigen = document.getElementById("buscaOrigen").value.trim();

  // Filtrar els moviments
  const movimentsFiltrats = arrayMoviments.filter((mov) => {
    const nomProducte = obtenirNomProducte(mov.product_id).toLowerCase();
    const magatzemID = mov.storage_id;
    const carrerID = mov.street_id;
    const estanteriaID = mov.shelf_id;
    const espaiID = mov.space_id;
    const dataMoviment = new Date(mov.date);
    const operariID = mov.operator_id;
    const origen = mov.orgin;

    // Validació
    const coincideixProducte = !buscaProducte || nomProducte.includes(buscaProducte);
    const coincideixMagatzem = !buscaMagatzem || magatzemID == buscaMagatzem;
    const coincideixCarrer = !buscaCarrer || carrerID == buscaCarrer;
    const coincideixEstanteria = !buscaEstanteria || estanteriaID == buscaEstanteria;
    const coincideixEspai = !buscaEspai || espaiID == buscaEspai;
    const coincideixData = !dataIniciObj || dataMoviment >= dataIniciObj;
    const coincideixDataFinal = !dataFinalObj || dataMoviment <= dataFinalObj;
    const coincideixOperari = !buscaOperari || operariID == buscaOperari;
    const coincideixOrigen = !buscaOrigen || origen == buscaOrigen;

    return coincideixProducte &&
      coincideixMagatzem &&
      coincideixCarrer &&
      coincideixEstanteria &&
      coincideixEspai &&
      coincideixData &&
      coincideixDataFinal &&
      coincideixOperari &&
      coincideixOrigen;
  });
  // Mostra la taula amb els moviments filtrats
  construirTaula(movimentsFiltrats);
}
