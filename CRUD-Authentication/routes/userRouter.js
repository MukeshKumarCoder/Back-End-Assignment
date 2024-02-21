const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { UserModel } = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send("Something went wrong");
      } else {
        const user = new UserModel({ userName, email, password: hash });
        await user.save();
        res.send("New user has been created");
      }
    });
  } catch (error) {
    res.send("Error in registering the user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, user: user.userName },
            "masai",
            { exp: Math.floor(Date.now() / 1000) + 60 * 60 }
          );
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Wrong Password");
        }
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = { userRouter };
