const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const { getUserDetails } = require("../controller/User");

router.get("/user_details", auth, getUserDetails);

module.exports = router;
