require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const files = [
  "9451233a-623c-4292-a1ff-ce2f29f6cd0d.png",
  "AI-Powered Student Performance Dashboard (1).png",
  "AI Attendance Dashboard Interface.png",
  "KisanSathi AI Farming Hero Banner.png",
  "FreshCart_ Groceries at Your Doorstep.png",
  "FoodHub Restaurant Ordering App Mockup.png",
  "ShopKart Mega Deals App Mockup.png",
  "On-Demand Home Services App UI.png",
  "MediCare+ Healthcare App Interface.png",
];

(async () => {
  const urls = [];
  for (const f of files) {
    console.log("Uploading:", f);
    const r = await cloudinary.uploader.upload(path.join(imgDir, f), {
      folder: "anni/prebuilt-business",
      use_filename: true,
      unique_filename: false,
    });
    console.log("->", r.secure_url);
    urls.push(r.secure_url);
  }

  // Inject into PrebuiltSolutions.tsx — Business Applications section
  // These are in the BUSINESS_APPS array (second product list in the file)
  const tsxPath = path.join(__dirname, "../../frontend/src/pages/PrebuiltSolutions.tsx");
  let content = fs.readFileSync(tsxPath, "utf8");

  // Find BUSINESS_APPS array and inject imageUrls
  // The business apps also use gradient/dark pattern
  // We need to inject after the prebuilt websites imageUrls (already done = 8)
  // Count existing imageUrls to skip the first 8
  let idx = 0;
  let skipped = 0;
  content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
    skipped++;
    if (skipped <= 8) return m; // skip first 8 (prebuilt websites already done)
    if (idx >= urls.length) return m;
    return `${g}\n    imageUrl: "${urls[idx++]}",\n${d}`;
  });

  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`\nDone — injected ${idx}/9 imageUrls into PrebuiltSolutions.tsx (business apps)`);
})().catch(e => { console.error("Error:", e.message); process.exit(1); });
