require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

const imgDir = path.join(__dirname, "../../frontend/src/assets/cards_img");

const CATEGORIES = [
  {
    arr: "EDUCATION",
    ids: ["e4","e5","e6","e7","e8"],
    files: [
      "9451233a-623c-4292-a1ff-ce2f29f6cd0d.png",
      "AI-Powered Student Performance Dashboard (1).png",
      "AI Attendance Dashboard Interface.png",
      "Anni LMS Course Dashboard.png",
      "Anni CoachSphere Neon Coaching Dashboard.png",
    ]
  },
  {
    arr: "BUSINESS",
    ids: ["b2","b3","b4","b5","b6"],
    files: [
      "Anni Web Solutions Digital Agency UI.png",
      "Anni CRM Kanban Pipeline Dashboard.png",
      "Anni One Futuristic SaaS Dashboard.png",
      "Anni Portal Office Dashboard Workspace.png",
      "Anni Flow AI Workflow Dashboard.png",
    ]
  },
  {
    arr: "ECOMMERCE",
    ids: ["ec7","ec8"],
    files: [
      "Anni Store Skincare Showcase.png",
      "Anni Market Neon Analytics Dashboard.png",
    ]
  },
  {
    arr: "TECHNOLOGY",
    ids: ["t2","t3","t4","t5","t6"],
    files: [
      "image.png",
      "Screenshot 2026-10-26 102634.png",
      "ANNI Neon SaaS Pricing Dashboard.png",
      "ANNNI AI Analytics Dashboard Showcase.png",
      "Neon Purple SaaS Analytics Dashboard.png",
    ]
  },
  {
    arr: "LIFESTYLE",
    ids: ["l2","l3","l4","l5","l6"],
    files: [
      "ANNI Healthcare Doctor Finder Dashboard.png",
      "ANNI_ Good Food, Great Company.png",
      "ANNI Selene Bay Resort Booking.png",
      "ANНІ Provider Marketplace Dashboard.png",
      "ANNI Fitness Dashboard Trio.png",
    ]
  }
];

const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");

(async () => {
  let content = fs.readFileSync(tsxPath, "utf8");

  // Remove existing imageUrls first
  content = content.replace(/\n    imageUrl: "[^"]+",/g, "");

  for (const cat of CATEGORIES) {
    console.log(`\n── ${cat.arr} ──`);
    for (let i = 0; i < cat.files.length; i++) {
      const f = cat.files[i];
      const id = cat.ids[i];
      console.log(`Uploading [${id}]: ${f}`);
      try {
        const r = await cloudinary.uploader.upload(path.join(imgDir, f), {
          folder: `anni/custom/${cat.arr.toLowerCase()}`,
          use_filename: true, unique_filename: false,
        });
        console.log("->", r.secure_url);
        // Inject into correct id block
        const pattern = new RegExp(
          `(id: "${id}",[\\s\\S]*?gradient: "[^"]+",)(\n    dark:)`, "m"
        );
        if (pattern.test(content)) {
          content = content.replace(pattern, `$1\n    imageUrl: "${r.secure_url}",$2`);
        } else {
          console.warn(`  Could not find id: ${id}`);
        }
      } catch(e) {
        console.error(`  Upload failed: ${e.message}`);
      }
    }
  }

  fs.writeFileSync(tsxPath, content, "utf8");
  console.log("\nAll done — images injected");
})();
