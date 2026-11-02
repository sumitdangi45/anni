/**
 * Renumber all cards in CustomisedSolutions.tsx
 * Each category starts from 01
 */
const fs = require("fs");
const path = require("path");

const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
let content = fs.readFileSync(tsxPath, "utf8");

// Find all num: "XX" and renumber within each array
// Arrays are EDUCATION_PROJECTS, BUSINESS_PROJECTS, ECOMMERCE_PROJECTS, TECHNOLOGY_PROJECTS, LIFESTYLE_PROJECTS

const arrayNames = [
  "EDUCATION_PROJECTS",
  "BUSINESS_PROJECTS", 
  "ECOMMERCE_PROJECTS",
  "TECHNOLOGY_PROJECTS",
  "LIFESTYLE_PROJECTS"
];

for (const arrName of arrayNames) {
  // Find the array content
  const arrPattern = new RegExp(`const ${arrName}[\\s\\S]*?\\];`, "m");
  const match = content.match(arrPattern);
  if (!match) { console.warn(`Not found: ${arrName}`); continue; }
  
  let arrContent = match[0];
  let counter = 0;
  
  // Replace each num: "XX" with sequential numbers
  const renumbered = arrContent.replace(/num:\s*"\d+"/g, () => {
    counter++;
    return `num: "${String(counter).padStart(2, "0")}"`;
  });
  
  content = content.replace(arrContent, renumbered);
  console.log(`${arrName}: renumbered ${counter} items`);
}

fs.writeFileSync(tsxPath, content, "utf8");
console.log("\nDone — all cards renumbered");
