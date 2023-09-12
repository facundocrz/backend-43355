import FileSystemManager from "../manager/fileSystemManager.js";

class CartFileSystemManager extends FileSystemManager {
  constructor(productManager) {
    super("carts.json");
    this.productManager = productManager;
  }

  async addCart(cart) {
    let _id;
    const carts = await this.loadData();
    if (carts.length === 0) {
      _id = 1;
    } else {
      _id = carts[carts.length - 1]._id + 1;
    }
    const newCart = { ...cart, _id };
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
    const existingProduct = cart.products.find(
      (p) => p.productId === productId
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    await this.updateById(cartId, cart);
  }
}

export default CartFileSystemManager;
