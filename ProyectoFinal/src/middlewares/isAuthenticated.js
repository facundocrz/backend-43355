import CustomErrors from "../utils/errors/custom.errors.js";
import enumErrors from "../utils/errors/enum.errors.js";

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.logger.error("User is not authenticated");
    CustomErrors.createError({
      name: "Unauthorized",
      cause: "User is not authenticated",
      message: "User is not authenticated",
      code: enumErrors.UNAUTHORIZED
    });
  };
  
  export default isAuthenticated;