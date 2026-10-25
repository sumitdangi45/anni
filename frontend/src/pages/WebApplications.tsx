import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, LayoutDashboard, Users, BarChart2, Zap, Radio, Package, ShieldCheck, Cpu, Layers, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const WEBAPP_FAQ = [
  { q: "What is the difference between a website and a web application?", a: "A website is primarily informational — it presents your business to visitors. A web application has complex functionality, user accounts, workflows, data management and business logic. Think SaaS products, dashboards, portals and business management systems." },
  { q: "What types of web applications do you build?", a: "We build SaaS platforms, business management systems, customer and partner portals, data dashboards, workflow automation applications, and real-time collaborative tools." },
  { q: "How long does it take to build a web application?", a: "A standard web application takes 6–12 weeks. Complex SaaS platforms or multi-role systems may take 3–6 months. We'll define a clear timeline after understanding your requirements." },
  { q: "Do you handle authentication and user management?", a: "Yes. We implement secure authentication (email, OAuth, SSO), role-based access control, user management, session handling and permission systems as standard for web application projects." },
  { q: "Can you build the web application and the API backend together?", a: "Yes. We build the complete stack — frontend application, REST API backend, database design, authentication, third-party integrations and deployment — in one project." },
  { q: "Do you build SaaS applications with subscription billing?", a: "Yes. We integrate Stripe, Razorpay or other payment platforms for subscription plans, recurring billing, plan upgrades/downgrades and billing management into SaaS products." },
  { q: "Is the application mobile-friendly?", a: "Yes. All web applications we build are fully responsive and optimized for desktop, tablet and mobile browsers. We follow performance and usability best practices throughout." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your users, processes, required functionality and goals — and provide a detailed scoping proposal with architecture, timeline and investment." },
];

const USP = [
  { icon: <GitBranch size={22} strokeWidth={1.5} />, title: "Business-First Development", desc: "We understand the workflow and business process before deciding the technology stack." },
  { icon: <Layers size={22} strokeWidth={1.5} />, title: "Custom Architecture", desc: "Built around your specific requirements — not adapted from a generic template or framework boilerplate." },
  { icon: <ShieldCheck size={22} strokeWidth={1.5} />, title: "Secure & Scalable", desc: "Authentication, data security and scalable architecture built in from day one — not added later." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "Architecture designed to incorporate AI capabilities — search, assistants, automation — as your product evolves." },
];

const SERVICES = [
  {
    title: "SaaS & Subscription Platforms",
    subtitle: "Turn your idea into a scalable software product.",
    desc: "We build SaaS platforms where users can sign up, manage their accounts, use your product and subscribe to different plans.",
    points: [
      "Multi-user SaaS architecture and account management.",
      "Subscription plans and recurring payment integration.",
      "User onboarding flows and personalized dashboards.",
      "Role-based access and permission systems.",
      "Usage tracking, billing and subscription management.",
      "Scalable architecture for growing users and workloads.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819738/anni/web-apps/ANNI_Plans_Pricing_Dashboard.png",
    dark: true },
  {
    title: "Business Management Applications",
    subtitle: "Bring your business operations into one powerful platform.",
    desc: "We develop custom systems that replace spreadsheets and disconnected tools with centralized digital workflows.",
    points: [
      "Custom admin dashboards and management panels.",
      "Customer, employee and business data management.",
      "Role-based access and multi-step approval workflows.",
      "Automated business processes and task management.",
      "Reports, analytics and operational insights.",
      "Database and third-party system integrations.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819740/anni/web-apps/ANNI_Business_Overview_Dashboard.png",
    dark: false },
  {
    title: "Customer & Partner Portals",
    subtitle: "Give your customers and partners their own digital workspace.",
    desc: "Build secure portals where users can access information, submit requests, track activity and interact with your business.",
    points: [
      "Secure user registration, authentication and sessions.",
      "Personalized customer dashboards and account views.",
      "Documents, invoices and information management.",
      "Service requests, support workflows and ticket tracking.",
      "Notifications, messages and activity history.",
      "CRM, payment and business-system integrations.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819741/anni/web-apps/ANNI_Web_Solutions_Client_Dashboard.png",
    dark: true },
  {
    title: "Dashboards & Data Platforms",
    subtitle: "Turn business data into something your team can actually use.",
    desc: "We create interactive dashboards that bring important business information into one clear, actionable interface.",
    points: [
      "Real-time business dashboards and KPI tracking.",
      "Interactive charts and data visualization.",
      "Advanced filters, search and sortable data tables.",
      "Custom reports and performance metrics.",
      "Role-specific dashboards and data permissions.",
      "API and database-driven data synchronization.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819742/anni/web-apps/ANNI_Analytics_Dashboard_Mockup.png",
    dark: false },
  {
    title: "Workflow & Automation Applications",
    subtitle: "Replace repetitive manual processes with intelligent digital workflows.",
    desc: "We build applications that automate tasks, approvals and internal processes across your organization.",
    points: [
      "Custom workflow and multi-step approval systems.",
      "Automated task assignment and deadline notifications.",
      "Multi-step business process management.",
      "API and third-party service integrations.",
      "Email, WhatsApp and real-time in-app notifications.",
      "AI-powered automation where it creates real business value.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819744/anni/web-apps/ANNI_Workflow_Approval_Editor.png",
    dark: true },
  {
    title: "Real-Time & Collaborative Applications",
    subtitle: "Build web applications where information moves instantly.",
    desc: "For products where users need live updates, communication or collaboration, we build real-time experiences from the ground up.",
    points: [
      "Real-time data updates and live status indicators.",
      "Live notifications and activity feeds.",
      "Chat, messaging and communication features.",
      "Collaborative dashboards and shared workspaces.",
      "WebSocket-based real-time communication.",
      "Scalable backend architecture for concurrent users.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792819745/anni/web-apps/ANNI_Workspace_UI_UX_Collaboration_Mockup.png",
    dark: true },
];

const WHAT_WE_BUILD = [
  { icon: <Package size={20} />, title: "SaaS Platforms", desc: "Subscription-based software products and online platforms." },
  { icon: <LayoutDashboard size={20} />, title: "Business Applications", desc: "CRM-style systems, management platforms and internal tools." },
  { icon: <Users size={20} />, title: "Customer Portals", desc: "Secure dashboards and self-service platforms for customers." },
  { icon: <BarChart2 size={20} />, title: "Data Dashboards", desc: "Real-time analytics, reporting and business intelligence." },
  { icon: <Zap size={20} />, title: "Workflow Platforms", desc: "Approval systems, task management and automated processes." },
  { icon: <Radio size={20} />, title: "Real-Time Applications", desc: "Live dashboards, communication tools and collaborative platforms." },
];

const CORE_FEATURES = [
  { title: "Authentication & Security", desc: "Secure login, sessions, permissions and protected application data." },
  { title: "Role-Based Access", desc: "Different users see and control exactly what they are allowed to access." },
  { title: "API Integrations", desc: "Connect CRMs, payment gateways, communication platforms and external services." },
  { title: "Real-Time Updates", desc: "Live notifications, dashboards, chat and activity updates via WebSockets." },
  { title: "Payments & Subscriptions", desc: "Plans, billing, payments and subscription management where required." },
  { title: "AI Integration", desc: "Intelligent search, assistants, automation or AI workflows where useful." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your users, business processes and application requirements." },
  { num: "02", title: "Architect", desc: "Define features, data models, APIs, user roles and technical architecture." },
  { num: "03", title: "Design", desc: "Create user flows, wireframes and the complete application interface." },
  { num: "04", title: "Develop", desc: "Build frontend, backend, database, APIs and required integrations." },
  { num: "05", title: "Test", desc: "Test functionality, security, performance, responsiveness and usability." },
  { num: "06", title: "Launch & Scale", desc: "Deploy, monitor performance and continue improving as usage grows." },
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

const WebApplications = () => {
  useSEO({
    title: "Web Application Development — Anni Web Solutions",
    description: "Custom web applications — SaaS platforms, business management systems, customer portals, dashboards and real-time applications built around your workflow." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null);
  const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref} className="hero-outer-wrap">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "linear-gradient(150deg,#0a1628 0%,#1a2744 60%,#0d0d1a 100%)", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(107,114,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(107,114,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", top: "-40px", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(107,114,255,0.15) 0%, transparent 70%)" }} />

          <div className="hero-inner-pad" style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(107,114,255,0.8)", marginBottom: "20px" }}>WEB APPLICATION DEVELOPMENT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Powerful web applications built
              <br />
              around the way your business works.
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We build custom web applications that simplify complex workflows, connect your business systems and give your teams and customers a powerful digital experience — from SaaS platforms and dashboards to portals, marketplaces and real-time business tools.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#6b7eff", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5a63e0")} onMouseLeave={e => (e.currentTarget.style.background = "#6b7eff")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }} className="hero-badge"
          >
            <img src={batchImg} alt="Top Web App Development" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }} className="usp-grid">
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
      <SelectedWorkSection label="SELECTED WEB APP WORK" heading="Business applications built to solve real problems." />

      {/* What we build */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE BUILD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From business tools to complete digital products.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
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
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our Web App Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Web Application Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Core features */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={featRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>CORE FEATURES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Everything your application needs to work in the real world.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {CORE_FEATURES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "28px 24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR WEB APP PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From business problem to production-ready application.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
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
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>HAVE A COMPLEX BUSINESS PROCESS?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn it into a powerful
            <br />
            web application.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            Whether you're building a SaaS product, internal business platform or customer portal, we'll design and develop a web application around the way your business actually works.
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

      <FAQSection faqs={WEBAPP_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our web application development services, process, technology and timelines." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default WebApplications;
