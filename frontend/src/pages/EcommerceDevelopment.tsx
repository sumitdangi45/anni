import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ShoppingCart, CreditCard, Settings, Plug, TrendingUp,
  Cpu, Globe, Package, Users, RefreshCw, BarChart2, Shield, Search,
  Smartphone, Zap, MessageCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

// ── FAQs ─────────────────────────────────────────────────────
const ECOM_FAQ = [
  { q: "Do you build custom e-commerce stores or use platforms like Shopify?", a: "We build fully custom e-commerce solutions tailored to your business — not generic templates. Custom gives you complete control over UX, checkout, integrations and business logic without platform limitations." },
  { q: "Do you support UPI and Indian payment methods?", a: "Yes. UPI is a core part of our e-commerce checkout implementations. We integrate Razorpay, PayU, Cashfree and other gateways supporting UPI, cards, wallets, netbanking and EMI." },
  { q: "How do you reduce cart abandonment?", a: "Through checkout optimization — guest checkout options, fewer form fields, transparent pricing (shipping and taxes shown early), address autocomplete, multiple payment methods and abandoned cart recovery flows." },
  { q: "Can you build a multi-vendor marketplace?", a: "Yes. We build marketplace platforms with separate seller and buyer flows, vendor onboarding, product listing management, order routing, commissions and admin controls." },
  { q: "Do you integrate with shipping and logistics providers?", a: "Yes. We integrate with Shiprocket, Delhivery, Bluedart, and other logistics APIs for rate calculation, order tracking, label generation and automated fulfilment workflows." },
  { q: "Can you add AI features to the store?", a: "Yes. We integrate AI-powered product recommendations, intelligent search, conversational shopping assistants and personalization where they create real value for your store's conversion." },
  { q: "Do you support ONDC integration?", a: "Yes. We provide ONDC seller onboarding support, product catalogue integration and order/logistics workflow setup for businesses wanting to participate in the ONDC network." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your products, customers, business model and operational needs — and propose the right e-commerce system for your goals." },
];

// ── USP ──────────────────────────────────────────────────────
const USP = [
  { icon: <TrendingUp size={22} strokeWidth={1.5} />, title: "Conversion Focused", desc: "The goal isn't traffic — it's helping qualified visitors complete purchases. Checkout and UX built around real behavior." },
  { icon: <Smartphone size={22} strokeWidth={1.5} />, title: "Mobile First", desc: "Shopping experiences designed for how people actually shop — on their phones. Not a desktop site made smaller." },
  { icon: <CreditCard size={22} strokeWidth={1.5} />, title: "India Ready", desc: "UPI, WhatsApp, local logistics and India-specific payment integrations built in from day one." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "Recommendations, intelligent search and conversational commerce can be added where they genuinely improve sales." },
];

// ── Services ──────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Custom E-commerce Stores",
    subtitle: "Build a storefront around your brand, products and customers.",
    desc: "We create custom shopping experiences instead of forcing your business into a generic template — with full control over UX, performance and brand.",
    points: [
      "Custom storefront and product experience design.",
      "Product categories, collections and rich detail pages.",
      "Search, filters and intelligent product discovery.",
      "Responsive mobile-first shopping experience.",
      "SEO-friendly product and category architecture.",
      "Performance-optimized storefront for fast loading.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "Shopping Cart & Checkout Optimization",
    subtitle: "Remove friction between Add to Cart and Order Placed.",
    desc: "Checkout directly affects revenue. We optimize every step of the purchase flow to reduce abandonment and increase completed orders.",
    points: [
      "Optimized cart, order summary and quantity management.",
      "Guest and account-based checkout options.",
      "Address autocomplete and streamlined form design.",
      "Transparent pricing — shipping, taxes and total shown early.",
      "Multiple payment methods including UPI, cards and wallets.",
      "Order confirmation and abandoned-cart recovery flows.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Payments & Order Management",
    subtitle: "Make transactions and order operations simple.",
    desc: "We connect your store with payment and fulfilment systems so customers can pay easily and your team can manage orders efficiently.",
    points: [
      "UPI integration — the primary payment method in India.",
      "Cards, wallets, netbanking, EMI and BNPL support.",
      "Payment gateway integration (Razorpay, PayU, Cashfree).",
      "Order creation, status management and tracking.",
      "Refund, cancellation and return workflows.",
      "Automated order notifications via email and WhatsApp.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "Store Management & Operations",
    subtitle: "Give your team complete control over the store.",
    desc: "An e-commerce website is only useful if managing it is easy. We build admin systems designed around how your team actually operates.",
    points: [
      "Product and category creation, editing and management.",
      "Inventory tracking and low-stock alerting.",
      "Order and customer management dashboard.",
      "Coupons, discounts and promotional campaign tools.",
      "Shipping, delivery zones and fulfilment management.",
      "Business reports, sales analytics and insights.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    title: "E-commerce Integrations",
    subtitle: "Connect your store to the systems your business already uses.",
    desc: "Modern e-commerce rarely works as a standalone website. We integrate your store with the platforms, services and tools that power your operations.",
    points: [
      "CRM and customer-management integrations.",
      "Shipping and logistics APIs (Shiprocket, Delhivery, etc.).",
      "Accounting and invoicing system integrations.",
      "WhatsApp Business API for order notifications and support.",
      "Email marketing and communication platform integrations.",
      "Analytics and marketing platform connections.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    title: "Conversion & Personalization",
    subtitle: "Turn more visitors into customers.",
    desc: "Traffic alone doesn't create revenue. We optimize the shopping experience around discovery, trust and purchase decisions.",
    points: [
      "Conversion-focused product page design and content.",
      "AI-powered personalized product recommendations.",
      "Related products, cross-selling and upselling flows.",
      "Search and product-discovery optimization.",
      "Abandoned-cart recovery via email and WhatsApp.",
      "Analytics-driven conversion testing and improvement.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    title: "AI-Powered Commerce",
    subtitle: "Make your store smarter with AI.",
    desc: "Intelligent features that improve product discovery, customer support and personalized shopping — connecting with our AI/ML and chatbot capabilities.",
    points: [
      "AI-powered product recommendation engine.",
      "Intelligent semantic product search.",
      "Conversational shopping assistant and chatbot.",
      "AI customer support integration.",
      "Personalized product discovery flows.",
      "AI-powered product description and content assistance.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    title: "ONDC & Multi-Channel Commerce",
    subtitle: "Expand beyond your own storefront.",
    desc: "Sell through multiple channels — your own store, ONDC network and other marketplaces — with unified inventory and order management.",
    points: [
      "ONDC seller onboarding and network integration.",
      "Product catalogue setup for ONDC.",
      "Order and transaction workflow integration.",
      "Logistics and fulfilment integration.",
      "Multi-channel inventory synchronization.",
      "Buyer/seller application development on ONDC.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0a1a0a 0%,#152015 100%)",
    dark: true },
];

// ── What we build ─────────────────────────────────────────────
const WHAT_WE_BUILD = [
  { icon: <Package size={20} />, title: "D2C Stores", desc: "Direct-to-consumer brands and online storefronts." },
  { icon: <ShoppingCart size={20} />, title: "B2C E-commerce", desc: "Customer-facing stores with products, payments and fulfilment." },
  { icon: <Users size={20} />, title: "B2B E-commerce", desc: "Business ordering, customer accounts and bulk purchasing." },
  { icon: <Globe size={20} />, title: "Marketplace Platforms", desc: "Multi-vendor commerce with sellers, buyers and administration." },
  { icon: <RefreshCw size={20} />, title: "Subscription Commerce", desc: "Recurring products, plans and subscription billing." },
  { icon: <BarChart2 size={20} />, title: "Multi-Channel Commerce", desc: "Own website + marketplaces + ONDC + other sales channels." },
];

// ── Core features grid ────────────────────────────────────────
const FEATURE_GROUPS = [
  { label: "Product Discovery", items: ["Search", "Filters", "Categories", "Collections"] },
  { label: "Shopping", items: ["Product Pages", "Cart", "Wishlist", "Recommendations"] },
  { label: "Checkout", items: ["Guest Checkout", "Address", "Shipping", "Taxes", "Payment"] },
  { label: "Payments", items: ["UPI", "Cards", "Wallets", "Gateways"] },
  { label: "Operations", items: ["Inventory", "Orders", "Customers", "Shipping"] },
  { label: "Growth", items: ["Analytics", "SEO", "Promotions", "Abandoned Cart"] },
  { label: "Communication", items: ["Email", "WhatsApp", "Notifications"] },
  { label: "AI", items: ["Recommendations", "Search", "Chatbots", "Personalization"] },
];

// ── Mobile-first checklist ────────────────────────────────────
const MOBILE_ITEMS = [
  { icon: <Search size={16} />, title: "Fast product discovery", desc: "Users find the right product without unnecessary navigation." },
  { icon: <Smartphone size={16} />, title: "Touch-friendly interactions", desc: "Buttons, filters, forms designed for small screens." },
  { icon: <ShoppingCart size={16} />, title: "Simple checkout", desc: "Fewer unnecessary fields and steps to purchase." },
  { icon: <CreditCard size={16} />, title: "Clear pricing", desc: "Shipping, taxes and totals visible before payment." },
  { icon: <Zap size={16} />, title: "Flexible payment", desc: "UPI, cards and wallets relevant to your customers." },
  { icon: <Package size={16} />, title: "Easy order tracking", desc: "Customers understand what happens after purchase." },
];

// ── Process ───────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your products, customers, business model and fulfilment process." },
  { num: "02", title: "Plan", desc: "Define catalogue structure, user journeys, integrations and commerce workflows." },
  { num: "03", title: "Design", desc: "Create product pages, shopping flows, cart and checkout experience." },
  { num: "04", title: "Develop", desc: "Build storefront, backend, admin panel, payments and integrations." },
  { num: "05", title: "Test", desc: "Test mobile UX, checkout flows, payments, orders and performance." },
  { num: "06", title: "Launch & Grow", desc: "Deploy the store, monitor behaviour and continuously improve conversion." },
];

// ── Mock image ────────────────────────────────────────────────
const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minHeight: "260px" }}>
    <div style={{ width: "55%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
    <div style={{ width: "75%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "8px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: "40px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />)}
    </div>
  </div>
);

// ── Service row ───────────────────────────────────────────────
const ServiceRow = ({ s, i }: { s: typeof SERVICES[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = s.img === "left";
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
      style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi+1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} /> Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────
const EcommerceDevelopment = () => {
  useSEO({
    title: "E-commerce Development — Anni Web Solutions",
    description: "Custom e-commerce development — storefront, checkout optimization, UPI payments, inventory, AI recommendations, ONDC integration and conversion-focused commerce systems." });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null); const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const featRef = useRef(null); const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const mobileRef = useRef(null); const mobileInView = useInView(mobileRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>E-COMMERCE DEVELOPMENT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Build an online store designed
              <br />to sell and scale.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We design and develop high-performance e-commerce experiences that make it easy for customers to discover products, checkout securely and stay connected with your brand — while giving your team the tools to manage products, orders, customers and growth.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top E-commerce Development" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#6b7eff", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />
      <SelectedWorkSection label="SELECTED E-COMMERCE WORK" heading="Commerce systems built to convert and scale." />

      {/* What we build */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE BUILD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From a simple online store to a complete commerce platform.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_BUILD.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our E-commerce Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our E-commerce Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Core features — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={featRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>CORE E-COMMERCE FEATURES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Everything your store needs to operate.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {FEATURE_GROUPS.map((group, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "22px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{group.label}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map(item => (
                    <span key={item} style={{ fontSize: "16.5px", padding: "3px 8px", borderRadius: "999px", background: "hsl(0,0%,15%)", color: "rgba(255,255,255,0.78)", border: "1px solid hsl(0,0%,18%)" }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile first */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={mobileRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={mobileInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>MOBILE-FIRST E-COMMERCE</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={mobileInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Designed for how people actually shop.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={mobileInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontSize: "16px", color: "#888", marginTop: "12px", maxWidth: "560px", margin: "12px auto 0" }}>
              Baymard's 2026 mobile benchmark found 75% of e-commerce sites had mediocre mobile UX, despite mobile accounting for the majority of visits.
            </motion.p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {MOBILE_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={mobileInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR E-COMMERCE PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From product catalogue to completed order.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#f8f8f8", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>READY TO SELL ONLINE?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's build an e-commerce experience
            <br />that converts.
          </h2>
          <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "32px" }}>
            From your first product catalogue to payments, fulfilment, analytics and AI-powered shopping experiences — we'll build the technology your commerce business needs to grow.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")} onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Start a Project
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={ECOM_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our e-commerce development services, payments, integrations and commerce capabilities." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default EcommerceDevelopment;
