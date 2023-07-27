import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartManager.addProductToCart(cartId, productId);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
