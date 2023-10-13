const addToCart = async (productId) => {
    let cartId = "6525bac4a00321ba34ae4c87";

    cartId ? console.log("Aqui está el carrito") : console.log("No existe ese carrito");

    const agregar = await fetch(`/api/carts/${cartId}/product/${productId}`,
        {method: "PUT",
    });

    agregar ? alert("Producto Agregado al Carrito") : alert("Error al agregar producto al carrito");
};