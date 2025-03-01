const express = require("express");
const Product = require("../models/Product");
const { authenticate, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all products
router.get("/", authenticate, async (req, res) => {
  const products = await Product.find();
  res.render("index", { user: req.user, products });
});

// Add Product (Admin only)
router.post("/add", authenticate, adminOnly, async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price });
  res.redirect("/");
});

module.exports = router;