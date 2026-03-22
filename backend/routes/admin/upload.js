const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const adminAuth = require("../../middleware/auth");
const deleteUpload = require("../../utils/deleteUpload");
const { SiteImage } = require("../../db");

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(Object.assign(new Error("Unsupported file type"), { code: "UNSUPPORTED_MIME" }));
    }
  },
});

// PDF upload multer (10 MB limit)
const pdfStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}.pdf`);
  },
});
const uploadPdf = multer({
  storage: pdfStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(Object.assign(new Error("Only PDF allowed"), { code: "NOT_PDF" }));
  },
});

// POST /api/admin/upload — image upload
router.post(
  "/",
  adminAuth,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: "File too large. Max 5 MB." });
        if (err.code === "UNSUPPORTED_MIME") return res.status(415).json({ error: "Unsupported file type." });
        return res.status(500).json({ error: err.message });
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    res.json({ url: `/uploads/${req.file.filename}` });
  }
);

// POST /api/admin/upload/resume — PDF upload, saves URL to DB
router.post(
  "/resume",
  adminAuth,
  (req, res, next) => {
    uploadPdf.single("resume")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: "File too large. Max 10 MB." });
        if (err.code === "NOT_PDF") return res.status(415).json({ error: "Only PDF files allowed." });
        return res.status(500).json({ error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    const newUrl = `/uploads/${req.file.filename}`;
    try {
      // Delete old resume file if it was an upload
      const existing = await SiteImage.findOne({ key: "resume" });
      if (existing) deleteUpload(existing.url);
      await SiteImage.findOneAndUpdate(
        { key: "resume" },
        { url: newUrl, label: "Resume PDF" },
        { upsert: true, returnDocument: "after" }
      );
      res.json({ url: newUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/admin/upload/resume — get current resume URL (public)
router.get("/resume", async (req, res) => {
  try {
    const img = await SiteImage.findOne({ key: "resume" });
    res.json({ url: img ? img.url : "/resume.pdf" });
  } catch {
    res.json({ url: "/resume.pdf" });
  }
});

module.exports = router;
