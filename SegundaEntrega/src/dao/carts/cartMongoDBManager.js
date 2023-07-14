import MongoDBManager from "../manager/mongoDBManager.js";
import cartsModel from "../../models/carts.js";
import ProductMongoDBManager from "../products/productMongoDBManager.js";


class CartMongoDBManager extends MongoDBManager {

  constructor() {
    super(cartsModel);
    this.productManager = new ProductMongoDBManager();

  }

  async addCart(cart) {
    let id;
    const carts = await this.loadData();
    if (carts.length === 0) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }
    const newCart = { ...cart, id};
    await this.saveData(newCart);
  }

  async getProducts(cartId) {
    try {
      const cart = await this.getDataById(cartId).populate('products.id');
      return cart.products;
    } catch (error) {
      throw new Error(`Error getting products from cart: ${error}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getDataById(cartId);
      console.log(cart);
      const existingProduct = cart.products.find(
        (p) => p.productId === productId
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
      await this.updateById(cartId, cart);
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error}`);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.getDataById(cartId);
      const productIndex = cart.products.findIndex((p) => p.productId === productId);
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
}

export default CartMongoDBManager;
