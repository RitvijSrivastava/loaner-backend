"use strict";

const express = require("express");
const { check } = require("express-validator");
const {
  createNewLoan,
  deleteLoan,
  editLoan,
  getUserById,
  getLoansByUserId,
} = require("../controllers/db");
const router = express.Router();

router.post(
  "/createNewLoan",
  [
    check(
      "name",
      "Name cannot be empty and contain only alphabets. Name must be atleast 3 characters long."
    )
      .notEmpty()
      .isString()
      .isLength({ min: 3 }),
    check("address", "Address cannot be empty").notEmpty(),
    check("contactNumber", "Contact number cannot be empty.")
      .notEmpty()
      .isMobilePhone("en-IN"),
    check("loanAmount", "Loan Amount must be a number.").notEmpty().isDecimal(),
    check("startDate", "Invalid start date.").notEmpty().isDate(),
    check("expiryDate", "Invalid expiry date.").notEmpty().isDate(),
    check("emi", "EMI cannot be empty").notEmpty().isDecimal(),
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("type", "Invalid type. Type can be FIXED or FLOATING only.").isIn([
      "FIXED",
      "FLOATING",
    ]),
  ],
  createNewLoan
);
router.post("/deleteLoan", deleteLoan);
router.put("/editLoan", editLoan);

router.get(
  "/getUserById",
  [check("userId", "User id cannot be empty.").notEmpty()],
  getUserById
);
router.get(
  "/getLoansByUserId",
  [check("userId", "User id cannot be empty.").notEmpty()],
  getLoansByUserId
);

module.exports = router;
