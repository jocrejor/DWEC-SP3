document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("BBDD").addEventListener("click", carregarBbdd)

})



function carregarBbdd ( ){
    localStorage.setItem("Storage",JSON.stringify(Storage));
    avisCarrega("S'ha arregat correctement: Storage");
    localStorage.setItem("Street",JSON.stringify(Street));
    avisCarrega("S'ha arregat correctement: Street");
    localStorage.setItem("Shelf",JSON.stringify(Shelf));
    avisCarrega("S'ha arregat correctement: Shelf");
    localStorage.setItem("Space",JSON.stringify(Space));
    avisCarrega("S'ha arregat correctement: Spsce");


    localStorage.setItem("userProfile",JSON.stringify(userProfile));
    avisCarrega("S'ha arregat correctement: userProfile");
    localStorage.setItem("users",JSON.stringify(users));
    avisCarrega("S'ha arregat correctement: users");


    localStorage.setItem("State",JSON.stringify(State));
    avisCarrega("S'ha arregat correctement: State");
    localStorage.setItem("Province",JSON.stringify(Province));
    avisCarrega("S'ha arregat correctement: Province");
    localStorage.setItem("City",JSON.stringify(City));
    avisCarrega("S'ha arregat correctement: City");


    localStorage.setItem("Client",JSON.stringify(Client));
    avisCarrega("S'ha arregat correctement: Client");

    localStorage.setItem("Product",JSON.stringify(Product));
    avisCarrega("S'ha arregat correctement: Product");

    localStorage.setItem("lot",JSON.stringify(lot));
    avisCarrega("S'ha arregat correctement: lot");

    localStorage.setItem("Supplier",JSON.stringify(Supplier));
    avisCarrega("S'ha arregat correctement: Supplier");

    localStorage.setItem("OrderReception_Status",JSON.stringify(OrderReception_Status));
    avisCarrega("S'ha arregat correctement: OrderReception_Status");

    localStorage.setItem("OrderLineReception_Status",JSON.stringify(OrderLineReception_Status));
    avisCarrega("S'ha arregat correctement: OrderLineReception_Status");

    localStorage.setItem("Carriers",JSON.stringify(Carriers));
    avisCarrega("S'ha arregat correctement: Carriers");

    localStorage.setItem("incident",JSON.stringify(incident));
    avisCarrega("S'ha arregat correctement: incident");

    localStorage.setItem("OrderReception",JSON.stringify(OrderReception));
    avisCarrega("S'ha arregat correctement: OrderReception");

    localStorage.setItem("OrderLineReception",JSON.stringify(OrderLineReception));
    avisCarrega("S'ha arregat correctement: OrderLineReception");
    
   

}

function avisCarrega(missatge){
    const eleMiss = document.getElementById("missatge");
    const missTxt = document.createTextNode(missatge);
    const eleBr = document.createElement("br")
    eleMiss.appendChild(missTxt);
    eleMiss.appendChild(eleBr);
}