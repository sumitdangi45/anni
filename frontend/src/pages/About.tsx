import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Cpu, TrendingUp, Users, Zap, Award, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useSEO } from "@/hooks/useSEO";

// ── Data ──────────────────────────────────────────────────────

const STATS = [
  { value: "50+",  label: "Projects Delivered" },
  { value: "30+",  label: "Happy Clients" },
  { value: "5+",   label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const SERVICES_LIST = [
  "Custom Web Development",
  "Mobile App Development",
  "SaaS & Web Applications",
  "AI / ML Solutions",
  "Automation & Integrations",
  "Digital Marketing & SEO",
  "UI/UX Design",
  "Ongoing Support & Maintenance",
];

const WHO_WE_WORK_WITH = [
  { label: "Early-stage startups", desc: "Moving from idea to MVP, fast." },
  { label: "Growing SMEs", desc: "Scaling digital infrastructure without growing headcount." },
  { label: "Founders & solopreneurs", desc: "Your on-demand tech team." },
  { label: "Agencies & studios", desc: "White-label dev support when you need it." },
];

const TIMELINE = [
  { year: "2019", title: "Where It Started", desc: "Sumit Thakur began freelancing — building websites and web apps for local businesses. The mission was simple: give small teams access to quality tech." },
  { year: "2021", title: "Anni Web Solutions Founded", desc: "What started as solo work grew into a focused team. Anni Web Solutions was formally established to take on larger projects across web, mobile, and AI." },
  { year: "2022", title: "Scaling Up", desc: "Expanded to SaaS development, AI/ML, and digital marketing. Client base grew across India, the Middle East, and Southeast Asia." },
  { year: "2023", title: "AI-First Practice", desc: "Built a dedicated AI practice — LLM integrations, automation, chatbots, and intelligent product features for growing businesses." },
  { year: "Now",  title: "One Partner for Everything", desc: "A full-service digital agency. One team, one point of contact, end-to-end ownership from idea to launch to growth." },
];

const VALUES = [
  { icon: <Zap size={18} />,          title: "Speed Without Compromise",   desc: "We ship fast — but never at the cost of quality. Deadlines are commitments, not suggestions." },
  { icon: <CheckCircle size={18} />,  title: "Honest Communication",       desc: "No fluff, no overpromising. We tell you exactly what's possible, how long it takes, and what it costs." },
  { icon: <TrendingUp size={18} />,   title: "Built to Scale",             desc: "Every product we build is designed with growth in mind — clean code, solid architecture, future-proof decisions." },
  { icon: <Users size={18} />,        title: "Founder-First Mindset",      desc: "We understand your constraints and work as a true extension of your team." },
  { icon: <Cpu size={18} />,          title: "Tech That Actually Works",   desc: "We pick the right tools for the job — not the trendiest ones. Reliability beats novelty every time." },
  { icon: <Globe size={18} />,        title: "Long-Term Partnerships",     desc: "We don't disappear after launch. Our best clients are ones we've grown alongside for years." },
];

// ── Fade-in wrapper ───────────────────────────────────────────
const FadeIn = ({ children, delay = 0, x = 0, y = 20 }: { children: React.ReactNode; delay?: number; x?: number; y?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// ── Hero ──────────────────────────────────────────────────────
const Hero = () => (
  <section className="about-hero-pad" style={{ padding: "160px 20px 100px", maxWidth: "1200px", margin: "0 auto" }}>
    <FadeIn y={12} delay={0}>
      <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "24px" }}>
        About Anni Web Solutions
      </p>
    </FadeIn>

    <FadeIn y={24} delay={0.05}>
      <h1 style={{ fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: "60px", maxWidth: "900px" }}>
        We build the digital&nbsp;
        <em style={{ fontStyle: "italic", opacity: 0.45 }}>products</em>
        <br />your business runs on.
      </h1>
    </FadeIn>

    <FadeIn y={16} delay={0.1}>
      <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", paddingTop: "40px", borderTop: "1px solid var(--border)" }} className="about-stats-row">
        {STATS.map((s) => (
          <div key={s.label}>
            <p style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "16px", color: "var(--muted-foreground)", marginTop: "6px" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  </section>
);

// ── Story ─────────────────────────────────────────────────────
const Story = () => (
  <section style={{ background: "#f3f4f6", color: "#111", padding: "100px 20px" }}>
    <div className="about-story-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "start" }}>
      <FadeIn x={-30} delay={0}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.45, marginBottom: "20px", color: "#666" }}>Our Story</p>
        <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#111" }}>
          Built by a builder,<br />for builders.
        </h2>
      </FadeIn>

      <FadeIn x={30} delay={0.1}>
        <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#444", marginBottom: "24px" }}>
          Anni Web Solutions started with one frustrating observation: most businesses — especially small ones — couldn't access quality tech without burning through their budget or waiting months for delivery.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#444", marginBottom: "24px" }}>
          Sumit Thakur founded Anni to fix that. Starting as a solo freelancer, the vision was always the same — be the kind of tech partner that acts like a co-founder, not a contractor. Someone who cares about outcomes, not just deliverables.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#444" }}>
          Today, we're a lean, full-service agency with deep expertise across web, mobile, AI, and growth. We work with early-stage startups, growing SMEs, and founders who need a team that ships.
        </p>
      </FadeIn>
    </div>
  </section>
);

// ── Mission + What We Do ──────────────────────────────────────
const MissionSection = () => (
  <section style={{ padding: "100px 20px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn delay={0}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>Our Mission</p>
        <p style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.03em", maxWidth: "880px", marginBottom: "80px", paddingBottom: "80px", borderBottom: "1px solid var(--border)" }}>
          "To make high-quality digital products accessible to every founder and business — regardless of their size, budget, or technical background."
        </p>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="about-mission-grid">
        <div style={{ paddingRight: "60px", borderRight: "1px solid var(--border)" }}>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "28px" }}>What We Do</p>
            {SERVICES_LIST.map((s, i) => (
              <FadeIn key={s} delay={0.12 + i * 0.04} x={-10} y={0}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border)", fontSize: "16.5px", fontWeight: 500 }}>
                  <span>{s}</span>
                  <ArrowRight size={13} style={{ opacity: 0.3 }} />
                </div>
              </FadeIn>
            ))}
          </FadeIn>
        </div>

        <div style={{ paddingLeft: "60px" }}>
          <FadeIn delay={0.15}>
            <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "28px" }}>Who We Work With</p>
            {WHO_WE_WORK_WITH.map((item, i) => (
              <FadeIn key={item.label} delay={0.18 + i * 0.07} x={10} y={0}>
                <div style={{ padding: "22px 0", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>{item.label}</p>
                  <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

// ── Timeline ──────────────────────────────────────────────────
const TimelineSection = () => (
  <section style={{ padding: "100px 20px", background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn delay={0}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "16px" }}>Our Journey</p>
        <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "60px" }}>
          How we got here
        </h2>
      </FadeIn>

      {TIMELINE.map((item, i) => (
        <FadeIn key={item.year} delay={i * 0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "40px", padding: "36px 0", borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--muted-foreground)", paddingTop: "3px" }}>{item.year}</p>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.02em" }}>{item.title}</p>
              <p style={{ fontSize: "16.5px", color: "var(--muted-foreground)", lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

// ── Values ────────────────────────────────────────────────────
const ValuesSection = () => (
  <section style={{ padding: "100px 20px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeIn delay={0}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "60px" }}>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "16px" }}>Our Values</p>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>What we stand by</h2>
          </div>
          <p style={{ fontSize: "16.5px", color: "var(--muted-foreground)", maxWidth: "360px", lineHeight: 1.7 }}>
            These aren't words on a wall. They're the principles behind every sprint, every decision, and every line of code.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }} className="about-values-grid">
        {VALUES.map((v, i) => (
          <FadeIn key={v.title} delay={i * 0.08}>
            <div style={{
              padding: "36px 32px",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border)" : "none",
              borderBottom: i < 3 ? "1px solid var(--border)" : "none",
              height: "100%" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--foreground)", color: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                {v.icon}
              </div>
              <p style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{v.title}</p>
              <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ── Founder ───────────────────────────────────────────────────
const FounderSection = () => (
  <section style={{ padding: "100px 20px", background: "#f3f4f6", color: "#111" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-founder-grid">
        <FadeIn x={-30} delay={0}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>The Founder</p>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px", color: "#111" }}>
            Sumit Thakur
          </h2>
          <p style={{ fontSize: "16.5px", fontWeight: 600, color: "#888", marginBottom: "28px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Founder & CEO — Full Stack &amp; AI Engineer
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#444", marginBottom: "20px" }}>
            Sumit is a Full Stack Developer and AI/ML Engineer with a track record of building and shipping digital products across industries. He started coding out of curiosity and built a career out of solving real problems with software.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#444", marginBottom: "32px" }}>
            His approach is direct: understand the business goal first, then engineer the simplest thing that works. That philosophy runs through every project at Anni.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/917974135629"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f0f0f0", color: "#111", border: "1px solid #ddd", borderRadius: "999px", padding: "10px 20px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}
            >
              Chat on WhatsApp
            </a>
            <a
              href="mailto:contact@anniwebsolutions.com"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "10px 20px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
            >
              <ArrowRight size={13} />
              Send an Email
            </a>
          </div>
        </FadeIn>

        <FadeIn x={30} delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { icon: <Award size={20} />,       label: "5+ Years",      sub: "Building real products" },
              { icon: <Globe size={20} />,        label: "Global Clients", sub: "India, Middle East, SE Asia" },
              { icon: <Cpu size={20} />,          label: "AI / ML",       sub: "LLMs, automation, agents" },
              { icon: <TrendingUp size={20} />,   label: "Full-Stack",    sub: "Web, mobile & SaaS" },
            ].map((card) => (
              <div
                key={card.label}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px 20px" }}
              >
                <div style={{ color: "#666", marginBottom: "14px" }}>{card.icon}</div>
                <p style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", color: "#111" }}>{card.label}</p>
                <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.5 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

// ── Main export ───────────────────────────────────────────────
const About = () => {
  useSEO({
    title: "About — Anni Web Solutions",
    description: "Learn about Anni Web Solutions — our story, mission, values, and the team behind the products. Founded by Sumit Thakur." });

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />
      <Hero />
      <Story />
      <MissionSection />
      <TimelineSection />
      <ValuesSection />
      <FounderSection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default About;
