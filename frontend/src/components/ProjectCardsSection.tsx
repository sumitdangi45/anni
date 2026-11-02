import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FillButton from "@/components/FillButton";
import { useIsMobile } from "@/hooks/useIsMobile";

import pv1 from "@/assets/cards_img/linkedin-video (1).mp4";
import pv2 from "@/assets/cards_img/Screen Recording 2026-10-26 113144.mp4";
import pv3 from "@/assets/cards_img/Screen Recording 2026-10-26 113639.mp4";
import pv4 from "@/assets/cards_img/Screen Recording 2026-10-26 113859.mp4";
import pv5 from "@/assets/cards_img/Screen Recording 2026-10-26 114710.mp4";
import pv6 from "@/assets/cards_img/Video Project.mp4";

interface Project {
  id: string;
  category: string[];
  title: string;
  highlight?: { label: string; accent: string };
  tags: string[];
  video?: string;
  bgColor: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    category: ["WEB DEVELOPMENT", "EDUCATION"],
    title: "School Website &\nDigital Learning Platform",
    highlight: { label: "DIGITAL PRESENCE", accent: "Modern School Website" },
    tags: ["UI/UX DESIGN", "WEB DEVELOPMENT", "SCHOOL MANAGEMENT"],
    link: "https://sanskarpublicschoolbichhiya.com/",
    video: pv1,
    bgColor: "#0f1117",
  },
  {
    id: "2",
    category: ["SIH 2025", "AI / CYBERSECURITY"],
    title: "AI-Powered Firmware\nAnalysis Platform",
    tags: ["UI/UX DESIGN", "ARTIFICIAL INTELLIGENCE", "FIRMWARE SECURITY", "CYBERSECURITY"],
    link: "https://crypto-firmware-analysis-landing-page-vjl8-bm1joxtpv.vercel.app/",
    video: pv2,
    bgColor: "#0d0d0d",
  },
  {
    id: "3",
    category: ["EDTECH", "AI / COMPUTER VISION"],
    title: "SnapClass —\nAI-Powered Attendance System",
    tags: ["UI/UX DESIGN", "ARTIFICIAL INTELLIGENCE", "FACE RECOGNITION", "SMART ATTENDANCE"],
    link: "https://snapclassprimeserve.vercel.app/",
    video: pv3,
    bgColor: "#111827",
  },
  {
    id: "4",
    category: ["MACHINE LEARNING", "AI / REAL ESTATE"],
    title: "Airbnb Price\nPrediction System",
    highlight: { label: "LISTINGS ANALYZED", accent: "20K+" },
    tags: ["MACHINE LEARNING", "DATA ANALYTICS", "PRICE PREDICTION", "FLASK"],
    link: "https://primeserve-hub.onrender.com/listings",
    video: pv4,
    bgColor: "#0a0a1a",
  },
  {
    id: "5",
    category: ["AGRITECH", "AI / MACHINE LEARNING"],
    title: "KisanSathi —\nAI-Powered Agricultural Assistant",
    highlight: { label: "SMART FARMING", accent: "For Farmers" },
    tags: ["AI / ML", "CROP RECOMMENDATION", "DISEASE DETECTION", "FARMER ASSISTANCE"],
    link: "https://kisansathi-git-main-shivams-projects-ae44d04d.vercel.app/",
    video: pv5,
    bgColor: "#0f0a1f",
  },
  {
    id: "6",
    category: ["FASHION", "MODELING / PORTFOLIO"],
    title: "Fashion Modeling\n& Agency Website",
    tags: ["UI/UX DESIGN", "WEB DESIGN", "FASHION PORTFOLIO", "CREATIVE DIRECTION"],
    link: "",
    video: pv6,
    bgColor: "#1a0a0f",
  },
];

// ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project, index, total,
}: { project: Project; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale   = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, index === total - 1 ? 1 : 0.6]);

  return (
    <div
      ref={ref}
      style={{ position: "sticky", top: "86px", zIndex: index + 1, marginBottom: "16px" }}
      className="project-card-sticky"
    >
      <motion.div style={{ scale, opacity }}>

        {/*
          ── CARD SHELL ──────────────────────────────────────────
          Single wrapper with borderRadius + overflow:hidden.
          This is the ONLY place radius is set — exactly like beew.studio.
          The two grid children fill 100% height; their corners are clipped
          by the parent overflow:hidden.
        */}
        <div
          className="project-card-inner"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : (isEven ? "1fr 1.85fr" : "1.85fr 1fr"),
            minHeight: isMobile ? "auto" : "580px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            // GPU layer forces overflow:hidden to clip children properly
            transform: "translate3d(0,0,0)",
            WebkitTransform: "translate3d(0,0,0)",
          }}
        >

          {/* ── TEXT panel ─────────────────────────────────── */}
          <div
            className="project-card-text"
            style={{
              background: "#fff",
              padding: isMobile ? "28px 20px 24px" : "52px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              order: isMobile ? 1 : (isEven ? 1 : 2),
            }}
          >
            <div>
              {/* category pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: isMobile ? "14px" : "22px" }}>
                {project.category.map(c => (
                  <span key={c} style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
                    padding: "4px 10px", borderRadius: "999px",
                    background: "#f0f0f0", color: "#555",
                    textTransform: "uppercase",
                  }}>
                    {c}
                  </span>
                ))}
              </div>

              {/* title */}
              <h3 style={{
                fontSize: isMobile ? "clamp(1.4rem, 6vw, 1.8rem)" : "clamp(1.6rem, 2.4vw, 2.2rem)",
                fontWeight: 800, color: "#111",
                lineHeight: 1.15, letterSpacing: "-0.03em",
                marginBottom: isMobile ? "14px" : "20px",
                whiteSpace: "pre-line",
              }}>
                {project.title}
              </h3>

              {/* highlight badge */}
              {project.highlight && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 12px", borderRadius: "999px",
                  background: "#f0f0ff", marginBottom: isMobile ? "14px" : "20px",
                }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                    {project.highlight.label}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#6b7eff" }}>
                    {project.highlight.accent}
                  </span>
                </div>
              )}

              {/* CTA */}
              {project.link ? (
                <FillButton href={project.link} variant="dark" size="sm" target="_blank" rel="noopener noreferrer">
                  View Website
                </FillButton>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "8px 18px", borderRadius: "999px",
                  background: "#e0e0e0", color: "#999",
                  fontSize: "13px", fontWeight: 700,
                }}>
                  Coming Soon
                </span>
              )}
            </div>

            {/* bottom tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 0", marginTop: isMobile ? "16px" : "32px" }}>
              {project.tags.map((t, i) => (
                <span key={t} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "#aaa", textTransform: "uppercase" }}>
                  {t}{i < project.tags.length - 1 && <span style={{ color: "#e0e0e0", margin: "0 6px" }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* ── VIDEO panel ─────────────────────────────────── */}
          <div
            className="project-card-mock"
            style={{
              background: project.bgColor,
              order: isMobile ? 2 : (isEven ? 2 : 1),
              position: "relative",
              height: isMobile ? "260px" : undefined,
              minHeight: isMobile ? undefined : "580px",
              overflow: "hidden",
            }}
          >
            {project.video && (
              <video
                src={project.video}
                autoPlay loop muted playsInline
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: isMobile ? "cover" : "contain",
                  display: "block",
                }}
              />
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
const ProjectCardsSection = () => (
  <section style={{ background: "#f5f5f3", padding: "8px 16px 80px" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} total={PROJECTS.length} />
      ))}
    </div>
  </section>
);

export default ProjectCardsSection;
