import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Billing = "monthly" | "quarterly" | "yearly";

const PLANS = {
  monthly: [
    {
      name: "Basic",
      label: "DIGITAL PRESENCE",
      price: "₹999",
      per: "/month",
      desc: "For small businesses who want a credible online presence without upfront costs.",
      highlight: false,
      dot: "linear-gradient(135deg,#a0aec0,#718096)",
      features: [
        "Custom Branded Website (Fast & Mobile-optimized)",
        "Domain & Cloud Hosting Included",
        "Online Appointment / Inquiry Booking",
        "Customer / Patient Database & Records",
        "Owner Admin Dashboard (Phone & Laptop)",
        "Ongoing Maintenance, Backups & Security",
      ],
      cta: "Get Started" },
    {
      name: "Standard",
      label: "DIGITAL + AUTOMATION",
      price: "₹2,499",
      per: "/month",
      desc: "For growing businesses wanting to automate daily operations and payments.",
      highlight: true,
      dot: "linear-gradient(135deg,#f97316,#ef4444)",
      badge: "MOST POPULAR",
      features: [
        "Everything in Basic, plus:",
        "24/7 Automated Online Slot Booking",
        "Payment Gateway Integration (UPI, Cards)",
        "WhatsApp Automation (Instant alerts & reminders)",
        "Staff / Employee Management with roles",
        "Google Business Profile (GMB) & Local SEO",
        "Priority Technical Support",
      ],
      cta: "Join Today" },
  ],
  quarterly: [
    {
      name: "Basic",
      label: "DIGITAL PRESENCE",
      price: "₹899",
      per: "/month",
      desc: "For small businesses who want a credible online presence without upfront costs.",
      highlight: false,
      dot: "linear-gradient(135deg,#a0aec0,#718096)",
      features: [
        "Custom Branded Website (Fast & Mobile-optimized)",
        "Domain & Cloud Hosting Included",
        "Online Appointment / Inquiry Booking",
        "Customer / Patient Database & Records",
        "Owner Admin Dashboard (Phone & Laptop)",
        "Ongoing Maintenance, Backups & Security",
      ],
      cta: "Get Started" },
    {
      name: "Standard",
      label: "DIGITAL + AUTOMATION",
      price: "₹2,249",
      per: "/month",
      desc: "For growing businesses wanting to automate daily operations and payments.",
      highlight: true,
      dot: "linear-gradient(135deg,#f97316,#ef4444)",
      badge: "MOST POPULAR",
      features: [
        "Everything in Basic, plus:",
        "24/7 Automated Online Slot Booking",
        "Payment Gateway Integration (UPI, Cards)",
        "WhatsApp Automation (Instant alerts & reminders)",
        "Staff / Employee Management with roles",
        "Google Business Profile (GMB) & Local SEO",
        "Priority Technical Support",
      ],
      cta: "Join Today" },
  ],
  yearly: [
    {
      name: "Basic",
      label: "DIGITAL PRESENCE",
      price: "₹799",
      per: "/month",
      desc: "For small businesses who want a credible online presence without upfront costs.",
      highlight: false,
      dot: "linear-gradient(135deg,#a0aec0,#718096)",
      features: [
        "Custom Branded Website (Fast & Mobile-optimized)",
        "Domain & Cloud Hosting Included",
        "Online Appointment / Inquiry Booking",
        "Customer / Patient Database & Records",
        "Owner Admin Dashboard (Phone & Laptop)",
        "Ongoing Maintenance, Backups & Security",
      ],
      cta: "Get Started" },
    {
      name: "Standard",
      label: "DIGITAL + AUTOMATION",
      price: "₹1,999",
      per: "/month",
      desc: "For growing businesses wanting to automate daily operations and payments.",
      highlight: true,
      dot: "linear-gradient(135deg,#f97316,#ef4444)",
      badge: "MOST POPULAR",
      features: [
        "Everything in Basic, plus:",
        "24/7 Automated Online Slot Booking",
        "Payment Gateway Integration (UPI, Cards)",
        "WhatsApp Automation (Instant alerts & reminders)",
        "Staff / Employee Management with roles",
        "Google Business Profile (GMB) & Local SEO",
        "Priority Technical Support",
      ],
      cta: "Join Today" },
  ] };

