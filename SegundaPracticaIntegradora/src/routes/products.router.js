import express from "express";

const router = express.Router();

import getAllProducts from "../api/products/getAll.js";
import getProductById from "../api/products/getById.js";
import saveProduct from "../api/products/saveProduct.js";
import updateProduct from "../api/products/updateProduct.js";
import deleteProduct from "../api/products/deleteProduct.js";

router.get("/", getAllProducts);
router.get("/:pid", getProductById);
router.post("/", saveProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;