/**
 * AI_PRODUCTS order (ids ai1-ai8):
 * ai1 KisanSathi Agriculture AI         → KisanSathi Smart Farming Dashboard
 * ai2 AI Snapshot Attendance            → AI Attendance Dashboard Interface
 * ai3 AI Student Performance            → AI-Powered Student Performance Dashboard (1)
 * ai4 AI Business Assistant             → Anni AI Knowledge Base Dashboard
 * ai5 AI Document Intelligence          → Anni AI Invoice Extraction Dashboard
 * ai6 AI Knowledge & RAG Platform       → Anni AI Neon Knowledge Dashboard
 * ai7 (next)                            → Anni AI Lead Intelligence Dashboard
 * ai8 (next)                            → Anni AI Sales Automation Dashboard
 */
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const files = [
  "KisanSathi Smart Farming Dashboard.png",
  "AI Attendance Dashboard Interface.png",
  "AI-Powered Student Performance Dashboard (1).png",
  "Anni AI Knowledge Base Dashboard.png",
  "Anni AI Invoice Extraction Dashboard.png",
  "Anni AI Neon Knowledge Dashboard.png",
  "Anni AI Lead Intelligence Dashboard.png",
  "Anni AI Sales Automation Dashboard.png",
];

(async () => {
  const urls = [];
  for (const f of files) {
    console.log("Uploading:", f);
    const r = await cloudinary.uploader.upload(path.join(imgDir, f), {
      folder: "anni/prebuilt-ai",
      use_filename: true,
      unique_filename: false,
    });
    console.log("->", r.secure_url);
    urls.push(r.secure_url);
  }

  const tsxPath = path.join(__dirname, "../../frontend/src/pages/PrebuiltSolutions.tsx");
  let content = fs.readFileSync(tsxPath, "utf8");

  // Inject for each AI product by id
  urls.forEach((url, i) => {
    const id = `ai${i + 1}`;
    const pattern = new RegExp(
      `(id: "${id}",[\\s\\S]*?gradient: "[^"]+",)(\n    dark:)`,
      "m"
    );
    if (pattern.test(content)) {
      content = content.replace(pattern, `$1\n    imageUrl: "${url}",$2`);
      console.log(`Injected for ${id}`);
    } else {
      console.warn(`Could not find ${id} — skipping`);
    }
  });

  fs.writeFileSync(tsxPath, content, "utf8");
  console.log("\nDone — AI Products images injected");
})().catch(e => { console.error("Error:", e.message); process.exit(1); });
