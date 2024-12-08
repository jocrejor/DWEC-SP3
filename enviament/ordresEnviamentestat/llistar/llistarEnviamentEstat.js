window.onload = main;
const endPoint="OrderShipping_Status";

function main() {
    getEstats();
    document.getElementById("crear").addEventListener("click", () => {
        document.location.href = "../alta/altaEnviamentEstat.html";
    });
}

/**
 * Obté els estats des de la base de dades i els mostra a la taula.
 */
async function getEstats() {
const data = await getData(url,endPoint);
         if (data && Array.isArray(data)) {
            obtindreestats(data);
        } else{
           alert('Error al obtenir els estats del servidor');
        }
}


function obtindreestats(estats) {
    const tablaContenido = document.getElementById("tablaContenido");
    tablaContenido.innerHTML = ""; 

    estats.forEach(estat => {
        // Crear una nova fila
        const fila = document.createElement("tr");
        fila.setAttribute("id", estat.id);

        // Botó Esborrar
        const tdEsborrar = document.createElement("td");
        const btnEsborrar = document.createElement("button");
        btnEsborrar.textContent = "Esborrar";
        btnEsborrar.className = "btn btn-danger";
        btnEsborrar.addEventListener("click", async () => await esborrar(estat.id));
        tdEsborrar.appendChild(btnEsborrar);

        // Botó Modificar
        const tdModificar = document.createElement("td");
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.className = "btn btn-warning";
        btnModificar.addEventListener("click", () => modificaEstat(estat.id));
        tdModificar.appendChild(btnModificar);


        const tdId = document.createElement("td");
        tdId.textContent = estat.id;

     
        const tdName = document.createElement("td");
        tdName.textContent = estat.name;

        fila.appendChild(tdEsborrar);
        fila.appendChild(tdModificar);
        fila.appendChild(tdId);
        fila.appendChild(tdName);

        
        tablaContenido.appendChild(fila);
    });
}

function modificaEstat(id) {
    window.location.href = `../modificar/modificarEnviamentEstat.html?id=${id}`;
}

async function esborrar(id){
    await deleteData(url,"OrderShipping_Status",id);
    $(`#${id}`).remove();
}