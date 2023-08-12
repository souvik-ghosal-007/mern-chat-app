const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
const PORT = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
  .connect(
    "mongodb+srv://root:i5xrtnnO33ntT7KX@cluster0.dbvyvzw.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB Connection Established");
  })
  .catch((err) => {
    console.log(`There was an error in d Database connection: ${err.message}`);
  });

app.get("/", (req, res) => {
  res.status(200).json("Hello, Its Deployed");
});

app.get("/login", (req, res) => {
  res.status(200).json("Hello, Its Logged In");
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    image,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User Registered Successfully",
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: "failed",
        message: err,
      })
    );
});
