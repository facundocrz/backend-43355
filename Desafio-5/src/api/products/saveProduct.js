import { productsDao as productManager } from "../../dao/index.js";
import { io } from "../../app.js";

export default async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const newProduct = {
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || [],
  };
  try {
    const addedProduct = await productManager.addProduct(newProduct);
    io.emit("add Product", addedProduct);
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ error: `Failed to add product: ${error.message}` });
  }
};