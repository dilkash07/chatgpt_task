const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
      error: error.message,
    });
  }
};
