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
    const cart = await this.getDataById(cartId);
    const productsIds = cart.products.map((p) => p.productId);
    const products = await Promise.all(
      productsIds.map((id) => this.productManager.getDataById(id))
    );
    return products;
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
}

export default CartMongoDBManager;
