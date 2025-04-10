const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, otp } = req.body;

    if (!name || !email || !password || !confirmPassword || !otp) {
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

    const otpResponse = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (otpResponse[0].otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    const user = await User.create({ name, email, password });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
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
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while registered user",
      error: error.message,
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already registered, please login",
      });
    }

    let otp = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const result = await Otp.findOne({ otp });

    while (result) {
      otp = await otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    await Otp.create({ email, otp });

    res.status(200).json({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending otp",
      error: error.message,
    });
  }
};
