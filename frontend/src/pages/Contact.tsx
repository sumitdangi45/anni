import WhatsAppIcon from "@/components/WhatsAppIcon";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useSEO } from "@/hooks/useSEO";
import { apiFetch } from "@/lib/api";

type Tab = "project" | "subscription" | "call";

const SERVICES = [
  "AI Automation & Bots",
  "Web Development",
  "Mobile App",
  "Digital Marketing",
  "SaaS Development",
  "UI/UX Design",
  "AI/ML Solutions",
  "Custom Software",
];

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss",
];

const TIMELINES = [
  "ASAP",
  "1–2 weeks",
  "1 month",
  "2–3 months",
  "3–6 months",
  "Flexible",
];

const Contact = () => {
  useSEO({
    title: "Contact — Anni Web Solutions",
    description: "Tell us what you're building. We'll recommend the best way to work together." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tab, setTab] = useState<Tab>("project");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", subject: "", message: "", budget: "", timeline: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (s: string) =>
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: selectedServices.join(", "), type: tab }) });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const TABS: { key: Tab; label: string; desc: string }[] = [
    { key: "project", label: "Start a Project", desc: "For one-off or defined projects" },
    { key: "subscription", label: "Start a Subscription", desc: "Ongoing development partnership" },
    { key: "call", label: "Book a Call", desc: "Not sure which way to work with us?" },
  ];

  const CONTACT_CARDS = [
    { icon: <Mail size={18} />, label: "Email Us", value: "contact@anniwebsolutions.com", href: "mailto:contact@anniwebsolutions.com", bg: "#fef2f2", iconBg: "#ef4444" },
    { icon: <WhatsAppIcon size={18} />, label: "WhatsApp Support", value: "+91 79741 35629", href: "https://wa.me/917974135629", bg: "#f0fdf4", iconBg: "#22c55e", badge: "Chat Now" },
    { icon: <Phone size={18} />, label: "Calling Desk", value: "+91 79741 35629", href: "tel:+917974135629", bg: "#eff6ff", iconBg: "#3b82f6", badge: "Call Now" },
    { icon: <MapPin size={18} />, label: "HQ Office", value: "India — Serving clients worldwide", href: "#", bg: "#fafafa", iconBg: "#6b7eff", badge: "Headquarters" },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 20px 100px" }} ref={ref}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px" }}
          >
            CONTACT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "20px" }}
          >
            Tell us what you're building.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: "16px", color: "#777", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}
          >
            Whether you prefer email, instant WhatsApp chat, or submitting a detailed inquiry — we are ready to analyze your requirements and deliver tailored results.
          </motion.p>
        </div>

        {/* ── Main 2-col layout ── */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* LEFT — contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: "340px", flexShrink: 0 }}
          >
            <div style={{ marginBottom: "28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 14px", borderRadius: "999px", background: "#fff0f0", border: "1px solid #fecaca", fontSize: "16px", fontWeight: 700, color: "#ef4444", marginBottom: "16px" }}>
                Reach Out Directly
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "14px" }}>
                Connect directly<br />with our team
              </h2>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.75 }}>
                Whether you prefer email, instant WhatsApp chat, or submitting a detailed inquiry, we are ready to analyze your requirements and deliver tailored results.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {CONTACT_CARDS.map((card, i) => (
                <motion.a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px", borderRadius: "14px",
                    background: card.bg, border: "1px solid rgba(0,0,0,0.06)",
                    textDecoration: "none", transition: "box-shadow 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                    {card.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#111" }}>{card.label}</p>
                    <p style={{ fontSize: "16.5px", color: "#888", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.value}</p>
                  </div>
                  {card.badge && (
                    <span style={{ fontSize: "16px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "#111", color: "#fff", flexShrink: 0 }}>
                      {card.badge}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ flex: 1, minWidth: 0, background: "#fff", borderRadius: "24px", border: "1.5px solid #ebebeb", padding: "36px", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#f0fdf4", border: "2px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <ArrowRight size={24} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111", marginBottom: "10px" }}>Message Sent!</h3>
                <p style={{ fontSize: "16.5px", color: "#888" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "6px" }}>Send us a Message</h3>
                <p style={{ fontSize: "16px", color: "#aaa", marginBottom: "24px" }}>Fill in your requirements below and our team will get back to you with a personalized proposal.</p>

                {/* Tabs */}
                <div style={{ display: "flex", background: "#f5f5f5", borderRadius: "12px", padding: "4px", gap: "4px", marginBottom: "24px" }}>
                  {TABS.map(t => (
                    <button key={t.key} type="button" onClick={() => setTab(t.key)}
                      style={{
                        flex: 1, padding: "10px 8px", borderRadius: "9px", border: "none", cursor: "pointer",
                        background: tab === t.key ? "#fff" : "transparent",
                        boxShadow: tab === t.key ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                        transition: "all 0.2s" }}
                    >
                      <p style={{ fontSize: "16.5px", fontWeight: 700, color: tab === t.key ? "#111" : "#888", marginBottom: "2px" }}>{t.label}</p>
                      <p style={{ fontSize: "16px", color: tab === t.key ? "#666" : "#bbb" }}>{t.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Service tags */}
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", marginBottom: "10px" }}>What service are you looking for?</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {SERVICES.map(s => (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        style={{
                          fontSize: "16.5px", fontWeight: 600, padding: "6px 14px", borderRadius: "999px", cursor: "pointer", transition: "all 0.15s",
                          background: selectedServices.includes(s) ? "#111" : "#f5f5f5",
                          color: selectedServices.includes(s) ? "#fff" : "#555",
                          border: selectedServices.includes(s) ? "1.5px solid #111" : "1.5px solid #e8e8e8" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Rahul Sharma"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: "#111", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="name@company.com"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: "#111", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                    />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: "#111", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Subject</label>
                    <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. AI Automation & Web Development"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: "#111", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                    />
                  </div>
                </div>

                {/* Budget + Timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Budget Range</label>
                    <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: form.budget ? "#111" : "#aaa", outline: "none", boxSizing: "border-box", background: "#fafafa", cursor: "pointer" }}
                    >
                      <option value="">Select Budget Range</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Timeline</label>
                    <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: form.timeline ? "#111" : "#aaa", outline: "none", boxSizing: "border-box", background: "#fafafa", cursor: "pointer" }}
                    >
                      <option value="">Select Timeline</option>
                      {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "16.5px", fontWeight: 600, color: "#555", display: "block", marginBottom: "6px" }}>Message & Project Details *</label>
                  <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={4} placeholder="Tell us about your project goals, preferred timelines, or any specific requirements..."
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "16px", color: "#111", outline: "none", boxSizing: "border-box", background: "#fafafa", resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                {error && <p style={{ fontSize: "16.5px", color: "#ef4444", marginBottom: "12px" }}>{error}</p>}

                <button type="submit" disabled={submitting}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: submitting ? "#999" : "#111", color: "#fff",
                    borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: 700,
                    border: "none", cursor: submitting ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = "#333"; }}
                  onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = "#111"; }}
                >
                  {submitting ? "Sending..." : <>Send Message <ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Contact;
