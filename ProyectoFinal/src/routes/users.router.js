import express from "express";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

import {
  documentUpload,
  profileUpload,
  productUpload,
} from "../config/multer.config.js";

import {
  changeRole,
  uploadDocument,
  uploadProfileImage,
  uploadProductImage,
  getAllUsers,
  deleteInactiveUsers,
  deleteUser,
  changeRoleAdmin,
} from "../controllers/users.controller.js";

router.put("/premium/:uid", changeRole);

router.post(
  "/:uid/documents",
  documentUpload.array("documents"),
  uploadDocument
);
router.post(
  "/:uid/documents/profile",
  profileUpload.single("profileImage"),
  uploadProfileImage
);
router.post(
  "/:uid/documents/product",
  productUpload.single("productImage"),
  uploadProductImage
);

router.get("/", getAllUsers);

router.delete("/", deleteInactiveUsers);

router.delete("/:uid",authorize(["ADMIN"]), deleteUser);

router.put("/:uid",authorize(["ADMIN"]), changeRoleAdmin);

export default router;
