require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Simulate a contact form submission
const contactData = {
  name: "Test User",
  email: "testuser@example.com",
  service: "General Inquiry",
  message: "This is a test message from the contact form.",
};

console.log("Simulating contact form submission...");
console.log("Data:", contactData);

resend.emails
  .send({
    from: "onboarding@resend.dev",
    to: process.env.CONTACT_RECEIVER || "sumitdangi8455@gmail.com",
    subject: `New Contact: ${contactData.name} — ${contactData.service || "General"}`,
    html: `<h2>New Contact</h2>
           <p><b>Name:</b> ${contactData.name}</p>
           <p><b>Email:</b> ${contactData.email}</p>
           <p><b>Service:</b> ${contactData.service || "N/A"}</p>
           <p><b>Message:</b><br>${contactData.message.replace(/\n/g, "<br>")}</p>`,
  })
  .then((result) => {
    console.log("✓ Contact email sent successfully!");
    console.log("Email ID:", result.data?.id);
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Contact email failed:", error.message);
    process.exit(1);
  });
