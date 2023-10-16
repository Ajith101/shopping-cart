const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");

const checkAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(400);
        throw new Error("Invalid token");
      }
      req.userId = user.id;
      next();
    });
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = checkAuth;
