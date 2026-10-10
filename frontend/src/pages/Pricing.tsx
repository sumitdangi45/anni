import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import WhyAnniSection from "@/components/WhyAnniSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useSEO } from "@/hooks/useSEO";

type Billing = "monthly" | "yearly";
type Currency = "inr" | "usd";

// ── Plan data ──────────────────────────────────────────────────
const PLANS = {
  monthly: {
    inr: [
      {
        id: "basic",
        name: "Basic Plan",
        label: "DIGITAL PRESENCE + BASIC MANAGEMENT",
        price: "₹999",
        per: "/month",
        billing: "Billed monthly",
        desc: "Best for small businesses & individual professionals who want to establish a credible online presence without upfront costs.",
        highlight: false,
        dot: "linear-gradient(135deg,#a0aec0,#718096)",
        features: [
          { text: "Custom Branded Website", note: "Speed & Mobile-optimized" },
          { text: "Domain & Cloud Hosting Included", note: "Active with monthly" },
          { text: "Online Appointment / Inquiry Booking System" },
          { text: "Interactive Calendar", note: "for viewing schedules" },
          { text: "Customer / Patient Database", note: "& Records" },
          { text: "Service & Order History Management" },
          { text: "Basic Digital Invoicing", note: "& Reports" },
          { text: "Owner Admin Dashboard", note: "Phone & Laptop" },
          { text: "Direct WhatsApp Chat Integration" },
          { text: "Ongoing Maintenance, Backups & Security" },
        ],
        cta: "Start Basic at ₹999/mo",
        ctaHref: "https://wa.me/917974135629",
      },
      {
        id: "standard",
        name: "Standard Plan",
        label: "DIGITAL + AUTOMATION + OPERATIONS",
        price: "₹2,499",
        per: "/month",
        billing: "Billed monthly",
        desc: "Best for growing businesses, clinics & institutes that want to automate everyday operations, reduce no-shows, and accept online payments.",
        highlight: true,
        badge: "⚡ MOST POPULAR",
        dot: "linear-gradient(135deg,#f97316,#ef4444)",
        features: [
          { text: "Everything in Basic Plan, plus:" },
          { text: "24/7 Automated Online Slot Booking", note: "Prevents overlaps" },
          { text: "Custom Workflow & Assessment Records", note: "Tailored forms" },
          { text: "Service & Project Progress Tracking", note: "for clients" },
          { text: "Payment Gateway Integration", note: "UPI, Cards, NetBanking" },
          { text: "WhatsApp Automation", note: "Instant booking & reminder alerts" },
          { text: "Automated Customer Follow-Up", note: "& Re-engagement" },
          { text: "Staff / Employee Management", note: "with role access control" },
          { text: "Revenue Reports & Business Analytics" },
          { text: "Google Business Profile (GMB) & Local SEO setup" },
          { text: "Priority Technical Support" },
        ],
        cta: "Get Standard at ₹2,499/mo",
        ctaHref: "https://wa.me/917974135629",
      },
    ],
    usd: [
      {
        id: "basic",
        name: "Basic Plan",
        label: "DIGITAL PRESENCE + BASIC MANAGEMENT",
        price: "$15",
        per: "/month",
        billing: "Billed monthly",
        desc: "Best for small businesses & individual professionals who want to establish a credible online presence.",
        highlight: false,
        dot: "linear-gradient(135deg,#a0aec0,#718096)",
        features: [
          { text: "Custom Branded Website", note: "Speed & Mobile-optimized" },
          { text: "Domain & Cloud Hosting Included" },
          { text: "Online Appointment / Inquiry Booking System" },
          { text: "Customer / Patient Database & Records" },
          { text: "Owner Admin Dashboard" },
          { text: "Ongoing Maintenance, Backups & Security" },
        ],
        cta: "Start Basic at $15/mo",
        ctaHref: "https://wa.me/917974135629",
      },
      {
        id: "standard",
        name: "Standard Plan",
        label: "DIGITAL + AUTOMATION + OPERATIONS",
        price: "$30",
        per: "/month",
        billing: "Billed monthly",
        desc: "For growing businesses wanting to automate daily operations and payments.",
        highlight: true,
        badge: "⚡ MOST POPULAR",
        dot: "linear-gradient(135deg,#f97316,#ef4444)",
        features: [
          { text: "Everything in Basic Plan, plus:" },
          { text: "24/7 Automated Online Slot Booking" },
          { text: "Payment Gateway Integration" },
          { text: "WhatsApp Automation" },
          { text: "Staff / Employee Management" },
          { text: "Google Business Profile & Local SEO" },
          { text: "Priority Technical Support" },
        ],
        cta: "Get Standard at $30/mo",
        ctaHref: "https://wa.me/917974135629",
      },
    ],
  },
  yearly: {
    inr: [
      {
        id: "basic",
        name: "Basic Plan",
        label: "DIGITAL PRESENCE + BASIC MANAGEMENT",
        price: "₹799",
        per: "/month",
        billing: "Billed yearly (2 months free)",
        desc: "Best for small businesses & individual professionals who want to establish a credible online presence without upfront costs.",
        highlight: false,
        dot: "linear-gradient(135deg,#a0aec0,#718096)",
        features: [
          { text: "Custom Branded Website", note: "Speed & Mobile-optimized" },
          { text: "Domain & Cloud Hosting Included" },
          { text: "Online Appointment / Inquiry Booking System" },
          { text: "Customer / Patient Database & Records" },
          { text: "Owner Admin Dashboard" },
          { text: "Ongoing Maintenance, Backups & Security" },
        ],
        cta: "Start Basic at ₹799/mo",
        ctaHref: "https://wa.me/917974135629",
      },
      {
        id: "standard",
        name: "Standard Plan",
        label: "DIGITAL + AUTOMATION + OPERATIONS",
        price: "₹1,999",
        per: "/month",
        billing: "Billed yearly (2 months free)",
        desc: "Best for growing businesses, clinics & institutes that want to automate everyday operations.",
        highlight: true,
        badge: "⚡ MOST POPULAR",
        dot: "linear-gradient(135deg,#f97316,#ef4444)",
        features: [
          { text: "Everything in Basic Plan, plus:" },
          { text: "24/7 Automated Online Slot Booking" },
          { text: "Payment Gateway Integration", note: "UPI, Cards" },
          { text: "WhatsApp Automation" },
          { text: "Staff Management with role access" },
          { text: "Google Business Profile & Local SEO" },
          { text: "Priority Technical Support" },
        ],
        cta: "Get Standard at ₹1,999/mo",
        ctaHref: "https://wa.me/917974135629",
      },
    ],
    usd: [
      {
        id: "basic",
        name: "Basic Plan",
        label: "DIGITAL PRESENCE + BASIC MANAGEMENT",
        price: "$12",
        per: "/month",
        billing: "Billed yearly (2 months free)",
        desc: "Best for small businesses who want a credible online presence.",
        highlight: false,
        dot: "linear-gradient(135deg,#a0aec0,#718096)",
        features: [
          { text: "Custom Branded Website" },
          { text: "Domain & Cloud Hosting Included" },
          { text: "Online Booking System" },
          { text: "Admin Dashboard" },
          { text: "Maintenance & Security" },
        ],
        cta: "Start Basic at $12/mo",
        ctaHref: "https://wa.me/917974135629",
      },
      {
        id: "standard",
        name: "Standard Plan",
        label: "DIGITAL + AUTOMATION + OPERATIONS",
        price: "$24",
        per: "/month",
        billing: "Billed yearly (2 months free)",
        desc: "For growing businesses wanting automation and operations tools.",
        highlight: true,
        badge: "⚡ MOST POPULAR",
        dot: "linear-gradient(135deg,#f97316,#ef4444)",
        features: [
          { text: "Everything in Basic, plus:" },
          { text: "24/7 Automated Booking" },
          { text: "Payment Gateway" },
          { text: "WhatsApp Automation" },
          { text: "Staff Management" },
          { text: "SEO Setup" },
        ],
        cta: "Get Standard at $24/mo",
        ctaHref: "https://wa.me/917974135629",
      },
    ],
  },
};

