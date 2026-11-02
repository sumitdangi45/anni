const express = require("express");
const nodemailer = require("nodemailer");
const { Contact } = require("../db");
const adminAuth = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

// ── Nodemailer transporter ────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/", asyncHandler(async (req, res) => {
  const { name, email, phone, subject, budget, timeline, message, services } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email and message are required." });
  }

  // Save to MongoDB
  await Contact.create({
    name,
    email,
    service: Array.isArray(services) ? services.join(", ") : (subject || "General"),
    message,
  });

  // Send email
  const receiver = process.env.CONTACT_RECEIVER || "anniwebsolution@gmail.com";
  const serviceList = Array.isArray(services) ? services.join(", ") : (subject || "N/A");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9">
      <div style="background:#111;padding:20px 24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:1.4rem">New Contact Form Submission</h2>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px">Anni Web Solutions</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e8e8e8">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#888;width:140px;font-size:13px">Name</td><td style="padding:8px 0;font-weight:600;color:#111">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0;color:#111"><a href="mailto:${email}" style="color:#6b7eff">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Phone/WhatsApp</td><td style="padding:8px 0;color:#111">${phone}</td></tr>` : ""}
          ${subject ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Subject</td><td style="padding:8px 0;color:#111">${subject}</td></tr>` : ""}
          ${budget ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Budget Range</td><td style="padding:8px 0;color:#111">${budget}</td></tr>` : ""}
          ${timeline ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Timeline</td><td style="padding:8px 0;color:#111">${timeline}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#888;font-size:13px">Services</td><td style="padding:8px 0;color:#111">${serviceList}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;border-left:4px solid #6b7eff">
          <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Message</p>
          <p style="margin:0;color:#333;line-height:1.7">${message.replace(/\n/g, "<br>")}</p>
        </div>
        <div style="margin-top:20px;text-align:center">
          <a href="mailto:${email}" style="display:inline-block;background:#111;color:#fff;padding:10px 24px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${name}</a>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Anni Web Solutions" <${process.env.SMTP_USER}>`,
      to: receiver,
      replyTo: email,
      subject: `New Enquiry: ${name} — ${serviceList}`,
      html,
    });
  } catch (err) {
    console.error("Email send failed:", err.message);
    // Still return success — contact saved to DB
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
