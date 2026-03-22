const express = require("express");
const { Project } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  const filter = req.query.featured === "true" ? { featured: true } : {};
  res.json(await Project.find(filter).sort({ createdAt: -1 }));
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
}));

router.post("/", adminAuth, validate("project"), asyncHandler(async (req, res) => {
  await Project.create(req.validated);
  res.status(201).json({ success: true });
}));

router.put("/:id", adminAuth, validate("project"), asyncHandler(async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.validated);
  res.json({ success: true });
}));

router.delete("/:id", adminAuth, asyncHandler(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

module.exports = router;
