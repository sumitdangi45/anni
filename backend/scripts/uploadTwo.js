require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const path = require("path");
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");
const files = ["Futuristic Document Intelligence Dashboard.png", "ANNI AI Multi-Agent Network.png"];
(async () => {
  for (const f of files) {
    const r = await cloudinary.uploader.upload(path.join(imgDir, f), { folder: "anni/ai-automation", use_filename: true, unique_filename: false });
    console.log(r.secure_url);
  }
})().catch(e => console.error(e.message));
