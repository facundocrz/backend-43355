import express from "express";
import {Router} from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src/views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(process.cwd(), "src/public")));

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import viewsRouter from "./routes/views.router.js";


const apiRouter = Router();
apiRouter.use(productsRouter);
apiRouter.use(cartsRouter);
apiRouter.use(chatRouter);
app.use("/api", apiRouter);
app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${httpServer.address().port}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

export { io };
