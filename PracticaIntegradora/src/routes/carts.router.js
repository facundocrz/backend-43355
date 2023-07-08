import express from "express";

const router = express.Router();

import saveCart from "../api/carts/saveCart.js";
import getProducts from "../api/carts/getProducts.js";
import addProductToCart from "../api/carts/addProductToCart.js";

router.post("/carts", saveCart);
router.get("/carts/:cid", getProducts);
router.post("/carts/:cid/product/:pid", addProductToCart);

export default router;