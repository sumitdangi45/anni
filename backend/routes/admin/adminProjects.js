const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/auth");
const { connectDb, Project } = require("../../db");
const deleteUpload = require("../../utils/deleteUpload");

// GET /api/admin/projects — return all projects
router.get("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/projects — create project
router.post("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/projects/:id — update project by MongoDB _id
router.put("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const existing = await Project.findById(req.params.id);
    if (existing && req.body.image_url && existing.image_url !== req.body.image_url) {
      deleteUpload(existing.image_url);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/admin/projects/:id/feature — toggle featured
router.patch("/:id/feature", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    p.featured = !p.featured;
    await p.save();
    res.json({ featured: p.featured });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/projects/:id — delete project by MongoDB _id
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    deleteUpload(project.image_url);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
