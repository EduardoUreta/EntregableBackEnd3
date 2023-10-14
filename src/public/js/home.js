let currentCartId = null;

const createCart = async () => {
    // Crea un nuevo carrito y guarda su ID
    const newCart = await fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
    });
    currentCartId = await fetch(`http://localhost:8080/api/carts/${newCart}`, {
        method: 'GET',
    });
    const responseJson = await currentCartId.json(); // Convierte la respuesta en un objeto JavaScript
    const cartId = responseJson.result._id; // Accede al ID del carrito
    console.log("Nuevo Carrito", cartId);
};

const addToCart = async (productId) => {
    if (!currentCartId) {
        // Si no hay un carrito actual, crea uno
        await createCart();
    }

    // Asegúrate de que currentCartId no sea null o undefined antes de realizar la solicitud
    if (currentCartId) {
        // Agrega el producto al carrito utilizando el ID del carrito actual
        await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
            method: 'PUT',
        });
        console.log('Producto agregado al carrito con ID:', currentCartId);
    } else {
        console.log('Error: No se ha creado el carrito.');
    }
};
