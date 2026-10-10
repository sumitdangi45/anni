import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ArrowRight, Phone } from "lucide-react";
import ctaVideo from "@/assets/hyperpixels9434_ssspin.io_1791462468.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LOGOS = ["React.js", "Node.js", "Next.js", "Python", "OpenAI", "AWS", "Flutter", "MongoDB", "TypeScript", "LangChain", "React Native", "PostgreSQL"];
const TRACK = [...LOGOS, ...LOGOS];

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @keyframes cta-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cta-track {
          display: flex;
          width: max-content;
          animation: cta-marquee 28s linear infinite;
        }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "360px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center" }}
      >
        {/* ── video background ── */}
        <video
          src={ctaVideo}
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 70%" }}
        />
        {/* light overlay so text is readable but video is visible */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />

        {/* ── center content ── */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "70px 20px 40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.15, letterSpacing: "-0.03em",
              marginBottom: "16px" }}
          >
            Your project backlog
            <br />
            isn't getting any shorter.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", lineHeight: 1.7 }}
          >
            Web, mobile, AI and automation. One tech partner, one monthly subscription.
          </motion.p>

          {/* 3 action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
          >
            {/* Email Us */}
            <a href="mailto:contact@anniwebsolutions.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fff", color: "#111",
                borderRadius: "999px", padding: "12px 22px",
                fontSize: "16px", fontWeight: 700, textDecoration: "none",
                transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0f0f0")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ArrowRight size={13} color="#fff" />
              </span>
              Get a Custom Quote
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)", color: "#fff",
                borderRadius: "999px", padding: "12px 22px",
                fontSize: "16px", fontWeight: 600, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <WhatsAppIcon size={15} />
              Chat on WhatsApp
            </a>

            {/* Call */}
            <a href="tel:+917974135629"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)", color: "#fff",
                borderRadius: "999px", padding: "12px 22px",
                fontSize: "16px", fontWeight: 600, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <Phone size={15} />
              Call: +91 79741 35629
            </a>
          </motion.div>
        </div>

        {/* ── bottom logo marquee ── */}
        <div style={{ position: "relative", zIndex: 2, overflow: "hidden", paddingBottom: "28px" }}>
          <div className="cta-track">
            {TRACK.map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "36px", paddingRight: "36px", flexShrink: 0 }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.72)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default CTABanner;
