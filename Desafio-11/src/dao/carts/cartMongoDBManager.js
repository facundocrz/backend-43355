import MongoDBManager from "../manager/mongoDBManager.js";
import cartsModel from "../../models/carts.model.js";

class CartMongoDBManager extends MongoDBManager {
  constructor(productManager) {
    super(cartsModel);
    this.productManager = productManager;
  }

  async addCart(cart) {
    return await this.saveData(cart);
  }

  async getProducts(cartId) {
    try {
      const cart = await this.collection
        .findById(cartId)
        .populate("products._id");
      return cart;
    } catch (error) {
      throw new Error(`Error getting products from cart: ${error}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getDataById(cartId);
      const product = await this.productManager.getDataById(productId);
      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }
      const existingProduct = cart.products.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ _id: product._id, quantity: 1 });
      }
      await this.updateById(cartId, cart);
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error}`);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.getDataById(cartId);
      const productIndex = cart.products.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await this.updateById(cartId, cart);
        return;
      }
      throw new Error(`Product with id ${productId} not found in cart`);
    } catch (error) {
      throw new Error(`Error removing product from cart: ${error}`);
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const cart = await this.getDataById(cartId);
      cart.products = [];
      await this.updateById(cartId, cart);
    } catch (error) {
      throw new Error(`Error removing products from cart: ${error}`);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await this.getDataById(cartId);
      const product = cart.products.find((p) => p.productId === productId);
      if (!product) {
        throw new Error(`Product with id ${productId} not found in cart`);
      }
      product.quantity = quantity;
      await this.updateById(cartId, cart);
    } catch (error) {
      throw new Error(`Error updating product quantity: ${error}`);
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const cart = await this.getDataById(cartId);
      cart.products = products;
      await this.updateById(cartId, cart);
    } catch (error) {
      throw new Error(`Error updating cart products: ${error}`);
    }
  }
}

export default CartMongoDBManager;
