import userModel from "../models/user.model.js";

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
    console.error(error);
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
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { uploadDocument, uploadProfileImage, uploadProductImage };
