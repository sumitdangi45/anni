/**
 * Fix PrebuiltSolutions.tsx — inject correct imageUrls for APPS and AI_PRODUCTS
 * 
 * APPS order (9 items):
 * a1 School Management System         → 9451233a (clinic/health dashboard — generic, use for school)
 * a2 AI Student Performance            → AI-Powered Student Performance Dashboard
 * a3 AI Attendance Management          → AI Attendance Dashboard Interface
 * a4 KisanSathi Agriculture            → KisanSathi AI Farming Hero Banner
 * a5 Grocery Delivery Platform         → FreshCart_ Groceries at Your Doorstep
 * a6 Food Delivery Platform            → FoodHub Restaurant Ordering App Mockup
 * a7 Multi-Vendor E-commerce           → ShopKart Mega Deals App Mockup
 * a8 On-Demand Services Platform       → On-Demand Home Services App UI
 * a9 Healthcare & Clinic Management    → MediCare+ Healthcare App Interface
 */

const fs = require("fs");
const path = require("path");

const APPS_URLS = [
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982110/anni/prebuilt-business/9451233a-623c-4292-a1ff-ce2f29f6cd0d.png",          // a1 School
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982113/anni/prebuilt-business/AI-Powered_Student_Performance_Dashboard_1.png",       // a2 AI Student Perf
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982116/anni/prebuilt-business/AI_Attendance_Dashboard_Interface.png",                 // a3 AI Attendance
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982119/anni/prebuilt-business/KisanSathi_AI_Farming_Hero_Banner.png",                  // a4 KisanSathi
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982122/anni/prebuilt-business/FreshCart__Groceries_at_Your_Doorstep.png",              // a5 Grocery
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982124/anni/prebuilt-business/FoodHub_Restaurant_Ordering_App_Mockup.png",             // a6 Food Delivery
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982127/anni/prebuilt-business/ShopKart_Mega_Deals_App_Mockup.png",                     // a7 E-commerce
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982129/anni/prebuilt-business/On-Demand_Home_Services_App_UI.png",                     // a8 On-Demand
  "https://res.cloudinary.com/w3bsruq6/image/upload/v1792982131/anni/prebuilt-business/MediCare_Healthcare_App_Interface.png",                  // a9 Healthcare
];

const tsxPath = path.join(__dirname, "../../frontend/src/pages/PrebuiltSolutions.tsx");
let content = fs.readFileSync(tsxPath, "utf8");

// Step 1: Remove ALL existing imageUrl lines from APPS and AI_PRODUCTS
content = content.replace(/\n    imageUrl: "[^"]+",/g, "");

// Step 2: Re-inject for APPS (find each id: "a1" through "a9" block and inject after gradient)
APPS_URLS.forEach((url, i) => {
  const id = `a${i + 1}`;
  // Find the block for this id and inject imageUrl after gradient line
  const pattern = new RegExp(
    `(id: "${id}",[\\s\\S]*?gradient: "[^"]+",)(\n    dark:)`,
    "m"
  );
  content = content.replace(pattern, `$1\n    imageUrl: "${url}",$2`);
});

fs.writeFileSync(tsxPath, content, "utf8");
console.log("Done — injected 9 imageUrls in correct order into APPS array");
console.log("Note: AI_PRODUCTS imageUrls will be added when you provide those images");
