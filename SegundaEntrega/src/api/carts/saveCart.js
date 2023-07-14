import { cartsDao as cartManager } from "../../dao/index.js";

export default async (req, res) => {
  try {
    let cartId = req.session.cartId;
    let message = "";
    if (!cartId) {
      const newCart = {
        products: [],
      };
      await cartManager.addCart(newCart);
      cartId = newCart.id;
      req.session.cartId = cartId;
      message = "Cart created successfully";
    } else {
      message = "Cart already exists";
    }
    res.status(200).json({ message, cartId });
  } catch (error) {
    res.status(400).json({ error: `Failed to create cart: ${error.message}` });
  }
};
