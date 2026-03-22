const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const adminAuth = require("../../middleware/auth");
const { connectDb, Blog } = require("../../db");
const deleteUpload = require("../../utils/deleteUpload");
const pdfToSlides = require("../../utils/pdfToSlides");

// PDF upload multer
const pdfStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => cb(null, `ppt-${Date.now()}.pdf`),
});
const uploadPdf = multer({
  storage: pdfStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(Object.assign(new Error("Only PDF allowed"), { code: "NOT_PDF" }));
  },
});

// Derive a URL-friendly slug from a title
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// GET /api/admin/blogs — return all blogs
router.get("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/blogs — create blog with derived slug
router.post("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const data = { ...req.body };
    if (data.title) {
      data.slug = slugify(data.title);
    }
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/blogs/:id — update blog by MongoDB _id
router.put("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const existing = await Blog.findById(req.params.id);
    // Delete old images that are no longer in the new images array
    if (existing && req.body.images) {
      const newImgs = req.body.images || [];
      (existing.images || []).forEach(oldUrl => {
        if (!newImgs.includes(oldUrl)) deleteUpload(oldUrl);
      });
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/blogs/:id/ppt — upload PDF, convert to slide PNGs
router.post("/:id/ppt", adminAuth, uploadPdf.single("pdf"), async (req, res) => {
  try {
    await connectDb();
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });

    // Delete old slide files
    (blog.pptSlides || []).forEach((url) => deleteUpload(url));

    const slideUrls = await pdfToSlides(
      req.file.path,
      `blog-${req.params.id}`
    );

    // Delete the uploaded PDF itself (we only need the PNGs)
    deleteUpload(`/uploads/${req.file.filename}`);

    blog.pptSlides = slideUrls;
    await blog.save();

    res.json({ pptSlides: slideUrls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/blogs/:id — delete blog by MongoDB _id
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    (blog.images || []).forEach(url => deleteUpload(url));
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
