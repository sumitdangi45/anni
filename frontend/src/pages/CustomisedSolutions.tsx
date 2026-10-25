import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useSEO } from "@/hooks/useSEO";

type Tab = "education" | "business" | "ecommerce" | "technology" | "lifestyle";

// ── FAQ ──────────────────────────────────────────────────────
const CUSTOM_FAQ = [
  { q: "What is a customised solution?", a: "A customised solution is a website or application built specifically around your business requirements — not a template. We start with your goals, users and workflows, then design and develop a product from the ground up." },
  { q: "How is customised different from pre-built?", a: "Pre-built solutions are ready-made foundations that we customize. Customised solutions are designed and developed specifically for your business — unique design, custom features, tailored integrations and your exact workflow." },
  { q: "How long does a custom project take?", a: "A custom website takes 2–4 weeks. Custom web applications take 4–12 weeks depending on complexity. We define a clear timeline after scoping your requirements." },
  { q: "Can you build on top of existing work?", a: "Yes. We can redesign, improve, extend or rebuild existing websites and applications — whether or not we originally built them." },
  { q: "What is included in a customised project?", a: "Every project includes discovery, UI/UX design, development, testing, deployment and post-launch support. Integrations, AI features, mobile apps and additional pages can be scoped as part of the project." },
  { q: "How do we get started?", a: "Contact us via the Contact page or WhatsApp. Share your idea or project brief and we'll schedule a discovery call to scope the work and propose a plan." },
];

