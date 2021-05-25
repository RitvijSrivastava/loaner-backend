"use strict";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Init express
const app = express();

// Fetch ENV variables
dotenv.config({ path: "./.env" });

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
