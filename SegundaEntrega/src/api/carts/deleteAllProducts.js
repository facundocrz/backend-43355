import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCart(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await cartManager.deleteAllProductsFromCart(cartId);
    res
      .status(200)
      .json({ message: "All products removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
