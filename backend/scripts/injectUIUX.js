// Fix UIUXDesign.tsx — inject all 6 URLs in correct order
const fs = require("fs");
const path = require("path");

const urls = [
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807797/anni/uiux/ANNI_Web_Solutions_Tech_Showcase.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807801/anni/uiux/ANNI_Analytics_Dashboard_Laptop_Mockup.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807983/anni/uiux/ANNI_Digital_Solutions_App_Showcase.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808366/anni/uiux/UX_Research_Before_Building.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808368/anni/uiux/Design_Systems_That_Scale.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808370/anni/uiux/Outdated_vs_Modern_Website_Design.png",
];

const tsxPath = path.join(__dirname, "../../frontend/src/pages/UIUXDesign.tsx");
let content = fs.readFileSync(tsxPath, "utf8");

// Remove any already injected imageUrls first
content = content.replace(/\n    imageUrl: "[^"]+",/g, "");

// Inject fresh
let idx = 0;
content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
  if (idx >= urls.length) return m;
  return `${g}\n    imageUrl: "${urls[idx++]}",\n${d}`;
});

fs.writeFileSync(tsxPath, content, "utf8");
console.log(`Injected ${idx}/6 imageUrls into UIUXDesign.tsx`);
