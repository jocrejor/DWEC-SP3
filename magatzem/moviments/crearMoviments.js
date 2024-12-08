async function  newMoviment (storage, street, shelf, space, product, quantity, operator, origin,document ) {
        try {
            const ara= new Date();
            const objMoviment= {
                "product_id": product,
                "storage_id": storage,
                "street_id": street,
                "shelf_id": shelf,
                "space_id": space,
                "quantity": quantity,
                "date": ara.toLocaleString('es-ES'),
                "operator_id": operator,
                "orgin": origin,
                "document": document
                }
            const resposta = await postData(url, "Moviment", objMoviment);
            console.log(resposta)
            } catch (error) {
            console.error("Error al crear el moviment:", error);    
    }
}