import express from "express";

const router = express.Router();

import { productsDao as productManager } from "../dao/index.js";

router.get("/", async (req, res) => {
  console.log(productManager)
  res.render("home", {products: await productManager.loadData()});
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {products: await productManager.loadData()});
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;