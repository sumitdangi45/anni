import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Monitor, Smartphone, Search, Component, Globe, ShoppingCart, Database, Cpu, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const UIUX_FAQ = [
  { q: "What is included in a UI/UX design project?", a: "A typical project includes user research, information architecture, wireframes, high-fidelity UI design, interactive prototypes, responsive design for all screen sizes, and developer-ready files with specifications." },
  { q: "Do you handle both UX and UI, or just one?", a: "Both. We handle the complete design process — from user research and UX architecture through to polished UI design and interactive prototypes. One team, end to end." },
  { q: "How long does a UI/UX design project take?", a: "A website design typically takes 2–3 weeks. A SaaS product or mobile app design takes 3–6 weeks depending on complexity, number of screens and rounds of feedback." },
  { q: "What tools do you use for design?", a: "We primarily design in Figma — including wireframes, high-fidelity designs, design systems and interactive prototypes. All deliverables are provided in developer-ready Figma files." },
  { q: "Can you work with our existing development team?", a: "Yes. We deliver developer-ready Figma files with full specifications, component notes and interaction details that make handoff straightforward for any development team." },
  { q: "Do you design mobile apps?", a: "Yes. We design iOS and Android apps, including user flows, screen architecture, interaction design and developer-ready UI components optimized for mobile platforms." },
  { q: "Can you audit and redesign our existing product?", a: "Yes. We conduct UX audits of existing websites and products, identify usability and conversion issues, and redesign the experience with improved structure and interfaces." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your product, users and goals, and propose a design plan with timeline and investment." },
];

const USP = [
  { icon: <Search size={22} strokeWidth={1.5} />, title: "User First", desc: "Design decisions are based around real users, their goals and how they actually use your product." },
  { icon: <BarChart2 size={22} strokeWidth={1.5} />, title: "Conversion Focused", desc: "Clear journeys and interactions designed to move users toward the actions that matter to your business." },
  { icon: <Smartphone size={22} strokeWidth={1.5} />, title: "Mobile Ready", desc: "Responsive experiences designed from the ground up for every screen size and device." },
  { icon: <Component size={22} strokeWidth={1.5} />, title: "Built to Scale", desc: "Reusable components and design systems that support consistent, faster future product development." },
];

const SERVICES = [
  {
    title: "Website UI/UX Design",
    subtitle: "Turn your website into a clear and engaging digital experience.",
    desc: "Design modern websites that are easy to navigate, responsive across devices and built around your users and business goals.",
    points: [
      "User-focused website structure and information architecture.",
      "High-converting landing page and website layouts.",
      "Responsive designs for desktop, tablet and mobile.",
      "Clear navigation, content hierarchy and interaction patterns.",
      "Interactive prototypes for key user journeys.",
      "Conversion-focused CTAs, forms and enquiry experiences.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807797/anni/uiux/ANNI_Web_Solutions_Tech_Showcase.png",
    dark: false },
  {
    title: "SaaS & Dashboard Design",
    subtitle: "Make complex products simple to understand and use.",
    desc: "We design scalable SaaS platforms and dashboards that make workflows, data and business operations easier to manage.",
    points: [
      "SaaS product and dashboard interface design.",
      "Data visualization, charts and reporting interfaces.",
      "User roles, permissions and workflow experiences.",
      "Tables, filters, search and complex data interfaces.",
      "User onboarding and product activation flows.",
      "Responsive web-app interfaces for different screen sizes.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807801/anni/uiux/ANNI_Analytics_Dashboard_Laptop_Mockup.png",
    dark: true },
  {
    title: "Mobile App UI/UX",
    subtitle: "Create mobile experiences people can use naturally.",
    desc: "From onboarding to everyday interactions, we design mobile apps around real user behaviour and simple task flows.",
    points: [
      "Android and iOS app UX architecture.",
      "User flows and task-based screen design.",
      "Mobile-first navigation and interaction patterns.",
      "Login, onboarding and account experiences.",
      "Forms, gestures, states and error handling.",
      "Developer-ready UI screens and interactive prototypes.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792807983/anni/uiux/ANNI_Digital_Solutions_App_Showcase.png",
    dark: true },
  {
    title: "UX Research & Usability Testing",
    subtitle: "Understand your users before you build.",
    desc: "We identify user needs, friction points and usability problems before they become expensive development problems.",
    points: [
      "User persona and audience research.",
      "User journey and task-flow mapping.",
      "Competitor and product experience analysis.",
      "Usability testing and feedback analysis.",
      "Identification of UX friction points.",
      "Actionable recommendations for product improvement.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808366/anni/uiux/UX_Research_Before_Building.png",
    dark: false },
  {
    title: "Design Systems & UI Libraries",
    subtitle: "Build a design foundation that scales with your product.",
    desc: "Create consistent, reusable and developer-friendly components that make future product design and development faster.",
    points: [
      "Complete UI design systems.",
      "Reusable buttons, forms, cards and components.",
      "Typography, spacing and visual guidelines.",
      "Responsive component variants and states.",
      "Developer-ready Figma components.",
      "Documentation for consistent product development.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808368/anni/uiux/Design_Systems_That_Scale.png",
    dark: false },
  {
    title: "UX Audit & Product Redesign",
    subtitle: "Find what's not working and redesign what matters.",
    desc: "We analyse existing websites and products to uncover usability problems, confusing journeys and conversion friction.",
    points: [
      "Complete website or product UX audit.",
      "Navigation and information architecture review.",
      "Mobile usability analysis.",
      "Conversion and funnel friction analysis.",
      "Accessibility and interaction review.",
      "Redesign recommendations and improved UI concepts.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808370/anni/uiux/Outdated_vs_Modern_Website_Design.png",
    dark: true },
];

const WHAT_WE_DESIGN = [
  { icon: <Globe size={20} />, title: "Websites", desc: "Marketing websites, landing pages and corporate websites." },
  { icon: <Monitor size={20} />, title: "SaaS Products", desc: "Web applications, dashboards and business platforms." },
  { icon: <Smartphone size={20} />, title: "Mobile Apps", desc: "Android and iOS experiences built around real user flows." },
  { icon: <ShoppingCart size={20} />, title: "E-commerce", desc: "Product discovery, shopping, cart and checkout experiences." },
  { icon: <Database size={20} />, title: "Business Platforms", desc: "Internal tools, portals and workflow-based applications." },
  { icon: <Cpu size={20} />, title: "AI Products", desc: "AI interfaces, assistants, dashboards and intelligent workflows." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your business, users, goals and product requirements." },
  { num: "02", title: "Define", desc: "Map user journeys, information architecture and key product flows." },
  { num: "03", title: "Wireframe", desc: "Create the structure and functionality before visual design." },
  { num: "04", title: "Design", desc: "Build polished, responsive interfaces and reusable components." },
  { num: "05", title: "Prototype", desc: "Turn screens into interactive experiences for testing and feedback." },
  { num: "06", title: "Deliver", desc: "Provide developer-ready designs, components and design specifications." },
];

const WHY_ANNI = [
  { title: "User First", desc: "Design decisions are based around real users and their goals." },
  { title: "Conversion Focused", desc: "Clear journeys and interactions designed to move users toward action." },
  { title: "Mobile Ready", desc: "Responsive experiences built for every screen size." },
  { title: "Built to Scale", desc: "Reusable components and systems that support future growth." },
];

const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minHeight: "260px" }}>
    <div style={{ width: "55%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
    <div style={{ width: "75%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "8px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: "40px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />)}
    </div>
  </div>
);

const ServiceRow = ({ s, i }: { s: typeof SERVICES[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = s.img === "left";
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
      className="service-row" style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div className="service-row-img" style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        {(s as any).imageUrl
          ? <img src={(s as any).imageUrl} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "260px" }} />
          : <MockImg gradient={s.gradient} dark={s.dark} />
        }
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "2px" }}>0{pi+1}</span>
              <p style={{ fontSize: "14.5px", color: "#555", lineHeight: 1.65, margin: 0 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} /> Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const UIUXDesign = () => {
  useSEO({
    title: "UI/UX Design — Anni Web Solutions",
    description: "Intuitive, modern and conversion-focused digital experiences for websites, SaaS products, mobile apps and business platforms." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null);
  const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref} className="hero-outer-wrap">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="hero-inner-pad" style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#888", marginBottom: "20px" }}>UI / UX DESIGN</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Digital experiences that look better
              <br />
              and work smarter.
            </h1>
            <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.75, marginBottom: "32px", maxWidth: "560px" }}>
              We design intuitive, modern and conversion-focused digital experiences for websites, SaaS products, mobile apps and business platforms — combining thoughtful UX with polished UI to create products people enjoy using.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" as const }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "14px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }} className="hero-badge"
          >
            <img src={batchImg} alt="Top Design Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* ── USP ── */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }} className="usp-grid">
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#6b7eff", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />
      <SelectedWorkSection label="SELECTED UI/UX WORK" heading="Experiences designed to perform." />

      {/* ── What we design ── */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "12px" }}>WHAT WE DESIGN</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              More than screens. Complete digital experiences.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_DESIGN.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service catalog ── */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "13px", fontWeight: 700, color: "#4f46e5" }}>Our Design Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our UI/UX Design Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "12px" }}>OUR DESIGN PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From research to a ready-to-build product.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Anni ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={whyRef}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "60px", flexWrap: "wrap" as const }}>
            <div style={{ maxWidth: "400px" }}>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "14px" }}>WHY ANNI</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 16 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                Design that doesn't stop at Figma.
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
                style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginTop: "16px" }}>
                We combine UX, UI, development and AI expertise under one team — so your product is designed with real implementation, scalability and performance in mind.
              </motion.p>
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minWidth: "300px" }}>
              {WHY_ANNI.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={whyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
                >
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "16px" }}>HAVE A PRODUCT IDEA?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn it into an experience
            <br />
            people love to use.
          </h2>
          <p style={{ fontSize: "15px", color: "#777", lineHeight: 1.75, marginBottom: "32px" }}>
            Whether you're starting from an idea or improving an existing product, we'll help you design a clear, modern and scalable digital experience.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Start a Project
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "12px 24px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")} onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={UIUX_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our UI/UX design services, process, tools and deliverables." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default UIUXDesign;
