"use strict";

const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const user = new User(req.body);

  User.findOne({ email: user.email }, (err, newUser) => {
    if (newUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    user.save((err, user) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({
        message: "User signed up successfully",
      });
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const { email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    // Create token for cookie
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.cookie("token", { expire: new Date() + 30 });

    return res.status(200).json({
      message: "User signin in sucessfully.",
      token: token,
      user: user,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signed out successfully." });
};
