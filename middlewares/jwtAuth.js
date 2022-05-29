const jwt = require("jsonwebtoken");
const apiError = require("../utility/apiError");

exports.jwtAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  if (!headToken) {
    throw new apiError(401, "Unauthoriezed");
  }
  const token = headToken.split(" ")[1];
  if (!token) {
    throw new apiError(401, "Unauthoriezed");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    if ((error.name = "TokenExpiredError")) {
      throw new apiError(401, "Token is expired");
    }
    throw new apiError(401, "Unauthoriezed");
  }
};
