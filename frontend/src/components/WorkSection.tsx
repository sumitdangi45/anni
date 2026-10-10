import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { apiFetch } from "@/lib/api";
import img1 from "@/assets/dd/55603b93-139e-44c8-80ed-776906827d35.png";
import img2 from "@/assets/dd/c39t7icnnUq5KZN5mYcVLRz_-wxOZqEa7fQG7CnfqxdvpjyNvMXsCu2GC4d70dr68X5I1zO8DV5885Ta42cN52IIRo-1kP9NCv8avA_AcaRsvuKMi13YzoldYABrHz5k_8AJ-_7LdTnb1z7WFPlpz1_XAW6eTBS-KHB_NhBMbKtU1Lk8ReSWwQGbXFXdfIqi.jpg";
import img3 from "@/assets/dd/gasxjkpO1g9vSf2Bh7XsXLpc5XOsX2LcwB58ah2o1hBtPrWaeQXCrsIwLgyuAQ6BMeqevkXj3TPmgodsJljBGWBnIq-H0I8DCOPQqQlyksscUgLn8d5KMds9CHljzFDULMocVW1SK95fSiz1lIryBrSRlZAgBuXRY8RtYcA7yCNKyONxUPI_zOt5otlLKoJU.jpg";
import img4 from "@/assets/dd/original-07a431151cf64ad249f740dba21d4cb1.webp";
import img5 from "@/assets/dd/original-717fce89ac28a1f44a7d59d157adddc4.webp";

interface Project {
  _id: string;
  title: string;
  category: string;
  image_url: string;
}

const fallback: Project[] = [
  { _id: "1", category: "WEB APP", title: "AI Dashboard", image_url: img1 },
  { _id: "2", category: "MOBILE", title: "FinTech App", image_url: img2 },
  { _id: "3", category: "SAAS", title: "Enterprise Messenger", image_url: img3 },
  { _id: "4", category: "BRANDING", title: "E-Commerce Platform", image_url: img4 },
  { _id: "5", category: "AI/ML", title: "Automation Suite", image_url: img5 },
];

// gradient placeholders per card
const GRADIENTS = [
  "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",
  "linear-gradient(135deg,#0f3460 0%,#533483 100%)",
  "linear-gradient(135deg,#1b1b2f 0%,#162447 100%)",
  "linear-gradient(135deg,#0d0d0d 0%,#1a1a1a 100%)",
  "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
];

// ── Card ──────────────────────────────────────────────────────
const Card = ({ project, idx }: { project: Project; idx: number }) => (
  <div
    className="flex-shrink-0 rounded-2xl overflow-hidden"
    style={{ width: "520px", height: "340px", background: GRADIENTS[idx % GRADIENTS.length], position: "relative" }}
  >
    {project.image_url ? (
      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
    ) : (
      <div style={{ padding: "28px", opacity: 0.25 }}>
        <div style={{ height: "9px", width: "40%", background: "rgba(255,255,255,0.5)", borderRadius: "4px", marginBottom: "12px" }} />
        <div style={{ height: "7px", width: "70%", background: "rgba(255,255,255,0.3)", borderRadius: "4px", marginBottom: "7px" }} />
        <div style={{ height: "7px", width: "55%", background: "rgba(255,255,255,0.3)", borderRadius: "4px", marginBottom: "20px" }} />
        <div style={{ height: "110px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", marginBottom: "12px" }} />
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ flex: 1, height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "8px" }} />
          <div style={{ flex: 1, height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "8px" }} />
        </div>
      </div>
    )}
  </div>
);

// ── Scroll-reveal tagline ─────────────────────────────────────
const Tagline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const l1o = useTransform(smooth, [0.1, 0.28], [0, 1]);
  const l1y = useTransform(smooth, [0.1, 0.28], [40, 0]);
  const l2o = useTransform(smooth, [0.22, 0.38], [0, 1]);
  const l2y = useTransform(smooth, [0.22, 0.38], [40, 0]);
  const l3o = useTransform(smooth, [0.32, 0.48], [0, 1]);
  const l3y = useTransform(smooth, [0.32, 0.48], [40, 0]);
  const so  = useTransform(smooth, [0.44, 0.58], [0, 1]);
  const sy  = useTransform(smooth, [0.44, 0.58], [24, 0]);

  return (
    <div
      ref={ref}
      style={{ background: "hsl(0,0%,5%)", padding: "120px 24px", textAlign: "center" }}
    >
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        <motion.p style={{ opacity: l1o, y: l1y, fontSize: "clamp(1.7rem,3.8vw,2.7rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "2px" }}>
          Think of us as
        </motion.p>
        <motion.p style={{ opacity: l2o, y: l2y, fontSize: "clamp(1.7rem,3.8vw,2.7rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "2px" }}>
          your senior{" "}
          <span style={{ color: "hsl(var(--primary))" }}>tech team.</span>
        </motion.p>
        <motion.p style={{ opacity: l3o, y: l3y, fontSize: "clamp(1.7rem,3.8vw,2.7rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "48px" }}>
          Without hiring one.
        </motion.p>
        <motion.div style={{ opacity: so, y: sy }}>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.9 }}>
            You bring the priorities.
            <br />
            <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              We bring the thinking, build and execution.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────
const WorkSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallback);

  useEffect(() => {
    apiFetch("/api/projects?featured=true")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setProjects(data.slice(0, 5)); })
      .catch(() => {});
  }, []);

  // double for seamless loop
  const items = [...projects, ...projects];

  return (
    <>
      {/* ── Cards marquee ── */}
      <section style={{ background: "hsl(0,0%,5%)", paddingTop: "12px", paddingBottom: "60px", overflow: "hidden", position: "relative" }}>
        {/* left fade */}
        <div className="work-fade-left" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "260px", background: "linear-gradient(to right, #0d0d0d 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
        {/* right fade */}
        <div className="work-fade-right" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "260px", background: "linear-gradient(to left, #0d0d0d 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        <style>{`
          @keyframes cards-scroll {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          .cards-track {
            display: flex;
            gap: 16px;
            width: max-content;
            animation: cards-scroll 32s linear infinite;
            will-change: transform;
            padding: 0 16px;
          }
        `}</style>

        <div className="cards-track">
          {items.map((p, i) => (
            <Card key={i} project={p} idx={i} />
          ))}
        </div>
      </section>

      {/* ── Tagline ── */}
      <Tagline />
    </>
  );
};

export default WorkSection;
