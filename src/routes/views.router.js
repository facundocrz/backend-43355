import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { generateToken, verifyToken } from "../middlewares/jwt.js";
import { createTransport } from "nodemailer";
import tokenModel from "../models/token.model.js";
import userModel from "../models/user.model.js";
import dotenv from "../config/dotenv.config.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/failregister", async (req, res) => {
  res.render("register");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/profile", isAuthenticated, async (req, res) => {
  res.render("profile", { user: req.session.user });
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/products", isAuthenticated, async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = "asc", query } = req.query;
    let apiUrl = `https://coder43355.onrender.com/api/products?limit=${limit}&page=${page}&sort=${sort}`;

    if (query) {
      apiUrl += `&query=${query}`;
    }

    const apiResponse = await fetch(apiUrl);
    const productsData = await apiResponse.json();
    const user = req.session.user;
    res.render("products", {
      user,
      products: productsData.payload,
      totalPages: productsData.totalPages,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      currentPage: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevLink: productsData.prevLink,
      nextLink: productsData.nextLink,
    });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/carts/:cid", isAuthenticated, async (req, res) => {
  try {
    const cartId = req.params.cid;
    const apiResponse = await fetch(
      `https://coder43355.onrender.com/api/carts/${cartId}`
    );
    const cart = await apiResponse.json();
    res.render("cart", { cart });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/reset-password", async (req, res) => {
  res.render("resetPassword");
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = userModel.findOne({ email });
    if (!user) {
      res.render("error", { error: "El usuario no existe" });
    }
    const token = generateToken({ email });
    const expirationDate = new Date(Date.now() + 3600000);
    const newToken = new tokenModel({ token, expiresAt: expirationDate });
    await newToken.save();
    const transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: dotenv.mailUser,
        pass: dotenv.mailPass,
      },
    });
    transporter.sendMail({
      from: dotenv.mailUser,
      to: req.body.email,
      subject: `Restablecer contraseña`,
      text: "Haz clic en el siguiente enlace para restablecer tu contraseña:",
      html: `<a href="https://coder43355.onrender.com/${token}">Restablecer Contraseña</a>`,
    });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await tokenModel.findOne({ token });

    if (!tokenData) {
      res.render("error", { error: "El token no es válido" });
    } else {
      const currentDate = new Date();
      const expirationDate = new Date(tokenData.expiresAt);
      if (currentDate > expirationDate) {
        res.render("resetPassword", { payload: "El token ha expirado" });
      } else {
        res.render("newPassword", { token });
      }
    }
  } catch (error) {
    res.render("error", { error });
  }
});

router.post("change-password", async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      res.status(400).json({ error: "Las contraseñas no coinciden" });
    }
    const payload = verifyToken(token);

    if (!payload) {
      res.status(400).json({ error: "El token no es válido" });
    }

    const userEmail = payload.email;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      res.status(400).json({ error: "El usuario no existe" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/users", authorize(["ADMIN"]), async (req, res) => {
  try {
    const apiResponse = await fetch("https://coder43355.onrender.com/api/users");
    const users = await apiResponse.json();
    res.render("users", { users });
  } catch (error) {
    res.render("error", { error });
  }
});

export default router;
