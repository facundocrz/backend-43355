import { productsDao as productManager } from "../../dao/index.js";

export default async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  try {
    await productManager.updateById(productId, updatedProduct);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to update product: ${error.message}` });
  }
};