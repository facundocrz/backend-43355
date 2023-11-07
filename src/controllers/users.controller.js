import userModel from "../models/user.model.js";
import dotenv from "../config/dotenv.config.js";
import { createTransport } from "nodemailer";

const changeRole = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "user") {
      user.role = "premium";
      await user.save();
      return res.status(200).json(user);
    } else {
      const requiredDocuments = [
        "Identificación",
        "Comprobante de domicilio",
        "Comprobante de estado de cuenta",
      ];
      const hasAllRequiredDocuments = requiredDocuments.every((doc) =>
        user.documents.some((document) => document.name === doc)
      );
      if (hasAllRequiredDocuments) {
        user.role = "premium";
        await user.save();
        return res.status(200).json(user);
      } else if (user.documents.length > 0 && user.documents.length < 3) {
        return res
          .status(400)
          .json({ message: "User has not finished uploading all documents" });
      } else {
        return res.status(400).json({ message: "Missing required documents" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadDocument = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.documentsUploaded = true;
    await user.save();
    return res.status(200).json({ message: "Documents uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadProfileImage = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profileImage = req.file.path;
    await user.save();
    return res
      .status(200)
      .json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadProductImage = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.productImage = req.file.path;
    await user.save();
    return res
      .status(200)
      .json({ message: "Product image uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { first_name: 1, last_name: 1, email: 1, role: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteInactiveUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      lastLogin: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    });
    if (users.length > 0) {
      const deletedUsers = await userModel.deleteMany({
        lastLogin: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      });
      const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: dotenv.mailUser,
          pass: dotenv.mailPass,
        },
      });
      const promises = deletedUsers.map(async (user) => {
        await transporter.sendMail({
          from: dotenv.mailUser,
          to: user.email,
          subject: `Cuenta eliminada por inactividad`,
          text: `Hola ${user.name}, tu cuenta ha sido eliminada por inactividad`,
          html: `<h1>Hola ${user.name}, tu cuenta ha sido eliminada por inactividad</h1>`,
        });
      });
      await Promise.all(promises);
      res.status(200).json({ message: "Users deleted", deletedUsers });
    } else {
      res.status(200).json({ message: "No users to delete" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.deleteOne({ _id: uid });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeRoleAdmin = async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "user") {
      user.role = "premium";
      await user.save();
      return res.status(200).json(user);
    } else {
      user.role = "user";
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  changeRole,
  uploadDocument,
  uploadProfileImage,
  uploadProductImage,
  getAllUsers,
  deleteInactiveUsers,
  deleteUser,
  changeRoleAdmin,
};
