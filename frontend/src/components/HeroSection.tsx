import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

const useHeroImage = () => {
  const siteImages = useSiteImages();
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

  useEffect(() => {
    apiFetch("/api/admin/upload/resume")
      .then(r => r.json())
      .then(data => { if (data.url) setResumeUrl(data.url); })
      .catch(() => {});
  }, []);

  return {
    morphSrc: siteImages.morph_portrait || siteImages.hero || "",
    resumeUrl,
  };
};

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const badges = [
  { label: "React", emoji: "⚛️", top: "18%", right: "4%" },
  { label: "Python", emoji: "🐍", top: "35%", left: "2%" },
  { label: "AWS", emoji: "☁️", top: "55%", right: "3%" },
  { label: "AI/ML", emoji: "🤖", top: "72%", left: "3%" },
  { label: "Node.js", emoji: "🟢", top: "20%", left: "2%" },
];

// SVG network background
const NetworkBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="fade" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Lines */}
    {[
      [120, 180, 340, 120], [340, 120, 580, 200], [580, 200, 720, 100],
      [720, 100, 900, 180], [900, 180, 1050, 80], [1050, 80, 1200, 160],
      [120, 180, 200, 350], [340, 120, 420, 300], [580, 200, 600, 380],
      [720, 100, 780, 280], [900, 180, 950, 360], [200, 350, 420, 300],
      [420, 300, 600, 380], [600, 380, 780, 280], [780, 280, 950, 360],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
    ))}
    {/* Dots */}
    {[
      [120, 180], [340, 120], [580, 200], [720, 100], [900, 180], [1050, 80], [1200, 160],
      [200, 350], [420, 300], [600, 380], [780, 280], [950, 360],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" fillOpacity="0.5" />
    ))}
  </svg>
);

const HeroSection = () => {
  const { morphSrc, resumeUrl } = useHeroImage();
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding pt-32 relative overflow-hidden w-full"
    >
      {/* Network background */}
      <div className="absolute inset-0 text-foreground">
        <NetworkBg />
      </div>

      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center relative">
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-0">

            {/* Left text */}
            <motion.div
              className="flex flex-col items-center md:items-end md:flex-1 md:pr-8"
              initial="hidden"
              animate="visible"
            >
              <motion.span
                custom={0}
                variants={FADE_UP}
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-2 text-center md:text-right"
              >
                <span className="font-bold text-foreground">SUMIT</span> DANGI
              </motion.span>
              <motion.h1
                custom={1}
                variants={FADE_UP}
                className="heading-display leading-none text-center md:text-right"
              >
                fullstack
              </motion.h1>
            </motion.div>

            {/* Center photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="relative flex-shrink-0 order-first md:order-none"
            >
              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl scale-110" />

              <div id="morph-hero-img" className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                {/* Mobile: show real image. Desktop: opacity-0 (morph animation covers it) */}
                <img
                  src={morphSrc}
                  alt="Sumit Dangi"
                  className="w-full h-full object-cover md:opacity-0"
                />
              </div>

              {/* Hi bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -bottom-5 -left-5 md:-bottom-8 md:-left-8 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base md:text-lg shadow-lg"
              >
                Hi
              </motion.div>
            </motion.div>

            {/* Right text */}
            <motion.div
              className="flex flex-col items-center md:items-start md:flex-1 md:pl-8"
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                custom={2}
                variants={FADE_UP}
                className="heading-display leading-none text-center md:text-left"
              >
                developer
              </motion.h1>
              <motion.p
                custom={3}
                variants={FADE_UP}
                className="text-sm md:text-base text-muted-foreground mt-3 max-w-[220px] text-center md:text-left leading-relaxed"
              >
                Building scalable web applications powered by AI and Machine Learning.
              </motion.p>
              <motion.a
                custom={4}
                variants={FADE_UP}
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-indigo mt-5"
              >
                Resume
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating tech badges — desktop only */}
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
          className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-md text-xs font-medium"
          style={{
            top: badge.top,
            left: (badge as any).left,
            right: (badge as any).right,
          }}
        >
          <span>{badge.emoji}</span>
          <span>{badge.label}</span>
        </motion.div>
      ))}
    </section>
  );
};

export default HeroSection;
