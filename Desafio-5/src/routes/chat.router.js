import express from "express";

const router = express.Router();

import getAllMessages from "../api/messages/getAll.js";
import saveMessage from "../api/messages/saveMessage.js";

router.get("/chat", getAllMessages);
router.post("/chat", saveMessage);

export default router;