"use strict";

const User = require("../models/User");
const Loan = require("../models/Loan");
const { validationResult } = require("express-validator");

/**
 * Create New Loan based on the paramters provided.
 * @param {object} req - Loan object
 * @param {response} res - success/failure depending on status
 * @returns response
 */
exports.createNewLoan = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const data = req.body;
  if (data.emi > data.loanAmount) {
    // EMI cannot be greater than the LOAN.
    return res
      .status(400)
      .json({ error: "EMI cannot be greater than Loan Amount." });
  }

  const startDate = new Date(data.startDate);
  const expiryDate = new Date(data.expiryDate);

  let months = (startDate.getFullYear() - expiryDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += expiryDate.getMonth();

  if (months * data.emi < data.loanAmount) {
    // Loan Amount must be equal to EMI * (expiry date - start date)
    return res
      .status(400)
      .json({
        error: "Invalid EMI or Start Date or Expiry Date or Loan Amount",
      });
  }

  const newLoan = new Loan(req.body);
  newLoan.save((err, loan) => {
    if (err || !loan) {
      return res.status(400).json({ error: err.message });
    }
    res.redirect(`getLoansByUserId?userId=${req.body.user}`);
  });
};

/**
 * Fetch all loans of a user. User defined by [userId].
 * Loans fetched in ascending order of expiry date. (From latest to oldest).
 * @param {string} req - user Id
 * @param {response} res - Success/Failure depending on the status
 */
exports.getLoansByUserId = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const userId = req.query.userId;
  Loan.find({ user: userId })
    .sort("expiryDate")
    .exec((err, loans) => {
      if (err || !loans) {
        return res
          .status(400)
          .json({ error: "Cannot fetch loans at this time." });
      }
      return res.status(200).json({ message: "Loans fetched", loans: loans });
    });
};

/**
 * Fetch user details of a user defined by [userId]
 * @param {string} req - user Id
 * @param {response} res success/failure depending on the status
 */
exports.getUserById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  const userId = req.query.userId;
  User.findOne({ _id: userId })
    .select("-salt -encrypted_password -__v")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "User not found." });
      }
      return res.status(200).json({ message: "User found", user: user });
    });
};
