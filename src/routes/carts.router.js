import express from "express";

const router = express.Router();

import {saveCart, getProducts, addProduct, updateCart, updateProductQuantity, deleteProduct, deleteAllProducts, purchase} from "../controllers/carts.controller.js";
import authorize from "../middlewares/authorize.js";

router.post("/", saveCart);
router.get("/:cid", getProducts);
router.put("/:cid", updateCart)
router.delete("/:cid", deleteAllProducts);
router.post("/:cid/product/:pid",authorize(["USER","PREMIUM"]), addProduct);
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid/product/:pid", deleteProduct);
router.post("/:cid/purchase", authorize(["USER", "PREMIUM"]), purchase);

export default router;