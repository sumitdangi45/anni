const express = require("express");
const { Resend } = require("resend");
const { Contact } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.post("/", validate("contact"), asyncHandler(async (req, res) => {
  const { name, email, service, message } = req.validated;
  await Contact.create({ name, email, service, message });

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.CONTACT_RECEIVER || "sumitdangi8455@gmail.com",
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
