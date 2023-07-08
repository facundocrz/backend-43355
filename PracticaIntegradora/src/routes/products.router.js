import express from "express";

const router = express.Router();

import getAllProducts from "../api/products/getAll.js";
import getProductById from "../api/products/getById.js";
import saveProduct from "../api/products/saveProduct.js";
import updateProduct from "../api/products/updateProduct.js";
import deleteProduct from "../api/products/deleteProduct.js";

router.get("/products", getAllProducts);
router.get("/products/:pid", getProductById);
router.post("/products", saveProduct);
router.put("/products/:pid", updateProduct);
router.delete("/products/:pid", deleteProduct);

export default router;