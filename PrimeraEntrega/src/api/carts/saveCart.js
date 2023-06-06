import CartManager from "../../utils/cartManager.js";
const path = "./src/data/carts.json";
const cartManager = new CartManager(path);

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
