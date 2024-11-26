$(document).ready(function () {
  document.getElementById("ordens").addEventListener("click", llistar);
});

function llistar() {
  location.assign("./llistar/llistatOrden.html");
}
