const mongoose = require("mongoose");

let connected = false;

async function connectDb() {
  if (connected) return;
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
  connected = true;
  console.log("MongoDB connected");
}

// ── Schemas ──────────────────────────────────────────────

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title:    { type: String, required: true },
  description: { type: String, required: true },
  image_url: String,
  github_url: String,
  live_url: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  category:    { type: String, required: true },
  date:        { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  fullContent: String,
  subtitle:    String,
  xp:          String,
  location:    String,
  tag:         String,
  live:        { type: Boolean, default: false },
  images:      [String],
  pptSlides:   [String],
  links:       [{ label: String, url: String, icon: String }],
  likes:       { type: Number, default: 0 },
  views:       { type: Number, default: 0 },
  // legacy fields kept for backward compat:
  content:     String,
  image_url:   String,
}, { timestamps: true });

const testimonialSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  role:   { type: String, required: true },
  text:   { type: String, required: true },
  rating: { type: Number, default: 5 },
  avatar_url: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  num:   { type: String, required: true },
  title: { type: String, required: true },
  items: [String],
}, { timestamps: true });

const faqSchema = new mongoose.Schema({
  num:      { type: String, required: true },
  question: { type: String, required: true },
  answer:   { type: String, required: true },
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  service: String,
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hash
}, { timestamps: true });

