
const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({message: "Not authenticated"});
    }
    if (!requiredRoles.includes(req.session.user.role.toUpperCase())) {
      return res.status(403).json({message: "Not authorized"});
    }
    next();
  }
}


export default authorize;
