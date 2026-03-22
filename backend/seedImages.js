/**
 * seedImages.js
 * Copies all frontend assets to backend/uploads/ and saves their URLs in MongoDB.
 * Run: node seedImages.js
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { connectDb, SiteImage, Blog, Project, Testimonial } = require("./db");

const ASSETS_DIR = path.join(__dirname, "../framer-clone-magic/src/assets");
const UPLOADS_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

function copyAsset(filename) {
  const src = path.join(ASSETS_DIR, filename);
  const dest = path.join(UPLOADS_DIR, filename);
  if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
  return `/uploads/${filename}`;
}

async function seed() {
  await connectDb();
  console.log("Connected. Seeding images...");

  // ── Site Images ──────────────────────────────────────
  const siteImages = [
    { key: "hero",             url: copyAsset("duncan-portrait.jpg"),       label: "Hero Portrait" },
    { key: "about",            url: copyAsset("duncan-portrait.jpg"),       label: "About Portrait" },
    { key: "carousel_1",       url: copyAsset("project-coral.jpg"),         label: "Carousel Image 1" },
    { key: "carousel_2",       url: copyAsset("project-shopease.jpeg"),     label: "Carousel Image 2" },
    { key: "carousel_3",       url: copyAsset("project-prisms.jpeg"),       label: "Carousel Image 3" },
    { key: "carousel_4",       url: copyAsset("project-vistahaven.jpg"),    label: "Carousel Image 4" },
    { key: "carousel_5",       url: copyAsset("project-innovatetech.jpeg"), label: "Carousel Image 5" },
    { key: "badge_1",          url: copyAsset("tech-figma.jpg"),            label: "Badge Image 1" },
    { key: "badge_2",          url: copyAsset("tech-framer.png"),           label: "Badge Image 2" },
    { key: "badge_3",          url: copyAsset("tech-lemon.jpg"),            label: "Badge Image 3" },
    { key: "badge_4",          url: copyAsset("tech-spline.jpg"),           label: "Badge Image 4" },
    { key: "badge_5",          url: copyAsset("tech-x.jpg"),                label: "Badge Image 5" },
    { key: "gallery_1",        url: copyAsset("gallery-2.jpeg"),            label: "Gallery Image 1" },
    { key: "gallery_2",        url: copyAsset("gallery-3.jpeg"),            label: "Gallery Image 2" },
    { key: "gallery_3",        url: copyAsset("duncan-back.jpeg"),          label: "Gallery Image 3" },
    // Services
    { key: "services_img",     url: copyAsset("duncan-back.jpeg"),          label: "Services Side Image" },
    // Testimonial reviewer avatars
    { key: "reviewer_1",       url: copyAsset("reviewer-john.jpg"),         label: "Reviewer 1 Avatar" },
    { key: "reviewer_2",       url: copyAsset("reviewer-michael.jpg"),      label: "Reviewer 2 Avatar" },
    { key: "reviewer_3",       url: copyAsset("reviewer-sarah.jpg"),        label: "Reviewer 3 Avatar" },
    { key: "reviewer_4",       url: copyAsset("reviewer-laura.jpg"),        label: "Reviewer 4 Avatar" },
    // Blog author avatar
    { key: "blog_author",      url: copyAsset("duncan-portrait.jpg"),       label: "Blog Author Avatar" },
    // Navbar avatar
    { key: "navbar_avatar",    url: copyAsset("duncan-portrait.jpg"),       label: "Navbar Avatar" },
    // Contact section
    { key: "contact_img",      url: copyAsset("duncan-portrait.jpg"),       label: "Contact Section Image" },
    // Contact modal avatar
    { key: "modal_avatar",     url: copyAsset("duncan-portrait.jpg"),       label: "Contact Modal Avatar" },
    // Scroll morph images (homepage animation)
    { key: "morph_portrait",   url: copyAsset("duncan-portrait.jpg"),       label: "Morph — Portrait" },
    { key: "morph_back",       url: copyAsset("duncan-back.jpeg"),          label: "Morph — Back Photo" },
    // FAQ hover/scroll images
    { key: "faq_img_1",        url: copyAsset("blog-uiux.jpeg"),            label: "FAQ Image 1" },
    { key: "faq_img_2",        url: copyAsset("process-research.jpeg"),     label: "FAQ Image 2" },
    { key: "faq_img_3",        url: copyAsset("project-shopease.jpeg"),     label: "FAQ Image 3" },
    { key: "faq_img_4",        url: copyAsset("process-concept.jpeg"),      label: "FAQ Image 4" },
    { key: "faq_img_5",        url: copyAsset("project-coral.jpg"),         label: "FAQ Image 5" },
    { key: "faq_img_6",        url: copyAsset("project-summer.jpeg"),       label: "FAQ Image 6" },
    // About page scroll morph images
    { key: "about_img1",       url: copyAsset("duncan-portrait.jpg"),       label: "About Page — Portrait" },
    { key: "about_img2",       url: copyAsset("duncan-back.jpeg"),          label: "About Page — Back Photo" },
    { key: "about_img3",       url: copyAsset("gallery-2.jpeg"),            label: "About Page — Gallery" },
    { key: "about_img4",       url: copyAsset("process-research.jpeg"),     label: "About Page — Process" },
    // About page process section
    { key: "process_research", url: copyAsset("process-research.jpeg"),     label: "Process — Research" },
    { key: "process_concept",  url: copyAsset("process-concept.jpeg"),      label: "Process — Concept" },
    { key: "process_launch",   url: copyAsset("blog-workflow.jpeg"),        label: "Process — Launch" },
  ];

  for (const img of siteImages) {
    await SiteImage.findOneAndUpdate({ key: img.key }, img, { upsert: true });
    console.log(`  ✓ site-image: ${img.key}`);
  }

  // ── Blogs ─────────────────────────────────────────────
  const blogImageMap = {
    "How to Streamline Your Design Workflow":        [copyAsset("blog-workflow.jpeg")],
    "5 Design Trends That Will Define 2024":         [copyAsset("blog-trends.jpeg")],
    "The Power of Typography in Web Design":         [copyAsset("blog-typography.jpeg")],
    "The Role of Color Psychology in Branding":      [copyAsset("blog-color.jpeg")],
    "Mastering UI/UX Design: Key Principles for Success": [copyAsset("blog-uiux.jpeg")],
    "Balancing Creativity and Functionality in Design":   [copyAsset("blog-balance.jpeg")],
  };

  const blogs = await Blog.find();
  for (const blog of blogs) {
    const imgs = blogImageMap[blog.title];
    if (imgs && (!blog.images || blog.images.length === 0)) {
      blog.images = imgs;
      await blog.save();
      console.log(`  ✓ blog images: ${blog.title}`);
    }
  }

  // ── Projects ──────────────────────────────────────────
  const projectImageMap = {
    "Summer Vibes Festival Campaign": copyAsset("project-summer.jpeg"),
    "Coral Spiral Abstract":          copyAsset("project-coral.jpg"),
    "ShopEase Redesign Sprint":       copyAsset("project-shopease.jpeg"),
    "Black Geometric Prisms":         copyAsset("project-prisms.jpeg"),
    "InnovateTech":                   copyAsset("project-innovatetech.jpeg"),
    "Intenza":                        copyAsset("project-intenza.jpeg"),
    "Pantone":                        copyAsset("project-pantone.jpeg"),
    "VistaHaven":                     copyAsset("project-vistahaven.jpg"),
  };

  const projects = await Project.find();
  for (const project of projects) {
    const img = projectImageMap[project.title];
    if (img && !project.image_url) {
      project.image_url = img;
      await project.save();
      console.log(`  ✓ project image: ${project.title}`);
    }
  }

  // ── Testimonials ──────────────────────────────────────
  const testimonialImageMap = {
    "John Harris":   copyAsset("reviewer-john.jpg"),
    "Michael Lee":   copyAsset("reviewer-michael.jpg"),
    "Sarah Johnson": copyAsset("reviewer-sarah.jpg"),
    "Laura Bennett": copyAsset("reviewer-laura.jpg"),
  };

  const { Testimonial: T } = require("./db");
  const testimonials = await T.find();
  for (const t of testimonials) {
    const img = testimonialImageMap[t.name];
    if (img && !t.avatar_url) {
      t.avatar_url = img;
      await t.save();
      console.log(`  ✓ testimonial avatar: ${t.name}`);
    }
  }

  console.log("\nDone! All images seeded.");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
