import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

import { documentUpload, profileImageUpload, productImageUpload } from "../config/multer.config.js";

import { uploadDocument, uploadProfileImage, uploadProductImage } from "../controllers/users.controller.js";

router.put("/premium/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "user"){
      user.role = "premium";
      await user.save();
      return res.status(200).json(user);
    } else {
      const requiredDocuments = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
      const hasAllRequiredDocuments = requiredDocuments.every((doc) =>
      user.documents.some((document) => document.name === doc)
      );
      if (hasAllRequiredDocuments){
        user.role = "premium";
        await user.save();
        return res.status(200).json(user);
      } else if(user.documents.length>0 && user.documents.length<3){
        return res.status(400).json({ message: "User has not finished uploading all documents" });
      } else {
        return res.status(400).json({ message: "Missing required documents" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:uid/documents", documentUpload.array("documents"), uploadDocument);
router.post("/:uid/documents", profileImageUpload.single("profileImage"), uploadProfileImage);
router.post("/:uid/documents", productImageUpload.single("productImage"), uploadProductImage);

export default router;
