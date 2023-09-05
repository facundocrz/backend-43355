import express from "express";

const router = express.Router();

import { getAll, saveMessage } from "../controllers/messages.controller.js";
import authorize from "../middlewares/authorize.js";

router.get("/", getAll);
router.post("/",authorize("user"), saveMessage);

export default router;