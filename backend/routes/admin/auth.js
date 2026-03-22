const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDb, Admin } = require("../../db");

const router = express.Router();

// POST /api/admin/register — creates first admin only
router.post("/register", async (req, res) => {
  try {
    await connectDb();
    const existing = await Admin.findOne();
    if (existing) {
      return res.status(403).json({ error: "Admin already exists" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hash });
    res.status(201).json({ message: "Admin registered", id: admin._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/login — returns { token } on success
router.post("/login", async (req, res) => {
  try {
    await connectDb();
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
