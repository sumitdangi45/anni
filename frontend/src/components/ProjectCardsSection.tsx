import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Project {
  id: string;
  category: string[];
  title: string;
  highlight?: { label: string; accent: string };
  tags: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    category: ["WEB APP", "AI / SAAS"],
    title: "AI-Powered\nBusiness Dashboard",
    highlight: { label: "CLIENT RAISED", accent: "US $2.1M" },
    tags: ["UI/UX DESIGN", "WEB APP", "AI INTEGRATION"],
    image: "#f0efe9",
  },
  {
    id: "2",
    category: ["MINDSPHERE", "AI / SAAS / WEB3"],
    title: "Blockchain AI\nAgent Platform",
    highlight: undefined,
    tags: ["UI/UX DESIGN", "BRANDING", "WEB DEVELOPMENT", "3D DESIGN"],
    image: "#0d0d0d",
  },
  {
    id: "3",
    category: ["EFFICENSE", "SAAS / B2B"],
    title: "IT Performance\nOptimization Tools",
    highlight: undefined,
    tags: ["UI/UX DESIGN", "LANDING PAGE", "PRODUCT DESIGN"],
    image: "#eef2ff",
  },
  {
    id: "4",
    category: ["UPTECH", "AI / AUTOMATION"],
    title: "AI-First Automate\nTools & Tickets",
    highlight: { label: "PRODUCTIVITY UP", accent: "3.5X" },
    tags: ["WEB APP", "AI AGENTS", "AUTOMATION"],
    image: "#0a0a1a",
  },
  {
    id: "5",
    category: ["FINTECH", "MOBILE APP"],
    title: "Next-Gen\nPayment Platform",
    highlight: { label: "TRANSACTIONS", accent: "$50M+" },
    tags: ["MOBILE APP", "UI/UX DESIGN", "BRANDING"],
    image: "#f5f0ff",
  },
  {
    id: "6",
    category: ["EDTECH", "SAAS"],
    title: "Smart Learning\nManagement System",
    highlight: undefined,
    tags: ["SAAS", "WEB APP", "AI INTEGRATION"],
    image: "#0d1a0d",
  },
  {
    id: "7",
    category: ["E-COMMERCE", "WEB"],
    title: "High-Conversion\nE-Commerce Platform",
    highlight: { label: "REVENUE BOOST", accent: "+180%" },
    tags: ["WEB DEVELOPMENT", "UI/UX DESIGN", "SEO"],
    image: "#fff8f0",
  },
];

// ── Mock screenshot ───────────────────────────────────────────
const MockScreen = ({ bg, dark }: { bg: string; dark: boolean }) => {
  const line = (w: string, h = "8px", o = 1) => (
    <div style={{ width: w, height: h, borderRadius: "4px", background: dark ? `rgba(255,255,255,${o * 0.25})` : `rgba(0,0,0,${o * 0.12})`, flexShrink: 0 }} />
  );
  const box = (w: string, h: string, r = "10px") => (
    <div style={{ width: w, height: h, borderRadius: r, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", flexShrink: 0 }} />
  );
  return (
    <div style={{ width: "100%", height: "100%", background: bg, padding: "24px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* navbar mock */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {line("70px", "8px")}
        <div style={{ display: "flex", gap: "24px" }}>{line("36px", "6px", 0.6)}{line("36px", "6px", 0.6)}{line("36px", "6px", 0.6)}</div>
        <div style={{ width: "80px", height: "28px", borderRadius: "999px", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }} />
      </div>
      {/* hero block */}
      <div style={{ flex: 2, borderRadius: "14px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
        {line("45%", "14px")}
        {line("65%", "14px")}
        {line("40%", "10px", 0.7)}
        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
          <div style={{ width: "90px", height: "32px", borderRadius: "999px", background: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)" }} />
          <div style={{ width: "90px", height: "32px", borderRadius: "999px", border: `1.5px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}` }} />
        </div>
      </div>
      {/* cards row */}
      <div style={{ display: "flex", gap: "10px", flex: 1 }}>
        {box("33%", "100%")}
        {box("33%", "100%")}
        {box("33%", "100%")}
      </div>
    </div>
  );
};

// ── Single card ───────────────────────────────────────────────
const ProjectCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = ["#0d0d0d", "#0a0a1a", "#0d1a0d"].includes(project.image);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale   = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, index === total - 1 ? 1 : 0.6]);

  return (
    <div ref={ref} style={{ position: "sticky", top: "86px", zIndex: index + 1, marginBottom: "16px" }}>
      <motion.div style={{ scale, opacity }}>
        <div style={{
          background: "#fff",
          borderRadius: "22px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1.85fr",
          minHeight: "600px",
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 32px rgba(0,0,0,0.07)",
        }}>

          {/* ── LEFT: text ── */}
          <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #f0f0f0" }}>

            {/* top */}
            <div>
              {/* category pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
                {project.category.map(c => (
                  <span key={c} style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", padding: "4px 10px", borderRadius: "999px", border: "1.5px solid #e0e0e0", color: "#555" }}>
                    {c}
                  </span>
                ))}
              </div>

              {/* title */}
              <h3 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", fontWeight: 800, color: "#111", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "20px", whiteSpace: "pre-line" }}>
                {project.title}
              </h3>

              {/* highlight */}
              {project.highlight && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "#f0f0ff", marginBottom: "20px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase" }}>{project.highlight.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#6b7eff" }}>{project.highlight.accent}</span>
                </div>
              )}

              {/* CTA */}
              <FillButton href="/projects" variant="dark" size="sm">
                View Case
              </FillButton>
            </div>

            {/* bottom: service tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 0" }}>
              {project.tags.map((t, i) => (
                <span key={t} style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: "#444" }}>
                  {t}{i < project.tags.length - 1 && <span style={{ color: "#ccc", margin: "0 6px" }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: image/mock ── */}
          <div style={{ overflow: "hidden", minHeight: "600px" }}>
            <MockScreen bg={project.image} dark={isDark} />
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────
import FillButton from "@/components/FillButton";

const ProjectCardsSection = () => (
  <section style={{ background: "#f5f5f3", padding: "8px 20px 100px" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} total={PROJECTS.length} />
      ))}
    </div>
  </section>
);

export default ProjectCardsSection;
