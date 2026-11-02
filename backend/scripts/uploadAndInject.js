/**
 * uploadAndInject.js
 * Usage: node scripts/uploadAndInject.js <pagePath> <folder> <img1> <img2> ...
 *
 * Example:
 *   node scripts/uploadAndInject.js ../frontend/src/pages/CloudDevOps.tsx cloud-devops "img1.png" "img2.png"
 *
 * What it does:
 * 1. Uploads each image to Cloudinary under anni/<folder>/
 * 2. Finds each service block (by gradient order) in the TSX file
 * 3. Injects imageUrl: "..." after the gradient line
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

const [,, pagePath, folder, ...imagePaths] = process.argv;

if (!pagePath || !folder || !imagePaths.length) {
  console.error("Usage: node scripts/uploadAndInject.js <pagePath> <folder> <img1> <img2> ...");
  process.exit(1);
}

(async () => {
  // 1. Upload all images
  const urls = [];
  for (const imgPath of imagePaths) {
    const absPath = path.resolve(__dirname, imgPath);
    console.log(`Uploading: ${path.basename(imgPath)}`);
    const res = await cloudinary.uploader.upload(absPath, {
      folder: `anni/${folder}`,
      use_filename: true,
      unique_filename: false,
    });
    console.log(`  → ${res.secure_url}`);
    urls.push(res.secure_url);
  }

  // 2. Read the TSX file
  const tsxPath = path.resolve(__dirname, pagePath);
  let content = fs.readFileSync(tsxPath, "utf8");

  // 3. Find gradient lines and inject imageUrl after each one
  // Matches: gradient: "...", (with optional dark: before the closing },)
  // Strategy: find nth occurrence of "gradient:" and inject after it

  let urlIndex = 0;
  content = content.replace(
    /(\s+gradient:\s*"[^"]+",)\s*\n(\s+dark:)/g,
    (match, gradientLine, darkLine) => {
      if (urlIndex >= urls.length) return match;
      const url = urls[urlIndex++];
      return `${gradientLine}\n    imageUrl: "${url}",\n${darkLine}`;
    }
  );

  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`\n✓ Injected ${urlIndex} imageUrls into ${path.basename(tsxPath)}`);

  if (urlIndex < urls.length) {
    console.warn(`⚠ Only ${urlIndex}/${urls.length} URLs were injected — check service count matches image count`);
  }
})().catch(e => {
  console.error("Error:", e.message);
  process.exit(1);
});