// Site images — key/value store for named image slots
const siteImageSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true }, // e.g. "hero", "about", "carousel_1"
  url:   { type: String, required: true },
  label: { type: String }, // human-readable label
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  blogId:  { type: String, required: true },
  name:    { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

// ── Models ───────────────────────────────────────────────

const Project     = mongoose.models.Project     || mongoose.model("Project",     projectSchema);
const Blog        = mongoose.models.Blog        || mongoose.model("Blog",        blogSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
const Service     = mongoose.models.Service     || mongoose.model("Service",     serviceSchema);
const FAQ         = mongoose.models.FAQ         || mongoose.model("FAQ",         faqSchema);
const Contact     = mongoose.models.Contact     || mongoose.model("Contact",     contactSchema);
const Comment     = mongoose.models.Comment     || mongoose.model("Comment",     commentSchema);
const Admin       = mongoose.models.Admin       || mongoose.model("Admin",       adminSchema);
const SiteImage   = mongoose.models.SiteImage   || mongoose.model("SiteImage",   siteImageSchema);

// ── Seed ─────────────────────────────────────────────────

async function seedIfEmpty() {
  const [pc, bc, tc, sc, fc] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Testimonial.countDocuments(),
    Service.countDocuments(),
    FAQ.countDocuments(),
  ]);

  if (pc === 0) await Project.insertMany([
    { category: "Graphic Design",  title: "Summer Vibes Festival Campaign", description: 'Created promotional materials for the "Summer Vibes Festival," including posters, flyers, and social media graphics.', featured: true },
    { category: "Branding",        title: "Coral Spiral Abstract",          description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves.", featured: true },
    { category: "UI / UX Design",  title: "ShopEase Redesign Sprint",       description: 'Redesigned the "ShopEase" e-commerce app to enhance user experience.', featured: true },
    { category: "Branding",        title: "Black Geometric Prisms",         description: "A collection of sharp, angular black prisms floating against a gradient dark background.", featured: true },
  ]);

  if (bc === 0) await Blog.insertMany([
    {
      category: "Tutorials",
      date: "Apr 27, 2025",
      title: "How to Streamline Your Design Workflow",
      description: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
      fullContent: "A streamlined design workflow starts with clear goals. Before opening any design tool, define what success looks like for the project.\n\nUse a consistent file structure across all projects. Naming layers, grouping components, and maintaining a shared design system saves hours of rework.\n\nAutomate repetitive tasks wherever possible. Tools like Figma's auto-layout, component variants, and plugins can cut production time significantly.\n\nRegular design reviews with stakeholders early in the process prevent costly revisions later. Feedback loops should be short and frequent.\n\nFinally, document your decisions. A short design rationale note alongside each major decision helps future-you and your team understand why choices were made.",
      live: true,
      images: [],
      tag: "design",
    },
    {
      category: "Insights",
      date: "Apr 30, 2025",
      title: "5 Design Trends That Will Define 2024",
      description: "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
      fullContent: "Design in 2024 is being shaped by a few powerful forces: AI-assisted creativity, bold typography, and a return to tactile textures.\n\n1. AI-Generated Visuals — Tools like Midjourney and DALL-E are now part of the design toolkit. Designers who learn to prompt effectively gain a massive speed advantage.\n\n2. Variable Fonts — Typography is getting dynamic. Variable fonts allow smooth weight and width transitions, enabling richer motion design.\n\n3. Glassmorphism 2.0 — The frosted glass aesthetic is back, but more refined. Expect deeper blurs, subtle gradients, and layered depth.\n\n4. Bento Grid Layouts — Inspired by Apple's marketing pages, bento grids organize content into clean, modular cards that work beautifully on all screen sizes.\n\n5. Dark Mode First — More products are designing for dark mode as the primary experience, with light mode as the secondary option.",
      images: [],
      tag: "trends",
    },
  ]);

  if (tc === 0) await Testimonial.insertMany([
    { name: "John Harris",    role: "Marketing Director",  text: "Duncan truly understood my vision and turned it into impactful designs.", rating: 5, featured: true },
    { name: "Michael Lee",    role: "Product Manager",     text: "He took the time to understand our goals and delivered a design that resonated perfectly.", rating: 5, featured: true },
    { name: "Sarah Johnson",  role: "CEO",                 text: "His design skills are unmatched. He transformed my ideas into a high-performing website.", rating: 5, featured: true },
    { name: "Laura Bennett",  role: "Small Business Owner",text: "As a small business owner, I appreciated how stress-free the process was.", rating: 5, featured: true },
  ]);

  if (sc === 0) await Service.insertMany([
    { num: "1", title: "Frontend Development",         items: ["Responsive and modern UI development", "React.js, Tailwind CSS & Bootstrap", "Interactive and dynamic user experiences", "Smooth animations using GSAP & Framer Motion"] },
    { num: "2", title: "Backend Development",          items: ["REST API development using Node.js & Express", "Database management (MongoDB, SQL)", "Secure authentication using JWT", "Scalable server-side architecture"] },
    { num: "3", title: "AI / Machine Learning",        items: ["Machine learning algorithms (Regression, KNN, Decision Trees)", "Deep learning (CNN, RNN, LSTM)", "Data analysis using NumPy, Pandas", "Integrating AI models and APIs"] },
    { num: "4", title: "Interactive Web Experiences",  items: ["Advanced animations using GSAP & Framer Motion", "Micro-interactions and smooth UI transitions", "Performance-optimized interfaces", "Modern and engaging user experiences"] },
  ]);

  if (fc === 0) await FAQ.insertMany([
    { num: "1.", question: "What services do you offer?",                          answer: "I offer UI/UX design, graphic design, web design, and branding services." },
    { num: "2.", question: "How does the design process work?",                    answer: "My process involves discovery, research, wireframing, prototyping, and final delivery." },
    { num: "3.", question: "How long does a project usually take?",                answer: "A typical project takes 2-6 weeks from kickoff to final delivery." },
    { num: "4.", question: "What do I need to provide before starting a project?", answer: "A brief overview of your goals, brand guidelines, content/copy, and references." },
    { num: "5.", question: "Do you offer revisions?",                              answer: "Yes! I include multiple rounds of revisions in every project." },
    { num: "6.", question: "How do I get started?",                                answer: "Simply reach out through the contact form or email me." },
  ]);
}

module.exports = { connectDb, seedIfEmpty, Project, Blog, Testimonial, Service, FAQ, Contact, Comment, Admin, SiteImage };