// ── EDUCATION ─────────────────────────────────────────────────
const EDUCATION = [
  {
    id: "e1",
    num: "01",
    title: "Sarvadnya Vidyapeeth",
    subtitle: "College Admission & Education Portal",
    tag: "EDUCATION · WEB DEVELOPMENT",
    status: "live" as const,
    liveUrl: "https://sarvadnyavidyapeeth.in",
    points: [
      "Structured BCA, BBA and skill-based program pages with clear course information.",
      "Admission-focused experience with enquiry flows and student-facing information.",
      "Department, faculty, campus and infrastructure sections for institutional discovery.",
      "NIRF/NAAC and institutional highlights to communicate credibility.",
      "Interactive campus galleries and responsive mobile-first experience.",
      "Direct WhatsApp support and enquiry CTAs for prospective students.",
    ],
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#c8d8ff 100%)",
    dark: false },
  {
    id: "e2",
    num: "02",
    title: "Ruchi Upadhyay Classes",
    subtitle: "EdTech & Competitive Learning Platform",
    tag: "EDUCATION · EDTECH",
    status: "live" as const,
    liveUrl: "https://ruchiupadhyayclasses.in",
    points: [
      "Dedicated learning experience for Classes 9–12 and competitive exam preparation.",
      "Course and subject-focused content organization.",
      "Study resources, revision material and practice-oriented learning.",
      "Student-focused course access and learning workflows.",
      "Digital engagement designed for board and competitive examination students.",
      "Scalable foundation for future tests, analytics and student dashboards.",
    ],
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
  {
    id: "e3",
    num: "03",
    title: "Team 360",
    subtitle: "Spiritual Learning & Mentorship Platform",
    tag: "EDUCATION · MENTORSHIP",
    status: "live" as const,
    liveUrl: "https://devendraduttsharma.com",
    points: [
      "Structured presentation of mentorship and spiritual development programs.",
      "Live and recorded learning content.",
      "Digital book and resource library.",
      "Workshop and program registration workflows.",
      "Online booking and enquiry experience.",
      "Scalable platform structure for future courses and member experiences.",
    ],
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    id: "e4",
    num: "04",
    title: "School Management Platform",
    subtitle: "Connected School Operations",
    tag: "EDUCATION · APPLICATION",
    status: "concept" as const,
    points: [
      "Student, teacher, class and subject management.",
      "Attendance, academic records and timetable management.",
      "Fees, payments and administrative workflows.",
      "Parent-school communication and notifications.",
      "Teacher and administrator dashboards.",
      "Reports and centralized institutional data.",
    ],
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "e5",
    num: "05",
    title: "AI Student Performance Platform",
    subtitle: "Academic Intelligence & Performance Prediction",
    tag: "EDUCATION · AI / ML",
    status: "project" as const,
    points: [
      "Student performance data analysis.",
      "ML-based academic performance prediction.",
      "Academic risk-pattern identification.",
      "Subject and semester-level analysis.",
      "HOD and faculty analytics dashboard.",
      "Data-driven intervention insights.",
    ],
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "e6",
    num: "06",
    title: "AI Attendance Platform",
    subtitle: "Computer Vision Attendance System",
    tag: "EDUCATION · AI / COMPUTER VISION",
    status: "project" as const,
    points: [
      "Camera and snapshot-based face identification.",
      "AI-assisted attendance marking.",
      "Student, class and date-wise attendance records.",
      "Faculty and admin dashboard.",
      "Attendance analytics and reports.",
      "Integration-ready data architecture.",
    ],
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "e7",
    num: "07",
    title: "Learning Management System",
    subtitle: "Your Own Digital Learning Platform",
    tag: "EDUCATION · LMS",
    status: "concept" as const,
    points: [
      "Course and lesson management.",
      "Video and learning-material delivery.",
      "Student accounts and progress tracking.",
      "Tests, quizzes and assessments.",
      "Certificates and completion tracking.",
      "Instructor and admin dashboards.",
    ],
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#bbf7d0 100%)",
    dark: false },
  {
    id: "e8",
    num: "08",
    title: "Coaching Institute Management",
    subtitle: "Run Your Coaching Business Digitally",
    tag: "EDUCATION · APPLICATION",
    status: "concept" as const,
    points: [
      "Student registration and profiles.",
      "Batch and timetable management.",
      "Online and offline class scheduling.",
      "Tests, assessments and results.",
      "Fees and payment tracking.",
      "Student performance dashboards.",
    ],
    gradient: "linear-gradient(135deg,#fef2f2 0%,#fde8e8 100%)",
    dark: false },
];

// ── BUSINESS ──────────────────────────────────────────────────
const BUSINESS = [
  {
    id: "b1",
    num: "01",
    title: "Trend Kro Media",
    subtitle: "Digital Growth & Branding Platform",
    tag: "BUSINESS · BRANDING · WEB",
    status: "live" as const,
    liveUrl: "https://trendkromedia.com",
    points: [
      "Service-focused digital presence for multiple business offerings.",
      "Personal branding and media positioning sections.",
      "TEDx, podcast and media opportunity presentation.",
      "Case-study and success-story sections.",
      "Strategy-call and lead-generation journey.",
      "Dark editorial interface designed around the brand identity.",
    ],
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "b2",
    num: "02",
    title: "Corporate & Business Website",
    subtitle: "A Professional Digital Presence for Your Business",
    tag: "BUSINESS · WEB DEVELOPMENT",
    status: "concept" as const,
    points: [
      "Company overview, services and solutions.",
      "Industry-specific landing pages.",
      "Team, leadership and company information.",
      "Portfolio, projects and case studies.",
      "Contact, enquiry and WhatsApp conversion flows.",
      "SEO-ready, responsive and performance-focused architecture.",
    ],
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "b3",
    num: "03",
    title: "CRM & Lead Management Platform",
    subtitle: "Turn Every Enquiry Into an Organized Sales Process",
    tag: "BUSINESS · APPLICATION",
    status: "concept" as const,
    points: [
      "Lead capture from website and campaigns.",
      "Lead qualification and pipeline management.",
      "Follow-up reminders and task assignment.",
      "Customer communication history.",
      "Sales team dashboards and performance reports.",
      "WhatsApp, email and API integrations.",
    ],
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "b4",
    num: "04",
    title: "Business Management Platform",
    subtitle: "One System to Run Your Business",
    tag: "BUSINESS · APPLICATION",
    status: "concept" as const,
    points: [
      "Customer and employee management.",
      "Leads, enquiries and follow-ups.",
      "Tasks, workflows and internal operations.",
      "Invoices, payments and business records.",
      "Role-based dashboards and access control.",
      "Reports, analytics and operational insights.",
    ],
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
  {
    id: "b5",
    num: "05",
    title: "Customer & Partner Portal",
    subtitle: "Give Customers and Partners Their Own Digital Workspace",
    tag: "BUSINESS · WEB APPLICATION",
    status: "concept" as const,
    points: [
      "Secure customer and partner login.",
      "Documents, orders and account information.",
      "Service requests and support tickets.",
      "Notifications and communication.",
      "Role-based access and permissions.",
      "Business dashboards and reporting.",
    ],
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
  {
    id: "b6",
    num: "06",
    title: "Business Automation Platform",
    subtitle: "Replace Repetitive Work With Intelligent Workflows",
    tag: "BUSINESS · AI AUTOMATION",
    status: "concept" as const,
    points: [
      "Automated lead capture and assignment.",
      "Email, WhatsApp and notification workflows.",
      "CRM, database and spreadsheet automation.",
      "Automated reports and scheduled processes.",
      "AI-assisted customer and employee workflows.",
      "Approval systems and human-in-the-loop automation.",
    ],
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
];

// ── E-COMMERCE ────────────────────────────────────────────────
const ECOMMERCE = [
  {
    id: "ec1",
    num: "01",
    title: "Kirtilals",
    subtitle: "Luxury Jewellery Website",
    tag: "E-COMMERCE · LUXURY COMMERCE",
    status: "live" as const,
    liveUrl: "https://kirtilals.com",
    points: [
      "Curated jewellery and bridal collections.",
      "Detailed product and design presentations.",
      "High-resolution product imagery and zoom.",
      "Custom jewellery enquiry journeys.",
      "Virtual consultations and store appointments.",
      "Premium, responsive brand experience.",
    ],
    gradient: "linear-gradient(135deg,#1a1a0a 0%,#2a2a10 100%)",
    dark: true },
  {
    id: "ec2",
    num: "02",
    title: "Momentz",
    subtitle: "Personalised Photo Printing Platform",
    tag: "E-COMMERCE · PERSONALISED COMMERCE",
    status: "live" as const,
    liveUrl: "https://momentz.in",
    points: [
      "Personalised photo-printing products.",
      "Photo uploads and customisation.",
      "Frames and personalised gift options.",
      "Drag-and-drop cropping tools.",
      "Bulk uploads and photo filters.",
      "Ordering and delivery workflows.",
    ],
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    id: "ec3",
    num: "03",
    title: "Threadclothes",
    subtitle: "Women's Fashion Shopping App",
    tag: "E-COMMERCE · FASHION · MOBILE APP",
    status: "live" as const,
    liveUrl: "https://play.google.com/store/apps/details?id=com.threadclothes.android",
    points: [
      "Fashion-focused product catalogue.",
      "Categories for ethnic and contemporary wear.",
      "Product details and shopping experience.",
      "Cash-on-delivery support.",
      "Wallet points and customer benefits.",
      "Returns and order-related workflows.",
    ],
    gradient: "linear-gradient(135deg,#fef2f2 0%,#fde8e8 100%)",
    dark: false },
  {
    id: "ec4",
    num: "04",
    title: "Uoons",
    subtitle: "Electronics Shopping App",
    tag: "E-COMMERCE · ELECTRONICS · MOBILE APP",
    status: "live" as const,
    liveUrl: "https://play.google.com/store/apps/details?id=com.uoons.india",
    points: [
      "Electronics and accessories catalogue.",
      "Product information and price comparisons.",
      "Customer ratings and reviews.",
      "Secure payment experience.",
      "Coupons and seller communication.",
      "Parcel and delivery tracking.",
    ],
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "ec5",
    num: "05",
    title: "Women Plus by Monika",
    subtitle: "Plus-Size Fashion App",
    tag: "E-COMMERCE · FASHION · MOBILE APP",
    status: "live" as const,
    liveUrl: "https://play.google.com/store/apps/details?id=com.womenplusindia",
    points: [
      "Curated plus-size fashion catalogue.",
      "Product variants and size information.",
      "Helpful sizing guides.",
      "Dynamic product pricing.",
      "UPI payment options.",
      "WhatsApp-based order confirmation.",
    ],
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "ec6",
    num: "06",
    title: "MinitPe",
    subtitle: "Food, Grocery & Local Services App",
    tag: "E-COMMERCE · LOCAL COMMERCE · MOBILE APP",
    status: "live" as const,
    liveUrl: "https://play.google.com/store/apps/details?id=com.ghiniba.customer",
    points: [
      "Food and grocery ordering.",
      "Local product and service discovery.",
      "Cab and ride-booking functionality.",
      "Multiple payment options and wallet.",
      "Order and service management.",
      "Delivery and route-related workflows.",
    ],
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    id: "ec7",
    num: "07",
    title: "D2C Brand & E-commerce Platform",
    subtitle: "A Branded Online Store Built Around Your Products",
    tag: "E-COMMERCE · CUSTOM SOLUTION",
    status: "concept" as const,
    points: [
      "Custom storefront and brand identity.",
      "Product catalogue and collections.",
      "Cart, checkout and payment integration.",
      "Inventory and order management.",
      "Offers, coupons and loyalty features.",
      "Customer analytics and marketing integrations.",
    ],
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    id: "ec8",
    num: "08",
    title: "Multi-Vendor Marketplace",
    subtitle: "Build Your Own Digital Marketplace",
    tag: "E-COMMERCE · MARKETPLACE",
    status: "concept" as const,
    points: [
      "Seller onboarding and verification.",
      "Individual seller dashboards.",
      "Product and inventory management.",
      "Marketplace-wide search and checkout.",
      "Commission and settlement workflows.",
      "Central admin panel and reporting.",
    ],
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
];

// ── TECHNOLOGY ────────────────────────────────────────────────
const TECHNOLOGY = [
  {
    id: "t1",
    num: "01",
    title: "Tradescribe",
    subtitle: "Trading Analytics Platform",
    tag: "TECHNOLOGY · WEB APPLICATION",
    status: "live" as const,
    liveUrl: "https://tradescribe.in",
    points: [
      "Stock and market analysis interfaces.",
      "Crypto and futures market insights.",
      "Interactive charts and market metrics.",
      "Trading-focused analytics experience.",
      "Fast, responsive data-driven interface.",
      "Scalable architecture for expanding analytical capabilities.",
    ],
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "t2",
    num: "02",
    title: "Airbnb Price Prediction",
    subtitle: "Machine Learning Price Intelligence",
    tag: "TECHNOLOGY · AI / ML",
    status: "project" as const,
    points: [
      "Large-scale listing data processing.",
      "Exploratory data analysis and feature engineering.",
      "Multiple machine learning model experiments.",
      "CatBoost-based price prediction.",
      "Prediction API and Flask application.",
      "User-facing interface for generating price predictions.",
    ],
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "t3",
    num: "03",
    title: "AI Crypto Primitive Identification",
    subtitle: "AI/ML Classification System",
    tag: "TECHNOLOGY · AI / ML",
    status: "project" as const,
    points: [
      "Data preprocessing and feature engineering.",
      "Machine learning-based classification.",
      "Model experimentation and evaluation.",
      "Structured prediction workflow.",
      "AI-assisted identification interface.",
      "Foundation for scalable crypto intelligence tools.",
    ],
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "t4",
    num: "04",
    title: "SaaS Product Platform",
    subtitle: "Turn a Software Idea Into a Product",
    tag: "TECHNOLOGY · SAAS",
    status: "concept" as const,
    points: [
      "Multi-user and multi-tenant architecture.",
      "Subscription and billing systems.",
      "Authentication and role-based access.",
      "Admin and customer dashboards.",
      "API integrations and automation.",
      "Analytics and scalable cloud infrastructure.",
    ],
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    id: "t5",
    num: "05",
    title: "AI Product Platform",
    subtitle: "Build AI Into the Product — Not Just the Marketing",
    tag: "TECHNOLOGY · AI PRODUCT",
    status: "concept" as const,
    points: [
      "AI assistants and copilots.",
      "Machine learning prediction systems.",
      "Computer vision applications.",
      "Recommendation and personalisation engines.",
      "RAG and knowledge-based AI.",
      "AI APIs integrated into existing products.",
    ],
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    id: "t6",
    num: "06",
    title: "Data & Analytics Platform",
    subtitle: "Make Complex Data Easier to Understand",
    tag: "TECHNOLOGY · ANALYTICS",
    status: "concept" as const,
    points: [
      "Real-time and business dashboards.",
      "Data visualisation and reporting.",
      "KPI and performance monitoring.",
      "Predictive analytics.",
      "Automated reports and alerts.",
      "API and database-based data pipelines.",
    ],
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
];

// ── LIFESTYLE & SERVICES ──────────────────────────────────────
const LIFESTYLE = [
  {
    id: "l1",
    num: "01",
    title: "Meditation Magic",
    subtitle: "Wellness & Spiritual Platform",
    tag: "LIFESTYLE · WELLNESS",
    status: "live" as const,
    liveUrl: "https://meditationmagic.in",
    points: [
      "Wellness courses, meditation programs and live sessions.",
      "Community and member experience.",
      "Course access and digital resource library.",
      "Retreat and program booking workflows.",
      "Practitioner profiles and program presentation.",
      "Mobile-friendly wellness journey.",
    ],
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    id: "l2",
    num: "02",
    title: "Healthcare & Clinic Website",
    subtitle: "Make Healthcare Services Easier to Discover",
    tag: "LIFESTYLE · HEALTHCARE",
    status: "concept" as const,
    points: [
      "Doctor profiles, departments, specialties and services.",
      "Appointment enquiry and scheduling workflows.",
      "Patient-friendly information about treatments and facilities.",
      "Location, timings and Google Maps integration.",
      "WhatsApp and contact workflows for appointment enquiries.",
      "SEO-friendly pages around patient search queries.",
    ],
    gradient: "linear-gradient(135deg,#fef2f2 0%,#fde8e8 100%)",
    dark: false },
  {
    id: "l3",
    num: "03",
    title: "Restaurant & Café Website",
    subtitle: "Make Your Menu Discoverable",
    tag: "LIFESTYLE · FOOD & BEVERAGE",
    status: "concept" as const,
    points: [
      "Beautiful digital menu with categories, dishes and prices.",
      "Restaurant story, ambience and gallery.",
      "Table reservation and WhatsApp ordering.",
      "Google Maps, opening hours and contact.",
      "Offers, events and promotional sections.",
      "Mobile-first experience for restaurant discovery.",
    ],
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    id: "l4",
    num: "04",
    title: "Hotel & Hospitality Website",
    subtitle: "Turn Your Property Into a Bookable Experience",
    tag: "LIFESTYLE · HOSPITALITY",
    status: "concept" as const,
    points: [
      "Room and accommodation pages with galleries and amenities.",
      "Online booking and enquiry flow.",
      "Hotel facilities, dining and experiences.",
      "Location, maps and nearby attractions.",
      "WhatsApp and direct booking CTAs.",
      "Fast, responsive experience for mobile travellers.",
    ],
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "l5",
    num: "05",
    title: "On-Demand Services Platform",
    subtitle: "Connect Customers With the Services They Need",
    tag: "LIFESTYLE · SERVICE MARKETPLACE",
    status: "concept" as const,
    points: [
      "Customer app for service discovery.",
      "Provider app and provider dashboard.",
      "Service catalog, pricing and availability.",
      "Booking and appointment management.",
      "Provider verification and commission controls.",
      "Notifications and service status tracking.",
    ],
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "l6",
    num: "06",
    title: "Fitness & Wellness App",
    subtitle: "Your Digital Wellness Platform",
    tag: "LIFESTYLE · FITNESS",
    status: "concept" as const,
    points: [
      "Workout and program library.",
      "Member accounts and progress tracking.",
      "Class booking and scheduling.",
      "Nutrition and wellness content.",
      "Community and challenges.",
      "Trainer and member dashboards.",
    ],
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
];

// ── Status badge ──────────────────────────────────────────────
const StatusBadge = ({ status }: { status: "live" | "project" | "concept" }) => {
  const config = {
    live: { label: "Live Project", bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e" },
    project: { label: "Existing Project", bg: "#f0f0ff", color: "#4f46e5", dot: "#6b7eff" },
    concept: { label: "Build This Solution", bg: "#f8f8f8", color: "#888", dot: "#ccc" } }[status];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "999px", background: config.bg, fontSize: "16px", fontWeight: 700, color: config.color }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: config.dot }} />
      {config.label}
    </span>
  );
};

// ── Mock image ────────────────────────────────────────────────
const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center", minHeight: "320px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
      {[0,1,2].map(i => <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }} />)}
      <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", marginLeft: "6px" }} />
    </div>
    <div style={{ height: "12px", width: "55%", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.14)" }} />
    <div style={{ height: "10px", width: "75%", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.09)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "6px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: "44px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />)}
    </div>
  </div>
);

// ── Product card ──────────────────────────────────────────────
type Product = {
  id: string; num: string; title: string; subtitle: string; tag: string;
  status: "live" | "project" | "concept";
  liveUrl?: string; points: string[];
  gradient: string; dark: boolean;
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = index % 2 === 0;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="service-row" style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: "1px solid #f0f0f0" }}
    >
      {/* Image */}
      <div style={{ flex: "0 0 45%", borderRadius: "18px", overflow: "hidden", border: "1px solid #e8e8e8", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
        <MockImg gradient={product.gradient} dark={product.dark} />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#aaa", letterSpacing: "0.14em" }}>{product.num}</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase" }}>{product.tag}</span>
        </div>
        <h3 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 800, color: "#111", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "8px" }}>
          {product.title}
        </h3>
        <p style={{ fontSize: "16.5px", color: "#6b7eff", fontWeight: 600, marginBottom: "16px" }}>{product.subtitle}</p>

        <div style={{ marginBottom: "20px" }}>
          <StatusBadge status={product.status} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
          {product.points.slice(0, 3).map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi + 1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.6 }}>{pt}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {product.status === "live" && product.liveUrl ? (
            <a href={product.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#111", color: "#fff", borderRadius: "999px", padding: "10px 20px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <ExternalLink size={13} /> View Live Project
            </a>
          ) : product.status === "project" ? (
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#6b7eff", color: "#fff", borderRadius: "999px", padding: "10px 20px 10px 10px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#5a63e0")} onMouseLeave={e => (e.currentTarget.style.background = "#6b7eff")}
            >
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={11} color="#fff" />
              </span>
              View Project
            </a>
          ) : (
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "10px 20px 10px 10px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={11} color="#fff" />
              </span>
              Build This Solution
            </a>
          )}
          <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "10px 18px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")} onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
          >
            <WhatsAppIcon size={13} /> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────
