import { cartServices } from "../services/index.js";

const saveCart = async (req, res) => {
  const newCart = {
    products: [],
  };
  try {
    const cart = await cartServices.saveCart(newCart);
    res
      .status(200)
      .json({ message: "Cart created successfully", payload: cart._id });
  } catch (error) {
    res.status(400).json({ error: `Failed to create cart: ${error.message}` });
  }
};

const getProducts = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cartProducts = await cartServices.getProducts(cartId);
    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    await cartServices.updateCartProducts(cartId, products);
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCart(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await cartServices.deleteAllProductsFromCart(cartId);
    res
      .status(200)
      .json({ message: "All products removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartServices.addProductToCart(cartId, productId);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartServices.getCart(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await cartServices.deleteProductFromCart(cartId, productId);
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    await cartServices.updateProductQuantity(cartId, productId, quantity);
    res.status(200).json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
    saveCart,
    getProducts,
    updateCart,
    deleteAllProducts,
    addProduct,
    deleteProduct,
    updateProductQuantity
}
