import MongoDBManager from "../manager/mongoDBManager.js";
import productModel from "../../models/products.model.js";

class ProductMongoDBManager extends MongoDBManager {
  constructor() {
    super(productModel);
  }

  async addProduct(product) {
    
    const products = await this.loadData();
    if (products.some((p) => p.code === product.code)) {
      throw new Error(`Product with code ${product.code} already exists`);
    }

    await this.saveData(product);
    return product;
  }
}

export default ProductMongoDBManager;
