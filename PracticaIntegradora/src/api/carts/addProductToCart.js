import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
