const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password not matched",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already registered please login",
      });
    }

    const response = await User.create({ name, email, password });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while registered user",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details!",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered please signup!",
      });
    }

    if (bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        userId: user._id,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "user or password invalid",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while registered user",
      error: error.message,
    });
  }
};