const CustomisedSolutions = () => {
  useSEO({
    title: "Customised Solutions — Anni Web Solutions",
    description: "Custom websites, applications and AI products built for education, business, e-commerce, technology and lifestyle — designed around your specific requirements." });

  const [tab, setTab] = useState<Tab>("education");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const TAB_CONFIG: Record<Tab, { label: string; items: Product[]; heading: string; sub: string }> = {
    education: { label: "Education", items: EDUCATION as Product[], heading: "Digital experiences built for education.", sub: "From admission portals and learning platforms to student intelligence systems." },
    business: { label: "Business", items: BUSINESS as Product[], heading: "Digital products built around the way businesses work.", sub: "Corporate websites, CRM platforms, management systems and automation." },
    ecommerce: { label: "E-Commerce", items: ECOMMERCE as Product[], heading: "Commerce experiences built to turn browsing into buying.", sub: "Custom stores, mobile shopping apps, marketplaces and AI-powered commerce." },
    technology: { label: "Technology", items: TECHNOLOGY as Product[], heading: "Technology products built for what comes next.", sub: "AI/ML platforms, SaaS products, analytics systems and developer tools." },
    lifestyle: { label: "Lifestyle & Services", items: LIFESTYLE as Product[], heading: "Digital experiences for lifestyle and service businesses.", sub: "Wellness, hospitality, healthcare, food and service platforms." } };

  const current = TAB_CONFIG[tab];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "120px 20px 60px" }} ref={ref}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px" }}>CUSTOMISED SOLUTIONS</p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "16px" }}>
            Tailored to your needs.
          </h1>
          <p style={{ fontSize: "16px", color: "#777", lineHeight: 1.75, maxWidth: "560px", marginBottom: "48px" }}>
            Custom-built websites, business applications and AI products — designed from the ground up around your business, users and requirements.
          </p>
        </motion.div>

        {/* Tab filter */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "inline-flex", alignItems: "center", background: "#f5f5f5", borderRadius: "999px", padding: "5px", gap: "4px", marginBottom: "64px", flexWrap: "wrap" }}
        >
          {(["education", "business", "ecommerce", "technology", "lifestyle"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding: "10px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
                fontSize: "16px", fontWeight: 600, transition: "all 0.2s",
                background: tab === t ? "#111" : "transparent",
                color: tab === t ? "#fff" : "#777",
                boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.15)" : "none" }}
            >
              {TAB_CONFIG[t].label}
            </button>
          ))}
        </motion.div>

        {/* Section heading */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
              CUSTOMISED · {current.label.toUpperCase()}
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", marginBottom: "8px" }}>
              {current.heading}
            </h2>
            <p style={{ fontSize: "16.5px", color: "#999", marginBottom: "0" }}>{current.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* Product cards */}
        <AnimatePresence mode="wait">
          <motion.div key={tab + "-list"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {current.items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div style={{ marginTop: "48px", padding: "48px", borderRadius: "20px", background: "#0a0a0a", textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "14px" }}>HAVE SOMETHING IN MIND?</p>
          <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "12px" }}>
            Your business has its own way of working.
          </h3>
          <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>
            Tell us what you want to build. We'll design and develop it around your goals, users and workflows.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")} onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={13} color="#fff" />
              </span>
              Tell Us What You Want to Build
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <FAQSection
        faqs={CUSTOM_FAQ}
        title={"Frequently\nAsked\nQuestions"}
        subtitle="Everything about customised solutions, how they work and how we build them."
      />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default CustomisedSolutions;
