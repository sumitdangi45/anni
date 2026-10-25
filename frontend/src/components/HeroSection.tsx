import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";
import heroTeam from "@/assets/hero1.png";
import aiVideo from "@/assets/makemoneyalways2_ssspin.io_1790702019.mp4";
import heroVideo from "@/assets/TrimEdit_ssspin.io_1790702904.mp4";
import batchImg from "@/assets/batch.png";
import { useIsMobile } from "@/hooks/useIsMobile";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as const } }) };

// doubled for seamless marquee
const LOGOS_BASE = [
  { name: "screenloop" },
  { name: "uptech" },
  { name: "5U AI" },
  { name: "polygon" },
  { name: "housr" },
  { name: "efficense" },
];
const LOGOS = [...LOGOS_BASE, ...LOGOS_BASE];

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-wrap {
          overflow: hidden;
          width: 100%;
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee-scroll 22s linear infinite;
          will-change: transform;
        }
        .marquee-wrap:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="home"
        className="w-full flex items-start justify-center"
        style={{
          minHeight: "100vh",
          paddingTop: "96px",
          paddingBottom: "0px",
          paddingLeft: "20px",
          paddingRight: "20px",
          background: "hsl(0,0%,8%)" }}
      >
        <div className="w-full flex flex-col lg:flex-row gap-3" style={{ maxWidth: "1320px" }}>

          {/* ══════════════ LEFT CARD ══════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex flex-col overflow-hidden rounded-2xl hero-left-card"
            style={{ flex: "1 1 0", minHeight: isMobile ? "480px" : "640px" }}
          >
            {/* background video */}
            <video
              src={heroVideo}
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* overlay: top transparent → bottom almost-white so text is dark & readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(247,247,245,0.98) 0%, rgba(247,247,245,0.82) 30%, rgba(247,247,245,0.3) 58%, transparent 100%)" }}
            />

            <div className="relative z-10 flex flex-col h-full hero-left-inner" style={{ padding: isMobile ? "24px 20px" : "40px 44px 32px" }}>

              {/* ── label ── */}
              <motion.p
                custom={0} initial="hidden" animate="visible" variants={FADE_UP}
                style={{
                  color: "#555",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "26px" }}
              >
                FULL-SERVICE TECH PARTNER FOR AMBITIOUS STARTUPS
              </motion.p>

              {/* ── headline — exact Beew: first 2 words bold black, rest normal weight colored ── */}
              <motion.h1
                custom={1} initial="hidden" animate="visible" variants={FADE_UP}
                style={{
                  fontSize: "clamp(1.9rem, 3.5vw, 3.1rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#111",
                  marginBottom: "32px" }}
              >
                <span style={{ fontWeight: 800, color: "#111" }}>Tech partner </span>
                <span style={{ fontWeight: 400, color: "#111" }}>for early-stage</span>
                <br />
                <span style={{ fontWeight: 400, color: "#111" }}>startups, scale-ups,</span>
                <br />
                <span style={{ fontWeight: 400, color: "#111" }}>and growing founders.</span>
              </motion.h1>

              {/* ── CTAs ── */}
              <motion.div
                custom={2} initial="hidden" animate="visible" variants={FADE_UP}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  onClick={() => setContactOpen(true)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#111", color: "#fff",
                    borderRadius: "999px", padding: "10px 20px 10px 10px",
                    fontSize: "16px", fontWeight: 600, border: "none", cursor: "pointer",
                    transition: "background 0.2s" }}
                  
                >
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "#3a3a3a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ArrowRight size={13} color="#fff" />
                  </span>
                  Contact now
                </button>

                <a
                  href="#work"
                  style={{
                    display: "inline-flex", alignItems: "center",
                    borderRadius: "999px", padding: "10px 20px",
                    fontSize: "16px", fontWeight: 600,
                    color: "#222", border: "1.5px solid #c8c8c8", background: "transparent",
                    cursor: "pointer", transition: "background 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  Works
                </a>
              </motion.div>

              {/* spacer */}
              <div style={{ flex: 1 }} />

              {/* ── bottom section ── */}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "26px", marginTop: "26px" }}>

                {/* description */}
                <motion.p
                  custom={3} initial="hidden" animate="visible" variants={FADE_UP}
                  style={{
                    color: "#333",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: 1.7,
                    maxWidth: "500px",
                    marginBottom: "22px" }}
                >
                  Anni Web Solutions is a founder-friendly tech agency providing custom web
                  development, mobile apps, AI/ML solutions, SaaS products and automation
                  for startups and growing businesses worldwide.
                </motion.p>

                {/* ── Marquee — starts from left edge, moves right ── */}
                <motion.div
                  custom={4} initial="hidden" animate="visible" variants={FADE_UP}
                  style={{ marginLeft: "-44px", marginRight: "-44px" }}
                >
                  <div className="marquee-wrap">
                    <div className="marquee-inner">
                      {LOGOS.map((l, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            paddingLeft: "44px",
                            paddingRight: "44px",
                            flexShrink: 0,
                            opacity: 0.75 }}
                        >
                          <span style={{
                            color: "#111",
                            fontSize: "16px",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            whiteSpace: "nowrap" }}>
                            {l.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ── Badge — bottom-right, like Dribbble badge ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                position: "absolute", bottom: "24px", right: "24px",
                zIndex: 20 }}
            >
              <img
                src={batchImg}
                alt="Trusted Partner Badge"
                style={{ width: "120px", height: "120px", objectFit: "contain" }}
              />
            </motion.div>

          </motion.div>

          {/* ══════════════ RIGHT CARDS ══════════════ */}
          {!isMobile && (
          <div className="hero-right-col flex flex-col gap-3" style={{ width: "340px", flexShrink: 0 }}>

            {/* Card 1 — AI video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-2xl flex flex-col justify-between cursor-pointer group"
              style={{ flex: "0 0 calc(50% - 6px)", minHeight: "300px", padding: "28px 24px 24px" }}
            >
              <video
                src={aiVideo}
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,4,24,0.92) 0%, rgba(8,4,24,0.3) 50%, transparent 100%)" }}
              />

              <div className="relative z-10">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-4"
                  style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", fontSize: "16px", fontWeight: 600 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  NEW*
                </span>
                <h3 style={{ fontSize: "1.55rem", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "8px" }}>
                  AI Automation<br />Suite
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                  A flexible{" "}
                  <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>AI workflow</span>{" "}
                  automation for startups.
                </p>
              </div>

              <a
                href="/ai-automation"
                className="relative z-10 mt-5 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all group-hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.12)", fontSize: "16px" }}
              >
                Explore AI Solutions
                <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Card 2 — team photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{ flex: "1 1 0", minHeight: "0" }}
            >
              <img
                src={heroTeam}
                alt="Anni Web Solutions team"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
              />
              <div className="relative z-10 flex flex-col justify-end h-full" style={{ padding: "24px" }}>
                <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                  50<span style={{ color: "#4ade80" }}>+</span>
                </div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.92)", marginTop: "4px" }}>
                  Projects delivered
                </p>
                <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", marginTop: "2px" }}>
                  Trusted by startups worldwide, led by our team.
                </p>
              </div>
            </motion.div>

          </div>
          )}
        </div>
      </section>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default HeroSection;
