import express from "express";

const router = express.Router();

import { getAll, saveMessage } from "../controllers/chat.controller.js";

router.get("/", getAll);
router.post("/", saveMessage);

export default router;