const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  try {
    // const payload = isTokenValid(token);
    const { name, userId, role } = isTokenValid(token);
    // Attach the user and his permissions to the req object
    // req.user = payload.user;
    req.user = { name, userId, role };
    console.log(req.user);

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};
// authorizePermissions
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);

    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
