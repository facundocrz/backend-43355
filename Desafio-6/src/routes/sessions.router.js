import express from "express";

const router = express.Router();

import profile from "../api/sessions/profile.js";
import logout from "../api/sessions/logout.js";
import passport from "passport";

router.post(
  "/sessions/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    res.send({ status: "success", message: "User created successfully" });
  }
);

router.post(
  "/sessions/login",
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

router.get("/sessions/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

router.get("/sessions/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

router.get("/sessions/profile", profile);
router.post("/sessions/logout", logout);

export default router;
