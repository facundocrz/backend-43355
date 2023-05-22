const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.lastId = 0;
  }

  async saveProducts(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
    } catch (error) {
      console.log(`Error saving products to ${this.path}: ${error}`);
    }
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("All fields are required");
      return;
    }

    const products = await this.getProducts();

    if (products.some((p) => p.code === product.code)) {
      console.log(`Product with code ${product.code} already exists`);
      return;
    }

    const newProduct = { ...product, id: ++this.lastId };
    await this.saveProducts([...products, newProduct]);
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    }
    catch (error) {
      console.log(`Error loading products from ${this.path}: ${error}`);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);
      if (!product) {
        console.log(`Product with id ${id} not found`);
        return null;
      }
      return product;
    }
    catch (error) {
      console.log(`Error loading products from ${this.path}: ${error}`);
      return null;
    }
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log(`Product with id ${id} not found`);
      return;
    }
    const updatedProduct = { ...products[productIndex], ...updates };
    products[productIndex] = updatedProduct;
    await this.saveProducts(products);
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.log(`Product with id ${id} not found`);
      return;
    }
    products.splice(productIndex, 1);
    await this.saveProducts(products);
  }

}

module.exports = ProductManager;