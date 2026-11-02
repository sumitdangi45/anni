import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import v1 from "@/assets/cards_img/Untitled_Scene_10-08_04_27_27_20261025193105.mp4";
import v2 from "@/assets/cards_img/Untitled_Scene_10-25_14_06_59_20261025194136.mp4";
import v3 from "@/assets/cards_img/Untitled_Scene_10-25_15_33_12_20261025211315.mp4";
import v4 from "@/assets/cards_img/Untitled_Scene_10-26_03_00_14_20261026083439.mp4";
import v5 from "@/assets/cards_img/Untitled_Scene_10-26_03_26_47_20261026090049.mp4";

const CARDS = [
  { video: v1, label: "WEB DEVELOPMENT",  title: "Build Your\nDigital\nPresence",  sub: "Custom websites & web apps",   accent: "#6b7eff" },
  { video: v2, label: "AI SOLUTIONS",     title: "Automate\nYour\nBusiness",       sub: "AI agents & smart automation", accent: "#4ade80" },
  { video: v3, label: "MOBILE APPS",      title: "Launch\nYour\nApp Fast",         sub: "iOS & Android development",    accent: "#f59e0b" },
  { video: v4, label: "SAAS PRODUCTS",    title: "Ship Your\nSaaS\nFaster",        sub: "End-to-end SaaS development",  accent: "#f43f5e" },
  { video: v5, label: "AI AUTOMATION",    title: "Automate\nEvery\nWorkflow",      sub: "Smart automation & AI agents", accent: "#a78bfa" },
];

// ── PhoneCard ─────────────────────────────────────────────────
const PhoneCard = ({
  card,
  isActive,
  onStopPlaying,
}: {
  card: typeof CARDS[0];
  isActive: boolean;
  onStopPlaying?: () => void; // called when video stops so parent knows
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopSound = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    setPlaying(false);
    if (autoTimer.current) clearTimeout(autoTimer.current);
    onStopPlaying?.();
  }, [onStopPlaying]);

  // When card becomes inactive → reset
  useEffect(() => {
    if (!isActive) {
      stopSound();
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, stopSound]);

  // Auto-play muted when active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    if (playing) {
      stopSound();
    } else {
      vid.muted = false;
      vid.play().catch(() => {});
      setPlaying(true);
      // auto-stop after 60s
      autoTimer.current = setTimeout(() => stopSound(), 60000);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100%", height: "100%",
        borderRadius: "36px", overflow: "hidden",
        position: "relative",
        border: "2px solid rgba(255,255,255,0.15)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 16px",
        cursor: "pointer",
      }}
    >
      {/* video */}
      <video
        ref={videoRef}
        src={card.video}
        loop muted playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)" }} />

      {/* play icon */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", zIndex: 10,
        background: "rgba(0,0,0,0.5)", borderRadius: "50%",
        width: "48px", height: "48px",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
        border: "1.5px solid rgba(255,255,255,0.2)",
        opacity: playing ? 0 : 0.85, transition: "opacity 0.3s",
      }}>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="#fff">
          <path d="M0 0l16 9-16 9V0z" />
        </svg>
      </div>

      {/* notch */}
      <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", width: "60px", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.2)", zIndex: 2 }} />

      {/* label */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "16px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
          color: card.accent, textTransform: "uppercase" as const,
          background: "rgba(0,0,0,0.4)", padding: "3px 8px",
          borderRadius: "999px", backdropFilter: "blur(4px)",
        }}>
          {playing ? "🔊 " : ""}{card.label}
        </span>
      </div>

      {/* title */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h3 style={{
          fontSize: "1.6rem", fontWeight: 900, color: "#fff",
          lineHeight: 1.1, letterSpacing: "-0.02em",
          whiteSpace: "pre-line" as const, marginBottom: "8px",
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}>
          {card.title}
        </h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{card.sub}</p>
      </div>

      {/* branding bar */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", borderRadius: "14px",
        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "8px", background: card.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: 900, color: "#000" }}>A</span>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Anni</span>
        </div>
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
          {playing ? "Tap to mute" : "Tap to play"}
        </span>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────
const SocialProofSection = () => {
  const ref       = useRef(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [dir,    setDir]    = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // touch swipe state
  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const goTo = useCallback((i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    // slide always stops any playing video (handled by isActive prop)
    setIsVideoPlaying(false);
  }, [active]);

  const goPrev = useCallback(() => goTo((active - 1 + CARDS.length) % CARDS.length), [active, goTo]);
  const goNext = useCallback(() => goTo((active + 1) % CARDS.length),               [active, goTo]);

  // ── Touch handlers on carousel wrapper ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) goNext(); // swipe left → next
    else        goPrev(); // swipe right → prev
  };

  // ── Mouse drag (trackpad swipe on desktop) ──
  const dragStartX = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) goNext();
    else        goPrev();
  };

  const left   = (active - 1 + CARDS.length) % CARDS.length;
  const center = active;
  const right  = (active + 1) % CARDS.length;

  return (
    <section style={{ background: "#fff", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} style={{ marginBottom: "16px" }}
          >
            <span style={{
              display: "inline-block", background: "#fff0f5", color: "#e11d48",
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase" as const, padding: "5px 16px",
              borderRadius: "999px", border: "1px solid #fecdd3",
            }}>
              Our Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "16px" }}
          >
            Everything you need to build &amp; grow.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: "15px", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto" }}
          >
            Web, mobile, AI and automation — one team, end to end.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* swipe/drag wrapper */}
          <div
            ref={wrapRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
              position: "relative", height: "780px",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              userSelect: "none", cursor: "grab",
            }}
            className="social-carousel-wrap"
          >
            {/* LEFT */}
            <div
              onClick={() => goTo(left)}
              className="phone-side"
              style={{
                position: "absolute", width: "360px", height: "640px",
                transform: "translateX(-420px) scale(0.88)",
                zIndex: 1, opacity: 0.55, filter: "blur(1.5px)",
                cursor: "pointer", transformOrigin: "center bottom",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <PhoneCard card={CARDS[left]} isActive={false} />
            </div>

            {/* CENTER */}
            <div
              className="phone-center"
              style={{
                position: "absolute", width: "420px", height: "720px",
                transform: "translateX(0) scale(1)",
                zIndex: 3, transformOrigin: "center bottom",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={center} custom={dir}
                  variants={{
                    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                  }}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <PhoneCard
                    card={CARDS[center]}
                    isActive={true}
                    onStopPlaying={() => setIsVideoPlaying(false)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT */}
            <div
              onClick={() => goTo(right)}
              className="phone-side"
              style={{
                position: "absolute", width: "360px", height: "640px",
                transform: "translateX(420px) scale(0.88)",
                zIndex: 1, opacity: 0.55, filter: "blur(1.5px)",
                cursor: "pointer", transformOrigin: "center bottom",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <PhoneCard card={CARDS[right]} isActive={false} />
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  border: "none", cursor: "pointer", padding: 0,
                  borderRadius: "999px", height: "7px",
                  width: active === i ? "28px" : "7px",
                  background: active === i ? "#111" : "#d0d0d0",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SocialProofSection;
