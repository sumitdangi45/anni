const express = require("express");
const nodemailer = require("nodemailer");
const { Contact } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.post("/", validate("contact"), asyncHandler(async (req, res) => {
  const { name, email, service, message } = req.validated;
  await Contact.create({ name, email, service, message });

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        subject: `New Contact: ${name} — ${service || "General"}`,
        html: `<h2>New Contact</h2>
               <p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Service:</b> ${service || "N/A"}</p>
               <p><b>Message:</b><br>${message.replace(/\n/g, "<br>")}</p>`,
      });
    } catch (err) {
      console.error("Email failed:", err.message);
    }
  }

  res.status(201).json({ success: true, message: "Message received!" });
}));

router.get("/", adminAuth, asyncHandler(async (req, res) => {
  res.json(await Contact.find().sort({ createdAt: -1 }));
}));

router.delete("/:id", adminAuth, asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

module.exports = router;
