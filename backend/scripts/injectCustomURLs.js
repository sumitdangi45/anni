const fs = require("fs");
const path = require("path");

const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
let content = fs.readFileSync(tsxPath, "utf8");

// Remove existing imageUrls
content = content.replace(/\n    imageUrl: "[^"]+",/g, "");

const MAPPINGS = [
  // EDUCATION
  { id: "e4", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992111/anni/custom/education/9451233a-623c-4292-a1ff-ce2f29f6cd0d.png" },
  { id: "e5", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992114/anni/custom/education/AI-Powered_Student_Performance_Dashboard_1.png" },
  { id: "e6", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992117/anni/custom/education/AI_Attendance_Dashboard_Interface.png" },
  { id: "e7", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992121/anni/custom/education/Anni_LMS_Course_Dashboard.png" },
  { id: "e8", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992124/anni/custom/education/Anni_CoachSphere_Neon_Coaching_Dashboard.png" },
  // BUSINESS
  { id: "b2", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992127/anni/custom/business/Anni_Web_Solutions_Digital_Agency_UI.png" },
  { id: "b3", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992129/anni/custom/business/Anni_CRM_Kanban_Pipeline_Dashboard.png" },
  { id: "b4", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992132/anni/custom/business/Anni_One_Futuristic_SaaS_Dashboard.png" },
  { id: "b5", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992135/anni/custom/business/Anni_Portal_Office_Dashboard_Workspace.png" },
  { id: "b6", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992137/anni/custom/business/Anni_Flow_AI_Workflow_Dashboard.png" },
  // ECOMMERCE
  { id: "ec7", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992140/anni/custom/ecommerce/Anni_Store_Skincare_Showcase.png" },
  { id: "ec8", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992143/anni/custom/ecommerce/Anni_Market_Neon_Analytics_Dashboard.png" },
  // TECHNOLOGY
  { id: "t2", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992146/anni/custom/technology/image.png" },
  { id: "t3", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992149/anni/custom/technology/Screenshot_2026-10-26_102634.png" },
  { id: "t4", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992151/anni/custom/technology/ANNI_Neon_SaaS_Pricing_Dashboard.png" },
  { id: "t5", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992153/anni/custom/technology/ANNNI_AI_Analytics_Dashboard_Showcase.png" },
  { id: "t6", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992156/anni/custom/technology/Neon_Purple_SaaS_Analytics_Dashboard.png" },
  // LIFESTYLE
  { id: "l2", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992159/anni/custom/lifestyle/ANNI_Healthcare_Doctor_Finder_Dashboard.png" },
  { id: "l3", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992162/anni/custom/lifestyle/ANNI__Good_Food_Great_Company.png" },
  { id: "l4", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992165/anni/custom/lifestyle/ANNI_Selene_Bay_Resort_Booking.png" },
  { id: "l6", url: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792992173/anni/custom/lifestyle/ANNI_Fitness_Dashboard_Trio.png" },
];

let count = 0;
for (const { id, url } of MAPPINGS) {
  // Match: id: "XX" block with gradient line, inject imageUrl before dark:
  const pattern = new RegExp(
    `(id: "${id}",[\\s\\S]*?    gradient: "[^"]+"),(\\s*\n    dark:)`,
    "m"
  );
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1\n    imageUrl: "${url}",$2`);
    console.log(`✓ ${id}`);
    count++;
  } else {
    console.warn(`✗ Not found: ${id}`);
  }
}

// l5 - ANНІ Provider Marketplace (cyrillic И — needs separate upload)
// Will handle separately if needed

fs.writeFileSync(tsxPath, content, "utf8");
console.log(`\nDone — injected ${count}/${MAPPINGS.length}`);
