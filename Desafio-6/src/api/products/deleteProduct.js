import { productsDao as productManager } from "../../dao/index.js";

export default async (req, res) => {
  const productId = req.params.pid;
  try {
    await productManager.deleteById(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to delete product: ${error.message}` });
  }
};