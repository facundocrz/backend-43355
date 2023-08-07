import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cartProducts = await cartManager.getProducts(cartId);
        res.status(200).json(cartProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
