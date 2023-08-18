import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";
import dotenvConfig from "./config/dotenv.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/dao.config.js";

mongoose.connect(config.mongoDB.cnxStr, config.mongoDB.options);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoDB.cnxStr,
      ttl: 600,
    }),
    secret: "shhhhhhhh",
    resave: false,
    saveUninitialized: true,
  }
));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src/views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(process.cwd(), "src/public")));

import apiRouter from "./routes/index.js";
import viewsRouter from "./routes/views.router.js";

app.use("/api", apiRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(dotenvConfig.port, () => {
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