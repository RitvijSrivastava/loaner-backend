const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Loan = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    startData: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    emi: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["FIXED", "FLOATING"],
      default: "FIXED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Loan || mongoose.model("Loan", Loan);
