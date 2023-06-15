import express from "express";

const router = express.Router();

import ProductManager from "../utils/productManager.js";
const path = "./src/data/products.json";
const productManager = new ProductManager(path);

router.get("/", async (req, res) => {
  res.render("home", {products: await productManager.loadData()});
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {products: await productManager.loadData()});
});

export default router;