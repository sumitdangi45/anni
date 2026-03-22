const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/auth");
const { connectDb, Contact } = require("../../db");

// GET /api/admin/contacts — all contacts sorted newest first
router.get("/", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/contacts/:id/read — mark contact as read
router.patch("/:id/read", adminAuth, async (req, res) => {
  try {
    await connectDb();
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
