const socket = io();

socket.on("add Product", (product) => {
  const productsList = document.getElementById("productsList");
  const newProduct = document.createElement("li");
  newProduct.setAttribute("id", `product-${product.id}`);
  const productTitle = document.createElement("h2");
  productTitle.textContent = product.title;
  const productPrice = document.createElement("p");
  productPrice.textContent = `$${product.price}`;
  const productImage = document.createElement("img");
  productImage.src = product.thumbnails;
  productImage.alt = product.title;
  productImage.width = 100;
  productImage.height = 100;
  newProduct.appendChild(productTitle);
  newProduct.appendChild(productPrice);
  newProduct.appendChild(productImage);
  productsList.appendChild(newProduct);
});

socket.on("delete Product", (productId) => {
  const productsList = document.getElementById("productsList");
  const productToDelete = document.getElementById(`product-${productId}`);
  if (productToDelete) {
    productsList.removeChild(productToDelete);
  }
});
