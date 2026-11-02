require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const remaining = [
  "Premium E-Commerce Hero Banner.png",
  "Good Food, Good Mood Café.png",
  "Luxury Resort Booking Hero.png",
  "Modern Healthcare Clinic Hero Banner.png",
];

const alreadyUploaded = [
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792828972/anni/prebuilt/College_Website_Promotional_Mockup.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792828995/anni/prebuilt/Sanskar_School_Hero__Education_Builds_Leaders.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829019/anni/prebuilt/Corporate_Website_Product_Showcase.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829041/anni/prebuilt/Luxury_Real_Estate_Website_Showcase.png",
];

(async () => {
  const newUrls = [];
  for (const f of remaining) {
    console.log("Uploading:", f);
    const r = await cloudinary.uploader.upload(path.join(imgDir, f), { folder: "anni/prebuilt", use_filename: true, unique_filename: false });
    console.log("->", r.secure_url);
    newUrls.push(r.secure_url);
  }

  const allUrls = [...alreadyUploaded, ...newUrls];

  // Inject into PrebuiltSolutions.tsx
  const tsxPath = path.join(__dirname, "../../frontend/src/pages/PrebuiltSolutions.tsx");
  let content = fs.readFileSync(tsxPath, "utf8");
  content = content.replace(/\n    imageUrl: "[^"]+",/g, "");
  let idx = 0;
  content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
    if (idx >= allUrls.length) return m;
    return `${g}\n    imageUrl: "${allUrls[idx++]}",\n${d}`;
  });
  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`\nDone — injected ${idx}/8 imageUrls into PrebuiltSolutions.tsx`);
})().catch(e => { console.error("Error:", e.message); process.exit(1); });
