const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing!",
      });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating token",
      error: error.message,
    });
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    if (req.user?.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin access required",
    });
  }
};
