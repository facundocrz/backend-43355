import UserDTO from "../DTOs/user.dto.js";

const login = async (req, res) => {
  if (!req.user){
    req.logger.error("Invalid username or password");
    return res
      .status(400)
      .send({ status: "error", message: "Invalid username or password" });
  }
  req.session.user = req.user;
  req.session.user.last_connection = new Date();
  res.send({ status: "success", user: req.user });
};

const logout = async (req, res) => {
  req.session.user.last_connection = new Date();
  req.session.destroy((err) => {
    if (err) {
      req.logger.fatal(err.message);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/login");
  });
};

const register = async (req, res) => {
  async (req, res) => {
    res.send({ status: "success", message: "User created successfully" });
  };
};

const github = async (req, res) => {};

const githubCallback = async (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
};
const current = async (req, res) => {
  const userDTO = new UserDTO(req.session.user);
  res.send({ status: "success", user: userDTO });
};

export { login, logout, register, github, githubCallback, current };
