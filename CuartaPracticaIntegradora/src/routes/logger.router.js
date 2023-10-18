import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    req.logger.debug("debug log");
    req.logger.http("http log");
    req.logger.info("info log");
    req.logger.warning("warning log");
    req.logger.error("error log");
    req.logger.fatal("fatal log");
    res.send("Logger test");
});

export default router;