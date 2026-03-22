const express = require("express");
const { Testimonial } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  const filter = req.query.featured === "true" ? { featured: true } : {};
  res.json(await Testimonial.find(filter).sort({ createdAt: -1 }));
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const doc = await Testimonial.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
}));

// Public — anyone can submit a review
router.post("/", validate("testimonial"), asyncHandler(async (req, res) => {
  await Testimonial.create(req.validated);
  res.status(201).json({ success: true });
}));

router.put("/:id", adminAuth, validate("testimonial"), asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndUpdate(req.params.id, req.validated);
  res.json({ success: true });
}));

router.delete("/:id", adminAuth, asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

module.exports = router;
