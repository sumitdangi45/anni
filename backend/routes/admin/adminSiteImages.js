const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/auth");
const { SiteImage } = require("../../db");
const deleteUpload = require("../../utils/deleteUpload");

// GET all site images (public — frontend needs this)
router.get("/", async (req, res) => {
  try {
    const images = await SiteImage.find();
    const map = {};
    images.forEach(img => { map[img.key] = img.url; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all site images as array (admin panel)
router.get("/list", adminAuth, async (req, res) => {
  try {
    const images = await SiteImage.find().sort("key");
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT upsert a single image by key — deletes old upload file if replaced
router.put("/:key", adminAuth, async (req, res) => {
  try {
    const { url, label } = req.body;
    // Find existing to get old URL before overwriting
    const existing = await SiteImage.findOne({ key: req.params.key });
    if (existing && existing.url !== url) {
      deleteUpload(existing.url);
    }
    const img = await SiteImage.findOneAndUpdate(
      { key: req.params.key },
      { url, label },
      { upsert: true, returnDocument: "after" }
    );
    res.json(img);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a site image by key — also deletes the upload file
router.delete("/:key", adminAuth, async (req, res) => {
  try {
    const img = await SiteImage.findOneAndDelete({ key: req.params.key });
    if (img) deleteUpload(img.url);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
