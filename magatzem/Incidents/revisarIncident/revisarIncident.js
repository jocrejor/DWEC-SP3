$(document).ready(function () {
    revisarOrdre();
});

async function revisarOrdre(){
    const incidencies = await getData(url,"Incident"); 
    const incidentSeleccionat = JSON.parse(localStorage.getItem("incidentSeleccionat"));
    if(incidentSeleccionat){
        const incidentRevisar = incidencies.find(o => o.id === incidentSeleccionat.id);
        if(incidentRevisar){
            document.getElementById("operator").value = incidentRevisar.operator_id;
        }
    }
}
