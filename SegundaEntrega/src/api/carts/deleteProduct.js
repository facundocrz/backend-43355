import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const cart = await cartManager.getCart(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await cartManager.deleteProductFromCart(cartId, productId);
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
