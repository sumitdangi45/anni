/**
 * Safely remove cards by id from CustomisedSolutions.tsx
 * Uses line-by-line parsing to find exact object boundaries
 */
const fs = require("fs");
const path = require("path");

const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
const content = fs.readFileSync(tsxPath, "utf8");
const lines = content.split("\n");

const idsToRemove = new Set(["e1","e2","e3","b1","ec1","ec2","ec3","ec4","ec5","ec6","t1","l1"]);
const removedIds = [];

// Find line ranges for each object to remove
const blocksToRemove = []; // [{start, end}] line indices (0-based)

let i = 0;
while (i < lines.length) {
  // Look for id: "XX" pattern
  const idMatch = lines[i].match(/id:\s*"([^"]+)"/);
  if (idMatch && idsToRemove.has(idMatch[1])) {
    const id = idMatch[1];
    // Find the start of this object (look back for opening {)
    let start = i;
    while (start > 0 && !lines[start].trim().startsWith("{")) {
      start--;
    }
    // Find the end: look forward for },
    let end = i;
    while (end < lines.length) {
      if (lines[end].trim() === "},") {
        break;
      }
      if (lines[end].includes("dark: true }," ) || lines[end].includes("dark: false },")) {
        break;
      }
      end++;
    }
    blocksToRemove.push({ start, end, id });
    removedIds.push(id);
    console.log(`Found ${id}: lines ${start+1}–${end+1}`);
    i = end + 1;
  } else {
    i++;
  }
}

// Remove blocks in reverse order to preserve line numbers
blocksToRemove.sort((a, b) => b.start - a.start);

const lineArr = content.split("\n");
for (const { start, end } of blocksToRemove) {
  lineArr.splice(start, end - start + 1);
}

const result = lineArr.join("\n");
fs.writeFileSync(tsxPath, result, "utf8");
console.log(`\nDone — removed ${removedIds.length} cards: ${removedIds.join(", ")}`);
