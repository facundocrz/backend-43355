import BaseManager from "./baseManager.js";

class ProductManager extends BaseManager {
  constructor(path) {
    super(path);
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.category ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      throw new Error("All fields are required");
    }

    const products = await this.loadData();
    if (products.some((p) => p.code === product.code)) {
      throw new Error(`Product with code ${product.code} already exists`);
    }
    let id;
    if (products.length === 0) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }

    const newProduct = { ...product, id };
    await this.saveData([...products, newProduct]);
    return newProduct;
  }
}

export default ProductManager;
