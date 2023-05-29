import express from "express";

const app = express();

import ProductManager from "./productManager.js";

const productManager = new ProductManager("./src/data.json");

app.get("/products", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = await productManager.getProducts();
  res.json(limit ? products.slice(0, limit) : products);
});

app.get("/products/:pid", async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});

server.on("error", (err) => console.log(err));
