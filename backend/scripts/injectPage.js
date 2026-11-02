/**
 * Generic inject script
 * Usage: node scripts/injectPage.js <PageFileName.tsx> <cloudinary-folder> "img1.png" "img2.png" ...
 */
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const [,, pageFile, folder, ...files] = process.argv;
const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const tsxPath = path.join(__dirname, "../../frontend/src/pages", pageFile);

(async () => {
  const urls = [];
  for (const f of files) {
    console.log("Uploading:", f);
    const res = await cloudinary.uploader.upload(path.join(imgDir, f), {
      folder: `anni/${folder}`,
      use_filename: true,
      unique_filename: false,
    });
    console.log("->", res.secure_url);
    urls.push(res.secure_url);
  }

  let content = fs.readFileSync(tsxPath, "utf8");
  let idx = 0;
  content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
    if (idx >= urls.length) return m;
    return `${g}\n    imageUrl: "${urls[idx++]}",\n${d}`;
  });
  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`\nDone — injected ${idx}/${urls.length} imageUrls into ${pageFile}`);
})().catch(e => { console.error("Error:", e.message); process.exit(1); });
