const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/auth");
const { connectDb, Testimonial } = require("../../db");
const deleteUpload = require("../../utils/deleteUpload");

// GET /api/admin/testimonials — return all testimonials
router.get("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/testimonials — create testimonial
router.post("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/testimonials/:id — update testimonial by MongoDB _id
router.put("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const existing = await Testimonial.findById(req.params.id);
    if (existing && req.body.avatar_url && existing.avatar_url !== req.body.avatar_url) {
      deleteUpload(existing.avatar_url);
    }
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/admin/testimonials/:id/feature — toggle featured
router.patch("/:id/feature", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const t = await Testimonial.findById(req.params.id);
    if (!t) return res.status(404).json({ error: "Not found" });
    t.featured = !t.featured;
    await t.save();
    res.json({ featured: t.featured });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/testimonials/:id — delete testimonial by MongoDB _id
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });
    deleteUpload(testimonial.avatar_url);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
