const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const adminAuth = require("../../middleware/auth");
const { SiteImage } = require("../../db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ddetvaa8",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();
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

const uploadPdf = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(Object.assign(new Error("Only PDF allowed"), { code: "NOT_PDF" }));
  },
});

// POST /api/admin/upload — image upload to Cloudinary
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
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      res.json({ url: result.secure_url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// POST /api/admin/upload/resume — PDF upload to Cloudinary
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
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      const newUrl = result.secure_url;
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
