import express from "express";

const router = express.Router();

import { productsDao as productManager } from "../dao/index.js";

router.get("/", async (req, res) => {
  console.log(productManager)
  res.render("home", {products: await productManager.loadData()});
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = "asc", query } = req.query;
    let apiUrl = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=${sort}`;
    
    if (query) {
      apiUrl += `&query=${query}`;
    }

    const apiResponse = await fetch(apiUrl);
    const productsData = await apiResponse.json();
    res.render('products', {
      products: productsData.payload,
      totalPages: productsData.totalPages,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      currentPage: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevLink: productsData.prevLink,
      nextLink: productsData.nextLink,
    });
  } catch (error) {
    res.render('error', { error });
  }
});

router.get("/carts/:cid" , async (req, res) => {
  try {
    const cartId = req.params.cid;
    const apiResponse = await fetch(`http://localhost:8080/api/carts/${cartId}`);
    const cart = await apiResponse.json()
    console.log(cart)
    res.render('cart', { cart });
  } catch (error) {
    res.render('error', { error });
  }
});


export default router;