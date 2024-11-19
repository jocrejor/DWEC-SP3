window.onload = function () {
    const taulaInventari = document.getElementById('taulaInventari');
    const selectAllCheckbox = document.getElementById('selectAll');
    const botoFinalitzar = document.getElementById('finalitzar');
    const botoTornar = document.getElementById('tornar');
    const botoGuardar = document.getElementById('guardar');

    let llistaInventari = JSON.parse(localStorage.getItem('llistaInventari')) || [];

    // Carrega la taula amb les dades de localStorage
    function carregarTaula() {
        taulaInventari.innerHTML = '';  // Neteja la taula
        llistaInventari.forEach((item, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><input type="checkbox" class="rowCheckbox" data-index="${index}" /></td>
                <td>${item.ID}</td>
                <td>${item.ID_Inventari}</td>
                <td contenteditable="true" class="editable" data-field="Quantitat_Real" data-index="${index}">${item.Quantitat_Real}</td>
                <td>
                    <select class="editable select-reason" data-index="${index}">
                        <option value="Trencat" ${item.Raó_Inventari === 'Trencat' ? 'selected' : ''}>Trencat</option>
                        <option value="Robatori" ${item.Raó_Inventari === 'Robatori' ? 'selected' : ''}>Robatori</option>
                        <option value="Desaparegut" ${item.Raó_Inventari === 'Desaparegut' ? 'selected' : ''}>Desaparegut</option>
                        <option value="Error administratiu" ${item.Raó_Inventari === 'Error administratiu' ? 'selected' : ''}>Error administratiu</option>
                        <option value="Recompte cíclic" ${item.Raó_Inventari === 'Recompte cíclic' ? 'selected' : ''}>Recompte cíclic</option>
                    </select>
                </td>
                <td>${item.ID_operador}</td>
                <td>${item.Creat_per}</td>
                <td>${item.Data}</td>
                <td>
                    <select class="editable select-status" data-index="${index}">
                        <option value="Pendent" ${item.Estat === 'Pendent' ? 'selected' : ''}>Pendent</option>
                        <option value="Fent-se" ${item.Estat === 'Fent-se' ? 'selected' : ''}>Fent-se</option>
                        <option value="Fet" ${item.Estat === 'Fet' ? 'selected' : ''}>Fet</option>
                        <option value="Eliminat" ${item.Estat === 'Eliminat' ? 'selected' : ''}>Eliminat</option>
                    </select>
                </td>
            `;
            taulaInventari.appendChild(fila);
        });
    }

    // Selecciona o desselecciona tots els checkbox
    function seleccionaTot() {
        const checkboxes = document.querySelectorAll('.rowCheckbox');
        checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
    }

    // Guarda els canvis fets a localStorage
    function guardarCanvis() {
        document.querySelectorAll('.editable').forEach(element => {
            const index = parseInt(element.getAttribute('data-index'));
            const field = element.getAttribute('data-field');
            if (field === "Quantitat_Real") {
                llistaInventari[index].Quantitat_Real = element.textContent;
            } else if (element.classList.contains('select-reason')) {
                llistaInventari[index].Raó_Inventari = element.value;
            } else if (element.classList.contains('select-status')) {
                llistaInventari[index].Estat = element.value;
            }
        });
        localStorage.setItem('llistaInventari', JSON.stringify(llistaInventari));
        alert("Canvis guardats!");
    }

    // Elimina les files seleccionades
    function finalitzarSeleccio() {
        const indexAEliminar = Array.from(document.querySelectorAll('.rowCheckbox:checked'))
            .map(checkbox => parseInt(checkbox.getAttribute('data-index')));

        indexAEliminar.sort((a, b) => b - a).forEach(index => {
            llistaInventari.splice(index, 1);
        });

        localStorage.setItem('llistaInventari', JSON.stringify(llistaInventari));
        carregarTaula();  // Recarrega la taula
        selectAllCheckbox.checked = false;  // Desmarca "Seleccionar tot"
    }

    // Torna a la pàgina principal
    function tornarPaginaPrincipal() {
        window.location.href = '../index.html';
    }

    // Event Listeners
    selectAllCheckbox.addEventListener('change', seleccionaTot);
    botoGuardar.addEventListener('click', guardarCanvis);
    botoFinalitzar.addEventListener('click', finalitzarSeleccio);
    botoTornar.addEventListener('click', tornarPaginaPrincipal);

    carregarTaula();  // Carrega inicialment la taula
};
