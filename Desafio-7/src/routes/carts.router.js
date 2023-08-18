import express from "express";

const router = express.Router();

import {saveCart, getProducts, addProduct, updateCart, updateProductQuantity, deleteProduct, deleteAllProducts} from "../controllers/carts.controller.js";

router.post("/", saveCart);
router.get("/:cid", getProducts);
router.post("/:cid/product/:pid", addProduct);
router.put("/:cid", updateCart)
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid/product/:pid", deleteProduct);
router.delete("/:cid", deleteAllProducts);

export default router;