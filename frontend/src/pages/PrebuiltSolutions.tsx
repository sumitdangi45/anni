import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useSEO } from "@/hooks/useSEO";

type Tab = "websites" | "apps" | "ai";

// ── Prebuilt FAQ ──────────────────────────────────────────────
const PREBUILT_FAQ = [
  { q: "What is a pre-built solution?", a: "A pre-built solution is a ready-made website, business application or AI product that we've already designed and developed. You choose the product that fits your business, we customize it with your branding, content, data and integrations, then deploy it — so you launch faster than building from scratch." },
  { q: "Can I customize a pre-built product?", a: "Yes. Every pre-built solution is fully customizable — design, colors, branding, content, pages, features and integrations can all be adapted to match your specific business requirements." },
  { q: "What is the typical deployment timeline?", a: "Pre-built websites typically deploy in 1–2 weeks. Business applications take 2–4 weeks depending on customization. AI products take 2–6 weeks based on data preparation, training and integration requirements." },
  { q: "Is there a monthly subscription or licensing fee?", a: "The pre-built solutions are delivered as one-time projects. There are no recurring licensing fees from Anni — though hosting, domain and any third-party services (payment gateways, APIs) have their own costs." },
  { q: "Do you assist with App Store and Play Store submissions?", a: "Yes. For mobile-enabled products, we handle the build preparation, metadata, screenshots, privacy policy requirements and submission process for both Google Play Store and Apple App Store." },
  { q: "Can pre-built products be connected to my existing systems?", a: "Yes. We integrate pre-built products with your existing CRM, payment gateways, WhatsApp Business API, Google Sheets, databases and other platforms that have APIs." },
  { q: "What if I need features that aren't in the pre-built product?", a: "We can add custom features on top of any pre-built foundation. Tell us what you need and we'll scope the additional development as part of the project." },
  { q: "How do we get started?", a: "Contact us via the Contact page or WhatsApp. Share which product you're interested in and your business requirements — we'll review, propose customization scope and provide a timeline and investment." },
];

