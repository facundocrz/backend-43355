import userModel from "../../models/user.js";

export default async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
      role,
    });
    res.status(200).json({status: "success", user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
