const fs = require("fs");
const path = require("path");
const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
let c = fs.readFileSync(tsxPath, "utf8");
// Add comma after gradient line when followed by imageUrl
c = c.replace(/(gradient: "[^"]+")\n(\s+imageUrl:)/g, "$1,\n$2");
fs.writeFileSync(tsxPath, c, "utf8");
console.log("Fixed - matches:", (c.match(/gradient: "[^"]+",\n\s+imageUrl:/g) || []).length);
