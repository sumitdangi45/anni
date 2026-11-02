require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const files = [
  "ANNI Vulnerability Scan Cyber Matrix.png",
  "ANNI Neon Cybersecurity Shield (1).png",
  "Midnight Cybersecurity Vulnerability Analysis.png",
  "ANNI Cloud Security Infrastructure.png",
  "ANNI Holographic Security Dashboard.png",
  "ANNI Security Operations Centre.png",
  "ANNI Cybersecurity Shield.png",
];

(async () => {
  const urls = [];
  for (const f of files) {
    console.log("Uploading:", f);
    const res = await cloudinary.uploader.upload(path.join(imgDir, f), {
      folder: "anni/cybersecurity",
      use_filename: true,
      unique_filename: false,
    });
    console.log("->", res.secure_url);
    urls.push(res.secure_url);
  }

  // Inject into Cybersecurity.tsx
  const tsxPath = path.join(__dirname, "../../frontend/src/pages/Cybersecurity.tsx");
  let content = fs.readFileSync(tsxPath, "utf8");
  let idx = 0;
  content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
    if (idx >= urls.length) return m;
    const url = urls[idx++];
    return `${g}\n    imageUrl: "${url}",\n${d}`;
  });
  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`\nDone — injected ${idx} imageUrls into Cybersecurity.tsx`);
})().catch(e => { console.error("Error:", e.message); process.exit(1); });
