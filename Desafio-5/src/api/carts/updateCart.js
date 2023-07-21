// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.

export default async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body.products;
        await cartManager.updateCartProducts(cartId, products);
        res.status(200).json({ message: "Cart updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}