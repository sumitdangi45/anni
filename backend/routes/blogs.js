const express = require("express");
const { Blog } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  res.json(await Blog.find().sort({ createdAt: -1 }));
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const doc = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
}));

// POST /api/blogs/:id/like — increment or decrement likes
router.post("/:id/like", asyncHandler(async (req, res) => {
  const { action } = req.body; // "like" or "unlike"
  const inc = action === "unlike" ? -1 : 1;
  const doc = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: inc } },
    { new: true }
  );
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json({ likes: Math.max(0, doc.likes) });
}));

router.post("/", adminAuth, validate("blog"), asyncHandler(async (req, res) => {
  await Blog.create(req.validated);
  res.status(201).json({ success: true });
}));

router.put("/:id", adminAuth, validate("blog"), asyncHandler(async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.validated);
  res.json({ success: true });
}));

router.delete("/:id", adminAuth, asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

module.exports = router;
