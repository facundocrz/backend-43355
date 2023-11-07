import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import { addLogger } from "./utils/logger.js";

app.use(addLogger);

import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import dao from "./config/dao.config.js";

mongoose.connect(dao.mongoDB.cnxStr, dao.mongoDB.options);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dao.mongoDB.cnxStr,
      ttl: 600,
    }),
    secret: "shhhhhhhh",
    resave: false,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const hbs = handlebars.create({});
hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src/views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(process.cwd(), "src/public")));

import router from "./routes/index.js";

app.use("/", router);

import errorHandler from "./middlewares/errors/index.js";

app.use(errorHandler);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API documentation",
      description: "endpoints documentation",
    },
  },
  apis: [path.join(process.cwd(), "src/docs/**/*.yaml")],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

const PORT = process.env.PORT || 8080;

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
