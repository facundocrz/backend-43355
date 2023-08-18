import express from "express";

const router = express.Router();

import { getAll, getById, saveProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

router.get("/", getAll);
router.get("/:pid", getById);
router.post("/", saveProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;