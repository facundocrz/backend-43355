import ProductManager from "../../utils/productManager.js";
const path = "./src/data/products.json";
const productManager = new ProductManager(path);
import { io } from "../../app.js";

export default async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    await productManager.deleteById(productId);
    io.emit("delete Product", productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to delete product: ${error.message}` });
  }
};