import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        await cartManager.updateProductQuantity(cartId, productId, quantity);
        res.status(200).json({ message: "Product quantity updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}