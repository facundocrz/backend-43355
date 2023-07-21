import express from "express";

const router = express.Router();

import saveCart from "../api/carts/saveCart.js";
import getProducts from "../api/carts/getProducts.js";
import addProductToCart from "../api/carts/addProductToCart.js";
import updateCart from "../api/carts/updateCart.js"
import updateProductQuantity from "../api/carts/updateProductQuantity.js";
import deleteProduct from "../api/carts/deleteProduct.js"
import deleteAllProducts from "../api/carts/deleteAllProducts.js"

router.post("/carts", saveCart);
router.get("/carts/:cid", getProducts);
router.post("/carts/:cid/product/:pid", addProductToCart);
router.put("carts/:cid", updateCart)
router.put("/carts/:cid/product/:pid", updateProductQuantity);
router.delete("/carts/:cid/product/:pid", deleteProduct);
router.delete("/carts/:cid", deleteAllProducts);

export default router;