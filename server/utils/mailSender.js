const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    const trasporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let sendMail = await trasporter.sendMail({
      from: "Blog Post || blogpost.com by Dilkash Raza",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return sendMail;
  } catch (error) {
    console.log("Something went wrong while sending email");
  }
};
