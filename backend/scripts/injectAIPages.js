const fs = require("fs");
const path = require("path");

const urls = [
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823241/anni/ai-automation/ANNI_Assistant_Chat_Widget.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823245/anni/ai-automation/WhatsApp_Booking_Automation_Workflow.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823249/anni/ai-automation/ANNI_Voice_AI__Intelligent_Calls.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823253/anni/ai-automation/Neon_ANNI_Automation_Workflow_Dashboard.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823256/anni/ai-automation/AI_Lead_Generation_Dashboard.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823260/anni/ai-automation/Mint_Knowledge_AI_Dashboard.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823263/anni/ai-automation/Futuristic_Document_Intelligence_Dashboard.png",
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792823266/anni/ai-automation/ANNI_AI_Multi-Agent_Network.png",
];

const pages = ["AIAutomation.tsx", "AIAgents.tsx"];

for (const page of pages) {
  const tsxPath = path.join(__dirname, "../../frontend/src/pages", page);
  let content = fs.readFileSync(tsxPath, "utf8");

  // Remove any existing imageUrls first
  content = content.replace(/\n    imageUrl: "[^"]+",/g, "");

  // Inject fresh
  let idx = 0;
  content = content.replace(/([ \t]+gradient:\s*"[^"]+",)\n([ \t]+dark:)/g, (m, g, d) => {
    if (idx >= urls.length) return m;
    return `${g}\n    imageUrl: "${urls[idx++]}",\n${d}`;
  });

  fs.writeFileSync(tsxPath, content, "utf8");
  console.log(`Injected ${idx}/8 imageUrls into ${page}`);
}
