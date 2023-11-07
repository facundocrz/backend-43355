export default class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  getCart(cartId) {
    return this.dao.getDataById(cartId);
  }

  saveCart(cart) {
    return this.dao.addCart(cart);
  }

  getProducts(cartId) {
    return this.dao.getProducts(cartId);
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
