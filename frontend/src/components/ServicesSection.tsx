import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import heroVideo from "@/assets/hero2.mp4";

const SERVICES = [
  {
    num: "01",
    title: "Custom Web Development",
    tags: ["Websites", "Web Applications", "Business Platforms", "E-commerce"],
    desc: "From landing pages to complex web platforms — we build scalable, fast and production-ready digital products tailored to your goals.",
  },
  {
    num: "02",
    title: "AI & Automation",
    tags: ["AI Agents", "LLM Integration", "Workflow Automation", "Chatbots"],
    desc: "Automate repetitive workflows, integrate intelligent AI agents and embed LLM-powered features directly into your product or operations.",
  },
  {
    num: "03",
    title: "Mobile App Development",
    tags: ["iOS", "Android", "React Native", "Flutter", "Cross-platform"],
    desc: "Cross-platform mobile apps that deliver native-like performance and smooth user experiences on iOS and Android.",
  },
  {
    num: "04",
    title: "SaaS Development",
    tags: ["SaaS Products", "Multi-tenant Apps", "Subscription Systems", "MVPs"],
    desc: "End-to-end SaaS development — from MVP to scalable multi-tenant platforms with auth, billing and everything in between.",
  },
  {
    num: "05",
    title: "UI/UX & Product Design",
    tags: ["UI Design", "UX Research", "Prototyping", "Design Systems", "Branding"],
    desc: "User-centered design that converts — from wireframes to pixel-perfect interfaces, branding and scalable design systems.",
  },
  {
    num: "06",
    title: "Digital Growth & SEO",
    tags: ["SEO", "Google Ads", "Meta Ads", "Content Strategy", "Analytics"],
    desc: "Data-driven SEO, performance marketing and digital strategy that brings real traffic, leads and measurable business growth.",
  },
  {
    num: "07",
    title: "Cloud & DevOps",
    tags: ["AWS", "GCP", "CI/CD", "Docker", "Infrastructure"],
    desc: "Scalable cloud infrastructure, automated deployments and DevOps pipelines so your product ships faster and stays reliable.",
  },
  {
    num: "08",
    title: "Cybersecurity & Digital Security",
    tags: ["Security Audits", "Penetration Testing", "Compliance", "Monitoring"],
    desc: "Protect your product and business with security assessments, vulnerability testing and ongoing threat monitoring.",
  },
  {
    num: "09",
    title: "Maintenance & Support",
    tags: ["Bug Fixes", "Updates", "Performance", "Uptime Monitoring"],
    desc: "We don't disappear after launch. Ongoing maintenance, security patches, performance tuning and priority support for your live product.",
  },
];

// ── Accordion row ──────────────────────────────────────────────
const Row = ({ service, isOpen, onToggle }: {
  service: typeof SERVICES[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center text-left"
        style={{ padding: "44px 0", background: "transparent", border: "none", cursor: "pointer", gap: "48px" }}
      >
        {/* number */}
        <span style={{ fontSize: "16px", fontWeight: 500, color: "#6b7eff", width: "36px", flexShrink: 0 }}>
          {service.num}
        </span>

        {/* title */}
        <span style={{
          fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
          fontWeight: 700,
          color: "#111",
          flex: 1,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}>
          {service.title}
        </span>

        {/* plus/minus */}
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          border: "1.5px solid #ddd",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: isOpen ? "#f5f5f5" : "transparent",
          transition: "background 0.2s",
        }}>
          {isOpen
            ? <Minus size={16} color="#111" />
            : <Plus size={16} color="#666" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "32px", paddingLeft: "60px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                {service.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: "16.5px", fontWeight: 500,
                    padding: "5px 14px", borderRadius: "999px",
                    border: "1.5px solid #e0e0e0",
                    color: "#444",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: "16.5px", color: "#777", lineHeight: 1.75, maxWidth: "560px" }}>
                {service.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────
const ServicesSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" style={{ background: "#fff" }}>

        {/* ── Banner card ── */}
        <div style={{ padding: "60px 20px 0", maxWidth: "1320px", margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl services-banner"
          style={{ height: "280px" }}
        >
          <video
            src={heroVideo}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)" }} />
          <div className="relative z-10 h-full flex items-end justify-between services-banner-inner" style={{ padding: "32px 40px" }}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "12px" }}>
                SERVICES
              </p>
              <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Everything your startup
                <br />
                needs to build and ship.
              </h2>
            </div>
            <div style={{ textAlign: "right", maxWidth: "220px" }}>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                You bring the priorities.
                <br />
                We bring the thinking,
                <br />
                build and execution.
              </p>
            </div>
          </div>
        </motion.div>
        </div>

        {/* ── Accordion ── */}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px 100px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ borderTop: "1px solid #e8e8e8", marginTop: "40px" }}
        >
          {SERVICES.map((s, i) => (
            <Row
              key={s.num}
              service={s}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
        </div>

    </section>
  );
};

export default ServicesSection;
