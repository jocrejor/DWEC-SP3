document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("enviar").addEventListener("click",validar)
})


function validar (){

}



function validarEmail() {
    
    const element = document.getElementById("email");
      
        if (!element.checkValidity()) {
                if (element.validity.valueMissing){
                    error(element,"Deus d'introduïr el correu electronic.");
                }
                if (element.validity.patternMismatch){
                    error(element, "El email no és vàlid, exemple nom@domini.com");
                }
                return false;
          return true;
        }      
    return false;
}

function validarContrasenya() {

    const element = document.getElementById("contrasenya");
      
        if (!element.checkValidity()) {
                if (element.validity.valueMissing){
                    error(element,"Deus d'introduïr la contrasenya ");
                }
                if (element.validity.patternMismatch){
                    error(element, "La contrasenya no és vàlid, ha de contindre almenys 6 dígits ");
                }
                return false;
          return true;
        }      
    return false;
}

// validar que existeixca el email i la contrasenya siga igual a la guardada



function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarEmail() && 
        validarContrasenya()) {

        enviarFormulari();
        return true;

    } else {
        return false;
    }
}




function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add( "error" )
    element.focus();
}

function esborrarError() {
    
    let formulari = document.forms[0].elements;
        for (let ele of formulari) {
            ele.classList.remove("error")
        }    
    document.getElementById("missatgeError").replaceChildren(); 

}

// enviar dades
function enviarFormulari() {
    // Grabar al localStorage

    setTimeout(function (){
        document.getElementById("nom").value="";
        document.getElementById("anynaix").value=0;

    },1000);
}