const CUSTOM_SERVICES_INR = [
  "Custom Web App", "Mobile App", "AI / ML Solutions", "SaaS Development",
  "AI Automation", "UI/UX Design", "Branding", "Digital Growth",
];

const PREMIUM_FEATURES_INR = [
  { text: "Everything in Standard Plan, plus:" },
  { text: "24/7 Smart AI Chatbot & Agent", note: "Answers queries & captures leads" },
  { text: "Google Review Automation", note: "Auto WhatsApp requests to boost 5-star rating" },
  { text: "Advanced WhatsApp Marketing Funnels", note: "Drip campaigns & broadcasts" },
  { text: "Multi-Branch & Multi-Staff Management", note: "Single centralized dashboard" },
  { text: "Advanced SEO + AEO", note: "AI Engine Optimization for ChatGPT/Perplexity" },
  { text: "Custom Business Workflows", note: "& Third-party API Integrations" },
  { text: "Advanced Profit & Retention Analytics Dashboards" },
  { text: "VIP Dedicated Account Manager", note: "& Priority SLA" },
];

// ── Feature row ────────────────────────────────────────────────
const Feat = ({ text, note, highlight }: { text: string; note?: string; highlight: boolean }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
    <Check size={14} color={highlight ? "#ef4444" : "#6b7eff"} style={{ marginTop: "2px", flexShrink: 0 }} />
    <span style={{ fontSize: "16.5px", color: "#444", lineHeight: 1.55 }}>
      {text}{note && <span style={{ color: "#888" }}> {note}</span>}
    </span>
  </div>
);

