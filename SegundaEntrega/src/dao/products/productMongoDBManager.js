import MongoDBManager from "../manager/mongoDBManager.js";
import productsModel from "../../models/products.js";

class ProductMongoDBManager extends MongoDBManager {

    constructor() {
        super(productsModel);
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
      
          await this.saveData(product);
          return product;
    }
}

export default ProductMongoDBManager;