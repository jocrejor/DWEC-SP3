document.addEventListener("DOMContentLoaded", async function () {

    document.getElementById("cancelar").addEventListener("click", function () {
        window.location.href="../llistar/llistarEnviamentEstat.html";
    });

    document.getElementById("altaForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const nom = document.getElementById("name").value.trim();
        const missatgeError = document.getElementById("missatgeError");
        missatgeError.textContent = "";

        if (!nom) {
            missatgeError.textContent = "El camp nom es obligatori.";
            return;
        }

        const nouEstat = { name: nom };
        await postData(url, "OrderShipping_Status", nouEstat);
        window.location.href="../llistar/llistarEnviamentEstat.html";
      
    });
});