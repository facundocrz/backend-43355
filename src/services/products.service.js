import ProductDTO from "../DTOs/product.dto.js";

export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  async getProduct(productId) {
    return await this.dao.getDataById(productId);
  }

  async getAllProducts() {
    return await this.dao.loadData();
  }

  async saveProduct(product) {
    const newProduct = new ProductDTO(product);
    return await this.dao.addProduct(newProduct);
  }

  updateProduct(productId, product) {
    this.dao.updateById(productId, product);
  }

  deleteProduct(productId) {
    this.dao.deleteById(productId);
  }
}
