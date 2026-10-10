import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const FALLBACK: Project[] = [
  { _id: "1", title: "AI Dashboard Platform",  category: "WEB APP / AI",    image_url: img1 },
  { _id: "2", title: "FinTech Mobile App",      category: "MOBILE APP",      image_url: img2 },
  { _id: "3", title: "Enterprise Messenger",    category: "SAAS / B2B",      image_url: img3 },
  { _id: "4", title: "E-Commerce Platform",     category: "WEB / BRANDING",  image_url: img4 },
  { _id: "5", title: "Blockchain AI Agent",     category: "AI / WEB3",       image_url: img5 },
];

interface Props {
  label?: string;
  heading?: string;
}

const SelectedWorkSection = ({
  label = "SELECTED WORK",
  heading = "Projects built to deliver real results.",
}: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [projects, setProjects] = useState<Project[]>(FALLBACK);

  useEffect(() => {
    apiFetch("/api/projects?featured=true")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProjects(data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  // double for seamless loop
  const items = [...projects, ...projects];

  return (
    <section style={{ background: "#fff", padding: "80px 0 0" }}>
      <div ref={ref}>

        {/* ── header ── */}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px", marginBottom: "36px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "12px" }}
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            {heading}
          </motion.h2>
        </div>

        {/* ── marquee cards ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* left fade */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "260px", background: "linear-gradient(to right,#fff 0%,transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
          {/* right fade */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "260px", background: "linear-gradient(to left,#fff 0%,transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

          <style>{`
            @keyframes selected-scroll {
              from { transform: translateX(-50%); }
              to   { transform: translateX(0); }
            }
            .selected-track {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: selected-scroll 32s linear infinite;
              will-change: transform;
              padding: 0 16px;
            }
          `}</style>

          <div className="selected-track">
            {items.map((p, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: "520px",
                  height: "340px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={p.image_url}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── View All Works ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", padding: "36px 0 80px" }}
        >
          <a
            href="/projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#111", color: "#fff",
              borderRadius: "999px", padding: "12px 24px 12px 12px",
              fontSize: "15px", fontWeight: 700, textDecoration: "none",
              transition: "background 0.2s",
            }}
            
          >
            <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={14} color="#fff" />
            </span>
            View All Works
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default SelectedWorkSection;
