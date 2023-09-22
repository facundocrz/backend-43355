import fetch from "node-fetch";

const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const currentResponse = await fetch(
        "http://localhost:8080/api/sessions/current"
      );
      const currentUser = await currentResponse.json();

      if (!currentUser.user || !requiredRoles.includes(currentUser.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Error authorizing user" });
    }
  };
};

export default authorize;