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
router.post("/",authorize(["ADMIN","PREMIUM"]), saveProduct);
router.put("/:pid",authorize(["ADMIN"]), updateProduct);
router.delete("/:pid",authorize(["ADMIN"]), deleteProduct);

export default router;
