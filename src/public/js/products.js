let currentCartId = null;

const addToCart = async (productId) => {

    if (!currentCartId) {
        // Si no hay un carrito actual, crea uno
        const newCartResponse = await fetch('http://localhost:8080/api/carts/', {
            method: 'POST',
        });

        const result = await newCartResponse.json();
        currentCartId = result.data._id;
        console.log('Nuevo carrito creado con ID:', currentCartId);

            // Agrega el producto al carrito utilizando el ID del carrito actual
        await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
            method: 'POST',
        });

        console.log('Producto agregado al carrito con ID:', currentCartId);
        return currentCartId;
    }

    // Agrega el producto al carrito utilizando el ID del carrito actual
    await fetch(`http://localhost:8080/api/carts/${currentCartId}/product/${productId}`, {
        method: 'POST',
    });

    console.log('Producto agregado al carrito con ID:', currentCartId);
    return currentCartId;
};
