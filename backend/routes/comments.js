const express = require("express");
const { Comment } = require("../db");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

// GET comment count for a blog
router.get("/:blogId/count", asyncHandler(async (req, res) => {
  const count = await Comment.countDocuments({ blogId: req.params.blogId });
  res.json({ count });
}));

// GET all comments for a blog
router.get("/:blogId", asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
  res.json(comments);
}));

// POST a new comment
router.post("/", asyncHandler(async (req, res) => {
  const { blogId, name, message } = req.body;
  if (!blogId || !name || !message) {
    return res.status(400).json({ error: "blogId, name and message are required" });
  }
  const comment = await Comment.create({ blogId, name, message });
  res.status(201).json(comment);
}));

module.exports = router;
