import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  const newCart = {
    products: [],
  };
  try {
    await cartManager.addCart(newCart);
    res.status(200).json({ message: "Cart created successfully" });
  } catch (error) {
    res.status(400).json({ error: `Failed to create cart: ${error.message}` });
  }
};
