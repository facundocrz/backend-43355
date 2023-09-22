import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

router.put("/premium/:uid", async (req, res) => {
  const userId = req.params.uid;
  try {
    await userModel.findByIdAndUpdate(userId, { role: "premium" });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/user/:uid", async (req, res) => {
  const userId = req.params.uid;
  try {
    await userModel.findByIdAndUpdate(userId, { role: "user" });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