// ── WEBSITES ─────────────────────────────────────────────────
const WEBSITES = [
  {
    id: "w1",
    title: "College & University Website",
    subtitle: "A modern digital presence for educational institutions.",
    points: [
      "Modern homepage with courses, departments, admissions and institutional highlights.",
      "Dedicated pages for academic programs — BCA, BBA, engineering, management.",
      "Admission enquiry forms, application CTAs and WhatsApp integration.",
      "Faculty, department, campus, infrastructure and gallery sections.",
      "Notices, events, announcements and institutional information.",
      "Responsive, SEO-ready architecture for students searching from mobile.",
    ],
    best: "Colleges · Universities · Educational Institutions · Degree Institutes",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0d8ff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792828972/anni/prebuilt/College_Website_Promotional_Mockup.png",
    dark: false },
  {
    id: "w2",
    title: "School Website",
    subtitle: "Build a stronger digital presence for your school.",
    points: [
      "School introduction, vision, mission and leadership sections.",
      "Academic programs, classes, curriculum and faculty information.",
      "Online admission enquiries and application CTAs.",
      "Campus, facilities, activities, achievements and photo galleries.",
      "News, notices, events and important announcements.",
      "Parent-friendly mobile experience with WhatsApp and enquiry integration.",
    ],
    best: "Schools · CBSE Schools · ICSE Schools · Private Schools · School Groups",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792828995/anni/prebuilt/Sanskar_School_Hero__Education_Builds_Leaders.png",
    dark: false },
  {
    id: "w3",
    title: "Corporate & Business Website",
    subtitle: "Turn your business into a professional digital brand.",
    points: [
      "High-impact homepage with your value proposition, services and business highlights.",
      "About, team, capabilities, portfolio and case-study sections.",
      "Lead-generation forms, WhatsApp CTA and enquiry workflows.",
      "Testimonials, clients, certifications and trust-building sections.",
      "SEO-friendly service pages designed around what customers search for.",
      "Analytics-ready, responsive and scalable architecture.",
    ],
    best: "MSMEs · Startups · Agencies · IT Companies · Professional Services · Local Businesses",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829019/anni/prebuilt/Corporate_Website_Product_Showcase.png",
    dark: false },
  {
    id: "w4",
    title: "Real Estate Website",
    subtitle: "Turn property searches into qualified enquiries.",
    points: [
      "Property and project listings with images, specs, pricing and highlights.",
      "Search and filtering for type, location, budget and other criteria.",
      "Detailed property pages with amenities, floor plans and location.",
      "Google Maps integration and site-visit enquiry forms.",
      "WhatsApp lead capture and direct enquiry CTAs.",
      "SEO-ready location and project pages for organic discovery.",
    ],
    best: "Builders · Developers · Property Dealers · Real Estate Agencies · Property Consultants",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829041/anni/prebuilt/Luxury_Real_Estate_Website_Showcase.png",
    dark: true },
  {
    id: "w5",
    title: "E-commerce Store",
    subtitle: "Start selling your products online.",
    points: [
      "Product catalogue with categories, search, filters and product details.",
      "Shopping cart, checkout and payment integration.",
      "Product variants, offers, coupons and promotional sections.",
      "Customer accounts, order history and order tracking.",
      "WhatsApp and customer support integration.",
      "Mobile-first, SEO-ready storefront built for product discovery.",
    ],
    best: "D2C Brands · Retailers · Manufacturers · Local Businesses · Product Startups",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829540/anni/prebuilt/Premium_E-Commerce_Hero_Banner.png",
    dark: true },
  {
    id: "w6",
    title: "Restaurant & Café Website",
    subtitle: "Make your menu discoverable before customers walk in.",
    points: [
      "Beautiful digital menu with categories, dishes, prices and images.",
      "Restaurant story, ambience, gallery and signature dishes.",
      "Table reservation, enquiry and WhatsApp ordering workflows.",
      "Google Maps, opening hours and contact information.",
      "Offers, events, seasonal menus and promotional sections.",
      "Mobile-first experience for customers discovering you on their phones.",
    ],
    best: "Restaurants · Cafés · QSRs · Cloud Kitchens · Bakeries · Food Businesses",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829550/anni/prebuilt/s7hc9znutvlnijidbzci.png",
    dark: false },
  {
    id: "w7",
    title: "Hotel & Hospitality Website",
    subtitle: "Turn your property into a bookable digital experience.",
    points: [
      "Room and accommodation pages with galleries, amenities and pricing.",
      "Online booking and enquiry flow with availability information.",
      "Hotel facilities, dining, experiences and packages.",
      "Location, maps and nearby attractions.",
      "WhatsApp, enquiry and booking CTAs for direct communication.",
      "Fast, responsive experience designed for travellers on mobile.",
    ],
    best: "Hotels · Resorts · Homestays · Boutique Hotels · Guest Houses · Hospitality Groups",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829555/anni/prebuilt/Luxury_Resort_Booking_Hero.png",
    dark: true },
  {
    id: "w8",
    title: "Healthcare & Clinic Website",
    subtitle: "Make healthcare services easier to discover and access.",
    points: [
      "Doctor profiles, departments, specialties and healthcare services.",
      "Appointment enquiry and scheduling workflows.",
      "Patient-friendly information about treatments, procedures and facilities.",
      "Location, timings, emergency and contact information with Maps.",
      "WhatsApp and contact workflows for appointment enquiries.",
      "SEO-friendly service pages around patient search queries.",
    ],
    best: "Clinics · Hospitals · Doctors · Diagnostic Centres · Dental Clinics · Healthcare Groups",
    gradient: "linear-gradient(135deg,#fef2f2 0%,#fde8e8 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792829558/anni/prebuilt/Modern_Healthcare_Clinic_Hero_Banner.png",
    dark: false },
];

