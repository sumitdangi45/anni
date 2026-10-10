import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Package, CreditCard, Lock, Users, BarChart2, Plug, Cpu, Bell, MessageCircle, Layers, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const SAAS_FAQ = [
  { q: "What makes SaaS development different from building a regular web app?", a: "SaaS products require multi-tenant architecture, subscription billing, user/organization management, onboarding flows, usage tracking and infrastructure designed to scale with many customers — not just one business. It's a full product, not a project." },
  { q: "Do you build the full SaaS product or just the MVP?", a: "Both. We can scope a focused MVP to validate your idea quickly, then continue building features, integrations and improvements. We also build complete SaaS platforms for teams ready to launch with the full product." },
  { q: "Can you integrate subscription billing into the SaaS product?", a: "Yes. We integrate Stripe, Razorpay or other payment platforms with subscription plans, free trials, tiered pricing, usage-based billing, automated renewals, invoices and upgrade/downgrade flows." },
  { q: "What is multi-tenancy and do I need it?", a: "Multi-tenancy means multiple businesses or customers use the same platform while their data and users stay completely separate and secure. Most B2B SaaS products need this. We design tenant isolation into the architecture from the start." },
  { q: "Can you add AI features to a SaaS product?", a: "Yes. We integrate AI assistants, intelligent search (RAG), recommendations, content generation, automation and other AI capabilities into SaaS products where they create real user value." },
  { q: "Do you handle the infrastructure and cloud deployment?", a: "Yes. We handle cloud deployment, environment setup, CI/CD pipelines, database management, monitoring and production-ready infrastructure so your SaaS is ready for real customers from day one." },
  { q: "How do you handle SaaS security?", a: "Security is built in from architecture — not added later. We implement tenant isolation, secure authentication, role-based access control, data encryption, and protection against common vulnerabilities as standard." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your target users, business model, product requirements and timeline — and provide a detailed SaaS development proposal with architecture, phasing and investment." },
];

const USP = [
  { icon: <Package size={22} strokeWidth={1.5} />, title: "Product + Technology", desc: "We think about the business model and product experience alongside the architecture and code." },
  { icon: <Layers size={22} strokeWidth={1.5} />, title: "Built for Multi-Tenancy", desc: "Architecture designed to support multiple customers securely from the very beginning." },
  { icon: <CreditCard size={22} strokeWidth={1.5} />, title: "Monetization Ready", desc: "Subscriptions, tiers, trials and usage-based billing built into the product — not bolted on later." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "SaaS products designed to incorporate AI assistants, automation and intelligent features as they evolve." },
];

const SERVICES = [
  {
    title: "SaaS Product Development",
    subtitle: "From product idea to a complete software platform.",
    desc: "We build SaaS products around your target users, business model and core product requirements.",
    points: [
      "Product architecture, feature planning and technical scoping.",
      "Multi-tenant SaaS application development.",
      "User accounts, organizations and workspace management.",
      "Custom dashboards and product workflows.",
      "API and third-party service integrations.",
      "Scalable cloud-ready application architecture.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true,
  },
  {
    title: "Subscription & Billing Systems",
    subtitle: "Turn your product into a sustainable recurring-revenue business.",
    desc: "We build flexible billing systems around the way you want customers to pay and use your product.",
    points: [
      "Monthly and annual subscription plans.",
      "Free trials, promotional offers and coupons.",
      "Tiered pricing and feature-based plan management.",
      "Usage-based and hybrid billing models.",
      "Automated invoices, renewals and payment handling.",
      "Subscription upgrades, downgrades and cancellations.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false,
  },
  {
    title: "Multi-Tenant Architecture",
    subtitle: "One platform. Multiple customers. Securely separated.",
    desc: "We design SaaS architecture so multiple businesses can use the same product while keeping their users, data and resources properly isolated.",
    points: [
      "Tenant-aware application and database architecture.",
      "Secure tenant data isolation and access boundaries.",
      "Organization and workspace management.",
      "Role-based permissions and access control per tenant.",
      "Tenant-specific configuration and settings.",
      "Resource monitoring and usage controls per tenant.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true,
  },
  {
    title: "SaaS Onboarding & Product Experience",
    subtitle: "Help users reach value faster.",
    desc: "A good SaaS product should not make new customers figure everything out themselves. We design onboarding flows around the product's key value moment.",
    points: [
      "Signup, account creation and email verification flows.",
      "Guided product onboarding and activation steps.",
      "Workspace and organization setup workflows.",
      "Role assignment and team invitation flows.",
      "Feature discovery and in-app product guidance.",
      "Activation tracking and user engagement monitoring.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false,
  },
  {
    title: "SaaS Integrations & Automation",
    subtitle: "Connect your product to the tools your customers already use.",
    desc: "We integrate your SaaS platform with external services so customers can build it into their existing workflows.",
    points: [
      "REST API design, development and documentation.",
      "CRM, accounting and business-system integrations.",
      "Payment and subscription billing integrations.",
      "Email, WhatsApp and communication service APIs.",
      "Webhooks, event triggers and automated workflows.",
      "AI APIs and intelligent product automation.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true,
  },
  {
    title: "SaaS Analytics, AI & Scale",
    subtitle: "Build a product that gets smarter as it grows.",
    desc: "We add the infrastructure and intelligence needed to understand product usage, improve customer experience and scale your SaaS business.",
    points: [
      "Product usage and feature adoption analytics.",
      "Customer and tenant activity tracking dashboards.",
      "Performance and infrastructure monitoring.",
      "AI assistants and intelligent product features.",
      "Usage-based insights and automated recommendations.",
      "Architecture optimization for growing customer workloads.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false,
  },
];

const WHAT_WE_BUILD = [
  { icon: <Package size={20} />, title: "B2B SaaS", desc: "Software platforms for businesses and professional teams." },
  { icon: <Users size={20} />, title: "B2C SaaS", desc: "Subscription products designed for individual users and consumers." },
  { icon: <BarChart2 size={20} />, title: "Vertical SaaS", desc: "Industry-specific software for healthcare, education, finance and other domains." },
  { icon: <Sparkles size={20} />, title: "AI SaaS", desc: "Software products built around AI models, agents and intelligent workflows." },
  { icon: <Lock size={20} />, title: "Internal SaaS Platforms", desc: "Custom software for organizations, teams and operational workflows." },
  { icon: <TrendingUp size={20} />, title: "Marketplace SaaS", desc: "Platforms connecting multiple users, businesses or service providers." },
];

const CORE_FEATURES = [
  { icon: <Layers size={18} />, title: "Multi-Tenancy", desc: "Multiple customers using one platform with secure tenant separation." },
  { icon: <CreditCard size={18} />, title: "Subscriptions & Billing", desc: "Plans, trials, recurring payments and flexible pricing models." },
  { icon: <Lock size={18} />, title: "Authentication", desc: "Secure signup, login, sessions and account management." },
  { icon: <Users size={18} />, title: "Roles & Permissions", desc: "Different access levels for owners, admins, managers and team members." },
  { icon: <BarChart2 size={18} />, title: "Analytics", desc: "Understand product usage, customer activity and business performance." },
  { icon: <Plug size={18} />, title: "Integrations", desc: "Connect your SaaS with the tools and services customers already use." },
  { icon: <Cpu size={18} />, title: "AI Capabilities", desc: "Add AI assistants, recommendations, search and automation where useful." },
  { icon: <Bell size={18} />, title: "Notifications", desc: "Email, in-app, push and other customer communication workflows." },
];

const TECH_STACK = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Python", "Django"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { category: "APIs & Real-Time", items: ["REST APIs", "WebSockets", "Webhooks"] },
  { category: "Payments", items: ["Subscription Billing", "Razorpay", "Stripe", "Usage Metering"] },
  { category: "AI", items: ["LLM APIs", "RAG", "AI Agents", "ML APIs"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Validate", desc: "Understand target users, problem, market and SaaS business model." },
  { num: "02", title: "Define", desc: "Prioritize MVP features, user journeys and product requirements." },
  { num: "03", title: "Architect", desc: "Plan multi-tenant architecture, database, APIs, security and infrastructure." },
  { num: "04", title: "Design", desc: "Create UX, UI, dashboards and complete product experience." },
  { num: "05", title: "Develop", desc: "Build the product, billing system, integrations and core functionality." },
  { num: "06", title: "Launch & Scale", desc: "Deploy, monitor usage, improve the product and scale as customers grow." },
];

const SECURITY_ITEMS = [
  { icon: <ShieldCheck size={18} />, title: "Tenant Isolation", desc: "Prevent cross-customer access to data and resources." },
  { icon: <Lock size={18} />, title: "Secure Access", desc: "Authentication, authorization and role-based permissions." },
  { icon: <TrendingUp size={18} />, title: "Scalable Infrastructure", desc: "Handle growing customers and workloads without redesign." },
  { icon: <BarChart2 size={18} />, title: "Usage Monitoring", desc: "Track tenant activity and resource consumption." },
  { icon: <Sparkles size={18} />, title: "Reliable Operations", desc: "Monitoring, logging, backups and production-ready deployment." },
  { icon: <Cpu size={18} />, title: "Continuous Improvement", desc: "SaaS products evolve through customer usage and feedback." },
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

const SaaSDevelopment = () => {
  useSEO({
    title: "SaaS Development — Anni Web Solutions",
    description: "Build, launch and scale SaaS products — multi-tenant architecture, subscription billing, onboarding, integrations and AI-ready SaaS platforms.",
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null);
  const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const secRef = useRef(null);
  const secInView = useInView(secRef, { once: true, margin: "-60px" });
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
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>SAAS DEVELOPMENT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Turn your software idea into
              <br />
              a scalable SaaS product.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We design and develop SaaS platforms that help businesses launch, monetize and scale software products — with multi-tenant architecture, subscriptions, secure user management, integrations, analytics and AI-ready capabilities built into the product from the start.
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
            <img src={batchImg} alt="Top SaaS Development Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
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
      <SelectedWorkSection label="SELECTED SAAS WORK" heading="SaaS products built to grow with their customers." />

      {/* What we build */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE BUILD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              SaaS products for different business models.
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
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our SaaS Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our SaaS Development Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Core features — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={featRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>CORE SAAS FEATURES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Everything needed to run a real SaaS product.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {CORE_FEATURES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={techRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>SAAS TECHNOLOGY STACK</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Modern infrastructure built for scale.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {TECH_STACK.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{tech.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {tech.items.map(item => (
                    <span key={item} style={{ fontSize: "16.5px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px", background: "#f5f5f5", color: "#555", border: "1px solid #e8e8e8" }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR SAAS PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From business idea to recurring-revenue product.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#f8f8f8", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Scale */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={secRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={secInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>SECURITY & SCALABILITY</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={secInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Built for customers, data and growth.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {SECURITY_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={secInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>HAVE A SAAS IDEA?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn your software idea into
            <br />a scalable product.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            From MVP architecture and product design to subscriptions, integrations and production deployment, we'll help you build a SaaS product ready for real customers.
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

      <FAQSection faqs={SAAS_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about SaaS product development, multi-tenancy, billing, architecture and our process." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default SaaSDevelopment;
