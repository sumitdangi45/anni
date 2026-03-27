require("dotenv").config();
const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
console.log("API Key:", apiKey ? "✓ Set" : "✗ Not set");

if (!apiKey) {
  console.error("Error: RESEND_API_KEY not found in .env");
  process.exit(1);
}

const resend = new Resend(apiKey);

resend.emails
  .send({
    from: "onboarding@resend.dev",
    to: "sumitdangi8455@gmail.com",
    subject: "Test Email from Resend",
    html: `<h2>Test Email</h2>
           <p>This is a test email to verify Resend integration.</p>
           <p>If you received this, Resend is working!</p>`,
  })
  .then((result) => {
    console.log("✓ Email sent successfully!");
    console.log("Email ID:", result.data?.id);
    process.exit(0);
  })
  .catch((error) => {
    console.error("✗ Email failed:", error.message);
    process.exit(1);
  });
