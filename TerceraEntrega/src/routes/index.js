import {Router} from "express";

import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import mailRouter from "./mail.router.js";
import viewsRouter from "./views.router.js";

const router = Router();
router.use("/api/products",productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/chat", messagesRouter);
router.use("/api/sessions",sessionsRouter);
router.use("/mail", mailRouter);
router.use("/", viewsRouter);

export default router;
