export default class productService {
  constructor(dao) {
    this.dao = dao;
  }

  getProduct(productId) {
    this.dao.getDataById(productId);
  }

  getAllProducts() {
    this.dao.loadData();
  }

  saveProduct(product) {
    this.dao.addProduct(product);
  }

  updateProduct(productId, product) {
    this.dao.updateById(productId, product);
  }

  deleteProduct(productId) {
    this.dao.deleteById(productId);
  }
}
