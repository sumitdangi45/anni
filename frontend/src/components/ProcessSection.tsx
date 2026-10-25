import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, RotateCcw, CheckCircle2 } from "lucide-react";
import heroVideo from "@/assets/dd/freakytank_ssspin.io_1790748931.mp4";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── Card 1 — Start a Project ─────────────────────────────────
const Card1 = () => (
  <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "13px", color: "#aaa", fontWeight: 500, marginBottom: "8px" }}>01</p>
      <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", marginBottom: "10px" }}>
        Share Your Vision
      </h3>
      <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.65 }}>
        Tell us what you're building. We'll scope it, price it and put together the right <span style={{ color: "#6b7eff", fontWeight: 600 }}>team for your project</span>.
      </p>
    </div>

    {/* Plan card */}
    <div style={{ background: "#f8f8f8", borderRadius: "14px", padding: "18px 20px", marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Custom Project</span>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #4ade80, #22c55e)" }} />
      </div>
      <p style={{ fontSize: "14px", color: "#6b7eff", fontWeight: 500, marginBottom: "12px" }}>
        For startups and growing businesses that need a dedicated tech partner.
      </p>
      <div>
        <span style={{ fontSize: "2rem", fontWeight: 900, color: "#111", letterSpacing: "-0.04em" }}>₹8,499</span>
        <span style={{ fontSize: "14px", color: "#999", marginLeft: "4px" }}>starting from</span>
      </div>
    </div>

    {/* CTA */}
    <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "12px", padding: "13px 20px", fontSize: "15px", fontWeight: 600, textDecoration: "none", transition: "background 0.2s", marginTop: "auto" }} className="btn-fill btn-fill-dark"
      
    >
      View Pricing <ArrowRight size={14} />
    </a>
  </div>
);

// ── Card 2 — Requests / Queue ────────────────────────────────
const QUEUE = [
  { status: "In Review",   label: "AI Chatbot Development",     color: "#f59e0b", iconType: "clock" },
  { status: "In Progress", label: "SaaS Dashboard — Web App",   color: "#6b7eff", iconType: "rotate" },
  { status: "Queued",      label: "Mobile App MVP",             color: "#ccc",    iconType: "" },
  { status: "Queued",      label: "SEO & Growth Strategy",      color: "#ccc",    iconType: "" },
  { status: "Completed",   label: "Brand Identity & Logo",      color: "#4ade80", iconType: "check" },
  { status: "Completed",   label: "E-Commerce Platform",        color: "#4ade80", iconType: "check" },
];

const Card2 = () => (
  <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
    <p style={{ fontSize: "13px", color: "#aaa", fontWeight: 500, marginBottom: "8px" }}>02</p>
    <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", marginBottom: "10px" }}>We Get to Work</h3>
    <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.65, marginBottom: "20px" }}>
      Your project goes into our <span style={{ color: "#6b7eff", fontWeight: 600 }}>active queue</span>. We ship in sprints and keep you updated throughout.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
      {QUEUE.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", background: i === 0 ? "#fff9f0" : i === 1 ? "#f5f5ff" : "transparent" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: item.color, minWidth: "80px" }}>
            {item.iconType === "clock"  && <Clock size={11} />}
            {item.iconType === "rotate" && <RotateCcw size={11} />}
            {item.iconType === "check"  && <CheckCircle2 size={11} />}
            {item.status}
          </span>
          <span style={{ fontSize: "13px", color: i < 2 ? "#111" : "#999", fontWeight: i < 2 ? 500 : 400, flex: 1 }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ── Card 3 — Deliver & Grow (video bg) ───────────────────────
const Card3 = () => (
  <div style={{ borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0, position: "relative", overflow: "hidden", background: "#0d0d0d", minHeight: "420px" }}>

    {/* video background */}
    <video
      src={heroVideo}
      autoPlay loop muted playsInline
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 1 }}
    />

    {/* light overlay — sirf bottom par text readable ho */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />

    {/* glow orb */}
    <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(160,100,255,0.4) 0%, transparent 70%)", pointerEvents: "none" }} />

    <div style={{ position: "relative", zIndex: 1, padding: "32px 32px 0" }}>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500, marginBottom: "8px" }}>03</p>
      <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "12px", lineHeight: 1.15 }}>
        Deliver &<br />Keep Growing
      </h3>
      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
        We launch, hand over the code and stay on as your long-term tech partner — for updates, scaling and whatever comes next.
      </p>
    </div>

    <a href="/contact" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: "14px", padding: "14px 18px", fontSize: "15px", fontWeight: 600, textDecoration: "none", transition: "background 0.2s", margin: "32px 32px 32px" }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
    >
      Start Your Project
      <ArrowRight size={15} />
    </a>
  </div>
);

// ── Main section ─────────────────────────────────────────────
const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "hsl(0,0%,6%)", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "16px" }}
            >
              HOW OUR PROCESS WORKS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em" }}
            >
              Three steps from idea<br />to live product.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: "280px", textAlign: "right" }}
          >
            No bloated teams. No long onboarding.
            <br />
            Just fast, quality delivery from day one.
          </motion.p>
        </div>

        {/* 3 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: "flex", gap: "16px", alignItems: "stretch", flexDirection: isMobile ? "column" : "row" }}
          className="process-cards"
        >
          <Card1 />
          <Card2 />
          <Card3 />
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;
