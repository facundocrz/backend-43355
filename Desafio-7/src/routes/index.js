import {Router} from "express";

import cartsRouter from "./carts.router.js";
import chatRouter from "./chat.router.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Router();
router.use("/products",productsRouter);
router.use("/carts", cartsRouter);
router.use("/chat", chatRouter);
router.use("/sessions",sessionsRouter);

export default router;
