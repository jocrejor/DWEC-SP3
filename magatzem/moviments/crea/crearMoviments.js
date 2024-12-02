
      // Objecte de prova (no se aon cridar-lo)
        const prova = {
            product_id: "2",
            storage_id: "03",
            street_id: "02",
            shelf_id: "03",
            space_id: "02",
            quantity: -5,
            operator_id: "3",
            origin: "Inventary",
            document: "2"
        };


async function  newMoviment (storage, street, shelf, space, product, quantity, operator, origin,document ) {
        try {

            const objMoviment= {
                "product_id": product,
                "storage_id": storage,
                "street_id": street,
                "shelf_id": shelf,
                "space_id": space,
                "quantity": quantity,
                "date": Date.now(),
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


