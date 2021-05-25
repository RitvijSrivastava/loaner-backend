"use strict";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./connect_db");

// Init express
const app = express();

// Fetch ENV variables
dotenv.config({ path: "./.env" });

// Setup Sessions
// !! SECRET Always required. Not having it in '.env' will leave the app unsecure.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
