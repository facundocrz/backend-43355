import express from "express";

const router = express.Router();

import logout from "../api/sessions/logout.js";
import passport from "passport";
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    res.send({ status: "success", message: "User created successfully" });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid username or password" });
    req.session.user = req.user;
    res.send({ status: "success", user: req.user });
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/current", isAuthenticated, async (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/login");
  });
});

export default router;
