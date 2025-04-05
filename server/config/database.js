const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("Error in DB Connections");
      console.log(error.message);
      process.exit(1);
    });
};