const Pricing = () => {
  useSEO({
    title: "Pricing — Anni Web Solutions",
    description: "Simple, transparent pricing for web development, AI solutions and digital growth. Monthly and yearly plans available.",
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [billing, setBilling] = useState<Billing>("monthly");
  const [currency, setCurrency] = useState<Currency>("inr");

  const plans = PLANS[billing][currency];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "120px 20px 80px" }} ref={ref}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px" }}
            >
              PRICING
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}
            >
              Simple pricing.
              <br />
              Serious results.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: "16px", color: "#777", lineHeight: 1.75, maxWidth: "300px" }}
          >
            Choose a <span style={{ color: "#6b7eff", fontWeight: 600 }}>subscription</span> for ongoing work, or scope a <span style={{ color: "#6b7eff", fontWeight: 600 }}>custom project</span> with us.
          </motion.p>
        </div>

        {/* ── Billing + Currency toggles ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}
        >
          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: "#f5f5f5", borderRadius: "999px", padding: "5px", gap: "2px" }}>
            {([
              { key: "monthly", label: "Monthly Billing" },
              { key: "yearly", label: "Annual Billing", badge: "2 MOS FREE" },
            ] as { key: Billing; label: string; badge?: string }[]).map(({ key, label, badge }) => (
              <button key={key} onClick={() => setBilling(key)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px",
                  borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 600,
                  background: billing === key ? "#fff" : "transparent",
                  color: billing === key ? "#111" : "#888",
                  boxShadow: billing === key ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {label}
                {badge && <span style={{ fontSize: "9.5px", fontWeight: 700, padding: "2px 7px", borderRadius: "999px", background: billing === key ? "#111" : "#ddd", color: billing === key ? "#fff" : "#666" }}>{badge}</span>}
              </button>
            ))}
          </div>

          {/* Currency toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: "#f5f5f5", borderRadius: "999px", padding: "5px", gap: "2px" }}>
            {([
              { key: "inr", label: "IN INR (₹)" },
              { key: "usd", label: "US USD ($)" },
            ] as { key: Currency; label: string }[]).map(({ key, label }) => (
              <button key={key} onClick={() => setCurrency(key)}
                style={{
                  padding: "8px 16px", borderRadius: "999px", border: "none", cursor: "pointer",
                  fontSize: "16.5px", fontWeight: 700,
                  background: currency === key ? "#111" : "transparent",
                  color: currency === key ? "#fff" : "#888",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${billing}-${currency}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", alignItems: "start" }}
          >
            {/* Plan cards */}
            {plans.map((plan) => (
              <div key={plan.id}
                style={{
                  borderRadius: "20px",
                  border: plan.highlight ? "2px solid #ef4444" : "1.5px solid #ebebeb",
                  background: "#fff", padding: "32px",
                  position: "relative", overflow: "hidden",
                }}
              >
                {plan.highlight && "badge" in plan && (
                  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#f97316,#ef4444)", color: "#fff", fontSize: "16px", fontWeight: 700, padding: "5px 16px", borderRadius: "0 0 10px 10px", letterSpacing: "0.08em" }}>
                    {(plan as typeof plan & { badge: string }).badge}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", marginTop: plan.highlight ? "16px" : "0" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", color: plan.highlight ? "#ef4444" : "#6b7eff", textTransform: "uppercase" }}>{plan.label}</span>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: plan.dot, flexShrink: 0 }} />
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111", marginBottom: "6px" }}>{plan.name}</h3>
                <p style={{ fontSize: "16.5px", color: "#999", marginBottom: "6px" }}>{plan.billing}</p>
                <p style={{ fontSize: "16.5px", color: "#777", lineHeight: 1.6, marginBottom: "20px" }}>{plan.desc}</p>

                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "#111", letterSpacing: "-0.04em" }}>{plan.price}</span>
                  <span style={{ fontSize: "16px", color: "#aaa", marginLeft: "4px" }}>{plan.per}</span>
                </div>

                <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: plan.highlight ? "#111" : "#f5f5f5",
                    color: plan.highlight ? "#fff" : "#111",
                    borderRadius: "12px", padding: "13px 16px",
                    fontSize: "16px", fontWeight: 700, textDecoration: "none",
                    marginBottom: "28px", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = plan.highlight ? "#333" : "#e8e8e8")}
                  onMouseLeave={e => (e.currentTarget.style.background = plan.highlight ? "#111" : "#f5f5f5")}
                >
                  <WhatsAppIcon size={14} />
                  {plan.cta}
                </a>

                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {plan.features.map((f, i) => (
                    <Feat key={i} text={f.text} note={"note" in f ? f.note : undefined} highlight={plan.highlight} />
                  ))}
                </div>
              </div>
            ))}

            {/* Premium / Custom card — dark */}
            <div style={{ borderRadius: "20px", background: "#0d0d0d", padding: "32px", gridColumn: "3", gridRow: "1" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", color: "#f59e0b", textTransform: "uppercase" }}>PREMIUM PLAN</span>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)" }} />
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>Premium Plan</h3>
              <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.65)", marginBottom: "6px" }}>
                {billing === "monthly" ? "Billed monthly" : "Billed yearly (2 months free)"}
              </p>
              <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: "20px" }}>
                Complete enterprise-grade solution with 24/7 AI Chatbot, review automations, and multi-location management.
              </p>

              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>
                  {currency === "inr" ? (billing === "yearly" ? "₹6,999" : "₹8,499") : (billing === "yearly" ? "$100" : "$120")}
                </span>
                <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", marginLeft: "4px" }}>/month</span>
              </div>

              <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(255,255,255,0.1)", color: "#fff",
                  borderRadius: "12px", padding: "13px 16px",
                  fontSize: "16px", fontWeight: 700, textDecoration: "none",
                  marginBottom: "24px", transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <WhatsAppIcon size={14} />
                  Start Premium
                </span>
                <ArrowRight size={14} />
              </a>

              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {PREMIUM_FEATURES_INR.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <Check size={14} color="#f59e0b" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>
                      {f.text}{f.note && <span style={{ color: "rgba(255,255,255,0.65)" }}> {f.note}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Custom project note ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: "40px", padding: "24px 32px", borderRadius: "16px", background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}
        >
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Need a custom enterprise solution?</p>
            <p style={{ fontSize: "16px", color: "#888" }}>We also build fully custom platforms — web apps, SaaS, AI/ML solutions and mobile apps with dedicated project scoping.</p>
          </div>
          <a href="/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "12px", padding: "12px 22px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none", flexShrink: 0 }} className="btn-fill btn-fill-dark"
          >
            <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={13} color="#fff" />
            </span>
            Book a Discovery Call
          </a>
        </motion.div>

      </div>

      <LogoMarquee />

      {/* ── Workflow Steps ── */}
      <div style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 14px", borderRadius: "999px", background: "#fff0f0", border: "1px solid #fecaca", fontSize: "16px", fontWeight: 700, color: "#ef4444", marginBottom: "16px" }}>
              Workflow System
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", marginBottom: "12px" }}>
              How Your Automated Workflow Runs
            </h2>
            <p style={{ fontSize: "16.5px", color: "#888", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              From first discovery to 5-star Google review, every touchpoint is seamless and automated.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { step: "01", icon: "🌐", title: "Discovery", desc: "Customers find you on Google, Social Media, or Referral" },
              { step: "02", icon: "🖥️", title: "Modern Website", desc: "High-converting, fast & mobile-friendly branded website" },
              { step: "03", icon: "📅", title: "Easy Booking", desc: "Clients book appointments or send service requests online" },
              { step: "04", icon: "👥", title: "Client Database", desc: "Centralized profiles, history, and records management" },
              { step: "05", icon: "📈", title: "Service Delivery", desc: "Track progress, sessions, treatments, or projects" },
              { step: "06", icon: "💳", title: "Instant Invoicing", desc: "Collect payments via UPI, Cards, NetBanking with ease" },
              { step: "07", icon: "🔔", title: "Automated Alerts", desc: "Instant WhatsApp confirmations & reminders to stop no-shows" },
              { step: "08", icon: "⭐", title: "Review & Retention", desc: "Automated 5-star Google review requests & re-engagement" },
            ].map((s) => (
              <div key={s.step} style={{ background: "#f8f8f8", borderRadius: "16px", padding: "20px 16px", border: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{s.icon}</span>
                </div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", marginBottom: "6px" }}>STEP {s.step}</p>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{s.title}</p>
                <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature Comparison Table ── */}
      <div style={{ background: "#fff", padding: "0 20px 80px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ border: "1.5px solid #ebebeb", borderRadius: "20px", overflow: "hidden" }}>
            {/* header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #ebebeb" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111", marginBottom: "4px" }}>Detailed Feature Comparison Matrix</h3>
              <p style={{ fontSize: "16.5px", color: "#aaa" }}>Compare Basic (₹999), Standard (₹2,499), and Premium (₹8,499) side-by-side</p>
            </div>

            {/* table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    <th style={{ padding: "14px 32px", textAlign: "left", fontSize: "16px", fontWeight: 700, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", width: "45%" }}>
                      FEATURE & CAPABILITIES
                    </th>
                    {[
                      { label: "BASIC", sub: "₹999/MO", color: "#111" },
                      { label: "STANDARD", sub: "₹2,499/MO", color: "#ef4444" },
                      { label: "PREMIUM", sub: "₹8,499/MO", color: "#f59e0b" },
                    ].map(col => (
                      <th key={col.label} style={{ padding: "14px 20px", textAlign: "center", fontSize: "16px", fontWeight: 700, color: col.color, letterSpacing: "0.1em" }}>
                        {col.label}<br /><span style={{ fontSize: "16px", color: "#aaa", fontWeight: 500 }}>{col.sub}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Custom Responsive Website", true, true, true],
                    ["Free Domain & Cloud Hosting Included", true, true, true],
                    ["Online Appointment / Inquiry Booking", true, true, true],
                    ["WhatsApp Chat Integration", true, true, true],
                    ["Admin Dashboard (Phone & Laptop)", true, true, true],
                    ["Maintenance, Backups & Security", true, true, true],
                    ["Real-time Slot Booking (Prevents double bookings)", false, true, true],
                    ["Custom Business Records & Workflow Tracking", false, true, true],
                    ["Payment Gateway Integration (UPI / Cards / NetBanking)", false, true, true],
                    ["Instant Digital Billing & Invoicing Receipts", "Basic", "Automated", "Advanced"],
                    ["WhatsApp Automation (Booking, Reminders & Alerts)", false, true, true],
                    ["Customer Follow-Up & Re-engagement System", false, true, true],
                    ["Staff & Employee Management with Role Access", false, true, true],
                    ["Business Reports & Revenue Analytics", "Basic", "Advanced", "Full AI Insights"],
                    ["SEO & Google Business Profile (GMB) Optimization", false, true, "Advanced Local SEO"],
                    ["24/7 Smart AI Chatbot (Lead Capture & Instant Q&A)", false, false, true],
                    ["Google Reviews Automation (Boost 5-Star Ratings)", false, false, true],
                    ["Advanced WhatsApp Drip Campaigns & Funnels", false, false, true],
                    ["Multi-Branch & Multi-Location Management", false, false, true],
                    ["AEO (Answer Engine Optimization for ChatGPT/AI Search)", false, false, true],
                    ["Custom API & Third-party CRM/ERP Integrations", false, false, true],
                    ["Dedicated VIP Account Manager & Priority SLA", "Standard Support", "Priority Support", "VIP Dedicated"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "13px 32px", fontSize: "16px", color: "#444", fontWeight: 500 }}>{row[0] as string}</td>
                      {[row[1], row[2], row[3]].map((val, j) => (
                        <td key={j} style={{ padding: "13px 20px", textAlign: "center" }}>
                          {val === true ? (
                            <Check size={16} color={j === 1 ? "#ef4444" : j === 2 ? "#f59e0b" : "#6b7eff"} style={{ margin: "0 auto" }} />
                          ) : val === false ? (
                            <span style={{ color: "#ddd", fontSize: "16px" }}>—</span>
                          ) : (
                            <span style={{ fontSize: "16.5px", fontWeight: 700, color: j === 1 ? "#ef4444" : j === 2 ? "#f59e0b" : "#6b7eff" }}>{val as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info cards + Dark CTA ── */}
      <div style={{ background: "#fff", padding: "0 20px 80px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Two info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Third party costs */}
            <div style={{ background: "#fff", border: "1.5px solid #ebebeb", borderRadius: "16px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "18px" }}>💳</span>
                <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#111" }}>Third-Party / API Costs (Paid by Client)</h4>
              </div>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7, marginBottom: "14px" }}>
                To keep subscription costs minimal, external provider charges are billed directly as per actual usage:
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "7px", paddingLeft: 0, listStyle: "none" }}>
                {[
                  "WhatsApp API / Meta charges (official message templates)",
                  "Payment Gateway convenience/transaction charges (per txn)",
                  "SMS / OTP gateway charges (if applicable)",
                  "AI API tokens (OpenAI, Gemini, etc. for custom AI bot)",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "16.5px", color: "#666" }}>
                    <span style={{ color: "#ef4444", marginTop: "2px", flexShrink: 0 }}>●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Transparent terms */}
            <div style={{ background: "#fff", border: "1.5px solid #ebebeb", borderRadius: "16px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "18px" }}>🛡️</span>
                <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#111" }}>Transparent Pricing & Service Terms</h4>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: 0, listStyle: "none" }}>
                {[
                  "Monthly subscription must be paid 100% in advance for each billing month.",
                  "Zero lock-in period — you retain full ownership of your data and customer records.",
                  "All cloud hosting, security patches, backups, and maintenance remain active during subscription.",
                  "Custom feature expansions or unique workflow additions can be integrated anytime.",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "16.5px", color: "#666", lineHeight: 1.6 }}>
                    <Check size={14} color="#22c55e" style={{ marginTop: "2px", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dark CTA card */}
          <div style={{
            background: "linear-gradient(135deg, #1a0a0a 0%, #2a0a0a 50%, #0a0a0a 100%)",
            borderRadius: "20px", padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap",
          }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: "rgba(239,68,68,0.2)", color: "#ef4444", marginBottom: "14px" }}>
                🏗️ 100% Custom Business Architecture
              </span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
                Have specific requirements for your business?
              </h3>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "560px" }}>
                Every business is unique. Whether you need multi-branch operations, specific appointment slots, customized intake forms, or ERP integration — we tailor the entire system to match your daily workflow.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexShrink: 0, flexWrap: "wrap" }}>
              <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#22c55e", color: "#fff", borderRadius: "999px", padding: "12px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>
                <WhatsAppIcon size={15} /> Discuss on WhatsApp
              </a>
              <a href="tel:+917974135629"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>
                📞 Call: +91 79741 35629
              </a>
            </div>
          </div>

        </div>
      </div>
      <LogoMarquee />
      <WhyAnniSection />
      <FAQSection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Pricing;
