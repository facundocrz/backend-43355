import express from "express";

const router = express.Router();

import passport from "passport";
import {
  login,
  logout,
  register,
  github,
  githubCallback,
  current,
} from "../controllers/sessions.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  register
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  login
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  github
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback
);

router.get("/current", isAuthenticated, current);

router.post("/logout", logout);

export default router;
