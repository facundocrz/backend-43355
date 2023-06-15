import ProductManager from "../../utils/productManager.js";
const path = "./src/data/products.json";
const productManager = new ProductManager(path);
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
    await productManager.addProduct(newProduct);
    io.emit("add Product", {title: newProduct.title, price: newProduct.price, thumbnails: newProduct.thumbnails[0]});
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ error: `Failed to add product: ${error.message}` });
  }
};