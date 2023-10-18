import {Router} from "express";

import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";
import mockRouter from "./mock.router.js";
import mailRouter from "./mail.router.js";
import viewsRouter from "./views.router.js";
import loggerRouter from "./logger.router.js";

const router = Router();
router.use("/api/products",productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/chat", messagesRouter);
router.use("/api/users",usersRouter);
router.use("/api/sessions",sessionsRouter);
router.use("/api", mockRouter);
router.use("/mail", mailRouter);
router.use("/", viewsRouter);
router.use("/loggerTest", loggerRouter);

export default router;
