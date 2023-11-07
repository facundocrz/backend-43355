import winston from "winston";
import dotenv from "../config/dotenv.config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "bold red",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

const transports = [
  new winston.transports.File({
    filename: "./logs/errors.log",
    level: "error",
    format: winston.format.simple(),
  }),
];

if (dotenv.environment === "production") {
  transports.push(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    })
  );
}

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: transports,
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};
