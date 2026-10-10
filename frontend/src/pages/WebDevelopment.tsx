import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Layers, ShoppingCart, Plug, Sparkles, RefreshCw, MessageCircle, Globe, FileCode, Database, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const WEB_FAQ = [
  { q: "What is included in a custom web development project?", a: "A typical project includes discovery and planning, UI/UX design, frontend and backend development, database setup, third-party integrations, testing, deployment, and 30 days of post-launch support." },
  { q: "Do you use templates or build custom from scratch?", a: "We build custom. Every project is designed and developed around your specific business, brand and goals — not pre-built templates or page builders." },
  { q: "How long does a website project take?", a: "A business website typically takes 2–4 weeks. Custom web applications and platforms take 4–10 weeks depending on complexity, features and integrations required." },
  { q: "Do you handle both design and development?", a: "Yes. We handle the complete project — UI/UX design, frontend development, backend development, database, APIs, testing and deployment. One team, end to end." },
  { q: "Can you redesign and improve our existing website?", a: "Yes. We audit your existing website, identify improvement opportunities and rebuild or modernize it with better design, performance, SEO structure and technology." },
  { q: "What technologies do you build with?", a: "We build with React.js, Next.js, Node.js, Express.js, Python, MongoDB, PostgreSQL, and integrate with third-party APIs, payment gateways, CRMs, WhatsApp and AI services." },
  { q: "Do you build e-commerce websites?", a: "Yes. We build custom e-commerce solutions with product catalogs, cart, checkout, payment integration, order management and customer account features." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your business, goals and requirements and propose a detailed development plan with timeline and investment." },
];

const USP = [
  { icon: <Code2 size={22} strokeWidth={1.5} />, title: "Custom by Design", desc: "No unnecessary templates or one-size-fits-all functionality. Built around your specific business needs." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "Performance Focused", desc: "Fast, responsive experiences designed with real-world performance and Core Web Vitals in mind." },
  { icon: <Layers size={22} strokeWidth={1.5} />, title: "Scalable Architecture", desc: "Build today without creating limitations for tomorrow. Architecture designed to grow with your business." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "Ready for AI", desc: "Modern web products connected with AI, automation and intelligent workflows where it creates real value." },
];

const SERVICES = [
  {
    title: "Business & Corporate Websites",
    subtitle: "Build a professional digital presence that represents your business.",
    desc: "Custom websites designed around your brand, audience and business objectives — without unnecessary templates or limitations.",
    points: [
      "Custom UI designed around your brand identity and goals.",
      "Responsive experience across desktop, tablet and mobile.",
      "SEO-friendly website structure and technical foundation.",
      "CMS integration for easy content management.",
      "Contact forms, lead capture and business integrations.",
      "Performance, security and deployment optimization.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false,
  },
  {
    title: "Custom Web Applications",
    subtitle: "Turn complex business processes into powerful web applications.",
    desc: "We build custom platforms that help businesses manage operations, customers, data and workflows from one place.",
    points: [
      "Custom dashboards, admin panels and management interfaces.",
      "User authentication, roles and permission systems.",
      "Business workflows and custom functionality development.",
      "Database-driven applications and backend APIs.",
      "Third-party service and API integrations.",
      "Scalable architecture designed for future growth.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true,
  },
  {
    title: "E-commerce Development",
    subtitle: "Build an online store designed to sell.",
    desc: "Create fast, flexible shopping experiences with the functionality your business actually needs — no bloated platforms.",
    points: [
      "Custom storefront and product interfaces.",
      "Product catalog, category and inventory management.",
      "Cart, checkout and payment gateway integration.",
      "Customer accounts and order management.",
      "Shipping, tax and logistics integrations.",
      "Analytics, SEO and conversion optimization.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true,
  },
  {
    title: "API & Third-Party Integrations",
    subtitle: "Connect your website with the tools your business already uses.",
    desc: "We integrate your website with external platforms, services and internal systems to create seamless digital workflows.",
    points: [
      "REST API design, development and third-party integrations.",
      "Payment gateway integration (Razorpay, Stripe, UPI).",
      "CRM, lead management and sales tool integration.",
      "WhatsApp, email and communication platform APIs.",
      "Maps, analytics and external service integrations.",
      "Secure data synchronization between systems.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false,
  },
  {
    title: "AI-Powered Web Solutions",
    subtitle: "Add intelligence to your website and web application.",
    desc: "We integrate AI where it creates genuine business value — from intelligent assistants to automation and personalized experiences.",
    points: [
      "AI chatbot and virtual assistant integration.",
      "AI-powered search and knowledge retrieval (RAG).",
      "Personalized user experiences using ML models.",
      "AI content and document processing automation.",
      "Intelligent recommendations and workflow automation.",
      "Custom AI APIs integrated into web applications.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true,
  },
  {
    title: "Website Modernization & Redesign",
    subtitle: "Transform an outdated website into a modern digital experience.",
    desc: "We redesign and rebuild existing websites to improve usability, performance, technology and business results.",
    points: [
      "Existing website, technology and SEO audit.",
      "Modern UI/UX redesign and improved user experience.",
      "Mobile responsiveness and performance improvements.",
      "Core Web Vitals and page speed optimization.",
      "SEO-friendly migration and technical improvements.",
      "Modern architecture and scalable redevelopment.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false,
  },
];

const WHAT_WE_BUILD = [
  { icon: <Globe size={20} />, title: "Business Websites", desc: "Professional websites for companies, startups and growing businesses." },
  { icon: <FileCode size={20} />, title: "Landing Pages", desc: "High-converting pages for products, services and campaigns." },
  { icon: <Layers size={20} />, title: "Web Applications", desc: "Custom platforms built around specific business workflows." },
  { icon: <ShoppingCart size={20} />, title: "E-commerce", desc: "Online stores with custom shopping and checkout experiences." },
  { icon: <Database size={20} />, title: "Business Portals", desc: "Customer portals, admin systems and internal business platforms." },
  { icon: <Cpu size={20} />, title: "AI-Powered Web Apps", desc: "Web products enhanced with AI, automation and intelligent workflows." },
];

const TECH_STACK = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Python", "Django", "Flask"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"] },
  { category: "APIs & Integration", items: ["REST APIs", "WebSockets", "Auth", "Third-party APIs"] },
  { category: "Deployment", items: ["Docker", "AWS", "Vercel", "Netlify", "CI/CD"] },
  { category: "AI Integration", items: ["OpenAI", "LangChain", "RAG", "ML APIs"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your business, users, requirements and technical needs." },
  { num: "02", title: "Plan", desc: "Define features, architecture, user flows and development roadmap." },
  { num: "03", title: "Design", desc: "Create the UI/UX and interactive prototypes before development." },
  { num: "04", title: "Develop", desc: "Build the frontend, backend, database and required integrations." },
  { num: "05", title: "Test", desc: "Test functionality, responsiveness, security, performance and usability." },
  { num: "06", title: "Launch & Scale", desc: "Deploy the product and continue improving as your business grows." },
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
      style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi+1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} /> Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const WebDevelopment = () => {
  useSEO({
    title: "Custom Web Development — Anni Web Solutions",
    description: "Custom websites, web applications, e-commerce and AI-powered web solutions built around your business goals.",
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null);
  const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>CUSTOM WEB DEVELOPMENT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Websites built around your
              <br />
              business, not a template.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We design and develop fast, scalable and secure websites tailored to your business goals — from high-converting company websites and landing pages to complex custom platforms and AI-powered web experiences.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top Web Development Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#6b7eff", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />
      <SelectedWorkSection label="SELECTED WEB WORK" heading="Websites and web apps built to perform." />

      {/* What we build */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE BUILD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From simple websites to complete digital platforms.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_BUILD.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our Web Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Web Development Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={techRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>TECHNOLOGY WE WORK WITH</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Modern technology. Practical solutions.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {TECH_STACK.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{tech.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {tech.items.map(item => (
                    <span key={item} style={{ fontSize: "16.5px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px", background: "hsl(0,0%,15%)", color: "rgba(255,255,255,0.8)", border: "1px solid hsl(0,0%,20%)" }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR DEVELOPMENT PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From idea to production.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>HAVE AN IDEA?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's build something that works
            <br />
            as hard as your business.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            From a simple business website to a complex web application, we'll design and develop a digital solution around your goals.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Start a Project
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")} onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={WEB_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our web development services, process, technology and timelines." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default WebDevelopment;
