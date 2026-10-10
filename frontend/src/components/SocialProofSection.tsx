import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CARDS = [
  {
    bg: "linear-gradient(160deg,#1a1a2e 0%,#16213e 100%)",
    label: "WEB DEVELOPMENT",
    title: "Build Your\nDigital\nPresence",
    sub: "Custom websites & web apps",
    accent: "#6b7eff" },
  {
    bg: "linear-gradient(160deg,#0d0d0d 0%,#1a0533 100%)",
    label: "AI SOLUTIONS",
    title: "Automate\nYour\nBusiness",
    sub: "AI agents & smart automation",
    accent: "#4ade80" },
  {
    bg: "linear-gradient(160deg,#0a1628 0%,#0f2a44 100%)",
    label: "MOBILE APPS",
    title: "Launch\nYour\nApp Fast",
    sub: "iOS & Android development",
    accent: "#f59e0b" },
];

const PhoneCard = ({ card }: { card: typeof CARDS[0] }) => (
  <div style={{ width: "100%", height: "100%", borderRadius: "36px", background: card.bg, border: "2px solid rgba(255,255,255,0.1)", overflow: "hidden", position: "relative", padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 40px 80px rgba(0,0,0,0.45)" }}>
    <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", width: "60px", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.15)" }} />
    <div style={{ marginTop: "16px" }}>
      <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: card.accent, textTransform: "uppercase" as const }}>{card.label}</span>
    </div>
    <div>
      <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", whiteSpace: "pre-line" as const, marginBottom: "8px" }}>{card.title}</h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{card.sub}</p>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "14px", background: "rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "8px", background: card.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: 900, color: "#000" }}>A</span>
        </div>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Anni</span>
      </div>
      <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Your Tech Partner</span>
    </div>
  </div>
);

const SocialProofSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  // auto-slide every 3s left → right
  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % CARDS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  // indices for left / center / right
  const left   = (active - 1 + CARDS.length) % CARDS.length;
  const center = active;
  const right  = (active + 1) % CARDS.length;

  return (
    <section style={{ background: "#fff", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "16px" }}>
            <span style={{ display: "inline-block", background: "#fff0f5", color: "#e11d48", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "5px 16px", borderRadius: "999px", border: "1px solid #fecdd3" }}>
              Social Presence
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "16px" }}>
            Trusted by 500+ Clients
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto" }}>
            Watch our latest project breakdowns, client success stories, and modern tech workflows.
          </motion.p>
        </div>

        {/* ── 3-phone carousel ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <div style={{ position: "relative", height: "780px", display: "flex", alignItems: "flex-end", justifyContent: "center" }} className="social-carousel-wrap">

            {/* LEFT card */}
            <div onClick={() => goTo(left)} style={{ position: "absolute", width: "360px", height: "640px", transform: "translateX(-420px) scale(0.88)", zIndex: 1, opacity: 0.55, filter: "blur(1.5px)", cursor: "pointer", transformOrigin: "center bottom", transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }} className="phone-side">
              <PhoneCard card={CARDS[left]} />
            </div>

            {/* CENTER card */}
            <div style={{ position: "absolute", width: "420px", height: "720px", transform: "translateX(0) scale(1)", zIndex: 3, opacity: 1, filter: "none", transformOrigin: "center bottom", transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }} className="phone-center">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div key={center} custom={dir}
                  variants={{
                    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }) }}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <PhoneCard card={CARDS[center]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT card */}
            <div onClick={() => goTo(right)} style={{ position: "absolute", width: "360px", height: "640px", transform: "translateX(420px) scale(0.88)", zIndex: 1, opacity: 0.55, filter: "blur(1.5px)", cursor: "pointer", transformOrigin: "center bottom", transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)" }} className="phone-side">
              <PhoneCard card={CARDS[right]} />
            </div>

          </div>

          {/* ── Dots ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  border: "none", cursor: "pointer", padding: 0,
                  borderRadius: "999px",
                  height: "7px",
                  width: active === i ? "28px" : "7px",
                  background: active === i ? "#111" : "#d0d0d0",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProofSection;
