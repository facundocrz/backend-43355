class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  addProduct(product) {
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

    if (this.products.some((p) => p.code === product.code)) {
      console.log(`Product with code ${product.code} already exists`);
      return;
    }

    const newProduct = { ...product, id: ++this.lastId };
    this.products.push(newProduct);
    console.log(`Product with id ${newProduct.id} added successfully:`, newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log(`Product with id ${id} not found`);
      return null;
    }
    return product;
  }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
