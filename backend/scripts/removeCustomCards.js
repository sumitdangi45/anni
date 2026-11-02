/**
 * Remove specific cards from CustomisedSolutions.tsx
 * Remove: e1,e2,e3 | b1 | ec1,ec2,ec3,ec4,ec5,ec6 | t1 | l1
 */
const fs = require("fs");
const path = require("path");

const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
let content = fs.readFileSync(tsxPath, "utf8");

const idsToRemove = ["e1","e2","e3","b1","ec1","ec2","ec3","ec4","ec5","ec6","t1","l1"];

let removed = 0;
for (const id of idsToRemove) {
  // Match from id: "XX" to the closing }, of that object
  // Each object starts with { and ends with dark: ... },
  const pattern = new RegExp(
    `\\s*\\{[\\s\\S]*?id: "${id}",[\\s\\S]*?dark: (?:true|false) \\},`,
    "m"
  );
  if (pattern.test(content)) {
    content = content.replace(pattern, "");
    console.log(`Removed: ${id}`);
    removed++;
  } else {
    console.warn(`Not found: ${id}`);
  }
}

fs.writeFileSync(tsxPath, content, "utf8");
console.log(`\nDone — removed ${removed}/${idsToRemove.length} cards`);
