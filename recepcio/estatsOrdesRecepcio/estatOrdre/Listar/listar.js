window.onload = main;

/**
 * Funció principal que s'executa en carregar la pàgina.
 * Configura els events dels botons i crida a les funcions per a crear la taula i llistar els estats.
 */
function main() {
    getEstats(); // obtindre les dades de la base de dades
    
    document.getElementById("crear").addEventListener("click", () => {
        document.location.href = "../Alta/alta.html";
    });
}

/**
 * Obté els estats des de la base de dades i els mostra a la taula.
 */
async function getEstats() {
    try {
        const response = await fetch('../../../../api/BBDD.json');

        if (!response.ok) {
           console.error('Error al obtenir els estats del servidor');
        }

        const data = await response.json(); 
        
        // Comprovació
        if (data.OrderReception_Status && Array.isArray(data.OrderReception_Status)) {
            mostrarTaula(data.OrderReception_Status);
        } else{
            console.error('Error al obtenir els estats del servidor');
        }

    } catch (error) {
        console.error('Error al carregar els estats:', error);
    }
}

/**
 * Mostra els estats a la taula HTML.
 * @param {Array} estats - Llista d'estats obtinguts des de la base de dades.
 */
function mostrarTaula(estats) {
    const tablaContenido = document.getElementById("tablaContenido");
    tablaContenido.innerHTML = "";
    
    estats.forEach(estat => {
        const fila = document.createElement("tr");
        
        fila.innerHTML = `
            <td><button class="btn btn-danger" id="eliminar">Esborrar</button></td>
            <td><button class="btn btn-warning" id="modificar">Modificar</button></td>
            <td><button class="btn btn-info" id="ver">Visualitzar</button></td>
            <td>${estat.id}</td>
            <td>${estat.name}</td>
        `;
        
        tablaContenido.appendChild(fila);

        // Afegir addEventListeners als botons
        fila.querySelector("#eliminar").addEventListener("click",() => eliminarEstado(estat.id));
        fila.querySelector("#modificar").addEventListener("click",() => modificarEstado(estat.id));
        fila.querySelector("#ver").addEventListener("click",() => verEstado(estat.id));
    });
}

/**
 * Redirigeix a la pàgina de visualització d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a visualitzar.
 */
function verEstado(id) {
    window.location.href = `../Visualizar/ver.html?id=${id}`;
}

/**
 * Redirigeix a la pàgina de modificació d'un estat, passant l'ID per la URL.
 * @param {number} id - ID de l'estat a modificar.
 */
function modificarEstado(id) {
    window.location.href = `../Modificar/modificar.html?id=${id}`;
}

/**
 * Elimina l'estat de línia d'ordres de recepció seleccionat i actualitza la taula.
 * @param {number} id - ID de l'estat a eliminar.
 */
async function eliminarEstado(id) {
    try {
        const response = await fetch('../../../../api/BBDD.json');
        const estats = await response.json();
        
        if (confirm("Estàs segur que vols eliminar aquest estat?")) {
            const indice = estats.findIndex(estado => estado.id === id);
            if (indice !== -1) {
                estats.splice(indice, 1); 
                await fetch('../../../../api/BBDD.json', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(estats) 
                });
                mostrarTaula(estats); 
            }
        }
    } catch (error) {
        console.error('Error al eliminar el estat:', error); // tio no em deixa ficar " ' "  
    }
}
