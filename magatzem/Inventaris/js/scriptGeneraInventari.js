window.onload = function () {
    let form = document.getElementById('formInventari');
    let id = document.getElementById('id');
    let realQuantity = document.getElementById('quantity_real');
    let inventoryReason = document.getElementById('inventory_reason');
    let botoLlista = document.getElementById('botoLlista');

    // Recuperar i configurar l'ID automàticament al carregar la pàgina
    let llistaInventari = JSON.parse(localStorage.getItem('llistaInventari')) || [];
    id.value = llistaInventari.length > 0 ? llistaInventari[llistaInventari.length - 1].ID + 1 : 1;

    // Configurar altres camps automàticament (motiu de l'inventari)
    inventoryReason.value = 0; 

    // Configurar la data automàticament, en format europeu (fck eeuu)
    var hui = new Date();
    var dia = ('0' + hui.getDate()).slice(-2);
    var mes = ('0' + (hui.getMonth() + 1)).slice(-2);
    var any = hui.getFullYear();
    const dataFormatada = dia + '/' + mes + '/' + any;
    document.getElementById('date_inventory').value = dataFormatada;

    // Event Listener per a dirigir a la pàgina de llistaInventari.html
    botoLlista.addEventListener('click', function () {
        window.location.href = '../html/llistaInventari.html';
    });

    // Event listener per a l'enviament del formulari
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Valida que els camps no estiguen buits (Crec que no es útil, perque en el html ja estic fent required, no?)
        if (!id.value || !document.getElementById('id_inventory').value ||
            !realQuantity.value || !inventoryReason.value ||
            !document.getElementById('operator_id').value ||
            !document.getElementById('created_by').value ||
            !document.getElementById('estat').value) {
            alert('Tots els camps són obligatoris.');
            return;
        }

        // Crea l'objecte itemInventari amb les dades del formulari
        const itemInventari = {
            ID: parseInt(id.value),
            ID_Inventari: document.getElementById('id_inventory').value,
            Quantitat_Real: parseInt(realQuantity.value),
            Raó_Inventari: inventoryReason.value,
            ID_operador: document.getElementById('operator_id').value,
            Creat_per: document.getElementById('created_by').value,
            Data: dataFormatada,
            Estat: document.getElementById('estat').value
        };

        // Guardar en localStorage
        llistaInventari.push(itemInventari);
        localStorage.setItem('llistaInventari', JSON.stringify(llistaInventari));

        console.log('Contingut de localStorage: ', localStorage.getItem('llistaInventari'));

        // Reinicia el formulari i ajusta la data
        form.reset();
        document.getElementById('date_inventory').value = dataFormatada;

        // Incrementa l'ID per al següent registre
        id.value = itemInventari.ID + 1;
    });
};


