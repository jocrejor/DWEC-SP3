window.onload = function () {
    // Recuperar el transportista del localStorage
    const carrier = JSON.parse(localStorage.getItem("modTransportista"));

    if (carrier) {
        // Seleccionar la tabla donde se añadirán los datos
        const detailsTable = document.getElementById("transportistaDetails");

        // Lista de campos y valores
        const fields = [
            { label: "Nom", value: carrier.name },
            { label: "ID", value: carrier.id },
            { label: "NIF", value: carrier.nif },
            { label: "Telèfon", value: carrier.phone },
            { label: "Correu electrònic", value: carrier.email },
            { label: "Direcció", value: carrier.address },
            { label: "Estat", value: carrier.state },
            { label: "Província", value: carrier.province },
            { label: "Ciutat", value: carrier.city },
            { label: "cp", value: carrier.cp }
        ];

        // Generar las filas de la tabla
        fields.forEach(field => {
            const row = document.createElement("tr");

            const cellLabel = document.createElement("td");
            cellLabel.textContent = field.label;
            row.appendChild(cellLabel);

            const cellValue = document.createElement("td");
            cellValue.textContent = field.value || "-";
            row.appendChild(cellValue);

            detailsTable.appendChild(row);
        });
    } else {
        // Si no se encuentra transportista, redirigir y mostrar alerta
        alert("No s'han trobat dades del transportista.");
        window.location.assign("../llistar/llistatTransportistes.html");
    }
};
