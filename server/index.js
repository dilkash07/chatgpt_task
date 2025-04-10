const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const Port = process.env.PORT || 3000;

const authRoutes = require("./router/Auth");
const userRoutes = require("./router/User");
const postRoutes = require("./router/Post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

database.connect();

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});

app.listen(Port, () => {
  console.log(`app listening on port ${Port}`);
});
