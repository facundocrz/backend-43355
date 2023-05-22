const ProductManager = require('./productManager');

const productManager = new ProductManager("data.json");

(async () => {
  console.log(await productManager.getProducts());

  await productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  console.log(await productManager.getProducts());

  await productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  console.log(await productManager.getProductById(1));
  console.log(await productManager.getProductById(2));
  await productManager.updateProduct(1, { title: "Producto actualizado" });
  console.log(await productManager.getProductById(1));
  await productManager.deleteProduct(1);
  console.log(await productManager.getProducts());
})();