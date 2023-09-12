import express from "express";

const router = express.Router();

import {
  getAll,
  getById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import authorize from "../middlewares/authorize.js";

router.get("/", getAll);
router.get("/:pid", getById);
router.post("/",authorize("admin"), saveProduct);
router.put("/:pid",authorize("admin"), updateProduct);
router.delete("/:pid",authorize("admin"), deleteProduct);

export default router;