// ── APPS ─────────────────────────────────────────────────────
const APPS = [
  {
    id: "a1",
    title: "School Management System",
    subtitle: "One platform for complete school operations.",
    points: [
      "Student, teacher, class and subject management.",
      "Attendance, academic records and timetable management.",
      "Fees, payments and administrative workflows.",
      "Parent-school communication and notifications.",
      "Teacher and administrator dashboards.",
      "Reports and centralized institutional data.",
    ],
    best: "Schools · Private Institutions · School Groups · Educational Organizations",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0d8ff 100%)",
    dark: false },
  {
    id: "a2",
    title: "AI Student Performance Intelligence",
    subtitle: "Turn academic data into actionable insights.",
    points: [
      "Student performance data analysis.",
      "ML-based academic performance prediction.",
      "Identification of potential academic risk patterns.",
      "Subject, semester and student-level analysis.",
      "HOD and faculty analytics dashboard.",
      "Data-driven insights for academic interventions.",
    ],
    best: "Colleges · Universities · HODs · Academic Departments",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "a3",
    title: "AI Attendance Management",
    subtitle: "Automate attendance with computer vision.",
    points: [
      "Camera or snapshot-based student identification.",
      "AI-powered face-recognition attendance workflow.",
      "Automatic date and time-based attendance records.",
      "Class, student and faculty-wise dashboards.",
      "Attendance reports and exports.",
      "Integration-ready attendance data for institutional systems.",
    ],
    best: "Schools · Colleges · Coaching Institutes · Training Centers · Organizations",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
  {
    id: "a4",
    title: "KisanSathi — Agriculture Platform",
    subtitle: "AI-powered assistance for modern farming.",
    points: [
      "AI-based crop recommendations.",
      "Image-based crop disease detection.",
      "Fertilizer and farming recommendations.",
      "Weather alerts and agricultural insights.",
      "Livestock assistance.",
      "Multilingual AI and voice-based farmer assistance.",
    ],
    best: "AgriTech Startups · FPOs · Agriculture Businesses · Rural Platforms",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    id: "a5",
    title: "Grocery Delivery Platform",
    subtitle: "Launch your own local grocery business.",
    points: [
      "Customer mobile app and web ordering.",
      "Product, category and inventory management.",
      "Order, coupon and customer management.",
      "Delivery partner application.",
      "Online payment and COD workflows.",
      "Delivery zones, charges and location-based operations.",
    ],
    best: "Grocery Stores · Supermarkets · Hyperlocal Businesses · Quick-Commerce Startups",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "a6",
    title: "Food Delivery Platform",
    subtitle: "Connect customers, restaurants and delivery partners.",
    points: [
      "Customer app and ordering website.",
      "Restaurant app and management panel.",
      "Menu, pricing and availability management.",
      "Delivery partner application and navigation.",
      "Live order status and notifications.",
      "Commission, payments and restaurant settlement workflows.",
    ],
    best: "Food Delivery Startups · Restaurant Networks · Cloud Kitchens · QSR Businesses",
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
  {
    id: "a7",
    title: "Multi-Vendor E-commerce Platform",
    subtitle: "Build your own digital marketplace.",
    points: [
      "Customer web and mobile shopping experience.",
      "Seller dashboard and seller application.",
      "Product catalog and inventory management.",
      "Orders, shipping and delivery workflows.",
      "Seller commissions and settlement management.",
      "Marketplace analytics, promotions and administration.",
    ],
    best: "Marketplace Startups · D2C Aggregators · Multi-Seller Businesses · Niche Marketplaces",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "a8",
    title: "On-Demand Services Platform",
    subtitle: "Build your own service marketplace.",
    points: [
      "Customer application for service discovery.",
      "Provider application and provider dashboard.",
      "Service catalog, pricing and availability.",
      "Booking and appointment management.",
      "Provider verification and commission controls.",
      "Notifications, communication and service status tracking.",
    ],
    best: "Home Services · Repair · Cleaning · Beauty · Wellness · Local Service Businesses",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    id: "a9",
    title: "Healthcare & Clinic Management",
    subtitle: "Simplify day-to-day healthcare operations.",
    points: [
      "Patient registration and profile management.",
      "Doctor schedules and appointment management.",
      "Patient records and consultation history.",
      "Prescription and treatment documentation workflows.",
      "Billing and payment management.",
      "Reports, notifications and administrative dashboards.",
    ],
    best: "Clinics · Doctors · Dental Clinics · Diagnostic Centers · Healthcare Groups",
    gradient: "linear-gradient(135deg,#fef2f2 0%,#fde8e8 100%)",
    dark: false },
  {
    id: "a10",
    title: "Restaurant Ordering & Operations",
    subtitle: "Give restaurants their own digital ordering system.",
    points: [
      "Customer ordering website and mobile experience.",
      "Menu, category and item management.",
      "Branch-wise operations and pricing.",
      "Kitchen and order preparation workflow.",
      "Delivery assignment and order tracking.",
      "Admin dashboard with orders, customers and reports.",
    ],
    best: "Restaurants · Cafés · QSR Chains · Cloud Kitchens · Restaurant Groups",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
];

// ── AI PRODUCTS ───────────────────────────────────────────────
const AI_PRODUCTS = [
  {
    id: "ai1",
    title: "KisanSathi — Agriculture AI",
    subtitle: "AI-powered platform for modern farming decisions.",
    points: [
      "AI-based crop recommendations using farming inputs.",
      "Image-based crop disease identification and assistance.",
      "Fertilizer and crop-care recommendations.",
      "Weather alerts and agriculture-focused insights.",
      "Livestock assistance for common farming queries.",
      "Multilingual AI and voice-based farmer assistance.",
    ],
    best: "AgriTech Startups · FPOs · Agriculture Businesses · Rural Platforms",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    id: "ai2",
    title: "AI Snapshot Attendance",
    subtitle: "Computer vision attendance for institutions.",
    points: [
      "Camera or snapshot-based face identification.",
      "AI-powered automated attendance marking.",
      "Date, time, class and student-wise records.",
      "Faculty and administrator dashboards.",
      "Attendance analytics and downloadable reports.",
      "Integration-ready architecture for institutional systems.",
    ],
    best: "Schools · Colleges · Coaching Institutes · Training Centers · Organizations",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0d8ff 100%)",
    dark: false },
  {
    id: "ai3",
    title: "AI Student Performance Intelligence",
    subtitle: "Predict. Identify. Support.",
    points: [
      "Student academic data analysis.",
      "ML-based performance prediction.",
      "Identification of potential academic risk patterns.",
      "Subject and semester-level performance insights.",
      "HOD and faculty analytics dashboard.",
      "Data-driven insights for targeted academic support.",
    ],
    best: "Colleges · Universities · HODs · Academic Departments",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    id: "ai4",
    title: "AI Business Assistant",
    subtitle: "Turn your business knowledge into an AI assistant.",
    points: [
      "Business-specific knowledge base and training.",
      "Document, FAQ and website-based question answering.",
      "Context-aware multi-turn conversations.",
      "Website and customer-support integration.",
      "Lead capture and human handoff workflows.",
      "Conversation history and usage analytics.",
    ],
    best: "SMEs · Service Businesses · SaaS Companies · Support Teams",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    id: "ai5",
    title: "AI Document Intelligence",
    subtitle: "Turn documents into structured business data.",
    points: [
      "OCR and document text extraction.",
      "Invoice, receipt and form data extraction.",
      "Document classification and routing.",
      "Key-value and structured information extraction.",
      "Integration with databases, CRM or business apps.",
      "Human review workflows for uncertain outputs.",
    ],
    best: "Finance Teams · SMEs · Healthcare · Logistics · Operations · Back Offices",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    id: "ai6",
    title: "AI Knowledge & RAG Platform",
    subtitle: "Ask your documents. Get answers from your knowledge base.",
    points: [
      "PDF and document ingestion pipeline.",
      "Semantic search and retrieval.",
      "Business-specific AI question answering.",
      "Internal knowledge assistant for employees.",
      "Source-aware responses and document references.",
      "Access controls for different users and knowledge areas.",
    ],
    best: "Companies · SaaS Businesses · Educational Institutions · Professional Services",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    id: "ai7",
    title: "AI Sales & Lead Intelligence",
    subtitle: "Turn leads into a smarter sales workflow.",
    points: [
      "Lead capture from website and digital channels.",
      "AI-assisted lead qualification.",
      "Lead scoring based on defined business criteria.",
      "Personalized follow-up recommendations and messaging.",
      "CRM integration and automated lead updates.",
      "Sales analytics and conversion tracking.",
    ],
    best: "Agencies · Real Estate · SaaS · Education · Service Businesses · B2B Companies",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    id: "ai8",
    title: "AI Workflow & Agent Platform",
    subtitle: "Move from AI answers to AI actions.",
    points: [
      "Task-specific AI agents for business processes.",
      "API and business-tool integrations.",
      "Multi-step workflow execution.",
      "Lead, support and operations automation.",
      "Human approval and escalation points.",
      "Activity logs, monitoring and workflow evaluation.",
    ],
    best: "SMEs · SaaS Businesses · Operations Teams · Customer Support · Sales Teams",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
];

// ── Mock image placeholder ────────────────────────────────────
const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center", minHeight: "300px" }}>
    {/* mock browser chrome */}
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

// ── Product card (alternating) ────────────────────────────────
const ProductCard = ({
  product, index }: {
  product: typeof WEBSITES[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = index % 2 === 0;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="service-row" style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: "1px solid #f0f0f0" }}
    >
      {/* Image */}
      <div style={{ flex: "0 0 45%", borderRadius: "18px", overflow: "hidden", border: "1px solid #e8e8e8", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
        {(product as any).imageUrl
          ? <img src={(product as any).imageUrl} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "300px" }} />
          : <MockImg gradient={product.gradient} dark={product.dark} />
        }
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {/* number */}
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#aaa", letterSpacing: "0.14em", marginBottom: "8px" }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", fontWeight: 800, color: "#111", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "10px" }}>
          {product.title}
        </h3>
        <p style={{ fontSize: "16.5px", color: "#6b7eff", fontWeight: 600, marginBottom: "20px" }}>
          {product.subtitle}
        </p>

        {/* points */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {product.points.slice(0, 3).map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi + 1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.6 }}>{pt}</p>
            </div>
          ))}
        </div>

        {/* best for */}
        <p style={{ fontSize: "16.5px", color: "#aaa", marginBottom: "20px", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700, color: "#888" }}>Best for: </span>{product.best}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "10px 20px 10px 10px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
            
          >
            <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={12} color="#fff" />
            </span>
            Get This Product
          </a>
          <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "10px 18px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")} onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
          >
            <WhatsAppIcon size={14} /> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────
