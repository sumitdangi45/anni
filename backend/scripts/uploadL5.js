require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs"); const path = require("path");
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const files = fs.readdirSync(imgDir).filter(f => f.includes("Provider"));
console.log("File:", files[0]);

(async () => {
  const r = await cloudinary.uploader.upload(path.join(imgDir, files[0]), { folder: "anni/custom/lifestyle", use_filename: true, unique_filename: false });
  console.log("URL:", r.secure_url);

  const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
  let content = fs.readFileSync(tsxPath, "utf8");
  const pattern = new RegExp(`(id: "l5",[\\s\\S]*?    gradient: "[^"]+"),(\\s*\n    dark:)`, "m");
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1\n    imageUrl: "${r.secure_url}",$2`);
    fs.writeFileSync(tsxPath, content, "utf8");
    console.log("✓ l5 injected");
  } else { console.warn("l5 not found"); }
})().catch(e => console.error(e.message));
