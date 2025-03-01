const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// **GET route for login page**
router.get("/login", (req, res) => {
  res.render("login"); // Ensure you have 'views/login.ejs'
});

// **GET route for registration page**
router.get("/register", (req, res) => {
  res.render("register"); // Ensure you have 'views/register.ejs'
});

// **POST Login**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/");
});

// **POST Register**
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password, role: "normal" });
    res.redirect("/login");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// **Logout**
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;