"use strict";

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { signin, signup, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check(
      "firstName",
      "Name must consists of only Alphabets and must be atleast 3 characters long"
    )
      .notEmpty()
      .isString()
      .isLength({
        min: 3,
      }),
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("password", "Password must be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Enter a valid email.").normalizeEmail().isEmail(),
    check("password", "Password must be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
