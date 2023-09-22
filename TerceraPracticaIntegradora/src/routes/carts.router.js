import express from "express";

const router = express.Router();

import {saveCart, getProducts, addProduct, updateCart, updateProductQuantity, deleteProduct, deleteAllProducts, purchase} from "../controllers/carts.controller.js";
import authorize from "../middlewares/authorize.js";

router.post("/", saveCart);
router.get("/:cid", getProducts);
router.post("/:cid/product/:pid",authorize(["USER"]), addProduct);
router.put("/:cid", updateCart)
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid/product/:pid", deleteProduct);
router.delete("/:cid", deleteAllProducts);
router.post("/:cid/purchase", authorize(["USER"]), purchase);

export default router;