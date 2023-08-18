export default class cartService {
  constructor(dao) {
    this.dao = dao;
  }

  getCart(cartId) {
    this.dao.getDataById(cartId);
  }

  saveCart(cart) {
    this.dao.addCart(cart);
  }

  getProducts(cartId) {
    this.dao.getProducts(cartId);
  }

  addProduct(cartId, productId) {
    this.dao.addProductToCart(cartId, productId);
  }

  updateCart(cartId, products) {
    this.dao.updatecartProducts(cartId, products);
  }

  deleteAllProducts(cartId) {
    this.dao.deleteAllProductsFromCart(cartId);
  }

  deleteProduct(cartId, productId) {
    this.dao.deleteProductFromCart(cartId, productId);
  }

  updateProductQuantity(cartId, productId, quantity) {
    this.dao.updateProductQuantity(cartId, productId, quantity);
  }
}