const CUSTOM = {
  name: "Custom Project",
  price: "₹8,499",
  per: "starting from",
  desc: "Complete enterprise-grade solution with 24/7 AI Chatbot, review automations, and multi-location management.",
  services: ["Product Design", "Web Development", "Mobile App", "AI & ML", "SaaS Build", "Automation", "Branding", "Digital Growth"] };

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [billing, setBilling] = useState<Billing>("monthly");
  const isMobile = useIsMobile();

  const plans = PLANS[billing];

  return (
    <section id="pricing" style={{ background: "#fff", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>

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
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 3.8vw, 2.8rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em" }}
            >
              Simple pricing.
              <br />
              Serious results.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, maxWidth: "300px" }}
          >
            Choose a <span style={{ color: "#6b7eff", fontWeight: 600 }}>subscription</span> for ongoing work, or scope a custom project with us.
          </motion.p>
        </div>

        {/* ── Billing toggle — exact Beew style ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            display: "inline-flex", alignItems: "center",
            background: "#f5f5f5", borderRadius: "999px",
            padding: "5px", gap: "2px", marginBottom: "40px" }}
        >
          {([
            { key: "monthly", label: "Monthly" },
            { key: "quarterly", label: "Quarterly", badge: "-10%" },
            { key: "yearly", label: "Yearly", badge: "2 Months Free" },
          ] as { key: Billing; label: string; badge?: string }[]).map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => setBilling(key)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
                fontSize: "16px", fontWeight: 600,
                background: billing === key ? "#fff" : "transparent",
                color: billing === key ? "#111" : "#888",
                boxShadow: billing === key ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s" }}
            >
              {label}
              {badge && (
                <span style={{
                  fontSize: "16px", fontWeight: 700, padding: "2px 7px", borderRadius: "999px",
                  background: billing === key ? "#111" : "#ddd",
                  color: billing === key ? "#fff" : "#666" }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={billing}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "16px", alignItems: "stretch" }}
            className="pricing-grid"
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRadius: "20px",
                  border: plan.highlight ? "2px solid #ef4444" : "1.5px solid #ebebeb",
                  background: "#fff",
                  padding: "32px",
                  position: "relative",
                  overflow: "hidden" }}
              >
                {/* Most popular badge */}
                {plan.highlight && "badge" in plan && (
                  <div style={{
                    position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(90deg,#f97316,#ef4444)",
                    color: "#fff", fontSize: "16px", fontWeight: 700,
                    padding: "5px 16px", borderRadius: "0 0 10px 10px",
                    letterSpacing: "0.08em" }}>
                    ⚡ {(plan as typeof plan & { badge: string }).badge}
                  </div>
                )}

                {/* plan name + dot */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", marginTop: plan.highlight ? "16px" : "0" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", color: plan.highlight ? "#ef4444" : "#888", textTransform: "uppercase" }}>
                    {plan.label}
                  </span>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: plan.dot }} />
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "8px" }}>{plan.name}</h3>
                <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.6, marginBottom: "20px" }}>{plan.desc}</p>

                {/* price */}
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontSize: "2.6rem", fontWeight: 900, color: "#111", letterSpacing: "-0.04em" }}>{plan.price}</span>
                  <span style={{ fontSize: "16px", color: "#aaa", marginLeft: "4px" }}>{plan.per}</span>
                </div>

                {/* CTA */}
                <a
                  href="/contact"
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: plan.highlight ? "#111" : "#f5f5f5",
                    color: plan.highlight ? "#fff" : "#111",
                    borderRadius: "12px", padding: "13px 16px",
                    fontSize: "16px", fontWeight: 600, textDecoration: "none",
                    marginBottom: "28px", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = plan.highlight ? "#333" : "#ebebeb")}
                  onMouseLeave={e => (e.currentTarget.style.background = plan.highlight ? "#111" : "#f5f5f5")}
                >
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: plan.highlight ? "#333" : "#e0e0e0",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ArrowRight size={13} color={plan.highlight ? "#fff" : "#111"} />
                  </span>
                  {plan.cta}
                </a>

                {/* features */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <Check size={14} color={plan.highlight ? "#ef4444" : "#6b7eff"} style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontSize: "16.5px", color: i === 0 && f.includes("Everything") ? "#111" : "#666", fontWeight: i === 0 && f.includes("Everything") ? 700 : 400, lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Custom Project card — dark */}
            <div
              style={{
                borderRadius: "20px",
                background: "#0d0d0d",
                padding: "32px",
                gridColumn: "3",
                gridRow: "1" }}
            >
              {/* name + dot */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>{CUSTOM.name}</h3>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#e0e0e0,#888)" }} />
              </div>

              <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: "20px" }}>
                {CUSTOM.desc}
              </p>

              {/* price */}
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>{CUSTOM.price}</span>
                <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", marginLeft: "6px" }}>{CUSTOM.per}</span>
              </div>

              {/* CTA */}
              <a
                href="/contact"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(255,255,255,0.1)", color: "#fff",
                  borderRadius: "12px", padding: "13px 16px",
                  fontSize: "16px", fontWeight: 600, textDecoration: "none",
                  marginBottom: "28px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                Book a Project
                <ArrowRight size={15} />
              </a>

              {/* service tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {CUSTOM.services.map(s => (
                  <span key={s} style={{
                    fontSize: "16px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.78)" }}>{s}</span>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default PricingSection;
