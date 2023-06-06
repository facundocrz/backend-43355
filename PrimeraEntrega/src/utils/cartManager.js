import BaseManager from "./baseManager.js";

import ProductManager from "./productManager.js";

class CartManager extends BaseManager {
  constructor(path) {
    super(path);
    this.productManager = new ProductManager("./src/data/products.json");
  }

  async addCart(cart) {
    const carts = await this.loadData();
    let id;
    if (carts.length === 0) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }
    const newCart = { ...cart, id};
    await this.saveData([...carts, newCart]);
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
    const cart = await this.getDataById(cartId);
    const existingProduct = cart.products.find((p) => p.productId === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    await this.updateById(cartId, cart);
  }
}

export default CartManager;