const PrebuiltSolutions = () => {
  useSEO({
    title: "Pre-Built Solutions — Anni Web Solutions",
    description: "Ready-made websites, business applications and AI products customized for your industry — launch faster without starting from scratch." });

  const [tab, setTab] = useState<Tab>("websites");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const TAB_DATA = {
    websites: { label: "Pre-Built Websites", items: WEBSITES, tagline: "Professionally designed websites for your industry.", sublabel: "Ready-made websites. Customized for your business." },
    apps: { label: "Pre-Built Business Applications", items: APPS, tagline: "Ready-to-launch software for real business operations.", sublabel: "Start with a working business platform. Customize for your needs." },
    ai: { label: "Pre-Built AI Products", items: AI_PRODUCTS, tagline: "AI products built around real-world problems.", sublabel: "Ready-to-customize AI foundations for businesses and institutions." } };

  const current = TAB_DATA[tab];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "120px 20px 60px" }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px" }}>
            PRE-BUILT SOLUTIONS
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "16px" }}>
            Tailored to your needs.
          </h1>
          <p style={{ fontSize: "16px", color: "#777", lineHeight: 1.75, maxWidth: "560px", marginBottom: "48px" }}>
            Choose from professionally designed websites, business applications and AI products — customize the design, content, branding and integrations to match your business, then launch faster than starting from scratch.
          </p>
        </motion.div>

        {/* ── Tab filter — exact TexWeb style ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "inline-flex", alignItems: "center", background: "#f5f5f5", borderRadius: "999px", padding: "5px", gap: "4px", marginBottom: "64px" }}
        >
          {(["websites", "apps", "ai"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding: "10px 22px", borderRadius: "999px", border: "none", cursor: "pointer",
                fontSize: "16px", fontWeight: 600, transition: "all 0.2s",
                background: tab === t ? "#111" : "transparent",
                color: tab === t ? "#fff" : "#777",
                boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.15)" : "none" }}
            >
              {t === "websites" ? "Pre-Built Websites" : t === "apps" ? "Business Applications" : "AI Products"}
            </button>
          ))}
        </motion.div>

        {/* ── Section heading ── */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{ marginBottom: "16px" }}
          >
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>
              {current.label}
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", marginBottom: "8px" }}>
              {current.sublabel}
            </h2>
            <p style={{ fontSize: "16.5px", color: "#999", marginBottom: "0" }}>
              {current.tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Product cards ── */}
        <AnimatePresence mode="wait">
          <motion.div key={tab + "-list"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {(current.items as typeof WEBSITES).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <div style={{ marginTop: "48px", padding: "48px", borderRadius: "20px", background: "#0a0a0a", textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "14px" }}>
            NEED SOMETHING CUSTOM?
          </p>
          <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "12px" }}>
            Can't find exactly what you need?
          </h3>
          <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px" }}>
            Every pre-built solution can be customized — or we can build something entirely new around your specific requirements.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")} onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={13} color="#fff" />
              </span>
              Build Custom Solution
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <FAQSection
        faqs={PREBUILT_FAQ}
        title={"Frequently\nAsked\nQuestions"}
        subtitle="Everything you need to know about our pre-built solutions, customization, timelines and support."
      />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default PrebuiltSolutions;
