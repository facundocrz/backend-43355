import FileSystemManager from "../manager/fileSystemManager.js";

class ProductFileSystemManager extends FileSystemManager {
  constructor() {
    super("products.json");
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
    let _id;
    if (products.length === 0) {
      _id = 1;
    } else {
      _id = products[products.length - 1]._id + 1;
    }

    const newProduct = { ...product, _id };
    await this.saveData([...products, newProduct]);
    return newProduct;
  }
}

export default ProductFileSystemManager;
