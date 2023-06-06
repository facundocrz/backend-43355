import ProductManager from "../../utils/productManager.js";
const path = "./src/data/products.json";
const productManager = new ProductManager(path);

export default async (req, res) => {
  try {
    const product = await productManager.getDataById(parseInt(req.params.pid));
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
