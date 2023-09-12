import {
  cartServices,
  productServices,
  ticketServices,
} from "../services/index.js";

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
    req.logger.error(error.message);
    res.status(400).json({ error: `Failed to create cart: ${error.message}` });
  }
};

const getProducts = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cartProducts = await cartServices.getProducts(cartId);
    res.status(200).json(cartProducts);
  } catch (error) {
    req.logger.error(error.message);
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
    req.logger.error(error.message);
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
    req.logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    cartServices.addProduct(cartId, productId);
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    req.logger.error(error.message);
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
    req.logger.error(error.message);
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
    req.logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

const purchase = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartServices.getCart(cartId);
    const productsToBuy = [];
    const productsNotPurchased = [];
    for (const product of cart.products) {
      const dbProduct = await productServices.getProduct(product.productId);
      if (!dbProduct) {
        continue;
      }
      if (dbProduct.stock >= product.quantity) {
        productsToBuy.push({ ...dbProduct, quantity: product.quantity });
      } else {
        productsNotPurchased.push(dbProduct);
      }
    }
    const total = productsToBuy.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    if (productsToBuy.length > 0) {
      for (const product of productsToBuy) {
        productServices.updateProduct(product._id, {
          stock: product.stock - product.quantity,
        });
      }
      const ticket = {
        code: generateUniqueCode(),
        amount: total,
        purchaser: req.session.user.email,
      };
      await ticketServices.saveTicket(ticket);
    }
    if (productsNotPurchased.length > 0) {
      req.logger.info("Purchase completed with some products not purchased");
      return res.status(200).json({
        message: "Purchase completed with some products not purchased",
        productsNotPurchased,
      });
    }
    cartServices.updateCart(cartId, productsNotPurchased);
    res.status(200).json({ message: "Purchase completed successfully" });
  } catch (error) {
    req.logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

function generateUniqueCode() {
  const timestamp = new Date().getTime().toString(36);
  const uniqueId = Math.random().toString(36).slice(2, 7);
  const uniqueCode = `${timestamp}-${uniqueId}`;
  return uniqueCode;
}

export {
  saveCart,
  getProducts,
  updateCart,
  deleteAllProducts,
  addProduct,
  deleteProduct,
  updateProductQuantity,
  purchase,
};
