const express = require("express");
const router = express.Router();

const { signup, login, sendOtp } = require("../controller/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp);

module.exports = router;
