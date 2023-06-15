import CartManager from "../../utils/cartManager.js";
const path = "./src/data/carts.json";
const cartManager = new CartManager(path);

export default async (req, res) => {
  try {
    const products = await cartManager.getProducts(parseInt(req.params.cid));
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
