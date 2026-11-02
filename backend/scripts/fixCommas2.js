const fs = require("fs");
const path = require("path");
const tsxPath = path.join(__dirname, "../../frontend/src/pages/CustomisedSolutions.tsx");
let c = fs.readFileSync(tsxPath, "utf8");
// Handle both \n and \r\n
c = c.replace(/(gradient: "[^"]+")\r?\n(\s+imageUrl:)/g, "$1,\r\n$2");
const fixed = (c.match(/gradient: "[^"]+",/g) || []).length;
fs.writeFileSync(tsxPath, c, "utf8");
console.log("Fixed gradient commas:", fixed);
