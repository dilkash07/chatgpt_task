const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { mailSender } = require("../utils/mailSender");
const otpTemplate = require("../template/emailVerification");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60 * 1000,
  },
});

const sendVerificationEmail = async (email, otp) => {
  try {
    await mailSender(email, "Verification Email", otpTemplate(otp));
  } catch (error) {
    console.error(error.message);
  }
};

otpSchema.pre("save", function (next) {
  if (this.isNew) {
    sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("Otp", otpSchema);
