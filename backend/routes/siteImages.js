const express = require("express");
const { SiteImage } = require("../db");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

// GET /api/site-images — return key:url map
router.get("/", asyncHandler(async (_req, res) => {
  const docs = await SiteImage.find({});
  const map = {};
  docs.forEach(d => { map[d.key] = d.url; });
  res.json(map);
}));

// PUT /api/site-images/:key — upsert a key
router.put("/:key", asyncHandler(async (req, res) => {
  const { url } = req.body;
  const doc = await SiteImage.findOneAndUpdate(
    { key: req.params.key },
    { url },
    { upsert: true, new: true }
  );
  res.json(doc);
}));

module.exports = router;
